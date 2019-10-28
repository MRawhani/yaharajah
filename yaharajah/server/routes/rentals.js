const express = require("express");
const router = express.Router();
const RentalModel = require("../models/RenatModel");
const UserCtrl = require("../controllers/UsersController");

router.get("/secret", UserCtrl.authMiddleware, function(req, res) {
  res.json({ secret: true });
});

router.get("", function(req, res) {
  RentalModel.find({})
    .select("-bookings")
    .exec(function(err, foundElements) {
      res.json(foundElements);
    });
});
router.get("/:id", function(req, res) {
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
});

module.exports = router;
