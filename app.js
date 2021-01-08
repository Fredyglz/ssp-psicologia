const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const routes = require('./routes/index.js'); 
app.use(cors());
const port = process.env.PORT || 3000;
// parse requests of content-type - application/json
app.use(bodyParser.json());
// 
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

const db = require('./database/dbConfig.js');
const Role = db.role;
db.sequelize.sync({force: true}).then(() => {
  console.log('Drop and Resync with { force: true }');
  initial();
});

app.use("/api", routes, function(req, res, next) {
    res.json('Hello Node Js')
}); // a middleware with  mount path
app.listen(port, () => {
    console.log(`listening on port ${port}`);
})

function initial(){
	Role.create({
		id: 1,
		nombre: "ALUMNO"
	});
	
	Role.create({
		id: 2,
		nombre: "PSICOLOGO"
	});
	
	Role.create({
		id: 3,
		nombre: "ADMINISTRADOR"
	});
}