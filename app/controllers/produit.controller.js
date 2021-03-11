const db = require("../models");
const config = require("../config/auth.config");
const Produit = db.produit;


exports.getAll = (req, res) => {
  Produit.findAll()
    .then(function(result){
       res.status(200).send(result);
  })
};

exports.getOne = (req, res) => {
   Produit.findOne({
    where: {
      id: req.params.produitId
    }
  })
  .then(oneProduit => {
      if (!oneProduit) {
        return res.status(404).send({ message: "Produit introuvable!" });
      }
  res.status(200).send(oneProduit);
   });
};

exports.createOne = (req, res) => {
  Produit.create({
      titre : req.body.titre,
      prix : req.body.prix,
      description : req.body.description,
      quantite : req.body.quantite,
      image: req.body.image

  })
  .then(produit=>{
    res.send(produit)
  })
  .catch(err => {
      res.status(500).send({ message: err.message });
    });
  
};



exports.updateOne = (req, res) => {
    
    Produit.findOne({
    where: {
      id: req.params.produitId
    }
  })
  .then(produit => {
      if (!produit) {
        return res.status(404).send({ message: "Produit introuvable." });
      }
      
      produit.update({
          titre: req.body.titre,
          image : req.body.image,
          description: req.body.description,
          quantite: req.body.quantite,
          prix: req.body.prix}, {where: { id: req.params.produitId}
      })
      .then(oneProduit=>{
    res.status(200).send(oneProduit);
  })
  .catch(err => {
      res.status(500).send({ message: err.message });
    });
      
  });
}

exports.deleteOne = (req, res) => {
    Produit.destroy({
        where : {id: req.params.produitId}
    })
    .then(res.send({message : "Produit was deleted successfully"}))
}
