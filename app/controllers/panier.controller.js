const db = require("../models");
const config = require("../config/auth.config");
const Panier = db.panier;


exports.getAll = (req, res) => {
  Panier.findAll()
    .then(function(result){
       res.status(200).send(result);
  })
};

exports.getOne = (req, res) => {
   Panier.findOne({
    where: {
      id: req.params.panierId
    }
  })
  .then(panier => {
      if (!panier) {
        return res.status(404).send({ message: "Panier Not found." });
      }
  res.status(200).send({
          id: panier.id,
          libelle: panier.libelle,
          prix: panier.prix,
          description: panier.description,
          quantite: panier.quantite,
          imagePanier: panier.imagePanier

    });
   });
};

exports.createOne = (req, res) => {
  Panier.create({
      libelle : req.body.libelle,
      prix : req.body.prix,
      description : req.body.description,
      quantite : req.body.quantite,
      imagePanier: req.body.imagePanier

  })
  .then(panier=>{
    res.send({ message: "Panier was saved successfully!" })
  })
  .catch(err => {
      res.status(500).send({ message: err.message });
    });
  
};



exports.updateOne = (req, res) => {
    Panier.findOne({
    where: {
      id: req.params.panierId
    }
  })
  .then(panier => {
      if (!panier) {
        return res.status(404).send({ message: "Panier Not found." });
      }
      
      panier.update({
        libelle : req.body.libelle,
        prix : req.body.prix,
        description : req.body.description,
        quantite : req.body.quantite
      })
      .then(res.send({ message: "Panier was updated successfully!" }))
        .catch(err => {
      res.status(500).send({ message: err.message });
    });
      
  });
}

exports.deleteOne = (req, res) => {
    Panier.destroy({
        where : {id: req.params.panierId}
    })
    .then(res.send({message : "Panier was deleted successfully"}))
}
