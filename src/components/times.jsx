import { PropTypes } from "prop-types";
import { useEffect, useState } from "react";
export const Times = ({ location, weatherData }) => {
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
      <div className="h-64 w-[30rem] rounded-xl flex flex-col justify-evenly items-center shadow-2xl bg-slate-600 p-3">
        <div className="text-3xl w-fit h-20">{location}</div>
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
  weatherData: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
    .isRequired,
};
