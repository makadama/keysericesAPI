const db = require("../models");
const config = require("../config/auth.config");
const Commande_panier = db.commande_panier;
const User = db.user;
const Panier = db.panier;


exports.getAll = (req, res) => {
  Commande_panier.findAll()
    .then(function(result){
       res.status(200).send(result);
  })
};

exports.getOne = (req, res) => {
   Commande_panier.findOne({
    where: {
      id: req.params.commande_panierId
    }
  })
  .then(commande_panier => {
      if (!commande_panier) {
        return res.status(404).send({ message: "Commande_panier Not found." });
      }
  res.status(200).send({
          id: commande_panier.id,
          date_commande: commande_panier.date_commande,
          date_livree: commande_panier.date_livree,
          fk_panier: commande_panier.fk_panier,
          fk_user: commande_panier.fk_user
    });
   });
};

exports.createOne = (req, res) => {
 Panier.findOne({
     where:{
         id:req.body.fk_panier
     }
 })
 .then(tarif =>{
     console.log("TARIF " + tarif);
     if(!tarif){
         return res.status(404).send({message:"Le panier associé n'existe pas"})
     }
     else{
         User.findOne({
             where:{
                 id:req.body.fk_user
            }
        })
        .then(user =>{
             console.log("TARIF " + tarif);
        if(!user){
            return res.status(404).send({message:"User associé n'existe pas"})
        }
        else{
            Commande_panier.create({
                date_commande: req.body.date_commande,
                date_livree: req.body.date_livree,
                fk_user : req.body.fk_user,
                fk_panier : req.body.fk_panier
            })
            .then(res.send({ message: "Commande_panier was saved successfully!" }))
            .catch(err => {
                res.status(500).send({ message: err.message });
            });
         }
      })
     }
 })
    
    

  
};

exports.updateOne = (req, res) => {
    Commande_panier.findOne({
    where: {
      id: req.params.commande_panierId
    }
  })
  .then(commande_panier => {
      if (!commande_panier) {
        return res.status(404).send({ message: "Commande_panier Not found." });
      }
      
      commande_panier.update({
          date_commande: req.body.date_commande,
          /*date_livree: req.body.date_livree,*/
          fk_user : req.body.fk_user,
          fk_panier : req.body.fk_panier
      })
      .then(res.send({ message: "Commande_panier was updated successfully!" }))
        .catch(err => {
      res.status(500).send({ message: err.message });
    });
      
  });
}

exports.deleteOne = (req, res) => {
    Commande_panier.destroy({
        where : {id: req.params.commande_panierId}
    })
    .then(res.send({message : "Commande_panier was deleted successfully"}))
}
