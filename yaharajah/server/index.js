const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require('body-parser')
const config = require("./config/dev");
const FakeDb = require("./FakeDb");
const rentalRoutes = require("./routes/rentals");
const userRoutes = require("./routes/users");
mongoose
  .connect(config.DB_URI, { useNewUrlParser: true })
  .then(() => {
    const fakeDb = new FakeDb();
  // fakeDb.seedDb();
    console.log("sucsess");
  })
  .catch(err => {
    console.log(err); 
  });
const app = express();
app.use(cors());
app.use(bodyParser.json())
app.use("/api/v1/rentals", rentalRoutes);
app.use("/api/v1/users", userRoutes);
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log("Running");
});
