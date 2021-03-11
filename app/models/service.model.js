module.exports = (sequelize, Sequelize) => {
  const Service = sequelize.define("services", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    libelle: {
      type: Sequelize.STRING
    }
  });

  return Service;
};