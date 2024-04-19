import { useEffect, useState } from "react";
import { PropTypes } from "prop-types";
import { countryCityNames } from "../../../JSON/country.js";
import { SuggestedCitiesBox } from "../search/suggestionBox.jsx";

export const Search = ({ setWeatherData, darkMode,setLocation }) => {
  const [input, setinput] = useState("");

  useEffect(() => {
    weatherDataFetch();
  }, []);

  const [suggestedCities, setSuggestedCities] = useState([]);
  const [searching, setSearching] = useState(false);

  const clear = () => {
    setinput("");
    setSearching(false);
  };

  const weatherDataFetch = async () => {
    if (input == "") {
      return null
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
          `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${input}/${time}?key=TMY8GD3BAHYAH4UZAU7WKYFEU`
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
    setLocation(input)
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
      <form action="" onSubmit={handleSubmit} className=" transition-all relative z-20 max-[640px]:w-56">
        <label
          htmlFor="search"
          className={`${
            searching ? "rounded-t-3xl shadow-sm" : "rounded-3xl shadow-xl"
          } ${
            darkMode ? "bg-slate-900" : "bg-slate-300"
          } w-fit p-2 px-5 m-2 flex justify-center items-center gap-5 max-[640px]:gap-3`}
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
              className={`${
                darkMode ? "bg-slate-900 text-white" : "bg-slate-300 text-black"
              } focus:text-ellipsis w-96 flex justify-center items-center outline-none max-[640px]:w-28 max-[640px]:text-ellipsis`}
            />
            <i
              onClick={clear}
              className={`${
                darkMode ? "text-white" : "text-black"
              } fa-solid fa-circle-xmark cursor-pointer max-[640px]:text-sm max-[640px]:ml-2`}
            ></i>
          </div>
          <button type="submit">
            <i
              className={`${
                darkMode ? "text-white" : "text-black"
              } fa-solid fa-magnifying-glass text-xl cursor-pointer max-[640px]:text-lg`}
            ></i>
          </button>
        </label>
        {input && (
          <SuggestedCitiesBox
            suggestedCities={suggestedCities}
            onCitySelection={handleCitySelection}
            darkMode={darkMode}
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
  darkMode: PropTypes.bool.isRequired,
  setLocation: PropTypes.func.isRequired,
};
