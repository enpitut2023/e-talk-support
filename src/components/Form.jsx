import { useState, useEffect, useRef } from "react";
import { db } from "../../firebase";
import {
  collection,
  doc,
  addDoc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";

import "../App.css";

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
          <span class="form-item">名前</span>：
          <span class="input-item">
            <input type="text" name="name" className="form-val" ref={nameRef} />
          </span>
        </label>
        <br />
        <label>
          <span class="form-item">出身地</span>：
          <span class="input-item">
            <input
              type="text"
              name="birthPlace"
              className="form-val"
              ref={birthPlaceRef}
            />
          </span>
        </label>
        <br />
        <label>
          <span class="form-item">所属</span>：
          <input
            type="text"
            name="affliation"
            className="form-val"
            ref={affliationRef}
          />
        </label>
        <br />
        <label>
          <span class="form-item">趣味</span>：
          <input type="text" name="hobby" className="form-val" ref={hobbyRef} />
        </label>
        <br />
        <label>
          <span class="form-item">話したいこと</span>：
          <input
            type="text"
            name="freeText"
            className="form-val"
            ref={talkRef}
          />
        </label>
        <br />
        <label>
          <span class="form-item">SNS</span>：
          <input type="text" name="sns" className="form-val" ref={snsRef} />
        </label>
        <br />
        <input type="submit" value="Submit" class="submit-button" />
      </form>
    </div>
  );
};
