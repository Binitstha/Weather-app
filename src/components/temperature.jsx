import { PropTypes } from "prop-types";
import { useEffect, useState } from "react";
import Loading from "./animation/loading";
export const Temperature = ({ weatherData }) => {
  const [temperature, setTemperature] = useState("");
  const [feelsLiketemperature, setFeelsLikeTemperature] = useState("");
  const [sunrise, setSunrise] = useState("");
  const [sunset, setSunset] = useState("");
  useEffect(() => {
    if (!(!weatherData || !weatherData.currentConditions)) {
      setTemperature(`${Math.floor(weatherData.currentConditions.temp)}°F`);
      setFeelsLikeTemperature(
        `${Math.floor(weatherData.currentConditions.feelslike)}°F`
      );
      setSunrise(weatherData.currentConditions.sunrise);
      setSunset(weatherData.currentConditions.sunset);
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
              <i className="flex items-center justify-center fa-light fa-sunrise fa-fade text-4xl"></i>
              <div className="flex flex-col justify-center items-start">
                <span>Sunrise</span>
                <span className="text-base">{convertTimeFormat(sunrise)}</span>
              </div>
            </div>
            <div>
              <div className="flex gap-3 text-xl">
                <i className="flex justify-center items-center fa-light fa-sunset fa-fade text-4xl"></i>
                <div className="flex flex-col justify-center items-start">
                  <span>Sunset</span>
                  <span className="text-base">
                    {convertTimeFormat(sunset)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="flex flex-col">
          <div>Img</div>
          <div>day status</div>
        </section>
        <section className="flex flex-wrap">
          <div>humidity</div>
          <div>wind speed</div>
          <div>Pressure</div>
          <div>UV</div>
        </section>
      </div>
    </>
  );
};

Temperature.propTypes = {
  weatherData: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
    .isRequired,
};
