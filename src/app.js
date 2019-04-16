const path = require("path");
const express = require("express");
const hbs = require("hbs");
// Get forecast and geocode
const forecast = require("./utils/forecast");
const geocode = require("./utils/geocode");

const app = express();
const port = process.env.PORT || 3000;

// directory to serve our static files
const publicDirectoryPath = path.join(__dirname, "../public");
// custom views path
const viewsPath = path.join(__dirname, "../templates/views");
// template partials path
const partialsPath = path.join(__dirname, "../templates/partials");

// Set templating engine - handlebars
app.set("view engine", "hbs");
// Set views directory
app.set("views", viewsPath);
// Set hbs partials
hbs.registerPartials(partialsPath);

// set public directory
app.use(express.static(publicDirectoryPath));

// routes
app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Chris Kew"
  });
});
app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Chris Kew"
  });
});
app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    msg: "This is the help page.",
    name: "Chris Kew"
  });
});
app.get("/weather", (req, res) => {
  const address = req.query.address;
  if (!address) {
    return res.send({
      error: "You must provide an address!"
    });
  } else {
    geocode(address, (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({
          error
        });
      }
      forecast(latitude, longitude, (error, forecastData, icon) => {
        if (error) {
          return res.send({
            error
          });
        } else {
          res.send({
            location,
            forecast: forecastData,
            address,
            icon
          });
        }
      });
    });
  }
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Chris Kew",
    errorMsg: "Help article not found!"
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Chris Kew",
    errorMsg: "Page not found!"
  });
});

app.listen(port, () => {
  console.log(`Server is up and running on port ${port}.`);
});
