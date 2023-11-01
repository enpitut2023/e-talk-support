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
