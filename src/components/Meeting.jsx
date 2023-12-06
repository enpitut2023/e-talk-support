import { useState, useEffect } from "react";
import { db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import { Profile } from "./Profile";
import { Form } from "./Form";

export const Meeting = (props) => {
  const meetingId = props.meetingId; //propsの受け取り

  const [meeting, setMeeting] = useState({}); // 取得したmeetingデータの入れ物

  // ユーザーリストからユーザーを追加・削除する関数、子コンポーネントにて利用
  const addUserToList = (newUser) => {
    setMeeting((prevMeeting) => {
      const updatedMeeting = {
        ...prevMeeting,
        users: [...prevMeeting.users, newUser],
      };
      return updatedMeeting;
    });
  };
  const rmUserFromList = (user) => {
    setMeeting((prevMeeting) => ({
      ...prevMeeting,
      users: prevMeeting.users.filter((elem) => elem !== user),
    }));
  };

  useEffect(() => {
    // meetingデータの取得
    const meetingDocRef = doc(db, "meetings", meetingId);
    getDoc(meetingDocRef).then((doc) => {
      setMeeting(doc.data());
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
                <Profile
                  userRef={data}
                  meetingId={meetingId}
                  rmUserFromList={rmUserFromList}
                ></Profile>
              </div>
            );
          })}
      </div>
      <Form meetingId={meetingId} addUserToList={addUserToList}></Form>
    </div>
  );
};
