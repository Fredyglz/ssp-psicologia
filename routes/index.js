const authJwt = require('./verifyJwtToken');
const verifySignUp = require('./verifySignUp');

const express = require("express");
const router = express.Router();

const controller = require('../controllers/controller');
const patient = require('../controllers/patient');
const psicologo = require('../controllers/psicologo');
const admin = require('../controllers/admin');

// RUTAS

// AUTH
router.route('/auth/signup').post([verifySignUp.checkDuplicateEmail, verifySignUp.checkRolesExisted], controller.signup);

router.route('/auth/signin').post(controller.signin);

router.route('/auth/psicologo').post([verifySignUp.checkDuplicateEmail, verifySignUp.checkRolesExisted], controller.signupPsicologo);

// PACIENTE
router.route('/patient-profile').get([authJwt.verifyToken], patient.patientProfile);

router.route('/alumno/miscitas').get([authJwt.verifyToken], patient.getMySchedule);

router.route('/user/paciente/profile').post([authJwt.verifyToken], patient.updateProfile);

router.route('/user/paciente/profile/image').post([authJwt.verifyToken], patient.updateImageProfile);

router.route('/user/paciente/cuestionario').post([authJwt.verifyToken], patient.addCuestionario);

// PSICOLOGO
router.route('/psicologo').get([authJwt.verifyToken, authJwt.isPsicologoOrAdmin], psicologo.psicologoBoard);

router.route('/pacientes').get(psicologo.getPacients);

router.route('/mispacientes').get([authJwt.verifyToken, authJwt.isPsicologoOrAdmin], psicologo.getMyPacients);

router.route('/alumno/miscitas/:id').get([authJwt.verifyToken], psicologo.getMyScheduleById);

router.route('/paciente/:userId').get(psicologo.getPacient);

router.route('/paciente/agendarcita').post([authJwt.verifyToken, authJwt.isPsicologoOrAdmin], psicologo.agendarCita);

router.route('/paciente/actualizarcita').put([authJwt.verifyToken, authJwt.isPsicologoOrAdmin], psicologo.actualizarCita);

router.route('/paciente/eliminarcita/:id').delete([authJwt.verifyToken, authJwt.isPsicologoOrAdmin], psicologo.eliminarCita);

router.route('/user/psicologo/profile').post([authJwt.verifyToken], psicologo.updateProfile);

router.route('/user/psicologo/profile/image').post([authJwt.verifyToken], psicologo.updateImageProfile);

// ADMIN
router.route('/admin/pacientes').get([authJwt.verifyToken, authJwt.isAdmin], admin.getPacientesAdmin);

router.route('/psicologos').get([authJwt.verifyToken, authJwt.isAdmin], admin.getPsicologos);

router.route('/admin/paciente/:id').get([authJwt.verifyToken, authJwt.isAdmin], admin.getPacienteAdmin);

router.route('/admin/psicologo/:id').get([authJwt.verifyToken, authJwt.isAdmin], admin.getPsicologoAdmin);

router.route('/admin/carreras/sistemas').get([authJwt.verifyToken, authJwt.isAdmin], admin.getSistemas);

router.route('/admin/carreras/artes').get([authJwt.verifyToken, authJwt.isAdmin], admin.getArtes);

router.route('/admin/carreras/gestion').get([authJwt.verifyToken, authJwt.isAdmin], admin.getGestion);

router.route('/admin/carreras/mecanica').get([authJwt.verifyToken, authJwt.isAdmin], admin.getMecanica);

router.route('/admin/carreras/electrica').get([authJwt.verifyToken, authJwt.isAdmin], admin.getElectrica);

router.route('/admin/carreras/electronica').get([authJwt.verifyToken, authJwt.isAdmin], admin.getElectronica);

module.exports = router;