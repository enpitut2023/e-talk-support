import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import { db } from "../../firebase";
import { doc, Firestore, getDoc, updateDoc } from "firebase/firestore";
import { list } from "@firebase/storage";
import { Profile } from "./Profile";
import { Form } from "./Form";
import { setMeetingCookie } from "../modules/cookie";
import { Grid, Card } from "@mui/material";

export const Meeting = (props) => {
  // const meetingId = props.meetingId; //propsの受け取り
  const { meetingId } = useParams();

  const [meeting, setMeeting] = useState({}); // 取得したmeetingデータの入れ物

  const [cookies, setCookie, removeCookie] = useCookies(["meetings"]);

  // ユーザーリストからユーザーを追加・削除する関数、子コンポーネントにて利用
  const addUserToList = (user) => {
    setMeeting({});
    const meetingDocRef = doc(db, "meetings", meetingId);
    getDoc(meetingDocRef).then((doc) => {
      setMeeting(doc.data());
    });
  };

  const rmUserFromList = (user) => {
    setMeeting({});
    const meetingDocRef = doc(db, "meetings", meetingId);
    getDoc(meetingDocRef).then((doc) => {
      setMeeting(doc.data());
    });
  };

  useEffect(() => {
    // meetingデータの取得
    const meetingDocRef = doc(db, "meetings", meetingId);
    getDoc(meetingDocRef).then((doc) => {
      setMeeting(doc.data());

      setMeetingCookie(cookies, setCookie, meetingId, doc.data().name);
    });
  }, []);

  return (
    <div>
      <div>{meeting.name}</div>
      <a href={meeting.url}>{meeting.url}</a>
      <hr></hr>
      <Form meetingId={meetingId} addUserToList={addUserToList} />
      <h5>
        一度登録したプロフィール情報は変更できません。
        <br />
        登録情報を修正したい場合は、 「ユーザを削除」をクリックし、
        入力フォームから再度情報を登録してください。
      </h5>
      <div>
        <ul className="CardList">
          {Array.isArray(meeting.users) && (
            <Grid container>
              {meeting.users.map((data, index) => {
                // 各値はuidでなくuserへのリファレンスであることに注意
                return (
                  <Grid item m={3} key={index}>
                    {/* 一意なkeyを渡さないとWarningでる。なぜかは知らん */}
                    <Profile
                      userRef={data}
                      meetingId={meetingId}
                      rmUserFromList={rmUserFromList}
                    />
                  </Grid>
                );
              })}
            </Grid>
          )}
        </ul>
      </div>
    </div>
  );
};
