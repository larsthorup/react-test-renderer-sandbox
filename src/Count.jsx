import { string } from "prop-types";
import { useEffect, useState } from "react";

export default function Count({ color }) {
  const [count, setCount] = useState(0);
  const onClick = () => {
    setCount((count) => count + 1);
  };
  useEffect(() => {
    setCount(0);
  }, [color]);
  return (
    <button onClick={onClick}>
      <span style={{ color }}>{`count is ${count}`}</span>
    </button>
  );
}
Count.propTypes = { color: string };
