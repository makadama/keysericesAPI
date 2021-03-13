const db = require("../models");
const config = require("../config/auth.config");
const Logement = db.logement;
const Disponibilite = db.disponibilite;
const Validator = require("validator");
const isEmpty = require("is-empty");


//field validation for registration
function validateLogementInput(data) {
  let errors = {};
// Convert empty fields to an empty string so we can use validator functions
  
  data.fk_ville = !isEmpty(data.fk_ville.toString()) ? data.fk_ville.toString() : "";
  data.adresse = !isEmpty(data.adresse) ? data.adresse : "";
  data.code_postal = !isEmpty(data.code_postal) ? data.code_postal : "";
  data.type = !isEmpty(data.type) ? data.type : "";
  data.superficie  = !isEmpty(data.superficie.toString()) ? data.superficie.toString()   : "";
  data.nb_lits = !isEmpty(data.nb_lits.toString()) ? data.nb_lits.toString() : ""; 
  data.nb_sdb = !isEmpty(data.nb_sdb.toString()) ? data.nb_sdb.toString() : "";
 

  if (Validator.isEmpty(data.fk_ville)) {
    errors.fk_ville = "ce champ est requis";
  }
   
  if (Validator.isEmpty(data.adresse)) {
    errors.adresse = "ce champ est requis";
  }
  
  if (Validator.isEmpty(data.code_postal)) {
    errors.code_postal = "ce champ est requis";
  }

  if (Validator.isEmpty(data.type)) {
    errors.type = "ce champ est requis";
  }

  if (Validator.isEmpty(data.superficie )) {
    errors.superficie  = "ce champ est requis";
  }
  
if (Validator.isEmpty(data.nb_lits)) {
    errors.nb_lits = "ce champ est requis";
  }
if (Validator.isEmpty(data.nb_sdb)) {
    errors.nb_sdb = "ce champ est requis";
  }
return {
    errors,
    isValid: isEmpty(errors)
  };
};


function validateUpdateInput(data) {
  let errors = {};
// Convert empty fields to an empty string so we can use validator functions
  
  data.fk_ville = !isEmpty(data.fk_ville.toString()) ? data.fk_ville.toString() : "";
  data.adresse = !isEmpty(data.adresse) ? data.adresse : "";
  data.code_postal = !isEmpty(data.code_postal) ? data.code_postal : "";
 // data.type = !isEmpty(data.type) ? data.type : "";
  data.type = !isEmpty(data.type) ? data.type : "";
  data.superficie = !isEmpty(data.superficie.toString()) ? data.superficie.toString() : ""; 
  data.nb_lits = !isEmpty(data.nb_lits.toString()) ? data.nb_lits.toString() : "";
  data.nb_sdb = !isEmpty(data.nb_sdb.toString()) ? data.nb_sdb.toString() : "";


  // firstName checks
  if (Validator.isEmpty(data.fk_ville)) {
    errors.fk_ville = "ce champ est requis";
  }
   // lastName checks
  if (Validator.isEmpty(data.adresse)) {
    errors.adresse = "ce champ est requis";
  }
  // type checks
  /*if (Validator.isEmpty(data.type)) {
    errors.type = "type field is required";
  }*/
  // adress checks
  if (Validator.isEmpty(data.type)) {
    errors.type = "ce champ est requis";
  }
  // telephone checks
  if (Validator.isEmpty(data.code_postal)) {
    errors.code_postal = "ce champ est requis";
  }
 
// Password checks
if (Validator.isEmpty(data.superficie)) {
    errors.superficie = "ce champ est requis";
  }
if (Validator.isEmpty(data.nb_lits)) {
    errors.nb_lits = "ce champ est requis";
  }
  if (Validator.isEmpty(data.nb_sdb)) {
    errors.nb_sdb = "ce champ est requis";
  }

return {
    errors,
    isValid: isEmpty(errors)
  };
};


exports.getAll = (req, res) => {
  Logement.findAll()
    .then(function(result){
       res.status(200).send(result);
  })
};

exports.getOne = (req, res) => {
   Logement.findOne({
    where: {
      id: req.params.logementId
    }
  })
  .then(logement => {
      if (!logement) {
        return res.status(404).send({ message: "Logement introuvable." });
      }
  res.status(200).send(logement);
   });
};

exports.createOne = (req, res) => {
const { errors, isValid } = validateLogementInput(req.body);
  if(!isValid){
       return res.status(404).send({ message: "Veuillez remplir tous les champs requis (*)" });
  }  
  /*if(!(req.body.fk_hote)){
    req.body.fk_hote=req.userId;
  }*/
  if(!(req.body.fk_hote)){
   return res.status(400).json(errors);
  }
  Logement.create({
    fk_ville: parseInt(req.body.fk_ville),
    adresse: req.body.adresse,
    code_postal: req.body.code_postal,
    complement: req.body.complement,
    description: req.body.description,
    quartier: req.body.quartier,
    type: req.body.type,
    superficie: parseFloat(req.body.superficie),
    statut: req.body.statut,
    nb_lits: parseInt(req.body.nb_lits),
    nb_sdb: parseInt(req.body.nb_sdb),
    prix: req.body.prix, 
    fk_hote: req.body.fk_hote ,
    fk_tarif: req.body.fk_tarif
  })
  .then(logement => {
      if(req.body.disponibilites){
          req.body.disponibilites.forEach(element => 
            Disponibilite.create({
                date_debut: element.date_debut,
                date_fin: element.date_fin,
                fk_logement: logement.id
          })
        )
          
         return res.status(200).send(logement); 
      }
      else{
        return res.status(200).send(logement) ;
      }
  })
  .catch(err => {
      res.status(500).send({ message: err.message });
    });
  
};

exports.updateOne = (req, res) => {
 const { errors, isValid } = validateUpdateInput(req.body);
  if(!isValid){
      return res.status(400).json(errors);
  } 
    Logement.findOne({
    where: {
      id: req.params.logementId
    }
  })
  .then(logement => {
      if (!logement) {
        return res.status(404).send({ message: "Logement introuvable." });
      }
      Logement.update({
          fk_ville: parseInt(req.body.fk_ville),
          adresse: req.body.adresse,
          code_postal: req.body.code_Postal,
          complement: req.body.complement,
          description: req.body.description,
          type: req.body.type,
          quartier: req.body.quartier,
          superficie: parseFloat(req.body.superficie),
          statut: req.body.statut,
          nb_lits: parseInt(req.body.nb_lits),
          nb_sdb: parseInt(req.body.nb_sdb),
          prix: req.body.prix, 
          fk_tarif: req.body.fk_tarif,
          fk_hote: req.body.fk_hote}, {where: { id: req.params.logementId} }
      )
      .then(function(result){
         Logement.findOne({
            where: {
              id: req.params.logementId
            }
         }).then(bien => {
            if (!bien) {
              return res.status(404).send({ message: "Logement introuvable." });
            }
        res.status(200).send(bien);
         });
      });
}).catch(err => {
      res.status(500).send({ message: err.message });
    });
  
};



exports.deleteOne = (req, res) => {
    Logement.destroy({
        where : {id: req.params.logementId}
    })
    .then(res.send({message : "Logement was deleted successfully"}))
}


//get All from User
exports.getAllFromHote = (req, res) => {
  Logement.findAll({where: {fk_hote : req.params.hoteId}})
    .then(function(result){
       res.status(200).send(result);
  })
};



