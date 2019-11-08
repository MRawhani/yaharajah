const UserModel = require("../models/UserModel");
const MongooseErrHandler = require("../helpers/MongooseErrHandler");
const jwt = require("jsonwebtoken");
const config = require("../config");
exports.auth = function(req, res) {
  const { email, password } = req.body;
  if (!password || !email) {
    return res.status(422).send({
      errors: [{ title: "data missing!", detail: "Provide email and password" }]
    });
  } 

  UserModel.findOne({ email }, function(err, user) {
    if (err) {
      return res
        .status(422)
        .send({ errors: MongooseErrHandler.normalizeErrors(err.errors) });
    }
    if (!user) {
      return res.status(422).send({
        errors: [
          { title: "User not found", detail: "The user is not registered" }
        ]
      });
    }
    if (user.isSamePassword(password)) {
      const token = jwt.sign(
        {
          userId: user._id,  
          username: user.username
        },
        config.SECRET,
        { expiresIn: "1h" }
      );
      return res.json(token);
    } else {
      return res.status(422).send({
        errors: [
          { title: "Wrong Data!", detail: "Email or Password are incorrect" }
        ]
      });
    }
  });
};

exports.register = function(req, res) {
  const { username, email, password, passwordConfirmation } = req.body;

  if (!password || !email) {
    return res.status(422).send({
      errors: [{ title: "data missing!", detail: "Provide email and password" }]
    });
  }
  if (password != passwordConfirmation) {
    return res.status(422).send({
      errors: [
        {
          title: "Not matched!",
          detail: "password and confirmation are not matched"
        }
      ]
    });
  }
  UserModel.findOne({ email }, function(err, existingUser) {
    if (err) {
      return res
        .status(422)
        .send({ errors: MongooseErrHandler.normalizeErrors(err.errors) });
    }
    if (existingUser) {
      return res.status(422).send({
        errors: [{ title: "Email Userd!", detail: "already registered" }]
      });
    }

    const user = new UserModel({
      username, 
      email, 
      password
    });
 
    user.save(function(err) {
      if (err) {
        return res
          .status(422)
          .send({ errors: MongooseErrHandler.normalizeErrors(err.errors) });
      }

      return res.json({ registered: true });
    });
  });
};

exports.authMiddleware = function(req, res, next) {
  const token = req.headers.authorization;

  if (token) {
      let  user = null;
    try {
       user = parseToken(token);
    } catch (error) {
        return res
        .status(422)
        .send({ errors: MongooseErrHandler.normalizeErrorsofToken(error) });
 
    } 

        UserModel.findById(user.userId, function(err, foundedUser) {
            if (err) {
              return res
                .status(422)  
                .send({ errors: MongooseErrHandler.normalizeErrors(err.errors) });
            }
      
            if (foundedUser) {
              res.locals.user = foundedUser;
              next();
            }
            else{
             
                return NotAuthorized(res);
            }
          });
  }else {
   return NotAuthorized(res);
  }
 
};
function parseToken(token) { 
        return jwt.verify(token.split(" ")[1], config.SECRET);

} 
function NotAuthorized(res){
    return res.status(401).send({
        errors: [{ title: "Not authorized!", detail: "You need to login" }]
      });
}
