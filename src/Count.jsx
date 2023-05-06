import { useState } from "react";

export default function Count() {
  const [count, setCount] = useState(0);
  const onClick = () => {
    setCount((count) => count + 1);
  };
  return <button onClick={onClick}>count is {count}</button>;
}
