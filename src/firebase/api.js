import firebase from "firebase";
import { db } from ".";
import { Todo } from "../components";

export const addTodo = (text, deadline, priority, uid) => {
  db.collection("todo").add({
    text: text,
    priority: priority,
    deadline: deadline,
    done: false,
    uid: uid,
    created: firebase.firestore.FieldValue.serverTimestamp()
  })
}

export const initGet = async (uid) => {
// export const initGet = async () => {
  const item = await db.collection("todo")
  .orderBy("created")
  .where("uid", "==", uid);

  return item.get().then((snapShot) => {
    let items = [];
    snapShot.forEach((doc) => {
      items.push({
        text: doc.data().text,
        priority: doc.data().priority,
        deadline: doc.data().deadline,
        done: doc.data().done,
        uid: doc.data().uid,
        created: doc.data().created,
        id: doc.id,
      });
    });
    return items;
  });
}

export const deleteTodo = (id) => {
  db.collection("todo").doc(id).delete();
}

export const toggleTodo = async (id) => {
  const item = await db.collection("todo").doc(id).get();
  return db.collection("todo").doc(id).update({
    //もし、チェックされたTODOが未完了 → doneをtrue
    //もし、チェックされたTODOが完了 → doneをfalse
    done: item.data().done ? false : true,
    // created: firebase.firestore.FieldValue.serverTimestamp()
  });
  // console.log(item)
}


