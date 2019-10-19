const express = require("express");
const router = express.Router();
const RentalModel = require("../models/RenatModel");
const UserCtrl = require('../controllers/UsersController')

router.get('/secret',UserCtrl.authMiddleware, function(req,res){
  res.json({"secret": true});
})

router.get("", function(req, res) {
  RentalModel.find({}, function(err, foundElements) {
    res.json(foundElements);
  });
});
router.get("/:id", function(req, res) {
  const rentalId = req.params.id;

  RentalModel.findById(rentalId, function(err, foundElement) {
    if (err) {
      res
        .status(422)
        .send({
          errrs: [
            { title: "Rental Error", description: "There is somthing wrong" }
          ]
        });
    }
    res.json(foundElement);
  });
});

module.exports = router;
