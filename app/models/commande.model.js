module.exports = (sequelize, Sequelize) => {
  const Commande = sequelize.define("commandes", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    nom:{
      type: Sequelize.STRING
    },
    email:{
      type: Sequelize.STRING
    },
    numero:{
      type: Sequelize.STRING
    },
    adresse:{
      type: Sequelize.STRING
    },
    codePostal:{
      type: Sequelize.STRING
    },
    modePaiement:{
      type: Sequelize.STRING
    },
    ville:{
      type: Sequelize.STRING
    },
    taxe:{
      type: Sequelize.INTEGER
    },
    isPaid:{
      type: Sequelize.BOOLEAN
    },
    paidAt:{
      type: Sequelize.DATE
    },
    total:{
      type: Sequelize.FLOAT
    }
  });

  return Commande;
};