import { useState, useEffect, useRef } from "react";
import { db } from "../../firebase";
import { collection, addDoc } from "firebase/firestore";
import { Link } from "react-router-dom";

export const MakeMeeting = (props) => {
  const meetingCollectionRef = collection(db, "meetings");

  const [meetingId, setMeetingId] = useState();

  // 各入力フィールド用のrefを作成
  const nameRef = useRef(null);
  const urlRef = useRef(null);

  const handleSubmit = (event) => {
    event.preventDefault(); // フォームのデフォルト送信を防ぐ

    // refを使用して各フィールドの値を取得
    const name = nameRef.current.value;
    const url = urlRef.current.value;

    const meetingData = {
      name: name,
      url: url,
      users: [],
    };

    addDoc(meetingCollectionRef, meetingData).then((meetingRef) => {
      setMeetingId(meetingRef._key.path.segments[1]);
    });
  };

  return (
    <div>
      新しいミーティングの作成
      <form onSubmit={handleSubmit}>
        <label>
          ミーティングの名前：
          <input type="text" name="name" ref={nameRef} />
        </label>
        <br />
        <label>
          ミーティングのURL：
          <input type="text" name="url" ref={urlRef} />
        </label>
        <br />
        <input type="submit" value="作成" />
      </form>
      {meetingId && (
        <div>
          新しいミーティングのID：{meetingId}
          <br />
          新しいミーティングのURL：
          <Link
            to={`/${meetingId}`}
          >{`${window.location.origin}/${meetingId}`}</Link>
        </div>
      )}
    </div>
  );
};
