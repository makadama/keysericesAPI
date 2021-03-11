const db = require("../models");
const config = require("../config/auth.config");
const Etat_logement = db.etat_logement;


exports.getAll = (req, res) => {
  Etat_logement.findAll()
    .then(function(result){
       res.status(200).send(result);
  })
};

exports.getOne = (req, res) => {
   Etat_logement.findOne({
    where: {
      id: req.params.etat_logementId
    }
  })
  .then(etat_logement => {
      if (!etat_logement) {
        return res.status(404).send({ message: "Etat_logement Not found." });
      }
  res.status(200).send({
          id: etat_logement.id,
          etat: etat_logement.etat
    });
   });
};

exports.createOne = (req, res) => {
  Etat_logement.create({
      etat : req.body.etat
  })
  .then(res.send({ message: "Etat_logement was saved successfully!" }))
  .catch(err => {
      res.status(500).send({ message: err.message });
    });
  
};

exports.updateOne = (req, res) => {
    Etat_logement.findOne({
    where: {
      id: req.params.etat_logementId
    }
  })
  .then(etat_logement => {
      if (!etat_logement) {
        return res.status(404).send({ message: "Etat_logement Not found." });
      }
      
      etat_logement.update({
          etat: req.body.etat
      })
      .then(res.send({ message: "Etat_logement was updated successfully!" }))
        .catch(err => {
      res.status(500).send({ message: err.message });
    });
      
  });
}

exports.deleteOne = (req, res) => {
    Etat_logement.destroy({
        where : {id: req.params.etat_logementId}
    })
    .then(res.send({message : "Etat_logement was deleted successfully"}))
}
