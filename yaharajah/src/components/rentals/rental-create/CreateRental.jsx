import React, { Component } from "react";
import CreateRentalForm from './CreateRentalForm';
import {Redirect} from 'react-router-dom'
import * as actions from '../../../actions'

export default class CreateRental extends Component {
  constructor(){
    super();
    this.rentalOptions={
      categories: [{value:'شقة',text:'شقة'},{value:'بيت',text:'بيت'},{value:'غرفة',text:'غرفة'},{value:'فلة',text:'فلة'}],
      coins: [{value:'$',text:'دولار'},{value:'YER',text:'ريال يمني'},{value:'SAR',text:'ريال سعودي'}]
    }
    this.state = {
      errors: [],
      redirect: false
    };
  }

 
 
    submitForm = (rentalData)=>{
        console.log(rentalData);
        actions.creatRental({...rentalData, assets:["حلوة والله"]}).then(
          created => {
            this.setState({ redirect: true });
          },
          errors => {
            this.setState({ errors });
          }
        );
        
    }
  render() {
    const { errors,redirect } = this.state;
    if(redirect){
        return <Redirect to={{pathname:'/rentals' ,state:{successRegister:true}}}/>
    }
    return (
      <section id="newRental">
        <div className="app-form">
          <div className="row">
            <div className="col-md-5">
              <h1 className="page-title">Create Rental</h1>
              <CreateRentalForm submitForm={this.submitForm} options={this.rentalOptions} errors={errors}/>
            </div>
            <div className="col-md-6 ml-auto">
              <div className="image-container">
                <h2 className="catchphrase">
                  Hundreds of awesome places in reach of few clicks.
                </h2>
                <img
                  src={process.env.PUBLIC_URL + "/img/create-rental.jpg"}
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
