const db = require("../models");
const config = require("../config/auth.config");
const Tache = db.tache;
const Employe = db.employe
const Annonce = db.annonce
const Logement = db.logement
const Validator = require("validator");
const isEmpty = require("is-empty");


function validateAddedTaskInput(data) {
  let errors = {};

  data.libelle = !isEmpty(data.libelle) ? data.libelle : "";
  data.fk_logement = !isEmpty(data.fk_logement.toString()) ? data.fk_logement.toString() : ""; 
 
  if (Validator.isEmpty(data.libelle)) {
    errors.libelle = "firstname field is required";
  }
  if (Validator.isEmpty(data.fk_logement)) {
    errors.fk_logement = "fk_voyageur field is required";
  }
return {
    errors,
    isValid: isEmpty(errors)
  };
};



exports.getAll = (req, res) => {
  Tache.findAll()
    .then(function(result){
       res.status(200).send(result);
  })
};

exports.getOne = (req, res) => {
   Tache.findOne({
    where: {
      id: req.params.tacheId
    }
  })
  .then(tache => {
      if (!tache) {
        return res.status(404).send({ tache: "Tache Not found." });
      }
  res.status(200).send({
          id: tache.id,
          libelle: tache.libelle,
          date_tache : tache.date_tache,
          heure_tache : tache.heure_tache,
          fk_logement : tache.fk_logement
    });
   });
};


exports.createOne = (req, res) => {
  const { errors, isValid } = validateAddedTaskInput(req.body);
  if(!isValid){
       return res.status(400).json(errors);
  } 
  if(!(req.body.date_tache) || !(req.body.heure_tache)){
    return res.status(404).send({ message: "Veuillez remplir tous les champs requis (*)" });
  }
   Logement.findOne({
    where: {
      id: req.body.fk_logement
    }
  }).then(logement => {
      if (!logement) {
        return res.status(404).send({ message: "ce logement n'existe pas!" });
      }

      var events = new Date(req.body.heure_tache);
       var time = events.toLocaleTimeString();
      Tache.create({
          libelle: req.body.libelle,
          date_tache : req.body.date_tache,
          heure_tache : time,
          fk_logement : parseInt(req.body.fk_logement)
      })
      .then(tache=> {
        res.send(tache)
    })
      .catch(err => {
          res.status(500).send({ message: err.message });
        });

    }).catch(err => {
      res.status(500).send({ message: err.message });
    });
   
  
};

exports.updateOne = (req, res) => {
  const { errors, isValid } = validateAddedTaskInput(req.body);
  if(!isValid){
       return res.status(400).json(errors);
  } 
  if(!(req.body.date_tache) || !(req.body.heure_tache)){
    return res.status(404).send({ message: "Veuillez remplir tous les champs requis (*)" });
  }
    Tache.findOne({
    where: {
      id: req.params.tacheId
    }
  })
  .then(tache => {
      if (!tache) {
        return res.status(404).send({ message: "Tache introuvable." });
      }
      var events = new Date(req.body.heure_tache);
      var time = events.toLocaleTimeString();
      Tache.update({
          libelle: req.body.libelle,
          date_tache : req.body.date_tache,
          heure_tache : time,
          fk_logement : parseInt(req.body.fk_logement)
      }, {where: { id: req.params.tacheId} })
      .then(task=>{
    res.status(200).send(task);
  })
        .catch(err => {
      res.status(500).send({ tache: err.tache });
    });
      
  });
}

exports.deleteOne = (req, res) => {
    Tache.destroy({
        where : {id: req.params.tacheId}
    })
    .then(res.send({message : "Tache was deleted successfully"}))
}


//get All from User
exports.getAllForEmploye = (req, res) => {
  Tache.findAll({where: {id : req.params.employeId}})
    .then(function(result){
       res.status(200).send(result);
  })
};



