module.exports = (sequelize, Sequelize) => {
  const Commande_panier = sequelize.define("commandes_panier", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    date_commande: {
      type: Sequelize.DATE
    },
    date_livree: {
      type: Sequelize.DATE
    }
  });

  return Commande_panier;
};