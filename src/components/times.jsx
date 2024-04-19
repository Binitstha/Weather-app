import { PropTypes } from "prop-types";
import moment from "moment-timezone";
import { useEffect, useState } from "react";
import "../index.css";

export const Times = ({ weatherData, darkMode }) => {
  const date = new Date();
  const [loading, setloading] = useState(true);

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

  const [time, setTime] = useState("");

  const [data, setData] = useState([]);
  useEffect(() => {
    const data = weatherData;
    setData(data);
    if (data && data.timezone) {
      setloading(false);
      setTime(moment().tz(data.timezone).format("HH:mm"));
    }
  }, [weatherData]);

  const convertTimeFormat = (timeString) => {
    const time = new Date(`2000-01-01T${timeString}`);
    const formattedTime = time.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    return formattedTime;
  };
  return (
    <>
      <div
        className={`${
          darkMode
            ? "bg-gradient-to-bl from-gray-700 to-gray-800 text-white shadow-slate-800 shadow-2xl"
            : "bg-slate-300 shadow-lg shadow-slate-400 text-black"
        } h-64 w-[30rem] rounded-xl flex flex-col justify-evenly items-center p-3`}
      >
        <div
          className={`${
            loading
              ? "rounded-md animated-background bg-gradient-to-r from-slate-300 via-gray-200 to-slate-300"
              : ""
          } text-2xl  w-fit h-20 flex justify-center items-center text-center`}
        >
          {loading ? "" : weatherData.resolvedAddress}
        </div>
        <div
          className={`${
            loading
              ? "rounded-md animated-background bg-gradient-to-r from-slate-300 via-gray-200 to-slate-300"
              : ""
          } flex justify-center items-center flex-col`}
        >
          {loading ? (
            ""
          ) : (
            <div className="text-3xl">{convertTimeFormat(time)}</div>
          )}
          <div>
            {loading ? (
              ""
            ) : (
              <>
                {days[date.getDay() + 1]},{date.getDate()}{" "}
                {months[date.getMonth() + 1]}
              </>
            )}
          </div>
        </div>
        <p
          className={`${
            loading
              ? "rounded-md animated-background bg-gradient-to-r from-slate-300 via-gray-200 to-slate-300"
              : ""
          }`}
        >
          {loading ? "" : <>Timezone : {data.timezone}</>}
        </p>
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
