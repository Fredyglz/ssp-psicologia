module.exports = (sequelize, Sequelize) => {
	const patientSchedule = sequelize.define('patient_schedule', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      lunes: {
          type: Sequelize.STRING
      }, 
      martes: {
          type: Sequelize.STRING
      }, 
      miercoles: {
          type: Sequelize.STRING
      }, 
      jueves: {
          type: Sequelize.STRING
      }, 
      viernes: {
          type: Sequelize.STRING
      }, 
      
	});
	
	return patientSchedule;
}