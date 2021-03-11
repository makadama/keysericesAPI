const db = require("../models");
const config = require("../config/auth.config");
const CommandeItem = db.commandeItem;


exports.getAll = (req, res) => {
  CommandeItem.findAll()
    .then(function(result){
       res.status(200).send(result);
  })
};

exports.getOne = (req, res) => {
   CommandeItem.findOne({
    where: {
      id: req.params.commandeItemId
    }
  })
  .then(oneCommande => {
      if (!oneCommande) {
        return res.status(404).send({ message: "Commande introuvable!" });
      }
  res.status(200).send(oneCommande);
   });
};

exports.createOne = (req, res) => {
  CommandeItem.create({
      nom: req.body.nom,
      quantite: req.body.quantite,
      prix: req.body.prix,
      image: req.body.image,
      description: req.body.description,
      qtEnStock: req.body.qtEnStock,
      prixUnitaire: req.body.prixUnitaire,
      fk_voyageur : req.body.fk_voyageur,
      fk_produit: req.body.fk_produit
  })
  .then(commande=>{
    res.send(commande)
  })
  .catch(err => {
      res.status(500).send({ message: err.message });
    });
  
};



exports.updateOne = (req, res) => {
    
    CommandeItem.findOne({
    where: {
      id: req.params.commandeItemId
    }
  })
  .then(commandeItem => {
      if (!commandeItem) {
        return res.status(404).send({ message: "Commande introuvable." });
      }
      
      commandeItem.update({
        nom: req.body.nom,
        quantite: req.body.quantite,
        prix: req.body.prix,
        image: req.body.image,
        description: req.body.description,
        qtEnStock: req.body.qtEnStock,
        prixUnitaire: req.body.prixUnitaire,
        fk_produit: req.body.fk_produit,
        fk_voyageur : req.body.fk_voyageur}, {where: { id: req.params.commandeItemId}
      })
      .then(oneCommande=>{
    res.status(200).send(oneCommande);
  })
  .catch(err => {
      res.status(500).send({ message: err.message });
    });
      
  });
}

exports.deleteOne = (req, res) => {
    CommandeItem.destroy({
        where : {id: req.params.commandeItemId}
    })
    .then(res.send({message : "Commande was deleted successfully"}))
}

exports.getAllFromVoyageur = (req, res) => {
  CommandeItem.findAll({where: {fk_voyageur : req.params.voyageurId}})
    .then(function(result){
       res.status(200).send(result);
  })
};
