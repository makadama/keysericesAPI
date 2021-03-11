const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;
const Employe = db.employe;

checkDuplicateUserEmail = (req, res, next) => {
    console.log(req.body)
//  // Username
//  User.findOne({
//    where: {
//      email: req.body.email
//    }
//  }).then(user => {
//    if (user) {
//      res.status(400).send({
//        message: "Failed! Username is already in use!"
//      });
//      return;
//    }

    // Email
    User.findOne({
      where: {
        email: req.body.email
      }
    }).then(user => {
      if (user) {
        res.status(400).send({
          message: "Failed! Email is already in use!"
        });
        return;
      }

      next();
    });
  //});
};

checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        res.status(400).send({
          message: "Failed! Role does not exist = " + req.body.roles[i]
        });
        return;
      }
    }
  }
  
  next();
};

checkDuplicateEmployeEmail = (req, res, next) => {
    console.log(req.body)


    // Email
    Employe.findOne({
      where: {
        email: req.body.email
      }
    }).then(employe => {
      if (employe) {
        res.status(400).send({
          message: "Failed! Email is already in use!"
        });
        return;
      }

      next();
    });
  //});
};

const verifySignUp = {
  checkDuplicateUserEmail: checkDuplicateUserEmail,
  checkRolesExisted: checkRolesExisted,
  checkDuplicateEmployeEmail : checkDuplicateEmployeEmail
};

module.exports = verifySignUp;