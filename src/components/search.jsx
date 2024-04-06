import { useState } from "react";
import useFetch from "../hooks/useFetch";

const Search = () => {
  const [input, setinput] = useState("");
  const [countryData, setCountryData] = useState(null)

  const clear = () => {
    setinput("");
  };

  const date = new Date();
  const time = `${date.getFullYear()}-${
    date.getMonth() + 1
  }-${date.getDate()}T${date.getHours()}:${
    date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()
  }:${date.getMinutes() < 10 ? "0" + date.getse() : date.getse()}`;

  // const location
  const weatherData = useFetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/${time}?key=ZJ7YEDFWPH3Z8GCJGY9M4XE88`
  );

  const handleSearch = () => {
    const fetchedCountryData = useFetch(`https://restcountries.com/v3.1/name/${input.trim()}?fullText=true`)
    setCountryData(fetchedCountryData[0])
  }

  return (
    <>
      <form
        action=""
        onSubmit={(e) => {
          e.preventDefault();
          setinput("");
        }}
      >
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
                handleSearch
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
      <p>{input}</p>
      <p>{time}</p>
      <p>{weatherData}</p>
    </>
  );
};

export default Search;
