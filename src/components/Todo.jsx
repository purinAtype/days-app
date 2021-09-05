import React, { useState, useEffect, useContext,useCallback } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Slider from "@material-ui/core/Slider";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/Grid";
import Input from "@material-ui/core/Input";
import DeleteIcon from '@material-ui/icons/Delete';
import Checkbox from '@material-ui/core/Checkbox';


import { auth, db, FirebaseTimestamp } from "../firebase/index";
import * as Api from "../firebase/api"
import { AuthContext } from "./Auth";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  table: {
    minWidth: 650,
  },
  dialogContent: {
    marginBottom: 40,
  },
  textField: {
    // marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
    marginTop: 30,
  },
  slider: {
    marginTop: 0,
  },
  input: {
    width: 42,
  },
}));

function Todo() {
  const classes = useStyles();
  const currentUser = useContext(AuthContext);
  const [items, setItems] = useState([]);
  console.log(items);

  useEffect(() => {
    //TODO一覧を取得
    fetch();
  }, [currentUser])

  const fetch = async () => {
    if (currentUser.currentUser.uid) {
      const data = await Api.initGet(currentUser.currentUser.uid);
      setItems(data);
    }
  }


  const handleAdd = async (text, deadline, priority) => {
    await Api.addTodo(text, deadline, priority ,currentUser.currentUser.uid);
    fetch();
  };

  const handleCheck = async (id) => {
    //API経由でdoneの値を更新
    await Api.toggleTodo(id);
    fetch();
  };

  const handleRemove = (id) => {
    Api.deleteTodo(id);
    fetch();
  };


  return (
    <main className={classes.content}>
    <div className={classes.toolbar} ></div>
    <div className="panel">
      <div className="panel-heading">
        <h3>React Todo App</h3>
      </div>
      <div className="todo-add">
        <InputTodo onAdd={handleAdd} />
      </div>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>完了</TableCell>
              <TableCell align="left">TODOリスト</TableCell>
              <TableCell align="left">優先度</TableCell>
              <TableCell align="left">期日</TableCell>
              <TableCell align="right">削除</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((item) => (
              <TodoItem
                key={item.id}
                item={item}
                onCheck={handleCheck}
                onRemove={handleRemove}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div className="panel-block">{items.length} items</div>
    </div>
    </main>
  );
}

const TodoItem = ({ item, onCheck, onRemove }) => {
  const handleChange = (id) => {
    onCheck(id);
  };

  // const handleRemove = () => {
  //   onRemove(item);
  //   console.log(item.key);
  // };
  const handleRemove = (id) => {
    onRemove(id);
    // console.log(item.key);
  };

  return (
    <>
      <TableRow>
        <TableCell component="th" scope="row">
          <Checkbox checked={item.done} onChange={() => handleChange(item.id)}/>
        </TableCell>
        <TableCell align="left">
          <span className={item.done ? "text-grey-light" : ""}>{item.text}</span>
        </TableCell>
        <TableCell align="left">
          <span className={item.done ? "text-grey-light" : ""}>
            {item.priority}
          </span>
        </TableCell>
        <TableCell align="left">
          <span className={item.done ? "text-grey-light" : ""}>
            {item.deadline}
          </span>
        </TableCell>
        <TableCell align="right">
          <DeleteIcon onClick={() => handleRemove(item.id)}/>
        </TableCell>
      </TableRow>
    </>
    );
  }

function InputTodo({ onAdd }) {
  //モーダルOpenClose
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const classes = useStyles();
  const [text, setText] = React.useState("");
  const handleChange = (e) => setText(e.target.value);

  const [deadline, setDeadline] = React.useState("");
  const handleDeadLineChange = (e) => setDeadline(e.target.value);

  const [priority, setPriority] = React.useState(1);
  const handleSliderChange = (event, newValue) => {
    setPriority(newValue);
  };
  const handleInputChange = (event) => {
    setPriority(event.target.value === "" ? "" : Number(event.target.value));
  };
  const handleBlur = () => {
    if (priority < 1) {
      setPriority(1);
    } else if (priority > 5) {
      setPriority(5);
    }
  };
  const handleKeyDown = (e) => {
    onAdd(text, deadline, priority);
    setText("");
    setDeadline("");
    setPriority("");
    handleClose();
  };

  return (
    <>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        タスクを追加する
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">タスク登録</DialogTitle>
        <DialogContent className={classes.dialogContent}>
          <Grid container spacing={6} direction="column">
            <Grid item>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="内容"
                type="text"
                fullWidth
                value={text}
                onChange={handleChange}
              />
              <TextField
                id="date"
                label="期日"
                type="date"
                value={deadline}
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={handleDeadLineChange}
              />
            </Grid>
            <Grid container item spacing={2} className={classes.slider}>
              <Grid item xs={2}>
                <DialogContentText>優先度</DialogContentText>
              </Grid>
              <Grid item xs={8}>
                <Slider
                  value={typeof priority === "number" ? priority : 0}
                  onChange={handleSliderChange}
                  defaultValue={1} // デフォルト値
                  aria-valuetext=""
                  aria-labelledby="discrete-slider"
                  valueLabelDisplay="on" // 数字の吹き出しを常に表示する
                  step={1} // 変動幅
                  marks // 境界に印をつける
                  min={1} // 最小値
                  max={5} // 最大値
                />
              </Grid>
              <Grid item xs={2}>
                <Input
                  className={classes.input}
                  value={priority}
                  margin="dense"
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  inputProps={{
                    step: 1,
                    min: 1,
                    max: 5,
                    type: "number",
                    "aria-labelledby": "input-slider",
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            閉じる
          </Button>
          <Button onClick={handleKeyDown} color="primary">
            登録
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default Todo;
