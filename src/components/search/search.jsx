import { useEffect, useState } from "react";
import { PropTypes } from "prop-types";
import { countryCityNames } from "../../../JSON/country.js";
import { SuggestedCitiesBox } from "../search/suggestionBox.jsx";

export const Search = ({ setWeatherData, location }) => {
  const [input, setinput] = useState("");

  useEffect(() => {
    setinput(location);
  }, [location]);

  console.log(input);

  const [suggestedCities, setSuggestedCities] = useState([]);
  const [searching, setSearching] = useState(false);

  const date = new Date();
  const time = `${date.getFullYear()}-${
    date.getMonth() + 1
  }-${date.getDate()}T${date.getHours()}:${
    date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()
  }:${date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds()}`;

  const clear = () => {
    setinput("");
    setSearching(false);
  };

  const weatherDataFetch = async () => {
    if (input == "") {
      console.log("PLease enter the location");
    } else {
      try {
        const response = await fetch(
          `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${input}/${time}?key=ZJ7YEDFWPH3Z8GCJGY9M4XE88`
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
  const handleSubmit = async (e) => {
    e.preventDefault();
    setinput("");
    setSearching(false);
    await weatherDataFetch();
  };

  const countryFilter = (searchInput) => {
    const filteredCities = Object.entries(countryCityNames).flatMap(
      ([country, cities]) => {
        return cities
          .filter((city) =>
            city.toLowerCase().includes(searchInput.toLowerCase())
          )
          .map((city) => ({ city, country }));
      }
    );
    const slicedCities = filteredCities.slice(0, 10);
    setSuggestedCities(slicedCities);
  };

  const handleCitySelection = (city) => {
    setinput(city);
    setSearching(false);
  };

  return (
    <>
      <form action="" onSubmit={handleSubmit} className="relative z-20 ">
        <label
          htmlFor="search"
          className={`${
            searching ? "rounded-t-3xl" : "rounded-3xl"
          } bg-slate-800 w-fit p-2 px-5 m-2 flex justify-center items-center gap-5`}
        >
          <div className="flex justify-center items-center">
            <input
              type="text"
              id="search"
              autoComplete="off"
              required
              value={input}
              onChange={(e) => {
                if (e.target.value) {
                  setSearching(true);
                } else {
                  setSearching(false);
                }
                setinput(e.target.value);
                countryFilter(e.target.value);
              }}
              placeholder="Search for your preferred city..."
              className="bg-slate-800 w-96 text-white flex justify-center items-center outline-none"
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
        {input && (
          <SuggestedCitiesBox
            suggestedCities={suggestedCities}
            onCitySelection={handleCitySelection}
            searching={searching}
          />
        )}
      </form>
    </>
  );
};

export default Search;

Search.propTypes = {
  setWeatherData: PropTypes.func.isRequired,
  location: PropTypes.string.isRequired,
};
