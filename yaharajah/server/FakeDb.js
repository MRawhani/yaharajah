const RenatlModel = require("./models/RenatModel");
const UserModel = require('./models/UserModel')

class FakeDb {
  constructor() {
    this.rentals = [
      {
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
        bargain: false,
        assets: ["على شارع", "زاويتين", "مليس","على شارع", "زاويتين", "مليس"]
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
        bargain: true,
        assets: ["على شارع", "زاويتين", "مليس","على شارع", "زاويتين", "مليس"]
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
        bargain: true,
        assets: ["على شارع", "زاويتين", "مليس","على شارع", "زاويتين", "مليس"]
      },
      {
        title: "Central Apartment 4",
        city: "صنعاء",
        street: "شارع تونس",
        category: "بيت",
        coin: "دولار",
        price: 1000,
        type: "بيع",
        image: "http://via.placeholder.com/350x250",
        bedrooms: 9,
        description: "شقة جميلة ورائعة",
        dailyRate: 33,
        shared: true,
        bargain: false,
        assets: ["على شارع", "زاويتين", "مليس","على شارع", "زاويتين", "مليس"]
      }
    ];
    this.users = [
      {
        username: 'Mo',
        email: 'momo@gmail.com',
        password: '1234'
      }
    ]
  }
  async cleanDb() {
    await UserModel.deleteMany({});
    await RenatlModel.deleteMany({});
  }

  pushDataToDb() {
    const user= new UserModel(this.users[0])
    this.rentals.forEach(rental => {
      const newRental = new RenatlModel(rental);
      newRental.user = user;
      user.rentals.push(newRental);
      newRental.save();
    });
    user.save()
  }
 
  async seedDb() {
    console.log('dcfvbg');
    
   await this.cleanDb();
    this.pushDataToDb();
  }
}

module.exports = FakeDb;
