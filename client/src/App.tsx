import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Drawing from "./Drawing";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Drawing />
    </>
  );
}

export default App;
