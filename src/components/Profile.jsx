import { useState, useEffect } from "react";
// import "./App.css";
import { db } from "../../firebase";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";

export const Profile = (props) => {
  const [user, setUser] = useState({});

  const uid = props.uid;

  useEffect(() => {
    // const usersCollectionRef = collection(db, "users");
    // const user_doc = usersCollectionRef.doc(uid);
    // const user_data = user_doc.data();

    const userDocumentRef = doc(db, "users", uid);
    getDoc(userDocumentRef).then((snap) => {
      console.log(snap.data());
      setUser(snap.data());
    });

    // getDocs(usersCollectionRef).then((querySnapshot) => {
    //   setUser(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    // });
  }, [uid]);

  return (
    <>
      <div>{user.name}</div>
      <div>{user.birthplace}</div>
    </>
  );
};
