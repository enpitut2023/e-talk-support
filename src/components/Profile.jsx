import { useState, useEffect } from "react";
import { db, storage } from "../../firebase";
import {
  doc,
  getDoc,
  updateDoc,
  arrayRemove,
  deleteDoc,
  increment,
} from "firebase/firestore";
import { getDownloadURL, ref } from "firebase/storage";

export const Profile = (props) => {
  const rmUserFromList = props.rmUserFromList; // 親コンポネントの更新の為の関数の受け取り
  const userRef = props.userRef;
  const meetingDocRef = doc(db, "meetings", props.meetingId);

  const [userData, setUserData] = useState();
  // const [userImage, setUserImage] = useState({});

  const deleteUser = () => {
    updateDoc(meetingDocRef, {
      users: arrayRemove(userRef),
    });
    deleteDoc(userRef);
    rmUserFromList(userRef);
  };

  //いいねを押したときの関数
  const favName = (field) => {
    //backend
    updateDoc(userRef, {
      "name.fav": increment(1),
    });
    //frontend
    setUserData((prevUserData) => {
      return {
        ...prevUserData,
        name: {
          value: prevUserData.name.value,
          fav: prevUserData.name.fav + 1,
        },
      };
    });
  };

  useEffect(() => {
    getDoc(userRef).then((doc) => {
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
      <hr></hr>
      {userData !== undefined && (
        <div>
          {/* <img src={userImage} /> */}
          <div>
            <div>名前：{userData.name.value}</div>
            <button onClick={favName}>いいね{userData.name.fav}</button>
          </div>
          <div>
            <div>出身地：{userData.birthPlace.value}</div>
            {/* <button>いいね{userData.birthPlace}</button> */}
          </div>
          <div>
            <div>所属：{userData.affliation.value}</div>
            {/* <button>いいね{userData.affliation}</button> */}
          </div>
          <div>
            <div>趣味：{userData.hobby.value}</div>
            {/* <button>いいね{userData.hobby}</button> */}
          </div>
          <div>
            <div>話したいこと：{userData.talk.value}</div>
            {/* <button>いいね{userData.talk}</button> */}
          </div>
          <div>
            <div>SNS：{userData.sns.value}</div>
            {/* <button>いいね{userData.sns}</button> */}
          </div>
          <button onClick={deleteUser}>delete</button>
        </div>
      )}
      <hr></hr>
    </div>
  );
};
