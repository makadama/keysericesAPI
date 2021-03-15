require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");



const app = express();
var nodemailer = require("nodemailer");


var whitelist = ['http://localhost:3000', 'https://ksbackoffice.herokuapp.com/', 'https://www.f2i-cw22-ams.fr/', 'https://ks-frontend.herokuapp.com/']

var options = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

/*var corsOptions = {
  origin: "http://localhost:3000"
};*/

app.use(cookieParser());
app.use(cors(options));


// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));


const db = require("./app/models");
const Role = db.role;
/*db.sequelize.sync().then(() => {
  console.log('Drop and Resync Db');
 
});*/

function initial() {
  Role.create({
    id: 1,
    name: "user"
  });
 
  Role.create({
    id: 2,
    name: "moderator"
  });
 
  Role.create({
    id: 3,
    name: "admin"
  });
}

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Key services API." });
});

require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
require('./app/routes/logement.routes')(app);
require('./app/routes/etat_logement.routes')(app);
require('./app/routes/ville.routes')(app);
require('./app/routes/tarif.routes')(app);
require('./app/routes/panier.routes')(app);
require('./app/routes/commande_panier.routes')(app);
require('./app/routes/service.routes')(app);
require('./app/routes/annonce.routes')(app);
require('./app/routes/disponibilite.routes')(app);
require('./app/routes/message.routes')(app);
require('./app/routes/tache.routes')(app);
require('./app/routes/employe.routes')(app);
require('./app/routes/mail.routes')(app);
require('./app/routes/image.routes')(app);
require('./app/routes/rendezVous.routes')(app);
require('./app/routes/produit.routes')(app);
require('./app/routes/commandeItem.routes')(app);
require('./app/routes/commandeDetail.routes')(app);
require('./app/routes/commande.routes')(app);
require('./app/routes/simulation.routes')(app);

global.__basedir = __dirname;


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running.`);
});