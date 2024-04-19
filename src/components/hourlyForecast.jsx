import { PropTypes } from "prop-types";
import { useEffect, useState } from "react";
import icons from "../icons/weatherIcon";
import { CelciusToFahrenheit } from "../script/tempConverter";

export const HourlyForecast = ({ weatherData,darkMode,activeC }) => {
  const [hourData, sethourData] = useState([]);
  const [currentTime, setCurrentTime] = useState("");
  const [first, setFirst] = useState([]);
  const [second, setSecond] = useState([]);
  const [third, setThird] = useState([]);
  const [fourth, setFourth] = useState([]);
  const [fifth, setFifth] = useState([]);

  const date = new Date();
  useEffect(() => {
    if (
      weatherData &&
      weatherData.days &&
      weatherData.currentConditions.datetime
    ) {
      setCurrentTime(date.getHours());
      const parsedTime = parseInt(date.getHours());

      const filteredData = weatherData.days[0].hours.filter((hour) => {
        let hourOfDay = parseInt(hour.datetime.split(":")[0]);
        const nextHour = (parsedTime + 1) % 24; // Calculate the next hour within 24-hour format
        return hourOfDay >= nextHour && hourOfDay <= nextHour + 4; // Filter the next 5 hours
      });

      sethourData(filteredData);
    }
  }, [weatherData]);

  useEffect(() => {
    const filterer = (value) => {
      return hourData.filter(
        (hour) =>
          parseInt(hour.datetime.split(":")[0]) ===
          (parseInt(date.getHours()) + value) % 24
      );
    };
    setFirst(filterer(1));
    setSecond(filterer(2));
    setThird(filterer(3));
    setFourth(filterer(4));
    setFifth(filterer(5));
  }, [currentTime, hourData]);

  return (
    <>
      <div className={`${darkMode ? "bg-gradient-to-bl shadow-slate-800 shadow-2xl from-gray-700 to-gray-800 text-white":"bg-slate-300 shadow-lg shadow-slate-400 text-black"} p-3 w-full rounded-xl h-64 shadow-2xl`}>
        <div className="h-full flex flex-col mx-7 justify-start items-center">
          <h3>Hourly forecast : </h3>
          <section className=" flex w-full gap-5 p-2 justify-evenly h-full items-center">
            <ForcastRenderer forcastData={first} darkMode={darkMode} activeC={activeC}/>
            <ForcastRenderer forcastData={second} darkMode={darkMode} activeC={activeC}/>
            <ForcastRenderer forcastData={third} darkMode={darkMode} activeC={activeC}/>
            <ForcastRenderer forcastData={fourth} darkMode={darkMode} activeC={activeC}/>
            <ForcastRenderer forcastData={fifth} darkMode={darkMode} activeC={activeC}/>
          </section>
        </div>
      </div>
    </>
  );
};

const ForcastRenderer = ({ forcastData,darkMode,activeC }) => {
  const [weatherIcon, setWeatherIcon] = useState("");
  const [winddir, setWindDir] = useState("");
  useEffect(() => {
    if (forcastData && forcastData[0]) {
      setWeatherIcon(icons[0][forcastData[0].icon]);
      setWindDir(forcastData[0].winddir - 45);
    }
  }, [forcastData, weatherIcon, winddir]);

  if (!forcastData) return null;

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
      <div className={`${darkMode ? "bg-gradient-to-bl from-gray-700 to-gray-800 text-white shadow-slate-800 shadow-2xl":"bg-slate-300 shadow-lg shadow-slate-400 text-black"} shadow-lg  flex flex-col justify-center items-center rounded-2xl h-full w-full`}>
        {forcastData[0] && (
          <>
            <span>{convertTimeFormat(forcastData[0].datetime)}</span>
            <span className="my-1">
              <i className={`${weatherIcon} text-3xl`}></i>
            </span>
            <span>{!activeC? `${Math.ceil(CelciusToFahrenheit(parseInt(forcastData[0].temp)))} °C`: `${forcastData[0].temp} °F`}</span>
            <span className="flex justify-center items-center">
              <img
                src="public\image.png"
                alt=""
                width="40px"
                className={`my-2 rotate-[${Math.floor(
                  winddir
                )}deg] mix-blend-lighten invert`}
              />
            </span>
            <span>{forcastData[0].windspeed} km/h</span>
          </>
        )}
      </div>
    </>
  );
};
HourlyForecast.propTypes = {
  weatherData: PropTypes.oneOfType([
    PropTypes.array.isRequired,
    PropTypes.object.isRequired,
  ]),
  darkMode: PropTypes.bool.isRequired,
  activeC: PropTypes.bool.isRequired
};

ForcastRenderer.propTypes = {
  forcastData: PropTypes.oneOfType([
    PropTypes.array.isRequired,
    PropTypes.object.isRequired,
  ]),
  darkMode: PropTypes.bool.isRequired,
  activeC: PropTypes.bool.isRequired
};
