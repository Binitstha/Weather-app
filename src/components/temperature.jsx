import { PropTypes } from "prop-types";
import { useEffect, useState } from "react";
import Loading from "./animation/loading";
import icons from "../icons/weatherIcon";

export const Temperature = ({ weatherData }) => {
  const [temperature, setTemperature] = useState("");
  const [feelsLiketemperature, setFeelsLikeTemperature] = useState("");
  const [sunrise, setSunrise] = useState("");
  const [sunset, setSunset] = useState("");
  const [conditions, setConditions] = useState("");
  const [conditionsIcon, setConditionsIcon] = useState("");
  const [humidity, setHumidity] = useState("");
  const [wind, setwind] = useState("");
  const [pressure, setPressure] = useState("");
  const [uv, setUv] = useState("");

  useEffect(() => {
    if (!(!weatherData || !weatherData.currentConditions)) {
      setTemperature(`${Math.floor(weatherData.currentConditions.temp)}°F`);
      setFeelsLikeTemperature(
        `${Math.floor(weatherData.currentConditions.feelslike)}°F`
      );
      setSunrise(weatherData.currentConditions.sunrise);
      setSunset(weatherData.currentConditions.sunset);
      setConditions(weatherData.currentConditions.conditions);
      setConditionsIcon(weatherData.currentConditions.icon);
      setHumidity(weatherData.currentConditions.humidity);
      setPressure(weatherData.currentConditions.pressure);
      setwind(weatherData.currentConditions.windspeed);
      setUv(weatherData.currentConditions.uvindex);
    }
  }, [weatherData]);

  const convertTimeFormat = (timeString) => {
    const time = new Date(`2000-01-01T${timeString}`);
    const formattedTime = time.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });

    return formattedTime;
  };

  console.log(conditionsIcon);

  const weatherIcon = icons
    .map((icon) => icon[conditionsIcon])
    .filter((icon) => icon)[0];
  console.log("icon", weatherIcon);
  return (
    <>
      <div className=" flex gap-5 justify-start items-center h-64 w-full rounded-xl bg-slate-600 p-3 ">
        {/* {weatherData && <div>{JSON.stringify(weatherData)}</div>} */}
        <section className="  h-full w-40">
          <div className="h-24 text-xl  flex flex-col justify-center items-center">
            {!temperature && !feelsLiketemperature ? (
              <Loading />
            ) : (
              <div className="transition-all">
                <div className="text-6xl">{temperature}</div>
                <div className="text-lg">
                  Feels like: {feelsLiketemperature}
                </div>
              </div>
            )}
          </div>
          <div className="h-36 flex flex-col justify-evenly gap-2 items-center p-1">
            <div className="flex gap-3 text-xl">
              <i className="flex items-center justify-center fa-light fa-sunrise text-4xl"></i>
              <div className="flex flex-col justify-center items-start">
                <span>Sunrise</span>
                <span className="text-base">{convertTimeFormat(sunrise)}</span>
              </div>
            </div>
            <div>
              <div className="flex gap-3 text-xl">
                <i className="flex justify-center items-center fa-light fa-sunset text-4xl"></i>
                <div className="flex flex-col justify-center items-start">
                  <span>Sunset</span>
                  <span className="text-base">{convertTimeFormat(sunset)}</span>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="flex flex-col h-full w-48 justify-evenly items-center gap-3">
          <div className="h-32 w-32 flex justify-center items-center">
            <i className={`${weatherIcon} text-9xl`}></i>
          </div>
          <div className="text-xl">{conditions}</div>
        </section>
        <section className="flex flex-wrap w-64 h-full justify-center items-center gap-2">
          <div className="h-28 flex-col flex justify-center items-center w-28">
            <i className="fa-duotone fa-water text-5xl"></i>
            <span className="mt-1">{humidity}%</span>
            <span>humidity</span>
          </div>
          <div className="h-28 flex flex-col justify-center items-center w-28">
            <i className="fa-duotone fa-wind text-5xl"></i>
            <span className="mt-1">{wind} km/h</span>
            <span>wind speed</span>
          </div>
          <div className="h-28 flex flex-col justify-center items-center w-28">
            <i className="fa-duotone fa-gauge text-5xl"></i>
            <span className="mt-1">{pressure} hpa</span>
            <span>Pressure</span>
          </div>
          <div className="h-28 flex flex-col justify-center items-center w-28">
            <i className="fa-sharp fa-regular text-5xl fa-keyboard-brightness fa-rotate-180"></i>
            <span className="mt-1">{uv} mW</span>
            <span>UV</span>
          </div>
        </section>
      </div>
    </>
  );
};

Temperature.propTypes = {
  weatherData: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
    .isRequired,
};
