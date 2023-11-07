Firebase Cloud Firestore と React プロジェクトの連携に関する資料

## 参考記事

- https://reffect.co.jp/react/react-crud-firebase-9/
- https://github.com/heytulsiprasad/modern-todolist-v1/blob/starter/src/config/firebase.js

## 環境

- Firebase Clud Firestore: ^10.5.2 (latest at 2023/11/1)

## 手順

1. Firebase SDK の追加 (for ALL)

   ターミナルでプロジェクトのディレクトリに移動し、以下のコマンドを実行

   ```
   npm install firebase
   ```

   プロジェクトフォルダに`firebase.js`を以下の内容で作成。

   apiKey は discord のセキュアなチャンネルからコピーする。

   ```
   // Import the functions you need from the SDKs you need
   import { initializeApp } from "firebase/app";
   import { getFirestore } from "firebase/firestore";
   // TODO: Add SDKs for Firebase products that you want to use
   // https://firebase.google.com/docs/web/setup#available-libraries

   // Your web app's Firebase configuration
   const firebaseConfig = {
     apiKey: "AIzaSyArmMFb1u1NzuM7vUovbk5YXlYUiV2ARFg",
     authDomain: "e-talk-support.firebaseapp.com",
     projectId: "e-talk-support",
     storageBucket: "e-talk-support.appspot.com",
     messagingSenderId: "1090459012286",
     appId: "1:1090459012286:web:68b0ee3dfbe89373a0a2ef",
   };

   // Initialize Firebase
   const app = initializeApp(firebaseConfig);

   // Initialize Firestore
   export const db = getFirestore(app);
   ```

2. Firestore の作成 (NOT for all)

   データベース ID：デフォルト
   ロケーション：Tokyo
   セキュリティ：テスト環境

3. テストデータの作成 (NOT for all)

   詳しくは Firestore へ。

4. React との接続

   作成した`firebase.js`と必要な firestore の関数を import

   以下のコードはテストデータを読み込み、画面にユーザー名と出身地を表示する。

   ```Javascript
   import { useState, useEffect } from "react";
   import reactLogo from "./assets/react.svg";
   import viteLogo from "/vite.svg";
   import "./App.css";
   import { db } from "../firebase";
   import { collection, getDocs } from "firebase/firestore";

   function App() {
     const [users, setUsers] = useState([]);

     useEffect(() => {
       const usersCollectionRef = collection(db, "users");
       getDocs(usersCollectionRef).then((querySnapshot) => {
         setUsers(
           querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
         );
       });
     }, []);

     return (
       <>
         <h1>e-talk support</h1>
         {users.map((user) => (
           <div key={user.id}>
             <h3>{user.name}</h3>
             <div>{user.birthplace}</div>
           </div>
         ))}
       </>
     );
   }

   export default App;
   ```
