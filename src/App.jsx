import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1>e-talk support</h1>
      <ul>
        <li>新潟の伝統的なお土産「笹団子」</li>
        <li>越後湯沢のスキー場</li>
        <li>日本三大花火の「長岡花火」</li>
      </ul>
    </div>
  );
}

export default App;
