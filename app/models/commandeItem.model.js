module.exports = (sequelize, Sequelize) => {
  const CommandeItem = sequelize.define("commandeItems", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    nom:{
      type: Sequelize.STRING
    },
    quantite:{
      type: Sequelize.INTEGER
    },
    qtEnStock:{
      type: Sequelize.INTEGER
    },
     prix:{
      type: Sequelize.FLOAT
    }, 
    description:{
      type: Sequelize.TEXT
    },
    prixUnitaire:{
      type: Sequelize.FLOAT
    }, 
    image:{
      type: Sequelize.STRING
    }
  });

  return CommandeItem;
};