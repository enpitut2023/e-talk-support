import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { db } from "../../firebase";
import { collection, addDoc } from "firebase/firestore";
import { setMeetingCookie } from "../modules/cookie";

export const MakeMeeting = (props) => {
  const meetingCollectionRef = collection(db, "meetings");

  const [meetingId, setMeetingId] = useState();

  const [cookies, setCookie, removeCookie] = useCookies([]);

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

    const confirmMsg = `会議名 : ${meetingData.name}\n会議url : ${meetingData.url}\n`;
    if (
      !window.confirm(confirmMsg + "この内容でメンバールームを作成しますか?")
    ) {
      return;
    }

    addDoc(meetingCollectionRef, meetingData).then((meetingRef) => {
      const id = meetingRef._key.path.segments[1];
      setMeetingId(id);
      setMeetingCookie(cookies, setCookie, id, name);
    });
  };

  const copyToClipboard = async (text) => {
    await navigator.clipboard.writeText(text);
  };

  return (
    <div>
      メンバールームの新規生成はこちら
      <form onSubmit={handleSubmit}>
        <label>
          会議名（必須）：
          <input
            type="text"
            name="name"
            ref={nameRef}
            placeholder="例：◯◯社　インターンシップ内定懇親会"
            required
          />
        </label>
        <br />
        <label>
          会議URL（任意）：
          <input
            type="text"
            name="url"
            ref={urlRef}
            placeholder="例：https://wwwwwww.zoom/abcdefgh"
          />
        </label>
        <br />
        <button type="submit">作成</button>
      </form>
      {meetingId && (
        <div>
          e-talk ID：{meetingId}
          <button onClick={() => copyToClipboard(meetingId)}>copy</button>
          <br />
          作成されたメンバールームの招待URL：
          <Link
            to={`/${meetingId}`}
          >{`${window.location.origin}/${meetingId}`}</Link>
          <button
            onClick={() =>
              copyToClipboard(`${window.location.origin}/${meetingId}`)
            }
          >
            copy
          </button>
        </div>
      )}
    </div>
  );
};
