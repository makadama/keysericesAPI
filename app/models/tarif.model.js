module.exports = (sequelize, Sequelize) => {
  const Tarif = sequelize.define("tarifs", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    libelle: {
      type: Sequelize.STRING
    },
    commission: {
      type: Sequelize.FLOAT
    }
  });

  return Tarif;
};