const db = require('../database/dbConfig');
const config = require('../database/config.js');
const Patient = db.patient;
const Psicologo = db.psicologo;
const patientSchedule = db.patientSchedule;
const patientContact = db.patientContact;
const User = db.user;
const Role = db.role;
const fs = require('fs')
const multer = require('multer');

const Op = db.Sequelize.Op;
let aux;

var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now())
    }
})

var upload = multer({ storage: storage }).single('image');

exports.signup = (req, res) => {
    console.log('ads')
	User.create({
		email: req.body.email,
		password: bcrypt.hashSync(req.body.password, 8)
	}).then(user => {
		Patient.create({
			image: '',
			email: req.body.email,
			password: bcrypt.hashSync(req.body.password, 8),
			primerContacto: req.body.primerContacto,
			mesYAnioIngreso: req.body.mesYAnioIngreso,
			comoSeEntero: req.body.comoSeEntero,
			nombre: req.body.nombre,
			primerApellido: req.body.primerApellido,
			segundoApellido: req.body.segundoApellido,
			nua: req.body.nua,
			edad: req.body.edad,
			estadoCivil: req.body.estadoCivil,
			fechaNacimiento: req.body.fechaNacimiento,
			ciudadNacimiento: req.body.ciudadNacimiento,
			estadoNacimiento: req.body.estadoNacimiento,
			campus_enms: req.body.campus_enms,
			division_sede: req.body.division_sede,
			programaEducativo: req.body.programaEducativo,
			periodo: req.body.periodo,
			grado: req.body.grado,
			grupo: req.body.grupo,
			tipoPeriodo: req.body.tipoPeriodo,
			telefonoCelular: req.body.telefonoCelular,
			telefonoCasaCiudad: req.body.telefonoCasaCiudad,
			telefonoCasaOrigen: req.body.telefonoCasaOrigen,
			calleDomicilioCiudad: req.body.calleDomicilioCiudad,
			numeroDomicilioCiudad: req.body.numeroDomicilioCiudad,
			coloniaDomicilioCiudad: req.body.coloniaDomicilioCiudad,
			cpDomicilioCiudad: req.body.cpDomicilioCiudad,
			localidadDomicilioCiudad: req.body.localidadDomicilioCiudad,
			ciudadDomicilioCiudad: req.body.ciudadDomicilioCiudad,
			estadoDomicilioCiudad: req.body.estadoDomicilioCiudad,
			calleDomicilioOrigen: req.body.calleDomicilioOrigen,
			numeroDomicilioOrigen: req.body.numeroDomicilioOrigen,
			coloniaDomicilioOrigen: req.body.coloniaDomicilioOrigen,
			cpDomicilioOrigen: req.body.cpDomicilioOrigen,
			localidadDomicilioOrigen: req.body.localidadDomicilioOrigen,
			ciudadDomicilioOrigen: req.body.ciudadDomicilioOrigen,
			estadoDomicilioOrigen: req.body.estadoDomicilioOrigen,
			terminosYCondiciones: req.body.terminosYCondiciones,
			conAgenda: req.body.conAgenda,
			userId: user.dataValues.id,
			id: user.dataValues.id
		});
		patientSchedule.create({
			lunes: req.body.lunes,
			martes: req.body.martes,
			miercoles: req.body.miercoles,
			jueves: req.body.jueves,
			viernes: req.body.viernes,
			PatientId: user.dataValues.id,
			id: user.dataValues.id
		});
		patientContact.create({
			nombre: req.body.nombreC,
			primerApellido: req.body.primerApellidoC,
			segundoApellido: req.body.segundoApellidoC,
			telefonoCelular: req.body.telefonoCelularC,
			telefonoCasa: req.body.telefonoCasaC,
			calleDomicilio: req.body.calleDomicilioC,
			numeroDomicilio:req.body.numeroDomicilioC,
			coloniaDomicilio: req.body.coloniaDomicilioC,
			cpDomicilio: req.body.cpDomicilioC,
			localidadDomicilio: req.body.localidadDomicilioC,
			ciudadDomicilio: req.body.ciudadDomicilioC,
			estadoDomicilio: req.body.estadoDomicilioC,
			PatientId: user.dataValues.id,
			id: user.dataValues.id
		});
		Role.findAll({
			where: {
			  nombre: {
				[Op.or]: req.body.roles
			  }
			}
		  }).then(roles => {
				user.setRoles(roles).then(() => {
					res.send(user);
				});
		  }).catch(err => {
			  res.status(500).send("Error -> " + err);
		  });
	}).catch(err => {
		res.status(500).send("¡Fallo! Error -> " + err);
	});	
}

exports.signupPsicologo = (req, res) => {
	User.create({
		email: req.body.email,
		password: bcrypt.hashSync(req.body.password, 8)
	}).then(user => {
		Psicologo.create({
			image: '',
			email: req.body.email,
			password: bcrypt.hashSync(req.body.password, 8),
			nombre: req.body.nombre,
			primerApellido: req.body.primerApellido,
			segundoApellido: req.body.segundoApellido,
			edad: req.body.edad,
			estadoCivil: req.body.estadoCivil,
			fechaNacimiento: req.body.fechaNacimiento,
			ciudadNacimiento: req.body.ciudadNacimiento,
			estadoNacimiento: req.body.estadoNacimiento,
			telefonoCelular: req.body.telefonoCelular,
			telefonoCasa: req.body.telefonoCasa,
			calleDomicilio: req.body.calleDomicilio,
			numeroDomicilio: req.body.numeroDomicilio,
			coloniaDomicilio: req.body.coloniaDomicilio,
			cpDomicilio: req.body.cpDomicilio,
			localidadDomicilio: req.body.localidadDomicilio,
			ciudadDomicilio: req.body.ciudadDomicilio,
			estadoDomicilio: req.body.estadoDomicilio,
			userId: user.dataValues.id,
			id: user.dataValues.id
		});
		Role.findAll({
			where: {
			  nombre: {
				[Op.or]: req.body.roles
			  }
			}
		  }).then(roles => {
			  user.setRoles(roles).then(() => {
				  res.send(user);
			  });
		  }).catch(err => {
			  res.status(500).send("Error -> " + err);
		  });
	}).catch(err => {
		res.status(500).send("¡Fallo! Error -> " + err);
	});	
}

exports.signin = (req, res) => {
	console.log("Sign-In");
	User.findOne({
		where: {email: req.body.email}
	}).then(user => {
		if (!user)
			return res.status(404).send('¡Usuario no encontrado!.');

		var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
		if (!passwordIsValid) {
			return res.status(401).send("¡Contraseña incorrecta!");
		}
		
		var token = jwt.sign({ id: user.id }, config.secret, {
		expiresIn: 86400 // expires in 24 hours
		});

		var authorities = [];
		user.getRoles().then(roles => {
			for (let i = 0; i < roles.length; i++) {
				authorities.push('ROLE_' + roles[i].nombre);
			}
			res.status(200).send({
				auth: true,
				accessToken: token,
				email: user.email,
				authorities: authorities
			});
		})
	}).catch(err => {
		res.status(500).send('Error -> ' + err)
	});
}

