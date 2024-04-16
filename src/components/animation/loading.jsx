import { useEffect, useState } from "react";

const Loading = () => {
  const [dotVisible, seDotVisible] = useState("");

  useEffect(() => {
    const intervalId = setInterval(() => {
      seDotVisible((prevDots) => {
        if (dotVisible.length === 3) return ".";
        return prevDots + ".";
      });
    }, 500);
    return () => clearInterval(intervalId);
  });
  return (
    <>
      <div>
        <span>{dotVisible}</span>
      </div>
    </>
  );
};

export default Loading;
