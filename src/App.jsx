import { useState, useEffect } from "react";
import viteLogo from "/vite.svg";
import "./App.css";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { Meeting } from "./components/Meeting";
import { Form } from "./components/Form";

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
    <div>
      <h1>e-talk support</h1>
      <Meeting meetingId="BLcYePnoqOCCluUFcwQZ"></Meeting>
      <Meeting meetingId="h33Kj2ntEkv7QnopygGY"></Meeting>
      <Meeting meetingId="CuqhDPfaaApE15piGpP2"></Meeting>
    </div>
  );
}

export default App;
