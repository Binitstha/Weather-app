import { Proptypes } from "prop-types";
export const Forecast = ({ location }) => {
  if (!location) {
    console.log("Loading...");
  } else {
    console.log(location);
  }
  return (
    <>
      <div className="h-64 w-[25rem] bg-slate-600 flex flex-col justify-center items-center rounded-xl p-3">
        <h3>5 Days Forecast : </h3>
        <div className="grid grid-cols-1 h-full my-2">
          <div>{location}</div>
          <div>demo</div>
          <div>demo</div>
          <div>demo</div>
          <div>demo</div>
        </div>
      </div>
    </>
  );
};

Forecast.propTypes = {
  location: Proptypes.string.isRequired,
};
