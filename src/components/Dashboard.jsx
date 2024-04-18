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
  const [darkMode, setDarkMode] = useState(false);

  const weatherDataFetch = async () => {
    if (location == "") {
      console.log("PLease enter the location");
    } else {
      try {
        const date = new Date();
        const time = `${date.getFullYear()}-${
          date.getMonth() + 1
        }-${date.getDate()}T${date.getHours()}:${
          date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()
        }:${
          date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds()
        }`;

        const response = await fetch(
          `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/${time}?key=TMY8GD3BAHYAH4UZAU7WKYFEU`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch the data");
        }
        const data = await response.json();

        setWeatherData(data);
      } catch (error) {
        console.log(error);
      }
    }
  };
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

  useEffect(()=>{
    if(location !== "")
    {
      weatherDataFetch()
    }
  },[location])
  return (
    <>
      <main className={`w-screen h-screen ${!darkMode ? "bg-gradient-to-br from-gray-200 to-gray-400":"bg-gradient-to-b from-gray-800 to-gray-900"}`}>
        <div className="pt-3 h-screen mx-32">
          <nav className="flex justify-around items-center">
            <ThemeBtn setDarkMode={setDarkMode} darkMode={darkMode} />
            <Search setWeatherData={setWeatherData} setLocation={setLocation} location={location} darkMode={darkMode}/>
            <CurrentLocation setLocation={setLocation} darkMode={darkMode}/>
          </nav>
          <section className="m-10 mx-32 gap-10 flex flex-col justify-center items-center ">
            <div className="flex gap-8 justify-between  w-full">
              <Times location={location} weatherData={weatherData} darkMode={darkMode}/>
              <Temperature weatherData={weatherData} darkMode={darkMode}/>
            </div>
            <div className="flex gap-8 justify-between w-full">
              <Forecast location={location} darkMode={darkMode}/>
              <HourlyForecast weatherData={weatherData} darkMode={darkMode}/>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
