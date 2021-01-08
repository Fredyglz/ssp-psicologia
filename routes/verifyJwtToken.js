const jwt = require('jsonwebtoken');
const config = require('../database/config.js');
const db = require('../database/dbConfig');
const User = db.user;

verifyToken = (req, res, next) => {
	let token = req.headers['x-access-token'];
  
	if (!token){
		return res.status(403).send({ 
			auth: false, message: 'No token provided.' 
		});
	}

	jwt.verify(token, config.secret, (err, decoded) => {
		if (err){
			return res.status(500).send({ 
					auth: false, 
					message: 'Fail to Authentication. Error -> ' + err 
				});
		}
		req.userId = decoded.id;
		next();
	});
}

isAdmin = (req, res, next) => {
	let token = req.headers['x-access-token'];
	User.findByPk(req.userId)
		.then(user => {
			user.getRoles().then(roles => {
				for(let i=0; i<roles.length; i++){
					console.log(roles[i].nombre);
					if(roles[i].nombre.toUpperCase() === "ADMINISTRADOR"){
						next();
						return;
					}
				}
				
				res.status(403).send("Require Admin Role!");
				return;
			})
		})
}

isPsicologoOrAdmin = (req, res, next) => {
	let token = req.headers['x-access-token'];
	User.findByPk(req.userId)
		.then(user => {
			user.getRoles().then(roles => {
				for(let i=0; i<roles.length; i++){					
					if(roles[i].nombre.toUpperCase() === "PSICOLOGO"){
						next();
						return;
					}
					
					if(roles[i].nombre.toUpperCase() === "ADMINISTRADOR"){
						next();
						return;
					}
				}
				
				res.status(403).send("Require Psicologo or Admin Roles!");
			})
		})
}


const authJwt = {};
authJwt.verifyToken = verifyToken;
authJwt.isAdmin = isAdmin;
authJwt.isPsicologoOrAdmin = isPsicologoOrAdmin;

module.exports = authJwt;