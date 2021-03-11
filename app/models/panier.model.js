module.exports = (sequelize, Sequelize) => {
  const Panier = sequelize.define("paniers", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    prix: {
      type: Sequelize.FLOAT
    },
    libelle: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.STRING
    },
    imagePanier:{
      type: Sequelize.STRING
    },
    quantite: {
      type: Sequelize.INTEGER
    }
  });

  return Panier;
};