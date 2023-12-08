import { useRef } from "react";
import { useNavigate } from "react-router-dom";

export const Home = (props) => {
  const meetingRef = useRef("");
  const navigate = useNavigate();

  const joinMeeting = () => {
    navigate("/" + meetingRef.current.value);
  };

  return (
    <div>
      <label>
        Meeting ID
        <input type="text" name="name" ref={meetingRef} />
      </label>
      <br />
      <button onClick={joinMeeting}>ミーティングに参加する</button>
    </div>
  );
};
