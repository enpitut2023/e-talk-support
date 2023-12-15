import { useRef } from "react";
import { useNavigate } from "react-router-dom";

export const EnterMeeting = (props) => {
  const meetingRef = useRef("");
  const navigate = useNavigate();

  const joinMeeting = () => {
    navigate("/" + meetingRef.current.value);
  };

  return (
    <div>
      <label>
        e-talk ID：
        <input
          type="text"
          name="name"
          ref={meetingRef}
          placeholder="例：abcde101010de234"
        />
      </label>
      <br />
      <button onClick={joinMeeting}>チェックイン</button>
    </div>
  );
};
