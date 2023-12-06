import { useState, useEffect, useRef } from "react";
import { db, storage } from "../../firebase";
import {
  collection,
  getDocs,
  doc,
  getDoc,
  addDoc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { getDownloadURL, ref } from "firebase/storage";

export const Form = (props) => {
  // 親コンポネントのユーザーリストを更新のための関数を受け取り
  const addUser = props.addUserFunc;

  // 各入力フィールド用のrefを作成
  const nameRef = useRef(null);
  const birthPlaceRef = useRef(null);
  const affiliationRef = useRef(null);
  const hobbyRef = useRef(null);
  const talkRef = useRef(null);
  const snsRef = useRef(null);

  const userCollectionRef = collection(db, "users");
  const meetingDocumentRef = doc(db, "meetings", props.meetingId);

  const handleSubmit = (event) => {
    event.preventDefault(); // フォームのデフォルト送信を防ぐ

    // refを使用して各フィールドの値を取得
    const name = nameRef.current.value;
    const birthPlace = birthPlaceRef.current.value;
    const affliation = affiliationRef.current.value;
    const hobby = hobbyRef.current.value;
    const talk = talkRef.current.value;
    const sns = snsRef.current.value;

    const userData = {
      name: name,
      birthPlace: birthPlace,
      affliation: affliation,
      hobby: hobby,
      talk: talk,
      sns: sns,
    };

    addDoc(userCollectionRef, userData).then((userRef) => {
      updateDoc(meetingDocumentRef, {
        users: arrayUnion(userRef),
      });
      addUser(userRef);
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          名前：
          <input type="text" name="name" ref={nameRef} />
        </label>
        <br />
        <label>
          出身地：
          <input type="text" name="birthPlace" ref={birthPlaceRef} />
        </label>
        <br />
        <label>
          所属：
          <input type="text" name="affiliation" ref={affiliationRef} />
        </label>
        <br />
        <label>
          趣味：
          <input type="text" name="hobby" ref={hobbyRef} />
        </label>
        <br />
        <label>
          話したいこと：
          <input type="text" name="freeText" ref={talkRef} />
        </label>
        <br />
        <label>
          SNS：
          <input type="text" name="sns" ref={snsRef} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};
