import { useState, useEffect } from "react";
import viteLogo from "/vite.svg";
import "./App.css";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { Profile } from "./components/Profile";

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
      <Profile uid="O7GCHyB6TdiR9C2FPWUS"></Profile>
      <Profile uid="Skaoi6NC3P2Qu4PPfA0S"></Profile>
    </>
  );
}

export default App;
