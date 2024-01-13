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
import { Card, CardContent, Box } from "@mui/material";
import "./Profile.css";
import kininaru from "../assets/kininaru.png";

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
      <Box p={2} width={230} padding={1}>
        <CardContent>
          {userData !== undefined && (
            <div>
              {/* <img src={userImage} /> */}
              <div>
                <div>{userData.name.value}</div>
              </div>
              <table>
                <tbody>
                  <tr>
                    <td className="table-content-left">
                      <div className="item-title">
                        <b>出身</b>
                      </div>
                    </td>
                    <td className="table-content-center">
                      {userData.birthPlace.value}
                    </td>
                    <td className="table-content-right">
                      <button
                        className="small-button"
                        onClick={() => constFav("birthPlace")}
                      >
                        <img src={kininaru} className="kininaru-button"></img>
                        {userData.birthPlace.fav}
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
              <table>
                <tbody>
                  <tr>
                    <td className="table-content-left">
                      <div className="item-title">
                        <b>所属</b>
                      </div>
                    </td>
                    <td className="table-content-center">
                      {userData.affliation.value}
                    </td>
                    <td className="table-content-right">
                      <button
                        className="small-button"
                        onClick={() => constFav("affliation")}
                      >
                        <img src={kininaru} className="kininaru-button"></img>
                        {userData.affliation.fav}
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
              <table>
                <tbody>
                  <tr>
                    <td className="table-content-left">
                      <div className="item-title">
                        <b>趣味</b>
                      </div>
                    </td>
                    <td className="table-content-center">
                      {userData.hobby.value}
                    </td>
                    <td className="table-content-right">
                      <button
                        className="small-button"
                        onClick={() => constFav("hobby")}
                      >
                        <img src={kininaru} className="kininaru-button"></img>
                        {userData.hobby.fav}
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>

              <table>
                <tbody>
                  <tr>
                    <td className="table-content-left">
                      <div className="item-title">
                        <b>話題</b>
                      </div>
                    </td>
                    <td className="table-content-center">
                      {userData.talk.value}
                    </td>
                    <td className="table-content-right">
                      <button
                        className="small-button"
                        onClick={() => constFav("talk")}
                      >
                        <img src={kininaru} className="kininaru-button"></img>
                        {userData.talk.fav}
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
              <table>
                <tbody>
                  <tr>
                    <td className="table-content-left">
                      <div className="item-title">
                        <b>SNS</b>
                      </div>
                    </td>
                    <td className="table-content-center">
                      {userData.sns.value}
                    </td>
                    <td className="table-content-right">
                      <button
                        className="small-button"
                        onClick={() => constFav("sns")}
                      >
                        <img src={kininaru} className="kininaru-button"></img>
                        {userData.sns.fav}
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div>
                <br />
                <button className="large-button" onClick={deleteUser}>
                  ユーザーを削除
                </button>
                <br />
              </div>
            </div>
          )}
        </CardContent>
      </Box>
    </Card>
  );
};
