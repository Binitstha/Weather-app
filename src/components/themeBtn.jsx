import { PropTypes } from "prop-types";
export const ThemeBtn = ({ setDarkMode, darkMode }) => {
  const handleClick = () => {
    setDarkMode(!darkMode);
  };
  return (
    <>
      <div className="transition-all max-[640px]:w-14 w-24 gap-2 flex flex-col mt-3 justify-center items-center">
        <div
          onClick={handleClick}
          className={`${
            darkMode ? "bg-slate-900 shadow-gray-900" : "bg-slate-300 shadow-gray-400"
          } h-7 w-14 max-[640px]:w-10 max-[640px]:h-5 shadow-lg rounded-2xl px-1 items-center flex cursor-pointer relative`}
        >
          <div
            className={`absolute h-5 w-5 max-[640px]:w-3 max-[640px]:h-3 rounded-full duration-500 transition-transform transform ${
              darkMode ? "translate-x-7 bg-white" : "translate-x-0 bg-slate-900"
            }`}
          ></div>
        </div>
        <p className={`${darkMode ? "" : "text-black"} max-[640px]:text-sm`}>
          {darkMode ? "Dark" : "Light"}
        </p>
      </div>
    </>
  );
};

ThemeBtn.propTypes = {
  setDarkMode: PropTypes.func.isRequired,
  darkMode: PropTypes.bool,
};
