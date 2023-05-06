import { string } from "prop-types";
import { useState } from "react";

export default function Count({ color }) {
  const [count, setCount] = useState(0);
  const onClick = () => {
    setCount((count) => count + 1);
  };
  return (
    <button onClick={onClick}>
      <span style={{ color }}>count is {count}</span>
    </button>
  );
}
Count.propTypes = { color: string };
