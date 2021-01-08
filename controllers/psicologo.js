const db = require('../database/dbConfig');
const Psicologo = db.psicologo;
const Patient = db.patient;
const Cita = db.cita;
const patientSchedule = db.patientSchedule;
const User = db.user;
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

exports.psicologoBoard = (req, res) => {
	Psicologo.findOne({
		where: {id: req.userId}
	}).then(user => {
		res.status(200).json(user);
	}).catch(err => {
		res.status(500).json({
			"description": "Can not access Management Board",
			"error": err
		});
	})
}

exports.getPacients = (req, res) => {
	Patient.findAll({
		where: {conAgenda: false},
		attributes: ['nua', 'userId', 'nombre', 'primerApellido', 'segundoApellido'],
	}).then(user => {
		res.status(200).json(user);
  })
}

exports.getMyPacients = (req, res)  => {
	Cita.findAll({
		where: {PsicologoId: req.userId},
		group: ['PatientId'],
		order: [
            ['createdAt', 'DESC']
        ],
		include: [{
			model: Patient
		}]
	}).then(patients => {
		res.status(200).json(patients)
	})
}

exports.getMyScheduleById = (req, res)  => {
	Cita.findAll({
		where: {PatientId: req.params.id}
	}).then(citas => {
		res.json(citas)
	})
}

exports.getPacient = (req, res) => {
	patientSchedule.findOne({
		where: {PatientId: req.params.userId},
		attributes: ['lunes', 'martes', 'miercoles', 'jueves', 'viernes']
	}).then(user => {
		res.status(200).json(user);
	})
} 

exports.agendarCita = (req, res) => {
	Cita.create({
		title: req.body.title,
		start: req.body.start,
		end: req.body.end,
		duracion: req.body.duracion,
		className: req.body.className,
		description: req.body.description,
		PatientId: req.body.pacienteId,
		PsicologoId: req.userId
	}).then(user => {
		Patient.update({conAgenda:  req.body.conAgenda}, {
			where: {id: req.body.pacienteId}
		}).then(resp => {
			res.send(resp);
		});
	}).catch(err => {
		res.status(500).send("¡Fallo! Error -> " + err);
 	});
}

exports.actualizarCita = (req, res) => {
	console.log(req.body)
	Cita.update({
		title: req.body.title,
		start: req.body.start,
		end: req.body.end,
		duracion: req.body.duracion,
		className: req.body.className,
		description: req.body.description,
		PatientId: req.body.pacienteId,
		PsicologoId: req.userId
	},{
		where: { id:  req.body.id }
	},{
		multi: true
	}).then(user => {
		Patient.update({conAgenda:  req.body.conAgenda}, {
			where: {id: req.body.pacienteId}
		})
		res.status(200).send(user);
	}).catch(err => {
		res.status(500).send("¡Fallo! Error -> " + err);
 	});
}

exports.eliminarCita = (req, res) => {
	const id = req.params.id;
	Cita.findOne({
		where: { id: id },
		include: [{
			model: Patient
		}]
	}).then(resp => {
		aux = resp.Patient.id
		Cita.destroy({
			where: { id: req.params.id }
		}).then(resp => {
			Cita.findAll({
				where: { PatientId: aux }
			}).then(resp => {
				if(resp.length > 0){
					res.status(200).send(resp);
				} else {
					Patient.update({
						conAgenda: false
					},{
						where: {id: aux}
					}).then(resp => {
						res.status(200).send(resp);
					})
				}
			}).catch(err => {
			})
		});
	})
}

exports.updateProfile = (req, res) => {
	Psicologo.update({
		email: req.body.email,
		nombre: req.body.nombre,
		primerApellido: req.body.primerApellido,
		segundoApellido: req.body.segundoApellido,
		edad: req.body.edad,
		estadoCivil: req.body.estadoCivil,
		fechaNacimiento: req.body.fechaNacimiento,
		ciudadNacimiento: req.body.ciudadNacimiento,
		estadoNacimiento: req.body.estadoNacimiento,
		telefonoCelular: req.body.telefonoCelular,
		telefonoCasa: req.body.telefonoCasaCiudad,
		calleDomicilio: req.body.calleDomicilioCiudad,
		numeroDomicilio: req.body.numeroDomicilioCiudad,
		coloniaDomicilio: req.body.coloniaDomicilioCiudad,
		cpDomicilio: req.body.cpDomicilioCiudad,
		localidadDomicilio: req.body.localidadDomicilioCiudad,
		ciudadDomicilio: req.body.ciudadDomicilioCiudad,
		estadoDomicilio: req.body.estadoDomicilioCiudad,
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
				Psicologo.update(
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