const db = require("../models");
const config = require("../config/auth.config");
const RendezVous = db.rendezVous;
const User = db.user;
const Logement = db.logement;
const Annonce = db.annonce;
const Validator = require("validator");
const isEmpty = require("is-empty");

function validateRDVInput(data) {
  let errors = {};
// Convert empty fields to an empty string so we can use validator functions
  
  data.heure_rdvTT = !isEmpty(data.heure_rdvTT) ? data.heure_rdvTT : "";
  data.type_rdv = !isEmpty(data.type_rdv) ? data.type_rdv : "";
 


  // time checks
  if (Validator.isEmpty(data.heure_rdvTT)) {
    errors.heure_rdvTT = "l'heure de  Rendez-vous est requise!";
  }
   // object checks
  if (Validator.isEmpty(data.type_rdv)) {
    errors.type_rdv = "l'objet du rendez-Vous est requis!";
  }

return {
    errors,
    isValid: isEmpty(errors)
  };
};




exports.getAll = (req, res) => {
  RendezVous.findAll()
    .then(function(result){
       res.status(200).send(result);
  })
};

exports.getOne = (req, res) => {
   RendezVous.findOne({
    where: {
      id: req.params.rendezVousId
    }
  })
  .then(rendez_Vous => {
      if (!rendez_Vous) {
        return res.status(404).send({ message: "Rendez-vous Not found." });
      }
  res.status(200).send(rendez_Vous);
   });
};

exports.createOne = (req, res) => {
  const { errors, isValid } = validateRDVInput(req.body);
  if(!isValid){
      return res.status(400).json(errors);
  }  
  
  RendezVous.findOne({
    where: {
      fk_voyageur: req.body.fk_voyageur, type_rdv: req.body.type_rdv
    }
  }).then(trouve=>{
     if (trouve) {
      return res.status(400).json({ message: "vous avez déja choisi ce type de Rendez-vous. Mais vous pouvez l'annuler et choisir une autre heure!" });
    }
    else{
        Annonce.findOne({
          where:{
            fk_voyageur: req.body.fk_voyageur
          }
        }).then(location =>{
          if(!location){
            return res.status(404).send({ message: "données non valides"})
          }
          else{
           
            if(!(req.body.date_rdv)){
          if(req.body.type_rdv==="checkin"){
              req.body.date_rdv= location.date_debut;
          }
            else if(req.body.type_rdv==="checkout") {
               req.body.date_rdv= location.date_fin;
          }
        }
        console.log(req.body.date_rdv);
        var events = new Date(req.body.heure_rdvTT);
        var time = events.toLocaleTimeString();
              RendezVous.create({
                date_rdv: req.body.date_rdv,
                heure_rdv: time,
                fk_voyageur: req.body.fk_voyageur,
                fk_logement: req.body.fk_logement,
                type_rdv: req.body.type_rdv
              }).then(rdv=>{
                res.status(200).send(rdv);
              }).catch(err => {
      res.status(500).send({ message: err.message });
    })   
          }
        })
    }
  }).catch(err =>{
       res.status(500).send({ message: err.message });    
        })
 
};

exports.updateOne = (req, res) => {
   const { errors, isValid } = validateRDVInput(req.body);
  if(!isValid){
      return res.status(400).json(errors);
  }  
    RendezVous.findOne({
    where: {
      id: req.params.rendezVousId
    }
  })
  .then(rendez_vous => {
      if (!rendez_vous) {
        return res.status(404).send({ message: "Rendez-vous Not found." });
      }
      
      rendez_vous.update({
          date_rdv: req.body.date_rdv,
          heure_rdv: req.body.heure_rdv,
          fk_voyageur: req.body.fk_voyageur,
          type_rdv: req.body.type_rdv,
          fk_logement: req.body.logementId}, {where: { id: req.params.rendezVousId}
      })
      .then(rdv=>{
    res.status(200).send(rdv);
  })
  .catch(err => {
      res.status(500).send({ message: err.message });
    });
      
  });
}

exports.deleteOne = (req, res) => {
     RendezVous.destroy({
        where : {id: req.params.rendezVousId}
    })
    .then(res.send({message : "Rendez-vous was deleted successfully"}))
}

exports.getAllFromVoyageur = (req, res) => {
  RendezVous.findAll({where: {fk_voyageur : req.params.voyageurId}})
    .then(function(result){
       res.status(200).send(result);
  })
}