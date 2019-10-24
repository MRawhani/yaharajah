import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import {connect} from 'react-redux'
import LoginForm from './LoginForm';
import {loginAction} from './../../actions'

class Login extends Component {
    LoginUser = (userData)=>{
        this.props.loginAction(userData);
    }
    render() {
        const {errors,isAuth} = this.props.auth;
        const {successRegister} = this.props.location.state || false;


        if(isAuth){
            return <Redirect to={{pathname:'/rentals'}}/>
        }
        return (
            <section id="login">
            <div className="app-form">
              <div className="row">
                <div className="col-md-5">
                  <h1>تسجيل الدخول</h1>
                  {
                    successRegister && 
                    <div className='alert alert-success'>
                      <p>تم التسجيل</p>
                    </div>
                  }
                <LoginForm submitForm={this.LoginUser} errors={errors}/>
                </div>
                <div className="col-md-6 ml-auto">
                  <div className="image-container">
                    <h2 className="catchphrase">Hundreds of awesome places in reach of few clicks.</h2>
                    <img src={process.env.PUBLIC_URL+'/img/login-img.jpg'} alt="login-img.jpg"/>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )
    }
}
const mapStateToProps = state => {
    
    return {
        
      auth: state.auth
    };
  };
export default connect(
    mapStateToProps,
    { loginAction }
  )(Login);
  