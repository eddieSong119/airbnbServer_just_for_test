const Venue = require("../models/venue");
const City = require("../models/city");

exports.getFeatured = async (req, res) => {
  try {
    const feature = req.params.feature;
    if (feature === "superHost") {
      const venues = await Venue.find(
        { superHost: true },
        "id title location_description rating pricePerNight imageUrl -_id"
      ).limit(8);
      const response = {
        header: "Places to stay around the world",
        venues,
      };
      res.json(response);
    } else if (feature === "recommended") {
      const venues = await Venue.find(
        { recommended: true },
        "id title location_description rating pricePerNight imageUrl -_id"
      ).limit(8);
      const response = {
        header: "Stay with a Superhost",
        venues,
      };
      res.json(response);
    } else {
      res.json(null);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getByCityName = async (req, res) => {
  try {
    const cityName = req.params.cityName;
    // const matchedCity = await City.find({
    //   cityName: { $regex: cityName, $options: "i" },
    // });

    // consider of the current mock data amount, this function returns all venues,
    // which means all cities have the same venues.
    const venues = await Venue.find(
      { location: cityName },
      "id title location rating pricePerNight imageUrl -_id"
    );
    const response = { header: `place in ${cityName}`, venues };
    res.json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};
