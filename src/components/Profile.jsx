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
import { Card } from "@mui/material";

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
  const constFav = (field) => {
    //backend
    updateDoc(userRef, {
      [`${field}.fav`]: increment(1),
    });
    //frontend
    setUserData((prevUserData) => {
      const newUserData = JSON.parse(JSON.stringify(prevUserData)); //ディープコピー
      newUserData[field].fav += 1;
      return newUserData;
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
    <Card>
      {userData !== undefined && (
        <div>
          {/* <img src={userImage} /> */}
          <div>
            <div>{userData.name.value}</div>
          </div>
          <div>
            <div>出身地：{userData.birthPlace.value}</div>
            <button
              className="small-button"
              onClick={() => constFav("birthPlace")}
            >
              気になる {userData.birthPlace.fav}
            </button>
          </div>
          <div>
            <div>所属：{userData.affliation.value}</div>
            <button
              className="small-button"
              onClick={() => constFav("affliation")}
            >
              気になる {userData.affliation.fav}
            </button>
          </div>
          <div>
            <div>趣味：{userData.hobby.value}</div>
            <button className="small-button" onClick={() => constFav("hobby")}>
              気になる {userData.hobby.fav}
            </button>
          </div>
          <div>
            <div>話したいこと：{userData.talk.value}</div>
            <button className="small-button" onClick={() => constFav("talk")}>
              気になる {userData.talk.fav}
            </button>
          </div>
          <div>
            <div>SNS：{userData.sns.value}</div>
            <button className="small-button" onClick={() => constFav("sns")}>
              気になる {userData.sns.fav}
            </button>
          </div>
          <div>
            <br />
            <button className="large-button" onClick={deleteUser}>
              ユーザーを削除
            </button>
            <br />
          </div>
        </div>
      )}
    </Card>
  );
};
