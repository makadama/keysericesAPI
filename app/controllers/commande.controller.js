const db = require("../models");
const config = require("../config/auth.config");
const Commande = db.commande;


exports.getAll = (req, res) => {
  Commande.findAll()
    .then(function(result){
       res.status(200).send(result);
  })
};

exports.getOne = (req, res) => {
   Commande.findOne({
    where: {
      id: req.params.commandeId
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
  if(!(req.body.taxe)){
        req.body.taxe= 5;
      }
  Commande.create({
      adresse: req.body.adresse,
      codePostal: req.body.codePostal,
      nom: req.body.nom,
      email: req.body.email,
      numero: req.body.numero,
      ville: req.body.ville,
      modePaiement: req.body.modePaiement,
      taxe: req.body.taxe,
      isPaid: req.body.isPaid,
      paidAt: req.body.paidAt,
      total : req.body.total,
      fk_voyageur : req.body.fk_voyageur,

  })
  .then(commande=>{
    res.send(commande)
  })
  .catch(err => {
      res.status(500).send({ message: err.message });
    });
  
};



exports.updateOne = (req, res) => {
    
    Commande.findOne({
    where: {
      id: req.params.commandeId
    }
  })
  .then(commande => {
      if (!commande) {
        return res.status(404).send({ message: "Commande introuvable." });
      }
      
      commande.update({
      adresse: req.body.adresse,
      codePostal: req.body.codePostal,
      nom: req.body.nom,
      email: req.body.email,
      numero: req.body.numero,
      ville: req.body.ville,
      modePaiement: req.body.modePaiement,
      taxe: req.body.taxe,
      isPaid: req.body.isPaid,
      paidAt: req.body.paidAt,
      total : req.body.total,
      fk_voyageur : req.body.fk_voyageur}, {where: { id: req.params.commandeId}
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
    Commande.destroy({
        where : {id: req.params.commandeId}
    })
    .then(res.send({message : "Commande was deleted successfully"}))
}
