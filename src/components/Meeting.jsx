import { useState, useEffect } from "react";
// import "./App.css";
import { db, storage } from "../../firebase";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { Profile } from "./Profile";
import { Form } from "./Form";

export const Meeting = (props) => {
  const [meeting, setMeeting] = useState({}); // 取得したmeetingデータの入れ物

  const [meetingId, setMeetingId] = useState(props.meetingId);

  useEffect(() => {
    // meetingデータの取得
    const meetingDocumentRef = doc(db, "meetings", meetingId);
    getDoc(meetingDocumentRef).then((snap) => {
      setMeeting(snap.data());
    });
  }, []);

  return (
    <div>
      <div>{meeting.name}</div>
      <div>{meeting.url}</div>
      <div>
        {Array.isArray(meeting.users) &&
          meeting.users.map((data, index) => {
            // 各値はuidでなくuserへのリファレンスであることに注意
            return (
              <div key={index}>
                {/* 一意なkeyを渡さないとWarningでる。なぜかは知らん */}
                <Profile userRef={data}></Profile>
              </div>
            );
          })}
      </div>
      <Form meetingId={meetingId}></Form>
    </div>
  );
};
