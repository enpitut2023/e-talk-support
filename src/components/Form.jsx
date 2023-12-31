import { useState, useEffect, useRef } from "react";
import { db } from "../../firebase";
import {
  collection,
  doc,
  addDoc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";

export const Form = (props) => {
  // 親コンポネントのユーザーリストを更新のための関数を受け取り
  const addUserToList = props.addUserToList;
  const meetingDocRef = doc(db, "meetings", props.meetingId);
  const userCollectionRef = collection(db, "users");

  // 各入力フィールド用のrefを作成
  const nameRef = useRef(null);
  const birthPlaceRef = useRef(null);
  const affliationRef = useRef(null);
  const hobbyRef = useRef(null);
  const talkRef = useRef(null);
  const snsRef = useRef(null);

  const resetForm = () => {
    var collection = document.getElementsByClassName("form-val");
    for (let i = 0; i < collection.length; i++) {
      collection[i].value = "";
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // フォームのデフォルト送信を防ぐ

    // refを使用して各フィールドの値を取得
    const name = nameRef.current.value;
    const birthPlace = birthPlaceRef.current.value;
    const affliation = affliationRef.current.value;
    const hobby = hobbyRef.current.value;
    const talk = talkRef.current.value;
    const sns = snsRef.current.value;

    const userData = {
      name: {
        value: name,
        fav: 0,
      },
      birthPlace: {
        value: birthPlace,
        fav: 0,
      },
      affliation: {
        value: affliation,
        fav: 0,
      },
      hobby: {
        value: hobby,
        fav: 0,
      },
      talk: {
        value: talk,
        fav: 0,
      },
      sns: {
        value: sns,
        fav: 0,
      },
    };

    resetForm();

    addDoc(userCollectionRef, userData).then((userRef) => {
      updateDoc(meetingDocRef, {
        users: arrayUnion(userRef),
      });
      addUserToList(userRef);
    });
  };

  return (
    <div>
      あなたのユーザー情報を登録
      <form onSubmit={handleSubmit}>
        <label>
          名前：
          <input
            type="text"
            name="name"
            className="form-val"
            ref={nameRef}
            required
          />
        </label>
        <br />
        <label>
          出身地：
          <input
            type="text"
            name="birthPlace"
            className="form-val"
            ref={birthPlaceRef}
          />
        </label>
        <br />
        <label>
          所属：
          <input
            type="text"
            name="affliation"
            className="form-val"
            ref={affliationRef}
          />
        </label>
        <br />
        <label>
          趣味：
          <input type="text" name="hobby" className="form-val" ref={hobbyRef} />
        </label>
        <br />
        <label>
          話したいこと：
          <input
            type="text"
            name="freeText"
            className="form-val"
            ref={talkRef}
          />
        </label>
        <br />
        <label>
          SNS：
          <input type="text" name="sns" className="form-val" ref={snsRef} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};
