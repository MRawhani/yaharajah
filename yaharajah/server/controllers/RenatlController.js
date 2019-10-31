const MongooseErrHandler = require("../helpers/MongooseErrHandler");
const RentalModel = require("../models/RenatModel");
const UserModel = require('../models/UserModel')
exports.getRentals = function(req, res) {
  const city = req.query.city;
  const query = city ? { city } : {};

  RentalModel.find(query)
    .select("-bookings")
    .exec(function(err, foundedElements) {
      if (err) {
        return res
          .status(422)
          .send({ errors: MongooseErrHandler.normalizeErrors(err.errors) });
      }
      if (city && foundedElements.length === 0) {
        return res.status(422).send({
          errors: [
            {
              title: "No Rentals Found!",
              detail: `There are no matches for ${city}`
            }
          ]
        });
      }
      res.json(foundedElements);
    });
};

exports.getRentalById = function(req, res) {
  const rentalId = req.params.id;

  RentalModel.findById(rentalId)
    .populate("user", "username -_id")
    .populate("bookings", "startAt endAt -_id")
    .exec(function(err, foundElement) {
      if (err) {
        return res.status(422).send({
          errrs: [
            { title: "Rental Error", description: "There is somthing wrong" }
          ]
        });
      }
      return res.json(foundElement);
    });
};

exports.createRental = function(req, res) {
  const { 
    title,
    city,
    street,
    category,
    coin,
    price,
    bargain,
    image,
    bedrooms,
    bathrooms,
    shared,
    description,
    assets
  } = req.body;
  const user = res.locals.user;
  const rental = new RentalModel({
    title,
    city,
    street, 
    category,
    coin,
    price,
    bargain,
    image,
    bedrooms,
    bathrooms, 
    shared,
    description,
    assets
  });
  rental.user = user ;

  RentalModel.create(rental,function(err,savedRental){
    if(err){
      return res
      .status(422)
      .send({ errors: MongooseErrHandler.normalizeErrors(err.errors) });
 
    }
    UserModel.update({_id:user.id},{$push:{rentals:rental}},function(){});
    return res.json(savedRental)
  })
};
 