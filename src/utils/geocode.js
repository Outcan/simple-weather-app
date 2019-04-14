const request = require("request");

const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1Ijoib3V0Y2FuIiwiYSI6ImNqdDRubG9rMDA0Mjg0M3FnZWxkMGZ2dTYifQ.bpu-rzyODhE2XiWFR849DQ&limit=1";

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback(
        "Unable to connect to location services, please try later!",
        undefined
      );
    } else if (body.features.length === 0) {
      callback("No result found, please try another search!", undefined);
    } else {
      const [longitude, latitude] = body.features[0].center;
      const location = body.features[0].place_name;
      callback(undefined, { longitude, latitude, location });
    }
  });
};

module.exports = geocode;
