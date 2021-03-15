const db = require("../models");
const config = require("../config/auth.config");
const Disponibilite = db.disponibilite;


exports.getAll = (req, res) => {
  Disponibilite.findAll()
    .then(function(result){
       res.status(200).send(result);
  })
};



exports.getAllByLogementId = (req, res) => {
    // check si logementId existe
  Disponibilite.findAll({where:{fk_logement: req.params.logementId}})
    .then(function(result){
       res.status(200).send(result);
  })
};

exports.getOne = (req, res) => {
   Disponibilite.findOne({
    where: {
      id: req.params.disponibiliteId
    }
  })
  .then(disponibilite => {
      if (!disponibilite) {
        return res.status(404).send({ message: "Disponibilite introuvable." });
      }
  res.status(200).send({
          id: disponibilite.id,
          date_debut: disponibilite.date_debut,
          date_fin: disponibilite.date_fin
    });
   });
};

exports.createOne = (req, res) => {
  if(req.body.date_debut>=req.body.date_fin){
         return res.status(404).send({ message: "Dates invalides!" });
    }
    let tab = [];
   Disponibilite.findAll({where:{fk_logement: req.body.logementId}})
    .then(result=>{
      
      for(let i=0; i<result.length; i++){
        if(req.body.date_debut<result[i].date_fin && req.body.date_debut>=result[i].date_debut){
          tab.push('found')
        }
        else{
          tab.push('not_found')
        }
      }

      if(tab.includes('found')){
          return res.status(404).send({ message: "cette disponibilité existe déja!" });
      }
      else{
         Disponibilite.create({
          date_debut: req.body.date_debut,
          date_fin: req.body.date_fin,
          fk_logement: req.body.logementId
        })
        .then(dispo=>{
          res.status(200).send(dispo);
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
          });
            }
          })
    

  
};

exports.updateOne = (req, res) => {
     if(req.body.date_debut>=req.body.date_fin){
         return res.status(404).send({ message: "Dates invalides!" });
    }
    Disponibilite.findOne({
    where: {
      id: req.params.disponibiliteId
    }
  })
  .then(disponibilite => {
      if (!disponibilite) {
        return res.status(404).send({ message: "Disponibilite introuvable." });
      }
      
      Disponibilite.update({
          date_debut: req.body.date_debut,
          date_fin: req.body.date_fin,
          fk_logement: req.body.logementId}, {where: { id: req.params.disponibiliteId}
      })
      .then(dispo=>{
    res.status(200).send(dispo);
  })
  .catch(err => {
      res.status(500).send({ message: err.message });
    });
      
  });
}

exports.deleteOne = (req, res) => {
    Disponibilite.destroy({
        where : {id: req.params.disponibiliteId}
    })
    .then(res.send({message : "Disponibilite was deleted successfully"}))
}
