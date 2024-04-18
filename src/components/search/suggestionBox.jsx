import PropTypes from "prop-types";
export const SuggestedCitiesBox = (props) => {
  return (
    <>
    {props.searching && 
      <div className=" absolute z-[-1] mx-2 rounded-b-3xl top-[55px] shadow-xl">
        <div className="">
          {props.suggestedCities.length === 0 && (
              <div className={`${props.darkMode ? "text-white bg-slate-900" : "text-black bg-slate-300"} h-8 px-5 w-[30rem] rounded-b-2xl flex items-center p-3`}>
              result not found
            </div>
          )}
          {props.suggestedCities.map(({ city, country }, index) => (
              <ul
              onClick={() => {
                  props.onCitySelection(city);
                }}
                key={index}
                className={`${props.darkMode ? "bg-slate-900 text-white hover:bg-slate-800":"bg-slate-300 text-black hover:bg-slate-400"} cursor-pointer h-7 last:pb-4 hover:bg-slate-900 flex items-center px-4 p-3 last:rounded-b-2xl bg-slate-800 w-[30rem] last`}
                >
              <li>
                {city}, {country}
              </li>
            </ul>
          ))}
        </div>
      </div>
        }
    </>
  );
};

SuggestedCitiesBox.propTypes = {
  suggestedCities: PropTypes.arrayOf(
    PropTypes.shape({
      city: PropTypes.string.isRequired,
      country: PropTypes.string.isRequired,
    })
  ).isRequired,
  searching : PropTypes.bool.isRequired,
  onCitySelection: PropTypes.func.isRequired,
  darkMode: PropTypes.bool.isRequired
};
