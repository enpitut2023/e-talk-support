import { useState, useEffect, useRef } from "react";
import { db, storage } from "../../firebase";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { getDownloadURL, ref } from "firebase/storage";

export const Form = (props) => {
  // 各入力フィールド用のrefを作成
  const nameRef = useRef(null);
  const birthDateRef = useRef(null);
  const hobbyRef = useRef(null);
  const freeTextRef = useRef(null);

  const handleSubmit = (event) => {
    event.preventDefault(); // フォームのデフォルト送信を防ぐ

    // refを使用して各フィールドの値を取得
    const name = nameRef.current.value;
    const birthDate = birthDateRef.current.value;
    const hobby = hobbyRef.current.value;
    const freeText = freeTextRef.current.value;

    // コンソールに出力
    console.log("名前: ", name);
    console.log("生年月日: ", birthDate);
    console.log("趣味: ", hobby);
    console.log("自由記述: ", freeText);
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
          生年月日：
          <input type="date" name="birthDate" ref={birthDateRef} />
        </label>
        <br />
        <label>
          趣味：
          <input type="text" name="hobby" ref={hobbyRef} />
        </label>
        <br />
        <label>
          自由記述：
          <input type="text" name="freeText" ref={freeTextRef} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};
