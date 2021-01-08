const db = require('../database/dbConfig');
const Patient = db.patient
const patientSchedule = db.patientSchedule;
const patientContact = db.patientContact;
const patientCuestionario = db.patientCuestionario;
const Cita = db.cita
const fs = require('fs')
const multer = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now())
    }
})

var upload = multer({ storage: storage }).single('image');

exports.patientProfile = (req, res) => {
	Patient.findOne({
		where: {id: req.userId},
		include: [patientContact, patientSchedule]
	}).then(profile => {
		res.json(profile)
	})
}

exports.getMySchedule = (req, res)  => {
	Cita.findAll({
		where: {PatientId: req.userId}
	}).then(citas => {
		res.json(citas)
	})
}

exports.updateProfile = (req, res) => {
	Patient.update({
		email: req.body.email,
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
	}, {
		where: { id: req.userId }
	},{
		multi: true
	});
	patientSchedule.update({
		lunes: req.body.lunes,
		martes: req.body.martes,
		miercoles: req.body.miercoles,
		jueves: req.body.jueves,
		viernes: req.body.viernes,
	}, {
		where: { id: req.userId }
	},{
		multi: true
	});
	patientContact.update({
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
	}, {
		where: { id: req.userId }
	},{
		multi: true
	}).then(user => {
		res.status(200).send(user);
	}).catch(err => {
		res.status(500).send("¡Fallo! Error -> " + err);
 	});
}

exports.updateImageProfile = function (req, res, next) {
	var id = req.userId
		upload(req, res, (err) => {
			if (err) {
				console.log('errors', error);
			} else {
				var imageData = fs.readFileSync(req.file.path);
				Patient.update(
					{ image: imageData },
					{ where: { userId: id } }
				).then(result => {
				  res.json({status: 200});
			  }
			  )
			  .catch(err => {
				  console.log('err');
			  }
			  )
			}
		});
}

exports.addCuestionario = (req, res) => {
	console.log(req.body)
	console.log(req.userId)
	patientCuestionario.create({
		pregunta1: req.body.pregunta1,
		pregunta2: req.body.pregunta2,
		pregunta3: req.body.pregunta3,
		pregunta4: req.body.pregunta4,
		pregunta5: req.body.pregunta5,
		pregunta6: req.body.pregunta6,
		pregunta7: req.body.pregunta7,
		pregunta8: req.body.pregunta8,
		pregunta9: req.body.pregunta9,
		pregunta10: req.body.pregunta10,
		pregunta11: req.body.pregunta11,
		pregunta12: req.body.pregunta12,
		pregunta13: req.body.pregunta13,
		pregunta14: req.body.pregunta14,
		pregunta15: req.body.pregunta15,
		pregunta16: req.body.pregunta16,
		pregunta17: req.body.pregunta17,
		pregunta18: req.body.pregunta18,
		pregunta19: req.body.pregunta19,
		pregunta20: req.body.pregunta20,
		pregunta21: req.body.pregunta21,
		pregunta22: req.body.pregunta22,
		pregunta23: req.body.pregunta23,
		pregunta24: req.body.pregunta24,
		pregunta25: req.body.pregunta25,
		pregunta26: req.body.pregunta26,
		pregunta27: req.body.pregunta27,
		pregunta28: req.body.pregunta28,
		pregunta29: req.body.pregunta29,
		pregunta30: req.body.pregunta30,
		pregunta31: req.body.pregunta31,
		pregunta32: req.body.pregunta32,
		pregunta33: req.body.pregunta33,
		pregunta34: req.body.pregunta34,
		pregunta35: req.body.pregunta35,
		pregunta36: req.body.pregunta36,
		pregunta37: req.body.pregunta37,
		pregunta38: req.body.pregunta38,
		pregunta39: req.body.pregunta39,
		pregunta40: req.body.pregunta40,
		pregunta41: req.body.pregunta41,
		pregunta42: req.body.pregunta42,
		pregunta43: req.body.pregunta43,
		pregunta44: req.body.pregunta44,
		pregunta45: req.body.pregunta45,
		pregunta46: req.body.pregunta46,
		pregunta47: req.body.pregunta47,
		pregunta48: req.body.pregunta48,
		pregunta49: req.body.pregunta49,
		pregunta50: req.body.pregunta50,
		pregunta51: req.body.pregunta51,
		pregunta52: req.body.pregunta52,
		pregunta53: req.body.pregunta53,
		pregunta54: req.body.pregunta54,
		pregunta55: req.body.pregunta55,
		pregunta56: req.body.pregunta56,
		pregunta57: req.body.pregunta57,
		pregunta58: req.body.pregunta58,
		pregunta59: req.body.pregunta59,
		pregunta60: req.body.pregunta60,
		pregunta61: req.body.pregunta61,
		pregunta62: req.body.pregunta62,
		pregunta63: req.body.pregunta63,
		pregunta64: req.body.pregunta64,
		pregunta65: req.body.pregunta65,
		pregunta66: req.body.pregunta66,
		pregunta67: req.body.pregunta67,
		pregunta68: req.body.pregunta68,
		pregunta69: req.body.pregunta69,
		pregunta70: req.body.pregunta70,
		pregunta71: req.body.pregunta71,
		pregunta72: req.body.pregunta72,
		pregunta73: req.body.pregunta73,
		pregunta74: req.body.pregunta74,
		pregunta75: req.body.pregunta75,
		pregunta76: req.body.pregunta76,
		pregunta77: req.body.pregunta77,
		pregunta78: req.body.pregunta78,
		pregunta79: req.body.pregunta79,
		pregunta80: req.body.pregunta80,
		pregunta81: req.body.pregunta81,
		pregunta82: req.body.pregunta82,
		pregunta83: req.body.pregunta83,
		pregunta84: req.body.pregunta84,
		pregunta85: req.body.pregunta85,
		pregunta86: req.body.pregunta86,
		pregunta87: req.body.pregunta87,
		pregunta88: req.body.pregunta88,
		pregunta89: req.body.pregunta89,
		pregunta90: req.body.pregunta90,
		PatientId: req.userId,
		id: req.userId
	}).then(user => {
		res.status(200).send(user);
	}).catch(err => {
		res.status(500).send("¡Fallo! Error -> " + err);
 	});
}