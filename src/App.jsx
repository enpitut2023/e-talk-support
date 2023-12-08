import { useState, useEffect } from "react";
import "./App.css";
import { Meeting } from "./components/Meeting";
import { MakeMeeting } from "./components/MakeMeeting";

const App = () => {
  return (
    <div>
      <h1>e-talk support</h1>
      <Meeting meetingId="BLcYePnoqOCCluUFcwQZ"></Meeting>
      <Meeting meetingId="h33Kj2ntEkv7QnopygGY"></Meeting>
      <Meeting meetingId="CuqhDPfaaApE15piGpP2"></Meeting>
      <MakeMeeting></MakeMeeting>
    </div>
  );
};

export default App;
