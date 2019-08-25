const express = require("express");
const mongoose = require("mongoose");
const config =require('./config/dev');
const FakeDb = require('./FakeDb');
const rentalRoutes = require('./routes/rentals');
mongoose.connect(config.DB_URI,
  { useNewUrlParser: true }
).then(()=> {
 
        const fakeDb = new FakeDb();
        fakeDb.seedDb();
        console.log('sucsess');
        
 
  }).catch((err)=>{
    console.log(err);
    
  });
const app = express();
app.use('/api/v1/rentals',rentalRoutes);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Running");
});