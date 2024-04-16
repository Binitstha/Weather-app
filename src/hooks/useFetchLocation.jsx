import { useEffect, useState } from "react";

const useFetchLocation = () => {
  const [location, setLocation] = useState("");

  useEffect(() => {
    try {
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
        return location;
      }
    } catch (err) {
      console.log(err);
    }
  }, [location]);
};

export default useFetchLocation;
