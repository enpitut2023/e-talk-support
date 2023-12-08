import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Meeting } from "./components/Meeting";
import { EnterMeeting } from "./components/EnterMeeting";
import { MakeMeeting } from "./components/MakeMeeting";

const App = () => {
  return (
    <div>
      <h1>e-talk support</h1>
      <Routes>
        <Route
          exact
          path="/"
          element={
            <div>
              <EnterMeeting />
              <MakeMeeting />
            </div>
          }
        />
        <Route path="/:meetingId" element={<Meeting />} />
      </Routes>
      {/* <Meeting meetingId="BLcYePnoqOCCluUFcwQZ"></Meeting>
      <Meeting meetingId="h33Kj2ntEkv7QnopygGY"></Meeting>
      <Meeting meetingId="CuqhDPfaaApE15piGpP2"></Meeting> */}
    </div>
  );
};

export default App;
