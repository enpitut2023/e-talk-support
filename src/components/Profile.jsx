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
import {
  Card,
  CardContent,
  Box,
  CardMedia,
  CardHeader,
  Avatar,
  IconButton,
  Button,
} from "@mui/material";
import "./Profile.css";
import kininaru from "../assets/kininaru.png";

export const Profile = (props) => {
  const rmUserFromList = props.rmUserFromList; // 親コンポネントの更新の為の関数の受け取り
  const userRef = props.userRef;
  const meetingDocRef = doc(db, "meetings", props.meetingId);

  const [userData, setUserData] = useState();
  // const [userImage, setUserImage] = useState({});

  const deleteUser = () => {
    if (
      !window.confirm("自分以外のカードは削除してはいけません\n削除しますか?")
    ) {
      return;
    }
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

  const FavButton = (props) => {
    return (
      <Button
        variant="outlined"
        sx={{ padding: 0 }}
        color="warning"
        onClick={() => constFav(props.field)}
      >
        <img src={kininaru} className="kininaru-button"></img>
        {props.fav}
      </Button>
    );
  };

  return (
    <Card className="card">
      {userData !== undefined && (
        <Box p={2} width={300} padding={1}>
          <CardHeader title={userData.name.value} />
          <CardContent>
            {/* <img src={userImage} /> */}
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
                    <FavButton
                      fav={userData.birthPlace.fav}
                      field={"birthPlace"}
                    ></FavButton>
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
                    <FavButton
                      fav={userData.affliation.fav}
                      field={"affliation"}
                    ></FavButton>
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
                    <FavButton
                      fav={userData.hobby.fav}
                      field={"hobby"}
                    ></FavButton>
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
                    <FavButton
                      fav={userData.talk.fav}
                      field={"talk"}
                    ></FavButton>
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
                  <td className="table-content-center">{userData.sns.value}</td>
                  <td className="table-content-right">
                    <FavButton fav={userData.sns.fav} field={"sns"}></FavButton>
                  </td>
                </tr>
              </tbody>
            </table>
            <div>
              <br />
              <Button
                variant="contained"
                className="large-button"
                color="inherit"
                onClick={deleteUser}
              >
                ユーザーを削除
              </Button>
              <br />
            </div>
          </CardContent>
        </Box>
      )}
    </Card>
  );
};
