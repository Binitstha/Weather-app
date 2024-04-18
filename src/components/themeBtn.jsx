import { PropTypes } from "prop-types";
export const ThemeBtn = ({ setDarkMode, darkMode }) => {
  const handleClick = () => {
    setDarkMode(!darkMode);
  };
  return (
    <>
      <div className=" w-24 gap-2 flex flex-col mt-3 justify-center items-center">
        <div
          onClick={handleClick}
          className={`${
            darkMode ? "bg-slate-900" : "bg-white"
          } h-7 w-14 shadow-2xl rounded-2xl px-1 items-center flex cursor-pointer relative`}
        >
          <div
            className={`absolute h-5 w-5 rounded-full duration-500 transition-transform transform ${
              darkMode ? "translate-x-7 bg-white" : "translate-x-0 bg-slate-900"
            }`}
          ></div>
        </div>
        <p className={`${darkMode ? "" : "text-black"}`}>
          {darkMode ? "Dark mode" : "Light mode"}
        </p>
      </div>
    </>
  );
};

ThemeBtn.propTypes = {
  setDarkMode: PropTypes.func.isRequired,
  darkMode: PropTypes.bool,
};
