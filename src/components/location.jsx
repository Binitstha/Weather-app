import { PropTypes } from "prop-types";
import { useEffect } from "react";
export const CurrentLocation = ({ setLocation,darkMode }) => {
  const handleClick = () => {
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
  };
  useEffect(() => {
    window.addEventListener("load", handleClick);
    return () => {
      window.removeEventListener("load", handleClick);
    };
  }, []);
  return (
    <>
      <div className="flex flex-col justify-center items-center gap-2 transition-all">
        <div onClick={()=>{
          handleClick()}} className={`${darkMode ? "bg-slate-900 text-white":"bg-slate-300 text-black"} flex justify-center items-center gap-2 h-10 shadow-xl p-4 cursor-pointer rounded-3xl max-[640px]:w-10`}>
          <i className="fa-solid fa-location-crosshairs text-xl "></i>
          <div className="max-[640px]:hidden">Current location</div>
        </div>
      </div>
    </>
  );
};

CurrentLocation.propTypes = {
  setLocation: PropTypes.func.isRequired,
  darkMode: PropTypes.bool.isRequired
};
