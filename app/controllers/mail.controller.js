const Validator = require("validator");
const isEmpty = require("is-empty");
var nodemailer = require("nodemailer");
const mailgun = require("mailgun-js");
require('dotenv').config();


//input validation
function validateContactInput(data) {
  let errors = {};
// Convert empty fields to an empty string so we can use validator functions
  data.bureau = !isEmpty(data.bureau) ? data.bureau : "";
  data.mailSubject = !isEmpty(data.mailSubject) ? data.mailSubject : "";
  data.firstname = !isEmpty(data.firstname) ? data.firstname : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.telephone = !isEmpty(data.telephone) ? data.telephone : ""; 
  data.mailContent = !isEmpty(data.mailContent) ? data.mailContent : "";


 //Bureau checks
 if (Validator.isEmpty(data.bureau)) {
    errors.bureau = "bureau field is required";
  }

  //MailSubject
  if (Validator.isEmpty(data.mailSubject)) {
    errors.mailSubject = "subject field is required";
  }

  // firstName checks
  if (Validator.isEmpty(data.firstname)) {
    errors.firstname = "firstname field is required";
  }

// Email checks
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }  
  
  // telephone checks
  if (Validator.isEmpty(data.telephone)) {
    errors.telephone = "telephone field is required";
  }

  // mailContent checks
  if (Validator.isEmpty(data.mailContent)) {
    errors.mailContent = "message field is required";
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



const mailoptions = {
  from: '<'+ req.body.email +'>',
  to: 'ratkhamamada@gmail.com',
  subject: req.body.mailSubject,
  html: "<h2> From Key Service website ! </h2><p>\
            <h3>bureau: "+req.body.bureau+"</h3>\
            <h3>Nom: "+req.body.firstname+"</h3>\
            <h3>Telephone: "+req.body.telephone+"</h3>\
            </p>\
            <p>"+req.body.mailContent+"</p>\
            "
};

mg.messages().send(mailoptions, function (error, info) {
   if (error) {
                return res.status(500).send({ message: error.message });;
            } else {
                console.log('Email sent: ' + info.response);
                return res.status(200).send({ 
          bureau: req.body.bureau,
          mailSubject: req.body.mailSubject,
          firstname: req.body.firstname,
          email: req.body.email,
          telephone: req.body.telephone
          });
                
            }
});


        
}