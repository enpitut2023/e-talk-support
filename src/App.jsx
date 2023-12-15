import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import { Meeting } from "./components/Meeting";
import { EnterMeeting } from "./components/EnterMeeting";
import { MakeMeeting } from "./components/MakeMeeting";

const App = () => {
  const navigate = useNavigate();

  const goTop = () => {
    navigate("/");
  };

  return (
    <div>
      <h1 onClick={goTop}>e-talk support</h1>
      <h5>
        e-talkサポートは、ミーティングの開始前に参加者のプロフィールを確認できるサービスです
      </h5>
      <Routes>
        <Route
          exact
          path="/"
          element={
            <div>
              <EnterMeeting />
              <br />
              <br />
              <br />
              <MakeMeeting />
            </div>
          }
        />
        <Route path="/:meetingId" element={<Meeting />} />
      </Routes>
    </div>
  );
};

export default App;
