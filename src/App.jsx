import { Route, Routes, useNavigate, Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import "./App.css";
import { Meeting } from "./components/Meeting";
import { EnterMeeting } from "./components/EnterMeeting";
import { MakeMeeting } from "./components/MakeMeeting";
import Favicon from "react-favicon";

const App = () => {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(["meetings"]);

  const goTop = () => {
    navigate("/");
  };

  return (
    <div>
      <Favicon url="public/e-talklogo.png"></Favicon>
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
              <div>
                参加しているユーザールーム
                {cookies.meetings &&
                  cookies.meetings.map((meeting) => {
                    return (
                      <div key={meeting.id}>
                        <div>{meeting.name}</div>
                        <Link to={`/${meeting.id}`}>
                          {`${window.location.origin}/${meeting.id}`}
                        </Link>
                      </div>
                    );
                  })}
                <br />
              </div>
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
