const db = require('../database/dbConfig');
const Psicologo = db.psicologo;
const User = db.user;
const Patient = db.patient;
const patientSchedule = db.patientSchedule;
const patientContact = db.patientContact;
const Role = db.role;

exports.getPsicologos = (req, res) => {
	Psicologo.findAll({
		attributes: ['nombre', 'primerApellido', 'segundoApellido', 'userId'],
		model: User,
		include: [{
			model: Role,
			where: {nombre: 'PSICOLOGO'},
			attributes: ['nombre'],
		}]
	}).then(user => {
		res.status(200).json(user);
  	}).catch(err => {
		res.status(500).send("¡Fallo! Error -> " + err);
 	})
}

exports.getPacientesAdmin = (req, res) => {
	Patient.findAll({
		attributes: ['nombre', 'primerApellido', 'segundoApellido', 'userId', 'nua'],
	}).then(user => {
		res.status(200).json(user);
  	}).catch(err => {
		res.status(500).send("¡Fallo! Error -> " + err);
 	})
}

exports.getPacienteAdmin = (req, res) => {
	Patient.findOne({
		where: {userId: req.params.id},
		include: [patientContact, patientSchedule]
	}).then(profile => {
		res.json(profile)
	}).catch(err => {
		res.status(500).json({
			"description": "Can not access Management Board",
			"error": err
		});
	})
}

exports.getPsicologoAdmin = (req, res) => {
	Psicologo.findOne({
		where: {userId: req.params.id}
	}).then(user => {
		res.status(200).json(user);
	}).catch(err => {
		res.status(500).json({
			"description": "Can not access Management Board",
			"error": err
		});
	})
}

exports.getSistemas = (req, res) => {
	Patient.findAndCountAll({
		where: {programaEducativo : 'Ingenieria en Sistemas Computacionales'}
	}).then(result => {
		res.status(200).json({
			"name": "Ingenieria en Sistemas Computacionales",
			"value": result.count
		});
		console.log(result.count);
	});
}

exports.getArtes = (req, res) => {
	Patient.findAndCountAll({
		where: {programaEducativo : 'Licenciatura en Artes Digitales'}
	}).then(result => {
		res.status(200).json({
			"name": "Licenciatura en Artes Digitales",
			"value": result.count
		});
		console.log(result.count);
	});
}

exports.getGestion = (req, res) => {
	Patient.findAndCountAll({
		where: {programaEducativo : 'Licenciatura en Gestion Empresarial'}
	}).then(result => {
		res.status(200).json({
			"name": "Licenciatura en Gestion Empresarial",
			"value": result.count
		});
		console.log(result.count);
	});
}

exports.getMecanica = (req, res) => {
	Patient.findAndCountAll({
		where: {programaEducativo : 'Ingenieria en Mecanica'}
	}).then(result => {
		res.status(200).json({
			"name": "Ingenieria en Mecanica",
			"value": result.count
		});
		console.log(result.count);
	});
}

exports.getElectrica = (req, res) => {
	Patient.findAndCountAll({
		where: {programaEducativo : 'Ingenieria en Electrica'}
	}).then(result => {
		res.status(200).json({
			"name": "Ingenieria en Electrica",
			"value": result.count
		});
		console.log(result.count);
	});
}

exports.getElectronica = (req, res) => {
	Patient.findAndCountAll({
		where: {programaEducativo : 'Ingenieria en Electronica y Comunicaciones'}
	}).then(result => {
		res.status(200).json({
			"name": "Ingenieria en Electronica y Comunicaciones",
			"value": result.count
		});
		console.log(result.count);
	});
}