import { useState, useEffect } from "react";
// import "./App.css";
import { db, storage } from "../../firebase";
import { collection, getDocs, doc, getDoc, addDoc } from "firebase/firestore";
// import { Profile } from "./Profile";
import { Meeting } from "./Meeting";

export const Form = (props) => {
  //   const [meeting, setMeeting] = useState({}); // 取得したmeetingデータの入れ物

  //   const [meetingId, setMeetingId] = useState(props.meetingId);

  //   useEffect(() => {
  //     // meetingデータの取得
  //     const meetingDocumentRef = doc(db, "meetings", meetingId);
  //     getDoc(meetingDocumentRef).then((snap) => {
  //       setMeeting(snap.data());
  //     });
  //   }, []);

  const userData = { name: "Minnie" };
  const collectionRef = collection(db, "users");
  const registerData = () => {
    addDoc(collectionRef, userData);
  };

  return (
    <div>
      <button onClick={registerData}></button>
    </div>
  );
};
