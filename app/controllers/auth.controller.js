require('dotenv').config();
const db = require("../models");
const config = require("../config/auth.config");
const Validator = require("validator");
const isEmpty = require("is-empty");
const User = db.user;
const Role = db.role;
const Employe = db.employe;
const Op = db.Sequelize.Op;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
var nodemailer = require("nodemailer");
const mailgun = require("mailgun-js");



//field validation for registration
function validateRegisterInput(data) {
  let errors = {};
// Convert empty fields to an empty string so we can use validator functions
  
  data.email = !isEmpty(data.email) ? data.email : "";
  data.firstname = !isEmpty(data.firstname) ? data.firstname : "";
  data.lastname = !isEmpty(data.lastname) ? data.lastname : "";
 // data.type = !isEmpty(data.type) ? data.type : "";
  data.adress = !isEmpty(data.adress) ? data.adress : "";
  data.telephone = !isEmpty(data.telephone) ? data.telephone : ""; 
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";

// Email checks
  if (Validator.isEmpty(data.email)) {
    errors.email = "ce champ est requis";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "l'email est invalide";
  }  
  // firstName checks
  if (Validator.isEmpty(data.firstname)) {
    errors.firstname = "ce champ est requis";
  }
   // lastName checks
  if (Validator.isEmpty(data.lastname)) {
    errors.lastname = "ce champ est requis";
  }
  // type checks
  /*if (Validator.isEmpty(data.type)) {
    errors.type = "type field is required";
  }*/
  // adress checks
  if (Validator.isEmpty(data.adress)) {
    errors.adress = "ce champ est requis";
  }
  // telephone checks
  if (Validator.isEmpty(data.telephone)) {
    errors.telephone = "ce champ est requis";
  }
 
// Password checks
if (Validator.isEmpty(data.password)) {
    errors.password = "ce champ est requis";
  }
if (Validator.isEmpty(data.password2)) {
    errors.password2 = "ce champ est requis";
  }
if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "le mot de passe doit avoir au moins 6 caractères";
  }
if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "mots de passes non identiques";
  }
return {
    errors,
    isValid: isEmpty(errors)
  };
};


//field validation for login
function validateLoginInput(data) {
  let errors = {};

  // Convert empty fields to an empty string so we can use validator functions
  data.email = !isEmpty(data.email) ? data.email : "";

  data.password = !isEmpty(data.password) ? data.password : "";
// Email checks
  if (Validator.isEmpty(data.email)) {
    errors.email = "ce champ est requis";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "l'email est invalide";
  }  
// Password checks
 if (Validator.isEmpty(data.password)) {
    errors.password = "ce champ est requis";
  }
return {
    errors,
    isValid: isEmpty(errors)
  };
}


function validateforgetInput(data) {
  let errors = {};
// Convert empty fields to an empty string so we can use validator functions
  data.email = !isEmpty(data.email) ? data.email : "";
  if (Validator.isEmpty(data.email)) {
    errors.email = "ce champ est requis";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "l'email est invalide";
  }  
return {
    errors,
    isValid: isEmpty(errors)
  };
}

function validateresetInput(data) {
  let errors = {};
// Convert empty fields to an empty string so we can use validator functions
data.password = !isEmpty(data.password) ? data.password : "";
data.password2 = !isEmpty(data.password2) ? data.password2 : "";
if (Validator.isEmpty(data.password)) {
    errors.password = "ce champ est requis";
  }
if (Validator.isEmpty(data.password2)) {
    errors.password2 = "ce champ est requis";
  }
if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "le mot de passe doit être au moins 6 caractères";
  }
if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "mots de passe non identiques";
  }
return {
    errors,
    isValid: isEmpty(errors)
  };
}



exports.signup = (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);
  if(!isValid){
      return res.status(400).json(errors);
  }  
  // Save User to Database
  User.findOne({where:{email: req.body.email} }).then(user => {
    if (user) {
      return res.status(400).json({ email: "cet adresse existe déja" });
    }
    else{
      if(!(req.body.type)){
        req.body.type= "hote";
      }
  User.create({
    email: req.body.email,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    type: req.body.type,
    adress: req.body.adress,
    telephone: req.body.telephone,
    password: bcrypt.hashSync(req.body.password, 8)
  })
    .then(user => {
      if (req.body.roles) {
        Role.findAll({
          where: {
            name: {
              [Op.or]: req.body.roles
            }
          }
        }).then(roles => {
          user.setRoles(roles).then(() => {
            res.send({ message: "User was saved successfully!" });
          });
        });
      } else {
        // user role = 1
        user.setRoles([1]).then(() => {
          res.send({ message: "User was registered successfully!" });
        });
      }
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
}
  });
};




exports.signin = (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);
  if(!isValid){
      return res.status(400).json(errors);
  }   
 
  User.findOne({
    where: {
      email: req.body.email
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "adresse email ou mot de passe incorrect" });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "mot de passe non valide!"
        });
      }

      var authorities = [];
      user.getRoles().then(roles => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push("ROLE_" + roles[i].name.toUpperCase());

        }
    var token = jwt.sign({ id: user.id, firstname: user.firstname, type: user.type, email: user.email, telephone:user.telephone}, config.secret, {expiresIn: 86400});
    res.cookie('token', token,{httpOnly: true });
    
