const db = require('../database/dbConfig');
const config = require('../database/config.js');
const ROLEs = config.ROLEs; 
const Patient = db.patient;
const User = db.user;

checkDuplicateEmail = (req, res, next) => {
	// -> Check Email is already in use
	for(let i=0; i<req.body.roles.length; i++){
		if (req.body.roles[i].toUpperCase() == 'ALUMNO')
		{
			Patient.findOne({ 
				where: {
					email: req.body.email
				} 
			}).then(user => {
				if(user){
					res.status(400).send("¡El correo electrónico ya está en uso!");
					return;
				}
					
				next();
			});
		}
		else {
			User.findOne({ 
				where: {
					email: req.body.email
				} 
			}).then(user => {
				if(user){
					res.status(400).send("¡El correo electrónico ya está en uso!");
					return;
				}
					
				next();
			});
		}
	}
}

checkRolesExisted = (req, res, next) => {	
	for(let i=0; i<req.body.roles.length; i++){
		if(!ROLEs.includes(req.body.roles[i].toUpperCase())){
			res.status(400).send(`¡No existe un Role = ${req.body.roles[i]}!`);
			return;
		}
	}
	next();
}

const signUpVerify = {};
signUpVerify.checkDuplicateEmail = checkDuplicateEmail;
signUpVerify.checkRolesExisted = checkRolesExisted;

module.exports = signUpVerify;