import { FETCH_RENTALS, FETCH_RENTAL_By_ID,FETCH_RENTAL_By_ID_INIT } from "./types";
const rentals = [
  {
    id: 1,
    title: "شقة مفروشة",
    city: "صنعاء",
    street: "سواد حنش",
    category: "بيت",
    coin: "$",
    price: "10000",
    type: "بيع",
    image: "http://via.placeholder.com/350x250",
    bedrooms: 3,
    description: "شقة جميلة ورائعة",
    dailyRate: 34,
    shared: false,
    bargain: false,
    createdAt: "24/12/2017"
  },
  {
    id: 2,
    title: "شقة مفروشة 2",
    city: "المحويت",
    street: "روحان",
    category: "فلة",
    coin: "$",
    price: "10000",
    type: "ايجار",
    image: "http://via.placeholder.com/350x250",
    bedrooms: 2,
    description: "Very nice apartment",
    dailyRate: 12,
    shared: true,
    bargain: true,
    createdAt: "24/12/2017"
  },
  {
    id: 3,
    title: "شقة مفروشة 3",
    city: "الحديدة",
    street: "بيت بوس",
    category: "شقة",
    coin: "$",
    price: "10000",
    type: "ايجار",
    image: "http://via.placeholder.com/350x250",
    bedrooms: 2,
    description: "شقة جميلة ورائعة",
    dailyRate: 334,
    shared: true,
    bargain: true,
    createdAt: "24/12/2017"
  },
  {
    id: 4,
    title: "Central Apartment 4",
    city: "برلين",
    street: "شارع الجن",
    category: "بيت",
    coin: "$",
    price: "10000",
    type: "بيع",
    image: "http://via.placeholder.com/350x250",
    bedrooms: 9,
    description: "شقة جميلة ورائعة",
    dailyRate: 33,
    shared: true,
    bargain: false,
    createdAt: "24/12/2017"
  }
];

export const fetchRentals = () => {
  return {
    type: FETCH_RENTALS,
    payload: rentals
  };
};
export const fetchRentalById = id =>  (dispatch) => {
  dispatch({ type: FETCH_RENTAL_By_ID_INIT })
  let rental = {};
 setTimeout(()=>{
   rental = rentals.find(rental => {
    return rental.id === id;
  });
  return dispatch({ type: FETCH_RENTAL_By_ID, payload: rental });
 },1000)
  
};

