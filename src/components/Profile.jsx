import { useState, useEffect } from "react";
// import "./App.css";
import { db, storage } from "../../firebase";
import {
  collection,
  getDocs,
  doc,
  getDoc,
  updateDoc,
  arrayRemove,
  deleteDoc,
} from "firebase/firestore";
import { getDownloadURL, ref } from "firebase/storage";

export const Profile = (props) => {
  const [user, setUser] = useState({});
  const [userImage, setUserImage] = useState({});

  // const uid = props.uid; // uidで取ってくる場合はこっちを使う
  const [userRef, setUserRef] = useState(props.userRef);
  const meetingDocumentRef = doc(db, "meetings", props.meetingId);
  const deleteUser = () => {
    updateDoc(meetingDocumentRef, {
      users: arrayRemove(userRef),
    });
    deleteDoc(userRef);
  };

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
      <hr></hr>
      <div>名前：{user.name}</div>
      <div>出身地：{user.birthPlace}</div>
      <div>所属：{user.affliation}</div>
      <div>趣味：{user.hobby}</div>
      <div>話したいこと：{user.talk}</div>
      <div>SNS{user.sns}</div>
      <button onClick={deleteUser}>delete</button>
      <hr></hr>
    </div>
  );
};
