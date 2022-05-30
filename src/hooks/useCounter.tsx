import { useState } from "react";

export const useCounter = () => {
  const [cnt, setCnt] = useState(0);
  const decrement = () => setCnt(cnt - 1);
  const increment = () => setCnt(cnt + 1);

  return {
    cnt,
    decrement,
    increment,
  };
};
