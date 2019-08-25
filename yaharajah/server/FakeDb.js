const RenatlModel = require('./models/RenatModel');

class FakeDb {

    constructor(){
        this.rentals = [  {
            
            title: "شقة مفروشة",
            city: "صنعاء",
            street: "سواد حنش",
            category: "بيت",
            coin: "دولار",
            price: 1000,
            type: "بيع",
            image: "http://via.placeholder.com/350x250",
            bedrooms: 3,
            description: "شقة جميلة ورائعة",
            dailyRate: 34,
            shared: false,
            bargain: false
          },
          {
            
            title: "شقة مفروشة 2",
            city: "المحويت",
            street: "روحان",
            category: "فلة",
            coin: "دولار",
            price: 1000,
            type: "ايجار",
            image: "http://via.placeholder.com/350x250",
            bedrooms: 2,
            description: "Very nice apartment",
            dailyRate: 12,
            shared: true,
            bargain: true
          },
          {
            
            title: "شقة مفروشة 3",
            city: "الحديدة",
            street: "بيت بوس",
            category: "شقة",
            coin: "دولار",
            price: 1000,
            type: "ايجار",
            image: "http://via.placeholder.com/350x250",
            bedrooms: 2,
            description: "شقة جميلة ورائعة",
            dailyRate: 334,
            shared: true,
            bargain: true
          },
          {
            
            title: "Central Apartment 4",
            city: "برلين",
            street: "شارع الجن",
            category: "بيت",
            coin: "دولار",
            price: 1000,
            type: "بيع",
            image: "http://via.placeholder.com/350x250",
            bedrooms: 9,
            description: "شقة جميلة ورائعة",
            dailyRate: 33,
            shared: true,
            bargain: false
          }]
    
    }
    async cleanDb(){
     await   RenatlModel.deleteMany({});
    }

    pushDataToDb() {
        this.rentals.forEach((rental)=>{
            const newRental = new RenatlModel(rental);

            newRental.save();
        })
    }

    seedDb(){
        this.cleanDb();
        this.pushDataToDb();
    }
   }

   module.exports = FakeDb;