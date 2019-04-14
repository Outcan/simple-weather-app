const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url =
    "https://api.darksky.net/forecast/534b5bcb7ff43794ce4f908b4cb9bcce/" +
    latitude +
    "," +
    longitude +
    "?units=uk2";

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather service!", undefined);
    } else if (body.error) {
      callback(body.error, undefined);
    } else {
      const { temperature, precipProbability } = body.currently;
      const { summary } = body.daily.data[0];
      const forecast = `${summary} It is currently ${temperature}\u2103 out. There is a ${precipProbability *
        100}% chance of rain.`;
      callback(undefined, forecast);
    }
  });
};

module.exports = forecast;
