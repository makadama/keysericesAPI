module.exports = (sequelize, Sequelize) => {
  const Produit = sequelize.define("produits", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    titre: {
      type: Sequelize.STRING
    },
    prix: {
      type: Sequelize.FLOAT
    },
    image:{
      type: Sequelize.STRING
    },
    quantite: {
      type: Sequelize.INTEGER
    }, 
    description:{
      type: Sequelize.TEXT
    }
  });

  return Produit;
};