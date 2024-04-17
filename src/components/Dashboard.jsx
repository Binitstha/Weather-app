import { Search } from "./search/search";
import { ThemeBtn } from "./themeBtn";
import { CurrentLocation } from "./location";
import { Times } from "./times";
import { useEffect, useState } from "react";
import { Temperature } from "./temperature";
import { Forecast } from "./forecast";
import { HourlyForecast } from "./hourlyForecast";

export default function Dashboard() {
  const [location, setLocation] = useState("");
  const [weatherData, setWeatherData] = useState([]);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        let latitude = position.coords.latitude;
        let longitude = position.coords.longitude;

        const geoURL = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`;
        fetch(geoURL)
          .then((response) => response.json())
          .then((data) => {
            const city = data.city;
            const country = data.countryName;
            setLocation(`${city},${country}`);
          })
          .catch((error) => {
            console.log(error);
          });
      });
    }
  }, []);

  return (
    <>
      <main>
        <nav className="flex justify-around items-center">
          <ThemeBtn />
          <Search setWeatherData={setWeatherData} location={location} />
          <CurrentLocation setLocation={setLocation} />
        </nav>
        <section className="m-10 mx-32 gap-10 flex flex-col justify-center items-center ">
          <div className="flex gap-8 justify-between  w-full">
            <Times location={location} weatherData={weatherData} />
            <Temperature weatherData={weatherData} />
          </div>
          <div className="flex gap-8 justify-between w-full">
            <Forecast location={location} />
            <HourlyForecast weatherData={weatherData} />
          </div>
        </section>
      </main>
    </>
  );
}
