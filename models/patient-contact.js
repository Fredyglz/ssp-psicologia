module.exports = (sequelize, Sequelize) => {
	const patientContact = sequelize.define('patient_contact', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      nombre: {
		  type: Sequelize.STRING,
		  allowNull: false
	  }, 
      primerApellido: {
          type: Sequelize.STRING,
          allowNull: false
      }, 
      segundoApellido: {
          type: Sequelize.STRING,
          allowNull: false
      },
      telefonoCelular: {
          type: Sequelize.STRING,
          allowNull: false
      }, 
      telefonoCasa: {
          type: Sequelize.STRING,
          allowNull: false
      },
      calleDomicilio: {
          type: Sequelize.STRING,
          allowNull: false
      },
      numeroDomicilio: {
        type: Sequelize.STRING,
        allowNull: false
      }, 
      coloniaDomicilio: {
          type: Sequelize.STRING,
          allowNull: false
      },  
      cpDomicilio: {
          type: Sequelize.STRING,
          allowNull: false
      }, 
      localidadDomicilio: {
          type: Sequelize.STRING,
          allowNull: false
      },  
      ciudadDomicilio: {
          type: Sequelize.STRING,
          allowNull: false
      }, 
      estadoDomicilio: {
          type: Sequelize.STRING,
          allowNull: false
      }
	});
	
	return patientContact;
}