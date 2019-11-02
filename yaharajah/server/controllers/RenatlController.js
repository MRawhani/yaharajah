const MongooseErrHandler = require("../helpers/MongooseErrHandler");
const RentalModel = require("../models/RenatModel");
const UserModel = require("../models/UserModel");
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
              detail: `لا يوجد نتائج لمدينة  ${city}`
            }
          ]
        });
      }
      res.json(foundedElements);
    });
};
exports.manageRentals= function(req,res){
  const user = res.locals.user;

  RentalModel.where({user}).populate('bookings').exec(function(err,foundedRentals){
    if(err){
      return res
          .status(422)
          .send({ errors: MongooseErrHandler.normalizeErrors(err.errors) });
    
    }
    return res.json(foundedRentals)
  })
}
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

exports.deleteRental = function(req, res) {
  const user = res.locals.user;
  
  RentalModel.findById(req.params.id)
    .populate("user", "_id")
    .populate({   
      path: "bookings",
      select: "startAt",
      match: { startAt: { $gt: new Date() } }
    })
    .exec(function(err, foundedRental) {
      if (err) {
        return res
          .status(422)
          .send({ errors: MongooseErrHandler.normalizeErrors(err.errors) });
      }

      if(user.id !== foundedRental.user.id){
        return res.status(422).send({
          errors: [
            {
              title: "Invalid",
              detail: `انت لست صاحب هذا العرض`
            }
          ]
        });
      }
      if(foundedRental.bookings.length >0){
        return res.status(422).send({
          errors: [
            {
              title: "Active Bookings",
              detail: `يوجد حجوزات على هذا العرض! لذا لا تستطيع حذفه`
            }
          ]
        });
      }
      foundedRental.remove(function(err){
        if (err) {
          return res
            .status(422)
            .send({ errors: MongooseErrHandler.normalizeErrors(err.errors) });
        }
        return res.json({foundedRental,'deleted':true})
      })
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
  rental.user = user;

  RentalModel.create(rental, function(err, savedRental) {
    if (err) {
      return res
        .status(422)
        .send({ errors: MongooseErrHandler.normalizeErrors(err.errors) });
    }
    UserModel.update(
      { _id: user.id },
      { $push: { rentals: rental } },
      function() {}
    );
    return res.json(savedRental);
  });
};
