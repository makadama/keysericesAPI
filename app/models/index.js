const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    port: config.PORT,
    operatorsAliases: 0,
    dialectOptions: {
        useUTC: false, //for reading from database
       dateStrings: true,
      typeCast(field, next) {
                // for reading from database
                if (field.type === 'DATETIME') {
                    return field.string();
                }
                return next();
            }
    },
    timezone: 'Europe/Paris',
    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.employe = require("../models/employe.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);
db.annonce = require("../models/annonce.model.js")(sequelize, Sequelize);
db.logement = require("../models/logement.model.js")(sequelize, Sequelize);
db.etat_logement = require("../models/etat_logement.model.js")(sequelize, Sequelize);
db.disponibilite = require("../models/disponibilite.model.js")(sequelize, Sequelize);
db.ville = require("../models/ville.model.js")(sequelize, Sequelize);
db.tarif = require("../models/tarif.model.js")(sequelize, Sequelize);
db.panier = require("../models/panier.model.js")(sequelize, Sequelize);
db.service = require("../models/service.model.js")(sequelize, Sequelize);
db.commande_panier = require("../models/commande_panier.model.js")(sequelize, Sequelize);
db.message = require("../models/message.model.js")(sequelize, Sequelize);
db.tache = require("../models/tache.model.js")(sequelize, Sequelize);
db.images = require("../models/image.model.js")(sequelize, Sequelize);
db.rendezVous = require("../models/rendezVous.model.js")(sequelize, Sequelize);
db.produit = require("../models/produit.model.js")(sequelize, Sequelize);
db.commande = require("../models/commande.model.js")(sequelize, Sequelize);
db.commandeItem = require("../models/commandeItem.model.js")(sequelize, Sequelize);
db.commandeDetail = require("../models/commandeDetail.model.js")(sequelize, Sequelize);

db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId"
});

db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId"
});

db.role.belongsToMany(db.employe, {
  through: "employe_roles",
  foreignKey: "roleId",
  otherKey: "employeId"
});


db.employe.belongsToMany(db.role, {
  through: "employe_roles",
  foreignKey: "employeId",
  otherKey: "roleId"
});


db.annonce.belongsTo(db.user, {foreignKey: {name: 'fk_voyageur'}});
db.annonce.belongsTo(db.logement, {foreignKey: {name: 'fk_logement'}});//-------

db.logement.hasMany(db.disponibilite, {foreignKey: {name: 'fk_logement'}});
db.logement.belongsTo(db.user, {foreignKey: {name: 'fk_hote'}});
db.logement.hasMany(db.images,  {foreignKey:{name: 'fk_logement'}});//------

db.ville.hasMany(db.logement, {foreignKey: {name: 'fk_ville'}} );
db.logement.belongsTo(db.ville, {foreignKey: {name: 'fk_ville'}});

/*db.service.belongsToMany(db.tarif, {through: "service_tarif",
  foreignKey: "fk_service",
  otherKey: "fk_tarif"});
db.tarif.belongsToMany(db.service, {through: "service_tarif",
  foreignKey: "fk_tarif",
  otherKey: "fk_service"});*/


db.service.belongsTo(db.tarif, {foreignKey: {name: 'fk_tarif'}} )



db.logement.belongsTo(db.tarif, {foreignKey: {name: 'fk_tarif'}} )

db.commande_panier.belongsTo(db.panier, {foreignKey:{name: 'fk_panier'}});
db.commande_panier.belongsTo(db.user, {foreignKey:{name: 'fk_user'}});

db.message.belongsTo(db.user, {foreignKey:{name: 'fk_auteur'}});
db.message.belongsTo(db.user, {foreignKey:{name: 'fk_destinataire'}});

db.tache.belongsTo(db.logement, {foreignKey: {name: 'fk_logement'}});

db.rendezVous.belongsTo(db.user, {foreignKey: {name: 'fk_voyageur'}});
db.rendezVous.belongsTo(db.logement, {foreignKey: {name: 'fk_logement'}});//-------

db.commandeItem.belongsTo(db.produit, {foreignKey: {name: 'fk_produit'}});
db.commandeItem.belongsTo(db.user, {foreignKey:{name: 'fk_voyageur'}});
db.commande.belongsTo(db.user, {foreignKey: {name: 'fk_voyageur'}});//-------

db.commande.hasMany(db.commandeDetail, {foreignKey: { name: 'fk_commande'}});
db.produit.hasMany(db.commandeDetail, {foreignKey: {name: 'fk_produit'}});


db.ROLES = ["user", "admin", "moderator"];

module.exports = db;