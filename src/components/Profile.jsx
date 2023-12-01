import { useState, useEffect } from "react";
// import "./App.css";
import { db, storage } from "../../firebase";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { getDownloadURL, ref } from "firebase/storage";

export const Profile = (props) => {
  const [user, setUser] = useState({});
  const [userImage, setUserImage] = useState({});

  // const uid = props.uid; // uidで取ってくる場合はこっちを使う
  const [userRef, setUserRef] = useState(props.userRef);

  useEffect(() => {
    // const usersCollectionRef = collection(db, "users");
    // const user_doc = usersCollectionRef.doc(uid);
    // const user_data = user_doc.data();

    // const userDocumentRef = doc(db, "users", uid);
    getDoc(userRef).then((snap) => {
      // なぜundefinedになるのかわからない。
      if (snap.data() == undefined) {
        return;
      }
      setUser(snap.data());
      console.log(snap.data());
      const userImageRef = ref(storage, snap.data().image);
      getDownloadURL(userImageRef).then((url) => {
        setUserImage(url);
      });
    });

    // getDocs(usersCollectionRef).then((querySnapshot) => {
    //   setUser(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    // });
  }, []);

  return (
    <div>
      {/* <img src={userImage} /> */}
      <div>{user.name}</div>
      <div>{user.birthPlace}</div>
      <div>{user.affliation}</div>
      <div>{user.hobby}</div>
      <div>{user.talk}</div>
      <div>{user.sns}</div>
    </div>
  );
};
