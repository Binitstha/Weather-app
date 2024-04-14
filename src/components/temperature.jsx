import { PropTypes } from "prop-types";
export const Temperature = ({ weatherData }) => {
  return (
    <>
      <div className=" flex gap-5 justify-center items-center h-64 w-full rounded-xl bg-slate-600 p-3 ">
        {weatherData && <div>{JSON.stringify(weatherData)}</div>}
        <section>
          <div>Temperature</div>
          <div>Sun rise</div>
          <div>Sun set</div>
        </section>
        <section className="flex flex-col">
          <div>Img</div>
          <div>day status</div>
        </section>
        <section className="flex flex-wrap">
          <div>humidity</div>
          <div>wind speed</div>
          <div>Pressure</div>
          <div>UV</div>
        </section>
      </div>
    </>
  );
};

Temperature.propTypes = {
  weatherData: PropTypes.array.isRequired,
};
