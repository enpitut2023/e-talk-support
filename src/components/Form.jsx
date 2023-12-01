import { useState, useEffect } from "react";
// import "./App.css";
import { db, storage } from "../../firebase";
import {
  collection,
  doc,
  addDoc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
// import { Profile } from "./Profile";
import { Meeting } from "./Meeting";

export const Form = (props) => {
  //   const [meeting, setMeeting] = useState({}); // 取得したmeetingデータの入れ物

  const [meetingId, setMeetingId] = useState(props.meetingId);

  //   useEffect(() => {
  //     // meetingデータの取得
  //     const meetingDocumentRef = doc(db, "meetings", meetingId);
  //     getDoc(meetingDocumentRef).then((snap) => {
  //       setMeeting(snap.data());
  //     });
  //   }, []);

  const meetingDocumentRef = doc(db, "meetings", meetingId);

  const userData = { name: "Minnie" };
  const collectionRef = collection(db, "users");
  const registerData = () => {
    addDoc(collectionRef, userData).then((userRef) => {
      updateDoc(meetingDocumentRef, {
        users: arrayUnion(userRef),
      });
    });
  };

  return (
    <div>
      <button onClick={registerData}>register</button>
    </div>
  );
};
