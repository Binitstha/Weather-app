import { useEffect, useState } from "react";
import { PropTypes } from "prop-types";
import icons from "../icons/weatherIcon";
import { CelciusToFahrenheit } from "../script/tempConverter";

export const Forecast = ({ location,darkMode,activeC }) => {
  const [forcastData, setforecastData] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    setInput(location);
  }, [location]);

  const date = new Date();
  const time1 = `${date.getFullYear()}-${date.getMonth() + 1}-${
    date.getDate() + 1
  }T${date.getHours()}:${
    date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()
  }:${date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds()}`;

  const time = parseInt(time1.split("T")[0].split("-")[2]) + 4;
  const time2 = `${date.getFullYear()}-${
    date.getMonth() + 1
  }-${time}T${date.getHours()}:${
    date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()
  }:${date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds()}`;

  useEffect(() => {
    const fetchData = async () => {
      if (input !== "") {
        try {
          const response = await fetch(
            `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${input}/${time1}/${time2}/?key=TMY8GD3BAHYAH4UZAU7WKYFEU`
          );
          if (!response.ok) {
            throw new Error("data retriviel error");
          }
          const data = await response.json();
          setforecastData(data);
        } catch (err) {
          console.log(err);
        }
      }
    };
    fetchData();
  }, [input]);

  return (
    <>
      <div className={`${darkMode ? "bg-gradient-to-bl from-gray-700 to-gray-800 text-white shadow-slate-800 shadow-2xl":"bg-slate-300 shadow-lg shadow-slate-400 text-black"} h-64 w-[25rem] rounded-xl flex flex-col justify-start p-2 items-center shadow-2xl `}>
        <p>5 Days Forecast:</p>
        <section className="w-full  flex flex-col h-full justify-around">
          {
            forcastData && forcastData.days && 
            <>
            <ForcastRenderer data={forcastData.days} value={0} darkMode={darkMode} activeC={activeC}/>
            <ForcastRenderer data={forcastData.days} value={1} darkMode={darkMode} activeC={activeC}/>
            <ForcastRenderer data={forcastData.days} value={2} darkMode={darkMode} activeC={activeC}/>
            <ForcastRenderer data={forcastData.days} value={3} darkMode={darkMode} activeC={activeC}/>
            <ForcastRenderer data={forcastData.days} value={4} darkMode={darkMode} activeC={activeC}/>
            </>
          }
        </section>
      </div>
    </>
  );
};

const ForcastRenderer = ({data,value,activeC}) => {
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
    "SUN",
    "MON",
    "TUE",
    "WED",
    "THU",
    "FRI",
    "SAT",
  ];
  const date = new Date()
  return (
    <>
      {
        <div className=" h-8 flex justify-around items-center">
          <i className={` w-10 flex justify-center items-center ${icons.map((icon)=>icon[data[value].icon])} text-2xl`}></i>
          <span className=" w-14 flex justify-center items-center">{!activeC? `${Math.ceil(CelciusToFahrenheit(parseInt(data[value].temp)))}°C`: `${data[value].temp}°F`}</span>
          <span className=" w-28 flex justify-center items-center">{`${days[(date.getDay()+value)%7]},${date.getDate()+value} ${months[date.getMonth()+1]}`}</span>
        </div>
      }
    </>
  );
};

Forecast.propTypes = {
  location: PropTypes.string.isRequired,
  darkMode: PropTypes.bool.isRequired,
  activeC: PropTypes.bool.isRequired
};

ForcastRenderer.propTypes = {
  data: PropTypes.array.isRequired,
  value: PropTypes.number.isRequired,
  activeC: PropTypes.bool.isRequired
}