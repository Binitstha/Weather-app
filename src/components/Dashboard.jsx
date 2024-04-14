import { Search } from "./search/search";
import { ThemeBtn } from "./themeBtn";
import { CurrentLocation } from "./location";
import { Times } from "./times";
import { useState } from "react";
import { Temperature } from "./temperature";
import { Forecast } from "./forecast";
import { HourlyForecast } from "./hourlyForecast";

export default function Dashboard() {
  const [location, setLocation] = useState("");
  const [weatherData, setWeatherData] = useState([]);
  return (
    <>
      <main>
        <nav className="flex felx justify-around items-center">
          <ThemeBtn />
          <Search setWeatherData={setWeatherData} />
          <CurrentLocation setLocation={setLocation} />
        </nav>
        <section className="m-10 mx-32 gap-10 flex flex-col justify-center items-center ">
          <div className="flex gap-8 justify-between  w-full">
            <Times location={location} />
            <Temperature weatherData={weatherData} />
          </div>
          <div className="flex gap-8 justify-between w-full">
            <Forecast />
            <HourlyForecast />
          </div>
        </section>
      </main>
    </>
  );
}
