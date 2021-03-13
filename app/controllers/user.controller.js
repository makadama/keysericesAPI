require("dotenv").config();
const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const jwt = require("jsonwebtoken");
const jwtdecode = require("jwt-decode");
const Validator = require("validator");
const isEmpty = require("is-empty");
var bcrypt = require("bcryptjs");
const mailgun = require("mailgun-js");


function validateUpdateInput(data) {
  let errors = {};
// Convert empty fields to an empty string so we can use validator functions
  
  data.email = !isEmpty(data.email) ? data.email : "";
  data.firstname = !isEmpty(data.firstname) ? data.firstname : "";
  data.lastname = !isEmpty(data.lastname) ? data.lastname : "";
 // data.type = !isEmpty(data.type) ? data.type : "";
  data.adress = !isEmpty(data.adress) ? data.adress : "";
  data.telephone = !isEmpty(data.telephone) ? data.telephone : ""; 
  
// Email checks
  if (Validator.isEmpty(data.email)) {
    errors.email = "ce champ est requis";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "l'adresse email est invalide";
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
 

return {
    errors,
    isValid: isEmpty(errors)
  };
};



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
    errors.password2 = "mots de passe non identiques";
  }
return {
    errors,
    isValid: isEmpty(errors)
  };
};


function getUser(req){
  
}


exports.getAll = (req, res) => {
  User.findAll()
    .then(function(result){
       res.status(200).send(result);
  })
};

exports.getOne = (req, res) => {
   User.findOne({
    where: {
      id: req.params.userId
    }
  })
  .then(user => {
      if (!user) {
        return res.status(404).send({ user: "utilisateur introuvable" });
      }
  res.status(200).send({
          id: user.id,
          lastname: user.lastname,
          firstname : user.firstname,
          email : user.email,
          password : user.password,
          adress : user.adress,
          telephone : user.telephone,
          type : user.type
    });
   });
};

exports.createOne = (req, res) => {
  User.create({
          lastname: req.body.lastname,
          firstname : req.body.firstname,
          email : req.body.email,
          password : req.body.password,
          adress : req.body.adress,
          telephone : req.body.telephone,
          type : req.body.type
  })
  .then(res.send({ user: "User was saved successfully!" }))
  .catch(err => {
      res.status(500).send({ user: err.user });
    });
  
};




exports.createNewOne = (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);
  if(!isValid){
      return res.status(400).json(errors);
  }  
  // Save User to Database
  User.findOne({where:{email: req.body.email} }).then(user => {
    if (user) {
      return res.status(400).json({ email: "l'email existe déja" });
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
            res.send(user);
          });
        });
      } else {
        // user role = 1
        user.setRoles([1]).then(() => {
          res.send(user);
        });
      }
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
}
  });
};


exports.updateOne = (req, res) => {
   const { errors, isValid } = validateUpdateInput(req.body);
  if(!isValid){
      return res.status(400).json(errors);
  }  
  if(req.body.password && req.body.password2 && req.body.password3){
      if (!Validator.isLength(req.body.password2, { min: 6, max: 30 })) {
        return res.status(404).send({message: "le mot de passe doit avoir au moins 6 caractères"});
      }
      if (!Validator.equals(req.body.password2, req.body.password3)) {
        return res.status(404).send({message: "les mots de passes ne correspondent pas!"});
      }
      User.findOne({
    where: {
      id: req.params.userId
    }
  })
  .then(user => {
      if (!user) {
        return res.status(404).send({ message: "utilisateur introuvable." });
      }

       var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );
      if (!passwordIsValid) {
        return res.status(401).send({
          message: "le mot de passe est incorrecte!"
        });
      }
      
      User.update({
          lastname: req.body.lastname,
          firstname : req.body.firstname,
          email : req.body.email,
          password : bcrypt.hashSync(req.body.password2, 8),
          adress : req.body.adress,
          telephone : req.body.telephone,
          type : req.body.type},
          { where: {id: req.params.userId} })
      .then(function(result){
         User.findOne({
            where: {
              id: req.params.userId
            }
         }).then(userUpdated => {
            if (!userUpdated) {
              return res.status(404).send({ message: "l'utilisateur est introuvable." });
            }
       return res.status(200).send(userUpdated);
         });
      });
        
      
  }).catch(err => {
      res.status(500).send({ message: err.user });
    });
  }


else{

    User.findOne({
    where: {
      id: req.params.userId
    }
  })
  .then(user => {
      if (!user) {
        return res.status(404).send({ user: "utilisateur introuvable." });
      }
      
      User.update({
          lastname: req.body.lastname,
          firstname : req.body.firstname,
          email : req.body.email,
          password : req.body.password,
          adress : req.body.adress,
          telephone : req.body.telephone,
          type : req.body.type},
          { where: {id: req.params.userId} })
      .then(function(result){
         User.findOne({
            where: {
              id: req.params.userId
            }
         }).then(userUpdated => {
            if (!userUpdated) {
              return res.status(404).send({ message: "utilisateur introuvable." });
            }
        res.status(200).send(userUpdated);
         });
      });
        
      
  }).catch(err => {
      res.status(500).send({ message: err.user });
    });
}
}

exports.deleteOne = (req, res) => {
    User.destroy({
        where : {id: req.params.userId}
    })
    .then(res.send({user : "User was deleted successfully"}))
}


exports.getCurrentUser = (req, res) => {
    
  const token =
            req.body.token ||
            req.query.token ||
            req.headers['x-access-token'] ||
            req.cookies.token;
        if (!token) {
            res.status(401).send('Unauthorized: No token provided');
        } else {
            jwt.verify(token, config.secret, function (err, decoded) {
                if (err) {
                    console.log(err, "error")
                    res.status(401).send('Unauthorized: Invalid token');
                } else {
                    res.send({
                      id: decoded.id,
                      firstname: decoded.firstname,
                      type: decoded.type,
                      email: decoded.email,
                      telephone: decoded.telephone
                    })
                }
            });
        }
  
}


exports.sendLinkByEmail = (req, res) =>{
  User.findOne({
    where: {
      email: req.body.email
    }
  }).then(userData=>{
    if(!userData){
      return res.status(400).json({ message: "l'utilisateur n'existe pas!" });
    }

        var api_key = process.env.API_KEY; 
        var domain_name = process.env.DOMAINE_NAME;; 
        const mg = mailgun({apiKey: api_key, domain: domain_name, host:process.env.HOST_N});


        var currentDateTime = new Date();
        var mailOptions = {
            from: 'Key Services <ratkhamamada@gmail.com>',
            to: req.body.email,
            subject: 'Password Reset',

            // text: 'That was easy!',
            html: "<h1> Key Service ! </h1><p>\
            <h3>Bonjour "+userData.firstname+"</h3>\
            <p>Votre compte key services a été créé</p>\
            <p>votre email est "+userData.email+"<p>\
            veuillez cliquer sur le lien ci-dessous pour changer votre mot de passe!<br/>\
            <a href='http://www.f2i-cw22-ams.fr/changer-mot-de-passe/"+currentDateTime+"+++"+userData.email+"'>Cliquer ici</a>\
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