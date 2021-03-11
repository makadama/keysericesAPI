const db = require("../models");
const config = require("../config/auth.config");
const Annonce = db.annonce;
const User = db.user;
const Logement = db.logement;
const Validator = require("validator");
const isEmpty = require("is-empty");

function validateAddedRentInput(data) {
  let errors = {};

  data.date_debut = !isEmpty(data.date_debut) ? data.date_debut : "";
  data.date_fin = !isEmpty(data.date_fin) ? data.date_fin : "";
  data.fk_logement = !isEmpty(data.fk_logement) ? data.fk_logement : "";
  data.fk_voyageur = !isEmpty(data.fk_voyageur) ? data.fk_voyageur : ""; 
 
  if (Validator.isEmpty(data.date_debut)) {
    errors.date_debut = "firstname field is required";
  }
   
  if (Validator.isEmpty(data.date_fin)) {
    errors.date_fin = "date_fin field is required";
  }
  
  if (Validator.isEmpty(data.fk_logement)) {
    errors.fk_logement = "adresse field is required";
  }
 
  if (Validator.isEmpty(data.fk_voyageur)) {
    errors.fk_voyageur = "fk_voyageur field is required";
  }
return {
    errors,
    isValid: isEmpty(errors)
  };
};



exports.getAll = (req, res) => {
  Annonce.findAll()
    .then(function(result){
       res.status(200).send(result);
  })
};

exports.getOne = (req, res) => {
   Annonce.findOne({
    where: {
      id: req.params.annonceId
    }
  })
  .then(annonce => {
      if (!annonce) {
        return res.status(404).send({ message: "Annonce Not found." });
      }
  res.status(200).send(annonce);
   });
};

exports.createOne = (req, res) => {
  const { errors, isValid } = validateAddedRentInput(req.body);
  if(!isValid){
      return res.status(400).json(errors);
  }  

  if(req.body.date_debut>=req.body.date_fin){
         return res.status(404).send({ message: "Dates invalides!" });
    }
     User.findOne({
      where: {
        id: req.body.fk_voyageur
      }
    }).then(user =>{
      if(!user){
         return res.status(404).send({ message: "ce voyageur n'existe pas!" });
      }
      else if(user.type!='voyageur'){
        return res.status(404).send({ message: "cette utilisateur n'est pas un voyageur!" });
      }
      else{

        Logement.findOne({
          where: {
            id: req.body.fk_logement
          }
        }).then(bien=>{
          if(!bien){
            return res.status(404).send({ message: "ce logement n'existe pas!" });
          }

          let tab = [];
  Annonce.findAll({where:{fk_logement: req.body.fk_logement}})
    .then(result=>{
      
      for(let i=0; i<result.length; i++){
        if(req.body.date_debut<result[i].date_fin && req.body.date_debut>=result[i].date_debut){
          tab.push('found')
        }
        else{
          tab.push('not_found')
        }
      }

      if(tab.includes('found')){
          return res.status(404).send({ message: "cette annonce existe déja!" });
      }
      else{
          Annonce.create({
                    date_debut : req.body.date_debut,
                    date_fin : req.body.date_fin,
                    fk_voyageur : req.body.fk_voyageur,
                    fk_logement : req.body.fk_logement
                })
                .then(ads=>{
                    res.status(200).send(ads);
                  })
                .catch(err => {
                    res.status(500).send({ message: err.message });
                }); 
            }
          }).catch(err => {
                    res.status(500).send({ message: err.message });
      })

        })

      }
    }).catch(err => {
                    res.status(500).send({ message: err.message });
      })

  

             
};


exports.updateOne = (req, res) => {
   if(!req.body.date_fin){
         return res.status(404).send({ message: "Dates invalides!" });
    }
    Annonce.findOne({
    where: {
      id: req.params.annonceId
    }
  })
  .then(annonce => {
      if (!annonce) {
        return res.status(404).send({ message: "Annonce Not found." });
      }
      
      Annonce.update({
          date_debut : req.body.date_debut,
          date_fin : req.body.date_fin,
          fk_voyageur : req.body.fk_voyageur,
          fk_logement : req.body.fk_logement}, { where: { id: req.params.annonceId}
      })
      .then(ads=>{
    res.status(200).send(ads);
  })
        .catch(err => {
      res.status(500).send({ message: err.message });
    });
      
  });
}

exports.deleteOne = (req, res) => {
    Annonce.destroy({
        where : {id: req.params.annonceId}
    })
    .then(res.send({message : "Annonce was deleted successfully"}))
}

exports.getAllFromVoyageur = (req, res) => {
  Annonce.findAll({where: {fk_voyageur : req.params.voyageurId}})
    .then(function(result){
       res.status(200).send(result);
  })
}

exports.getAllFromLogement = (req, res) => {
  Annonce.findAll({where: {fk_logement : req.params.logementId}})
    .then(function(result){
       res.status(200).send(result);
  })
}



