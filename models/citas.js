module.exports = (sequelize, Sequelize) => {
	const patientContact = sequelize.define('cita', {
      id: {
        type: Sequelize.UUID,
		defaultValue: Sequelize.UUIDV4,
		primaryKey: true
      },
      title: {
		  type: Sequelize.STRING,
		  allowNull: false
	  },
      start: {
          type: Sequelize.DATE,
          allowNull: false
      }, 
      end: {
          type: Sequelize.DATE,
          allowNull: false
      },
      duracion: {
        type: Sequelize.STRING,
        allowNull: false
      },
      className: {
          type: Sequelize.STRING,
          allowNull: false
      }, 
      description: {
          type: Sequelize.STRING,
          allowNull: false
      }
	});
	
	return patientContact;
}