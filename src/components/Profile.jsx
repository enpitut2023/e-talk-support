import { useState, useEffect } from "react";
import { db, storage } from "../../firebase";
import {
  doc,
  getDoc,
  updateDoc,
  arrayRemove,
  deleteDoc,
} from "firebase/firestore";
import { getDownloadURL, ref } from "firebase/storage";

export const Profile = (props) => {
  const rmUserFromList = props.rmUserFromList; // 親コンポネントの更新の為の関数の受け取り
  const userRef = props.userRef;
  const meetingDocRef = doc(db, "meetings", props.meetingId);

  const [userData, setUserData] = useState({});
  // const [userImage, setUserImage] = useState({});

  const deleteUser = () => {
    updateDoc(meetingDocRef, {
      users: arrayRemove(userRef),
    });
    deleteDoc(userRef);
    rmUserFromList(userRef);
  };

  useEffect(() => {
    getDoc(userRef).then((doc) => {
      // なぜundefinedになるのかわからない。
      if (doc.data() == undefined) {
        return;
      }
      setUserData(doc.data());
      //imageの取得
      // const userImageRef = ref(storage, doc.data().image);
      // getDownloadURL(userImageRef).then((url) => {
      //   setUserImage(url);
      // });
    });
  }, []);

  return (
    <div>
      {/* <img src={userImage} /> */}
      <hr></hr>
      <div>名前：{userData.name}</div>
      <div>出身地：{userData.birthPlace}</div>
      <div>所属：{userData.affliation}</div>
      <div>趣味：{userData.hobby}</div>
      <div>話したいこと：{userData.talk}</div>
      <div>SNS：{userData.sns}</div>
      <button onClick={deleteUser}>delete</button>
      <hr></hr>
    </div>
  );
};
