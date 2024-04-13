import PropTypes from "prop-types";
export const SuggestedCitiesBox = (props) => {
  return (
    <>
    {props.searching && 
      <div className=" absolute z-[-1] mx-2 rounded-b-3xl top-[55px]">
        <div className="">
          {props.suggestedCities.length === 0 && (
              <div className="h-7 w-[30rem] bg-slate-800 rounded-b-2xl flex items-center p-3">
              result not found
            </div>
          )}
          {props.suggestedCities.map(({ city, country }, index) => (
              <ul
              onClick={() => {
                  props.onCitySelection(city);
                }}
                key={index}
                className=" cursor-pointer h-7 last:pb-4 hover:bg-slate-900 flex items-center p-3 last:rounded-b-2xl bg-slate-800 w-[30rem] last"
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
};
