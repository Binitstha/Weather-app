import { useState } from "react";
import { countryCityNames } from "../../JSON/country.js";

const Search = () => {
  const [input, setinput] = useState("");
  const [error, setError] = useState(null);
  const [weatherData, setWeatherData] = useState([]);
  const [suggestedCountry, setSuggestedCounty] = useState([]);

  const clear = () => {
    setinput("");
  };
  console.log(suggestedCountry);
  const date = new Date();
  const time = `${date.getFullYear()}-${
    date.getMonth() + 1
  }-${date.getDate()}T${date.getHours()}:${
    date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()
  }:${date.getMinutes() < 10 ? "0" + date.getSeconds() : date.getSeconds()}`;

  const handleSubmit = async (e) => {
    if (input.length === 0) {
      return setError("Please enter the city name");
    }
    e.preventDefault();
    setinput("");

    try {
      await fetch(
        `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${input}/${time}?key=ZJ7YEDFWPH3Z8GCJGY9M4XE88`
      )
        .then((response) => {
          console.log(response);
          if (!response.ok) {
            return setError("Failed to fetch the data");
          }
          return response.json();
        })
        .then((data) => {
          console.log(data);
          setWeatherData(data);
          setError(null);
        });
      console.log(weatherData);
    } catch (error) {
      console.log(error);
      setError("AN error occured");
    }
  };
  const handleWeatherData = () => {
    setWeatherData([]);
  };
  const countryFilter = (searchInput) => {
    const filteredcountry = Object.keys(countryCityNames).flatMap(
      ([country, cities]) => {
        return cities
          .filter((city) =>
            city.toLowerCase().includes(searchInput.toLowerCase())
          )
          .map(`${cities},${country}`);
      }
    );
    console.log(filteredcountry);
    setSuggestedCounty(filteredcountry);
  };

  return (
    <>
      <form action="" onSubmit={handleSubmit}>
        <label
          htmlFor="search"
          className=" bg-slate-800 w-fit p-2 px-5 rounded-3xl m-2 flex justify-center items-center gap-5"
        >
          <div className="flex justify-center items-center">
            <input
              type="text"
              id="search"
              value={input}
              onChange={(e) => {
                setinput(e.target.value);
                countryFilter(e.target.value);
              }}
              placeholder="Search for your preffered city..."
              className=" bg-slate-800 w-96 text-white flex justify-center items-center outline-none"
            />
            <i
              onClick={clear}
              className="fa-solid fa-circle-xmark cursor-pointer"
            ></i>
          </div>
          <button type="submit">
            <i className="fa-solid fa-magnifying-glass text-xl cursor-pointer"></i>
          </button>
        </label>
      </form>
      <button onClick={() => handleWeatherData()}>Clear Data</button>
      <p>input: {input}</p>
      <p>time: {time}</p>
      <p>status: {error}</p>
      <p>suggested country</p>
      {suggestedCountry.map((country) => {
        return (
          <ul key={country}>
            <li>{country}</li>
          </ul>
        );
      })}
      <div>
        {" "}
        weather : {weatherData && <p>{JSON.stringify(weatherData)}</p>}
      </div>
    </>
  );
};

export default Search;
