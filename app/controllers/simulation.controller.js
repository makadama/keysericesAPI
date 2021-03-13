require('dotenv').config();
const Validator = require("validator");
const isEmpty = require("is-empty");
var nodemailer = require("nodemailer");
const mailgun = require("mailgun-js");


//input validation
function validateContactInput(data) {
  let errors = {};
// Convert empty fields to an empty string so we can use validator functions
  data.firstname = !isEmpty(data.firstname) ? data.firstname : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.telephone = !isEmpty(data.telephone) ? data.telephone : ""; 
  data.ville = !isEmpty(data.ville) ? data.ville : ""; 
  data.adresse = !isEmpty(data.adresse) ? data.adresse : ""; 
  data.codePostal = !isEmpty(data.codePostal) ? data.codePostal : ""; 
  data.surface =  !isEmpty(data.surface) ? data.surface : "";
  data.capacite  = !isEmpty(data.capacite) ? data.capacite : ""; 
  data.nbChambre = !isEmpty(data.nbChambre) ? data.nbChambre : ""; 
  data.nbLit = !isEmpty(data.nbLit) ? data.nbLit : "";  
  data.nbSDB =  !isEmpty(data.nbSDB) ? data.nbSDB : ""; 
  data.etage = !isEmpty(data.etage) ? data.etage : ""; 
  data.dateDispo =  !isEmpty(data.dateDispo) ? data.dateDispo : ""; 
  data.duree  = !isEmpty(data.duree) ? data.duree : ""; 
  data.occupation  = !isEmpty(data.occupation) ? data.occupation : ""; 
  data.equipement  = !isEmpty(data.equipement) ? data.equipement : ""; 
  data.tarif  = !isEmpty(data.tarif) ? data.tarif : ""; 
  data.type  = !isEmpty(data.type) ? data.type : ""; 
  


  // firstName checks
  if (Validator.isEmpty(data.firstname)) {
    errors.firstname = "ce champ est requis";
  }
// Email checks
  if (Validator.isEmpty(data.email)) {
    errors.email = "ce champ est requis";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "l'adresse email est invalide";
  }  
  // telephone checks
  if (Validator.isEmpty(data.telephone)) {
    errors.telephone = "ce champ est requis";
  }

   if (Validator.isEmpty(data.ville)) {
    errors.ville = "ce champ est requis";
  }

   if (Validator.isEmpty(data.adresse)) {
    errors.adresse = "ce champ est requis";
  }

   if (Validator.isEmpty(data.codePostal)) {
    errors.codePostal = "ce champ est requis";
  }

 if (Validator.isEmpty(data.surface)) {
    errors.surface = "ce champ est requis";
  }

 if (Validator.isEmpty(data.capacite)) {
    errors.capacite = "ce champ est requis";
  }

   if (Validator.isEmpty(data.nbChambre)) {
    errors.nbChambre = "ce champ est requis";
  }

   if (Validator.isEmpty(data.nbLit)) {
    errors.nbLit = "ce champ est requis";
  }

   if (Validator.isEmpty(data.nbSDB)) {
    errors.nbSDB = "ce champ est requis";
  }

   if (Validator.isEmpty(data.etage)) {
    errors.etage = "ce champ est requis";
  }

   if (Validator.isEmpty(data.dateDispo)) {
    errors.dateDispo = "ce champ est requis";
  }

   if (Validator.isEmpty(data.duree)) {
    errors.duree = "ce champ est requis";
  }

   if (Validator.isEmpty(data.occupation)) {
    errors.occupation = "ce champ est requis";
  }

   if (Validator.isEmpty(data.equipement)) {
    errors.equipement = "ce champ est requis";
  }

 
 if (Validator.isEmpty(data.tarif)) {
    errors.tarif = "ce champ est requis";
  }

  if (Validator.isEmpty(data.type)) {
    errors.type = "ce champ est requis";
  }
 
 

return {
    errors,
    isValid: isEmpty(errors)
  };
};


exports.sendAnEMail  = (req, res)=> {

	const { errors, isValid } = validateContactInput(req.body);
  if(!isValid){
      return res.status(400).json(errors);
  } 

        var api_key = process.env.API_KEY; 
        var domain_name = process.env.DOMAINE_NAME;  
        const mg = mailgun({apiKey: api_key, domain: domain_name, host: process.env.HOST_N});

        var mailOptions = {
            from: '<'+ req.body.email +'>',
            to: 'ratkhamamada@gmail.com',
            subject: 'simulation',
            // text: 'That was easy!',
            html: "<h1> From Key Service website ! </h1><p>\
            <h2>Email: "+req.body.email+"</h2>\
            <h2>Nom: "+req.body.firstname+"</h2>\
            <h2>Telephone: "+req.body.telephone+"</h2>\
            </p>\
            <p>Ville: "+req.body.ville+"</p>\
            <p>Adresse: "+req.body.adresse+"</p>\
            <p>Code Postal: "+req.body.codePostal+"</p>\
            <p>Etage: "+req.body.nbChambre+"</p>\
             <p>Type: "+req.body.type+"</p>\
            <p>Surface: "+req.body.surface+"</p>\
            <p>Capacité: "+req.body.capacite+"</p>\
            <p>Nombre de Chambres: "+req.body.nbChambre+"</p>\
            <p>Nombre de lits: "+req.body.nbLit+"</p>\
            <p>Nombre de salles de bain: "+req.body.nbSDB+"</p>\
            <p>Disponible à partir de: "+req.body.dateDispo+"</p>\
            <p>occupation: "+req.body.occupation+"</p>\
            <p>Equipement: "+req.body.equipement+"</p>\
            <p>Tarif: "+req.body.tarif+"</p>"
        };


        mg.messages().send(mailOptions, function (error, info) {
        if (error) {
                return res.status(500).send({ message: error.message });;
            } else {
                console.log('Email sent: ' + info.response);
                return res.status(200).send({ 
                  firstname: req.body.firstname,
                  email: req.body.email,
                  telephone: req.body.telephone,
                  ville: req.body.ville,
                  adresse: req.body.adresse,
                  codePostal: req.body.codePostal,
                  type: req.body.type,
                  surface: req.body.surface,
                  capacite: req.body.capacite,
                  nbChambre: req.body.nbChambre,
                  nbLit: req.body.nbLit,
                  nbSDB : req.body.nbSDB,
                  etage: req.body.etage,
                  dateDispo: req.body.dateDispo,
                  duree: req.body.duree,
                  occupation: req.body.occupation,
                  equipement: req.body.equipement,
                  tarif: req.body.tarif
          });
                
            }
});

        

        
}