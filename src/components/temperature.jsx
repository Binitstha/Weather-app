import { PropTypes } from "prop-types";
import { useEffect, useState } from "react";
import icons from "../icons/weatherIcon";
import { CelciusToFahrenheit } from "../script/tempConverter";
import "../index.css";

export const Temperature = ({
  weatherData,
  darkMode,
  activeC,
  activeT,
  setActiveC,
  setActiveT,
}) => {
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!(!weatherData || !weatherData.currentConditions)) {
      setLoading(false);
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

  const weatherIcon = icons
    .map((icon) => icon[conditionsIcon])
    .filter((icon) => icon)[0];

  return (
    <>
      <div
        className={`${
          darkMode
            ? "bg-gradient-to-bl from-gray-700 to-gray-800 text-white shadow-slate-800 shadow-2xl"
            : "bg-slate-300 shadow-lg shadow-slate-400 text-black"
        } flex gap-2 justify-around items-center h-64 w-full rounded-xl p-3 `}
      >
        <section className=" h-full w-40 flex flex-col gap-2">
          <div
            className={`${
              loading
                ? "rounded-md animated-background bg-gradient-to-r from-slate-300 via-gray-200 to-slate-300"
                : ""
            } h-24 text-xl  flex flex-col justify-center items-center `}
          >
            {loading ? (
              ""
            ) : (
              <>
                <div>
                  <div className="text-6xl">
                    {activeT
                      ? `${Math.ceil(
                          CelciusToFahrenheit(parseInt(temperature))
                        )}°C`
                      : temperature}
                  </div>
                  <div className="text-lg">
                    Feels like:{" "}
                    {activeT
                      ? `${Math.ceil(
                          CelciusToFahrenheit(parseInt(feelsLiketemperature))
                        )}°C`
                      : temperature}
                  </div>
                </div>
              </>
            )}
          </div>
          <div
            className={`${
              loading
                ? "rounded-md animated-background bg-gradient-to-r from-slate-300 via-gray-200 to-slate-300"
                : ""
            } h-36 flex flex-col justify-evenly gap-2 items-center p-1 `}
          >
            {loading ? (
              ""
            ) : (
              <>
                <div className="flex gap-3 text-xl">
                  <i className="flex items-center justify-center fa-light fa-sunrise text-4xl"></i>
                  <div className="flex flex-col justify-center items-start">
                    <span>Sunrise</span>
                    <span className="text-base">
                      {convertTimeFormat(sunrise)}
                    </span>
                  </div>
                </div>
                <div>
                  <div className="flex gap-3 text-xl">
                    <i className="flex justify-center items-center fa-light fa-sunset text-4xl"></i>
                    <div className="flex flex-col justify-center items-start">
                      <span>Sunset</span>
                      <span className="text-base">
                        {convertTimeFormat(sunset)}
                      </span>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </section>
        <section className="h-full pt-2 w-10 flex flex-col justify-start">
          <div
            onClick={() => {
              setActiveT(!activeT);
              setActiveC(!activeC);
            }}
            className={`${
              activeC ? "text-3xl" : "text-md"
            } mx-auto cursor-pointer`}
          >
            &deg;F
          </div>
          <hr
            className={`${
              darkMode ? "border-white" : " border-black"
            } w-6 mx-auto`}
          />
          <div
            onClick={() => {
              setActiveC(!activeC);
              setActiveT(!activeT);
            }}
            className={`${
              activeT ? "text-3xl" : "text-md"
            } mx-auto cursor-pointer`}
          >
            &deg;C
          </div>
        </section>
        <section className="flex flex-col h-full w-48 justify-evenly items-center gap-3">
          <div
            className={`${
              loading
                ? "rounded-md animated-background bg-gradient-to-r from-slate-300 via-gray-200 to-slate-300"
                : ""
            } h-32 w-32 flex justify-center items-center `}
          >
            {loading ? "" : <i className={`${weatherIcon} text-9xl`}></i>}
          </div>
          <div
            className={`${
              loading
                ? "rounded-md animated-background bg-gradient-to-r from-slate-300 via-gray-200 to-slate-300"
                : ""
            } text-xl `}
          >
            {loading ? "" : conditions}
          </div>
        </section>
        <section className="flex flex-wrap w-52 h-full justify-center items-center gap-2">
          <div
            className={`${
              loading
                ? "rounded-md animated-background bg-gradient-to-r from-slate-300 via-gray-200 to-slate-300"
                : ""
            } h-28 flex-col flex justify-center items-center w-24 `}
          >
            {loading ? (
              ""
            ) : (
              <>
                <i className="fa-duotone fa-water text-5xl"></i>
                <span className="mt-1">{humidity}%</span>
                <span>humidity</span>
              </>
            )}
          </div>
          <div
            className={`${
              loading
                ? "rounded-md animated-background bg-gradient-to-r from-slate-300 via-gray-200 to-slate-300"
                : ""
            } h-28 flex flex-col justify-center items-center w-24 `}
          >
            {loading ? (
              ""
            ) : (
              <>
                <i className="fa-duotone fa-wind text-5xl"></i>
                <span className="mt-1">{wind} km/h</span>
                <span>wind speed</span>
              </>
            )}
          </div>
          <div
            className={`${
              loading
                ? "rounded-md animated-background bg-gradient-to-r from-slate-300 via-gray-200 to-slate-300"
                : ""
            } h-28 flex flex-col justify-center items-center w-24 `}
          >
            {loading ? (
              ""
            ) : (
              <>
                <i className="fa-duotone fa-gauge text-5xl"></i>
                <span className="mt-1">{pressure} hpa</span>
                <span>Pressure</span>
              </>
            )}
          </div>
          <div
            className={`${
              loading
                ? "rounded-md animated-background bg-gradient-to-r from-slate-300 via-gray-200 to-slate-300"
                : ""
            } h-28 flex flex-col justify-center items-center w-24 `}
          >
            {loading ? (
              ""
            ) : (
              <>
                <i className="fa-sharp fa-regular text-5xl fa-keyboard-brightness fa-rotate-180"></i>
                <span className="mt-1">{uv} mW</span>
                <span>UV</span>
              </>
            )}
          </div>
        </section>
      </div>
    </>
  );
};

Temperature.propTypes = {
  weatherData: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
    .isRequired,
  darkMode: PropTypes.bool.isRequired,
  activeC: PropTypes.bool.isRequired,
  activeT: PropTypes.bool.isRequired,
  setActiveC: PropTypes.func.isRequired,
  setActiveT: PropTypes.func.isRequired,
};
