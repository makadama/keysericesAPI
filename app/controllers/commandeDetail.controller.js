const db = require("../models");
const config = require("../config/auth.config");
const CommandeDetail = db.commandeDetail;


exports.getAll = (req, res) => {
  CommandeDetail.findAll()
    .then(function(result){
       res.status(200).send(result);
  })
};

exports.getOne = (req, res) => {
   CommandeDetail.findOne({
    where: {
      id: req.params.commandeDetailId
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
  CommandeDetail.create({
      nom: req.body.nom,
      quantite: req.body.quantite,
      prix: req.body.prix,
      image: req.body.image,
      description: req.body.description,
      qtEnStock: req.body.qtEnStock,
      prixUnitaire: req.body.prixUnitaire,
      fk_commande : req.body.fk_commande,
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
    
    CommandeDetail.findOne({
    where: {
      id: req.params.commandeDetailId
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
        fk_commande : req.body.fk_commande}, {where: { id: req.params.commandeItemId}
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
    CommandeDetail.destroy({
        where : {id: req.params.commandeDetailId}
    })
    .then(res.send({message : "Commande was deleted successfully"}))
}

exports.getAllFromVoyageur = (req, res) => {
  CommandeDetail.findAll({where: {fk_voyageur : req.params.voyageurId}})
    .then(function(result){
       res.status(200).send(result);
  })
};

exports.getAllFromCommande = (req, res) =>  {
  CommandeDetail.findAll({where: {fk_commande : req.params.commandeId}})
    .then(function(result){
       res.status(200).send(result);
  })
};

exports.deleteOrderDetails =  (req, res) => {
    CommandeDetail.destroy({
        where : {fk_commande: req.params.commandeId}
    })
    .then(res.send({message : "Commande was deleted successfully"}))
}
