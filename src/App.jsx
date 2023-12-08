import { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Meeting } from "./components/Meeting";

const App = () => {
  return (
    <div>
      <h1>e-talk support</h1>
      <BrowserRouter>
        <Routes>
          <Route exact path="/:meetingId" element={<Meeting />}></Route>
        </Routes>
      </BrowserRouter>
      {/* <Meeting meetingId="BLcYePnoqOCCluUFcwQZ"></Meeting>
      <Meeting meetingId="h33Kj2ntEkv7QnopygGY"></Meeting>
      <Meeting meetingId="CuqhDPfaaApE15piGpP2"></Meeting> */}
    </div>
  );
};

export default App;
