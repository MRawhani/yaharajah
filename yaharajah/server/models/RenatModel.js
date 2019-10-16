const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const rentalSchema = new Schema({
  title: {
    type: String,
    required: true,
    max: [128, "Too long, max is 128 characters"]
  },
  city: { type: String, required: true, lowercase: true },
  street: {
    type: String,
    required: true,
    min: [4, "Too short, min is 4 characters"]
  },
  category: { type: String, required: true, lowercase: true },
  coin: { type: String, required: true, lowercase: true, default: "ريال" },
  price: { type: Number, required: true },
  type: { type: String, required: true, lowercase: true },
  bargain: Boolean,
  image: { type: String, required: true },
  bedrooms: Number,
  shared: Boolean,
  description: { type: String, required: true },
  dailyRate: Number,
  assets: [],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("RentalModel", rentalSchema);
