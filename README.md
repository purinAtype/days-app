# DaysApp

## 環境構築

①React フォルダ作成

```
npx create-react-app フォルダ名
```

環境構築がされているか確認

```
npm start
```

②Firebase でプロジェクトの作成

firebase の導入、リソースロケーションの設定
プロジェクトの作成
プロジェクト名を入力
→Google アナリティクスを有効
→Google アナリティクスの構成(国籍日本)
→ プロジェクトの作成完了

ウェブをクリック(</>)し、ウェブアプリに Firebase を追加。
Firebase Hosting も設定するにチェック。

→ 歯車の設定から「プロジェクトを設定」、Google Cloud Platform リソースロケーションを「asia-northeast1」を選択
→</>ウェブアプリに Firebase を追加、アプリのニックネーム(プロジェクト名と同様)、Firebase Hosting も設定しますにチェック、アプリを登録
→

データベースの設定
本番環境で開始、ロケーションは先ほど選択したもので OK。

③ 必要なもののインストール
MaterialUi のインストール(package.json でインストール 確認)

```
npm install --save @material-ui/core @material-ui/icons @material-ui/system @material-ui/styles firebase history react-router react-router-dom
```

※index.html の不要な文章を削除、title の変更

グローバルインストール (一度した実行した場合には、省略)

```
npm install -g firebase-tools; (-g なのでMACにインストール )
```

④firebase login
firebase login (firebase logout)
Allow Firebase to collect CLI usage and error reporting information? y/n y
→Firebase CLI が Google アカウントへのアクセスをリクエストしています。(プロジェクト作成したアカウントを選択)
//Firebase CLI Login Successful 画像 ↓

⑤firebase init;
firebase init;
矢印キーでカーソルを移動させ、スペースキーで利用するサービスを選択し、Enter
? Are you ready to proceed? Yes
? Which Firebase CLI features do you want to set up for this folder? Press Space to select features, then Enter to confirm your choices. (Press <space> to select, <a> to toggle all, <i> to invert selection)

> ( ) Database: Deploy Firebase Realtime Database Rules
> ( ) Firestore: Deploy rules and create indexes for Firestore
> ( ) Functions: Configure and deploy Cloud Functions
> ( ) Hosting: Configure and deploy Firebase Hosting sites
> ( ) Storage: Deploy Cloud Storage security rules

対象の Firebase のサイト側で作成したプロジェクトを選択します。既存のプロジェクトを使うので「Use an existing project」を選択。
? Please select an option: (Use arrow keys)

> Use an existing project
> Create a new project
> Add Firebase to an existing Google Cloud Platform project
> Don't set up a default project

先ほど作成した「my-first-deploy」を選んで下さい。(プロジェクト名の後に付いている文字列は無視して大丈夫です)
? Please select an option: Use an existing project
? Select a default Firebase project for this directory: (Use arrow keys)

> my-first-deploy-5732d (my-first-deploy)

What file should be used for Firestore Rules? Enter クリック

What file should be used for Firestore indexes? Enter クリック

What language would you like to use to write Cloud Function?

> ( ) Javascript
> ( ) Typescript

? Do you want to use ESLint to catch probable bugs and enforce style? (y/N) N

Do you want to install dependencies with npm now? y/n y

What do you want to use as your public directory? build

? Configure as a single-page app (rewrite all urls to /index.html)? (y/N) Y

? Set up automatic builds and deploys with GitHub? (y/N) N

? What file should be used for Storage Rules? (storage.rules) Enter クリック

↓ 既に存在している index.html を上書きするか選択できます。当然 No です。

- Wrote public/404.html
  ? File public/index.html already exists. Overwrite? (y/N)
  i Skipping write of public/index.html
  i Writing configuration info to firebase.json...
  i Writing project information to .firebaserc...
  i Writing gitignore file to .gitignore...
- Firebase initialization complete!

⑥firebase deploy
build フォルダの作成

```
npm run build;
```

build フォルダが作成されていることを確認。

functions/src/index.js or index.ts を全てコメントアウト

Firebase のコンソールから料金プランを「Blaze」の従量制に変更。
メールで変更されていることを確認。

firebase deploy;
本番環境 ↓
Hosting URL: https://days-app-f89c6.web.app

//⑦firebase deploy 取り消し
公開したアプリを放置するのはオススメできません。何かしら作業を続けるのでなければ、一旦デプロイを取り消しましょう。

```
~/Desktop/deploy > firebase hosting:disable
? Are you sure you want to disable Firebase Hosting?
  This will immediately make your site inaccessible! (Y/n) Yes
+  Hosting has been disabled for my-first-deploy. Deploy a new version to re-enable.
```

↑ Firebase Hosting を使えなくして良いか聞かれます。y を入力すると、デプロイは取り消されますが、
暫くは見ることが出来るようです。仮に取り消しても、もう一度

```
~/Desktop/deploy > firebase deploy
```

とやれば、再びデプロイできます。

完了

参照先
React 入門チュートリアル (5) ToDo アプリを作ってみよう
https://www.hypertextcandy.com/react-tutorial-05-wrap-up-with-todo-app

ResponsiveDrawer を Home コンポーネントに適応
https://material-ui.com/components/drawers/

React Router が Hooks 対応したので使い方を整理する
https://qiita.com/ozaki25/items/bb0eb273611eebc603dd

Simple App Bar
https://material-ui.com/components/app-bar/#simple-app-bar

Material-UI でヘッダーを作る【React】
https://john-kaz.hatenablog.com/entry/2018/11/18/151527

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
