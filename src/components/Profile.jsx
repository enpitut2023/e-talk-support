import { useState, useEffect } from "react";
// import "./App.css";
import { db } from "../../firebase";
import { collection, getDocs, doc } from "firebase/firestore";

export const Profile = (props) => {
  const [user, setUser] = useState({});

  const uid = props.uid;

  useEffect(() => {
    const usersCollectionRef = collection(db, "users");
    // const user_doc = usersCollectionRef.doc(uid);
    // const user_data = user_doc.data();

    setUser(user_data);

    getDocs(usersCollectionRef).then((querySnapshot) => {
      setUser(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
  }, []);

  return (
    <>
      <div>{user.name}</div>
      <div>{user.birthplace}</div>
      {/* <ul>
        {user.genres.forEach((genre) => {
          <li>{genre}</li>;
        })}
      </ul> */}
      <div>{user.genre}</div>
    </>
  );
};
