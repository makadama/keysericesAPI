module.exports = (sequelize, Sequelize) => {
  const Ville = sequelize.define("villes", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    libelle: {
      type: Sequelize.STRING
    },
    nb_concierge: {
      type: Sequelize.INTEGER
    },
    statut: {
      type: Sequelize.BOOLEAN
    }
  });

  return Ville;
};