const db = require("../models");
const config = require("../config/auth.config");
const Ville = db.ville;


exports.getAll = (req, res) => {
  Ville.findAll()
    .then(function(result){
       res.status(200).send(result);
  })
};

exports.getOne = (req, res) => {
   Ville.findOne({
    where: {
      id: req.params.villeId
    }
  })
  .then(ville => {
      if (!ville) {
        return res.status(404).send({ message: "Ville Not found." });
      }
  res.status(200).send({
          id: ville.id,
          libelle: ville.libelle,
          nb_concierge : ville.nb_concierge,
          statut : ville.statut
    });
   });
};

exports.createOne = (req, res) => {
  Ville.create({
     libelle: req.body.libelle,
     nb_concierge : req.body.nb_concierge,
     statut : req.body.statut
  })
  .then(res.send({ message: "Ville was saved successfully!" }))
  .catch(err => {
      res.status(500).send({ message: err.message });
    });
  
};

exports.updateOne = (req, res) => {
    Ville.findOne({
    where: {
      id: req.params.villeId
    }
  })
  .then(ville => {
      if (!ville) {
        return res.status(404).send({ message: "Ville Not found." });
      }
      
      ville.update({
          libelle: req.body.libelle,
          nb_concierge : req.body.nb_concierge,
          statut : req.body.statut
      })
      .then(res.send({ message: "Ville was updated successfully!" }))
        .catch(err => {
      res.status(500).send({ message: err.message });
    });
      
  });
}

exports.deleteOne = (req, res) => {
    Ville.destroy({
        where : {id: req.params.villeId}
    })
    .then(res.send({message : "Ville was deleted successfully"}))
}
