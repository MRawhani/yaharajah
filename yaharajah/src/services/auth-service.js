import * as jwt from "jsonwebtoken";
import * as moment from "moment";

class AuthService {
  auth_token = "auth_token";
  getToken = () => {
    return localStorage.getItem(this.auth_token);
  };

  decode = token => {
    return jwt.decode(token);
  };
  saveToken = (token) => {
    localStorage.setItem(this.auth_token,token);
  };
  removeToken = () => {
    localStorage.removeItem(this.auth_token);
  };
  getUsername=()=>{
    return this.decode(this.getToken()).username;
  }
  getExpiration = token => {
    const exp = this.decode(token).exp;

    return moment.unix(exp);
  };
  isValid = token => {
    return moment().isBefore(this.getExpiration(token));
  };

  isAuthenticated = () => {
   
    const token = this.getToken();
    return token && this.isValid(token) ? true : false;
  };
}

export default new AuthService();
