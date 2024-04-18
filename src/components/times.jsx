import { PropTypes } from "prop-types";
import { useEffect, useState } from "react";
export const Times = ({ weatherData, darkMode }) => {
  const date = new Date();

  const months = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ];
  const days = [
    "SUNDAY",
    "MONDAY",
    "TUESDAY",
    "WEDNESDAY",
    "THURSDAY",
    "FRIDAY",
    "SATURDAY",
  ];

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const hour =
    currentTime.getHours() > 12
      ? currentTime.getHours() % 12
      : currentTime.getHours();
  const minute = currentTime.getMinutes();
  const second = currentTime.getSeconds();

  const [data, setData] = useState([]);
  useEffect(() => {
    const data = weatherData;
    setData(data);
  }, [weatherData]);

  return (
    <>
      <div className={`${darkMode ? "bg-gradient-to-bl from-gray-700 to-gray-800 text-white shadow-slate-800 shadow-2xl":"bg-slate-300 shadow-lg shadow-slate-400 text-black"} h-64 w-[30rem] rounded-xl flex flex-col justify-evenly items-center p-3`}>
        <div className="text-2xl  w-fit h-20 flex justify-center items-center text-center">{weatherData.resolvedAddress}</div>
        <div className="flex justify-center items-center flex-col">
          <div className="text-3xl">
            {hour < 10 ? `0${hour}` : hour}:
            {minute < 10 ? `0${minute}` : minute}:
            {second < 10 ? `0${second}` : second}{" "}
            {date.getHours() >= 12 ? "PM" : "AM"}
          </div>
          <div>
            {days[date.getDay() + 1]},{date.getDate()}{" "}
            {months[date.getMonth() + 1]}
          </div>
        </div>
        <p>Timezone : {data.timezone}</p>
      </div>
    </>
  );
};
Times.propTypes = {
  location: PropTypes.string.isRequired,
  darkMode: PropTypes.bool.isRequired,
  weatherData: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
    .isRequired,
};
