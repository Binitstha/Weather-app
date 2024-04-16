import { PropTypes } from "prop-types";
import { useEffect, useState } from "react";
import Loading from "./animation/loading";
export const Temperature = ({ weatherData }) => {
  const [temperature, setTemperature] = useState("");
  const [feelsLiketemperature, setFeelsLikeTemperature] = useState("");

  useEffect(() => {
    if (
      !weatherData ||
      !weatherData.currentConditions ||
      !weatherData.currentConditions.temp
    ) {
      // setTemperature(<Loading />);
    } else {
      console.log(weatherData.currentConditions.temp);
      setTemperature(`${Math.floor(weatherData.currentConditions.temp)}°F`);
      setFeelsLikeTemperature(
        `${Math.floor(weatherData.currentConditions.feelslike)}°F`
      );
    }
  }, [weatherData]);

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
                <div>Feels like: {feelsLiketemperature}</div>
              </div>
            )}
          </div>
          <div>
            <div>Sun rise</div>
            <div>Sun set</div>
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