res.json({
          id: user.id,
          firstname : user.firstname,
          type : user.type
        });

      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};


exports.sendLinkByEmail = (req, res) =>{
  const { errors, isValid } = validateforgetInput(req.body);
  if(!isValid){
      return res.status(400).json(errors);
  } 
 User.findOne({
    where: {
      email: req.body.email
    }
  }).then(userData=>{
    if(!userData){
      return res.status(400).json({ message: "adresse email introuvable!" });
    }

        var api_key = process.env.API_KEY; 
        var domain_name = process.env.DOMAINE_NAME; 
        const mg = mailgun({apiKey: api_key, domain: domain_name, host: process.env.HOST_N});


        var currentDateTime = new Date();
        var mailOptions = {
            from: 'Key Services <ratkhamamada@gmail.com>',
            to: req.body.email,
            subject: 'Password Reset',

            // text: 'That was easy!',
            html: "<h1> Key Service ! </h1><p>\
            <h3>Bonjour "+userData.firstname+"</h3>\
             Si vous avez demandé à changer votre mot de passe, cliquer sur le lien ci-dessous!<br/>\
            <a href='http://www.f2i-cw22-ams.fr/changer-mot-de-passe/"+currentDateTime+"+++"+userData.email+"'>Click On This Link</a>\
            </p>"
        };

        mg.messages().send(mailOptions, function (error, info) {
         if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);    
            }
         });


         User.update(
      { tokenPassword: currentDateTime.toString() },
      { where: { id: userData.id } }
    )
      .then(() => {
        res.json({ status: 'user Updated!' })
      })
      .error(err => handleError(err))


  })

}

exports.sendPasswords = (req, res) => { 
  User.findOne({where:{email: req.body.email} }).then(user => {
    if (user) {
          let dateLink= req.body.linkDate;
          let dateLinkString=  dateLink.toString();
          console.log(user.tokenPassword);
          console.log(dateLink);
      if(user.tokenPassword== dateLink ){
          const { errors, isValid } = validateresetInput(req.body);
           if(!isValid){
               return res.status(400).json(errors);
           } 
          let newPassword = bcrypt.hashSync(req.body.password, 8);
          console.log(newPassword);
          User.update({ password: newPassword }, { where: {email: req.body.email} }).then(res.send({ user: "User was updated successfully!" }))
          .catch(err => {
           res.status(500).send({ user: err.user });
            });
       }
}
  }).catch(err => {
    res.status(500).send({ message: err.message });
  })

}



exports.signupEmploye = (req, res) => {
  // Save User to Database
  Employe.create({
    email: req.body.email,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    adress: req.body.adress,
    telephone: req.body.telephone,
    role : req.body.role,
    password: bcrypt.hashSync(req.body.password, 8)
  })
    .then(employe => {
      if (req.body.roles) {
        Role.findAll({
          where: {
            name: {
              [Op.or]: req.body.roles
            }
          }
        }).then(roles => {
          employe.setRoles(roles).then(() => {
            res.send({ message: "Employe was saved successfully!" });
          });
        });
      } else {
        // employe role = 1
        employe.setRoles([1]).then(() => {
          res.send({ message: "Employe was registered successfully!" });
        });
      }
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};


exports.signinEmploye = (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);
  if(!isValid){
      return res.status(400).json(errors);
  }   
  Employe.findOne({
    where: {
      email: req.body.email
    }
  })
    .then(employe => {
      if (!employe) {
        return res.status(404).send({ message: "Employe Not found." });
      }
      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        employe.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          token: null,
          message: "mot de passe invalide!"
        });
      }

      var employeToken = jwt.sign({ id: employe.id, firstname: employe.firstname, roles: employe.roles }, config.secret, {
        expiresIn: 86400 // 24 hours
      });

      var authorities = [];
      employe.getRoles().then(roles => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push("ROLE_" + roles[i].name.toUpperCase());
        }
        res.status(200).send({
          id: employe.id,
          email: employe.email,
          lastname : employe.lastname,
          firstname : employe.firstname,
          adress : employe.adress,
          role : employe.role,
          telephone : employe.telephone,
          roles: authorities,
          token: employeToken
        });
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};


exports.signout = (req, res) =>{
 res.clearCookie("token");
 res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
 res.header('Expires', '-1');
 res.header('Pragma', 'no-cache');
 res.redirect('/connexion');
}