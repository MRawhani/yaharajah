const express = require("express");
const router = express.Router();
const UserCtrl = require("../controllers/UsersController");
const Rental = require('../controllers/RenatlController')
router.get("/secret", UserCtrl.authMiddleware, function(req, res) {
  res.json({ secret: true });
});
router.get("/manage",UserCtrl.authMiddleware, Rental.manageRentals );
router.post("", UserCtrl.authMiddleware,Rental.createRental );
router.delete("/:id",UserCtrl.authMiddleware, Rental.deleteRental );
router.get("/:id", Rental.getRentalById );

router.get("", Rental.getRentals);

module.exports = router;
  