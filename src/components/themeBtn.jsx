import { useState } from "react";

export const ThemeBtn = () => {
  const [darkMode, setDarkMode] = useState(false);
  const handleClick = () => {
    setDarkMode(!darkMode);
  };
  return (
    <>
      <div className=" w-24 gap-2 flex flex-col mt-3 justify-center items-center">
        <div
          onClick={handleClick}
          className={`${
            darkMode ? "bg-black" : "bg-white"
          } h-7 w-14 rounded-2xl px-1 items-center flex cursor-pointer relative`}
        >
          <div
            className={`absolute h-5 w-5 rounded-full duration-500 transition-transform transform ${
              darkMode ? "translate-x-7 bg-white" : "translate-x-0 bg-black"
            }`}
          ></div>
        </div>
        <p>{darkMode ? "Dark mode" : "Light mode"}</p>
      </div>
    </>
  );
};
