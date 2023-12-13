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

  const [userData, setUserData] = useState({});
  // const [userImage, setUserImage] = useState({});

  const deleteUser = () => {
    updateDoc(meetingDocRef, {
      users: arrayRemove(userRef),
    });
    deleteDoc(userRef);
    rmUserFromList(userRef);
  };

  const favName = (field) => {
    updateDoc(userRef, {
      name: {
        value: userData.name["value"],
        fav: userData.name["fav"] + 1,
      },
    });
    setUserData((prevUserData) => {
      return {
        ...prevUserData,
        name: {
          value: prevUserData.name["value"],
          fav: prevUserData.name["fav"] + 1,
        },
      };
    });
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
      {userData.name != null && (
        <div>
          <div>名前：{userData.name["value"]}</div>
          <button onClick={favName}>いいね{userData.name["fav"]}</button>
        </div>
      )}
      <div>
        <div>
          出身地：{userData.birthPlace != null && userData.birthPlace["value"]}
        </div>
        {/* <button>いいね{userData.birthPlace}</button> */}
      </div>
      <div>
        <div>
          所属：{userData.afflication != null && userData.affliation["value"]}
        </div>
        {/* <button>いいね{userData.affliation}</button> */}
      </div>
      <div>
        <div>趣味：{userData.hobby != null && userData.hobby["value"]}</div>
        {/* <button>いいね{userData.hobby}</button> */}
      </div>
      <div>
        <div>
          話したいこと：{userData.talk != null && userData.talk["value"]}
        </div>
        {/* <button>いいね{userData.talk}</button> */}
      </div>
      <div>
        <div>SNS：{userData.sns != null && userData.sns["value"]}</div>
        {/* <button>いいね{userData.sns}</button> */}
      </div>
      <button onClick={deleteUser}>delete</button>
      <hr></hr>
    </div>
  );
};
