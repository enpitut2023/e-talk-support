import { Route, Routes, useNavigate, Link } from "react-router-dom";
import "./App.css";
import { Meeting } from "./components/Meeting";
import { EnterMeeting } from "./components/EnterMeeting";
import { MakeMeeting } from "./components/MakeMeeting";
import { MeetingList } from "./components/MeetingList";
import Favicon from "react-favicon";
import logo from "../public/e-talklogo.png";
import { AppBar, Typography, Box } from "@mui/material";
import { Stack } from "@mui/system";

const App = () => {
  const navigate = useNavigate();

  const goTop = () => {
    navigate("/");
  };

  return (
    <div>
      <Favicon url={logo}></Favicon>
      <div>
        <AppBar position="fixed" color="inherit">
          <Box sx={{ margin: 1 }} onClick={goTop}>
            <Stack direction="row">
              <img src={logo} height="40px" />
              <Typography
                variant="h4"
                component="div"
                sx={{
                  flexGrow: 1,
                  textAlign: "left",
                  fontFamily: "Arial",
                  fontWeight: "bold",
                }}
              >
                e-talk support
              </Typography>
            </Stack>
          </Box>
        </AppBar>
        <h4 style={{ marginTop: 80 }}>
          e-talkサポートは、ミーティングの開始前に参加者のプロフィールを確認できるサービスです
        </h4>
        <hr />
      </div>
      <Routes>
        <Route
          exact
          path="/"
          element={
            <div>
              <MeetingList />
              <br />
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
