module.exports = (sequelize, Sequelize) => {
  const Message = sequelize.define("messages", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    message: {
      type: Sequelize.STRING
    },
    date_envoi: {
      type: Sequelize.DATE
    }
  });

  return Message;
};