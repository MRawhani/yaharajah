const BookingModel = require("./../models/BookingModel");
const RentalModel = require("./../models/RenatModel");
const UserModel = require("./../models/UserModel");
const { normalizeErrors } = require("./../helpers/MongooseErrHandler");
const moment = require('moment');

exports.createBooking = function(req, res) {
  const { startAt, endAt, totalPrice, guests, days, rental } = req.body;
  const user = res.locals.user;
  const booking = new BookingModel({
    endAt,
    startAt,   
    totalPrice,
    guests,
    days 
  });  

  RentalModel.findById(rental._id)
    .populate("bookings") 
    .populate("user")   
    .exec(function(err, foundedRental) {
      if (err) { 
        return res
          .status(422)
          .send({ errors: MongooseErrHandler.normalizeErrors(err.errors) });
      }
       if (foundedRental.user.id === user.id) {  
        return res.status(422).send({
          errors: [
            { title: "Invalid!  ", detail: "Cannot create booking on yours." }
          ]
        });
      }  
      if (isValidBooking(booking, foundedRental)) {
          booking.user = user;
          booking.rental = foundedRental;
          foundedRental.bookings.push(booking);
          
          booking.save(function(err){
              if(err){
                return res
                .status(422)
                .send({ errors: MongooseErrHandler.normalizeErrors(err.errors) });
           
              }
              foundedRental.save();
              UserModel.update({_id:user.id},{$push:{bookings:booking}},function(){});
              return res.json({ startAt:booking.startAt, endAt:booking.endAt });
          });

          
      } else { 
        return res.status(422).send({
          errors: [{ title: "Invalid!  ", detail: "Cjoose proper dates." }]
        });
      }
     
    });   
};
function isValidBooking(proposedBooking, rental) {
  let isValid = true;
  if (rental.bookings && rental.bookings.length > 0) { 
    isValid= rental.bookings.every(function(booking) {
      const proposedStartAt = moment(proposedBooking.startAt);
      const proposedEndAt = moment(proposedBooking.endAt);
      const actualStartAt = moment(booking.startAt);
      const actualEndAt = moment(booking.endAt);

      if (
        (actualStartAt < proposedStartAt && actualEndAt < proposedEndAt) ||
        (proposedEndAt < actualEndAt && proposedEndAt < actualStartAt)
      ) {
          return true;
      } else {
          return false;
      }
    });
  }
  return isValid;
}
