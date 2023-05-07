import { useEffect, useState } from "react";
import "./App.css";
import Count from "./Count.jsx";

function App() {
  const [color, setColor] = useState("black");
  const onColorChange = (e) => {
    setColor(e.target.value);
  };
  useEffect(() => {
    setTimeout(() => {
      setColor("green");
    }, 1000);
  }, []);
  return (
    <>
      <h1>React Test Renderer sandbox</h1>
      <div className="card">
        <label>
          Color:<input type="text" onChange={onColorChange}></input>
        </label>
        <Count color={color} />
      </div>
    </>
  );
}

export default App;
