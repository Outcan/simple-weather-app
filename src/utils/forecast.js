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
      callback("Unable to connect to weather service!", undefined, undefined);
    } else if (body.error) {
      callback(body.error, undefined, undefined);
    } else {
      const { temperature, precipProbability } = body.currently;
      const {
        summary,
        icon,
        temperatureHigh,
        temperatureLow
      } = body.daily.data[0];
      const forecast = `${summary} It is currently ${temperature}\u2103 out. There is a ${precipProbability *
        100}% chance of rain. The temperature high will be ${temperatureHigh}\u2103 (daytime) and the temperature low will be ${temperatureLow}\u2103 (overnight).`;
      callback(undefined, forecast, icon);
    }
  });
};

module.exports = forecast;
