module.exports = (sequelize, Sequelize) => {
	const Psicologo = sequelize.define('Psicologo', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      image: {
          type: Sequelize.BLOB('long')
      },
      email: {
		  type: Sequelize.STRING,
		  allowNull: false
	  },
	  password: {
		  type: Sequelize.STRING,
		  allowNull: false
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
      edad: {
          type: Sequelize.INTEGER,
          allowNull: false
      }, 
      estadoCivil: {
          type: Sequelize.STRING,
          allowNull: false
      }, 
      fechaNacimiento: {
          type: Sequelize.DATEONLY,
          allowNull: false
      },
      ciudadNacimiento: {
          type: Sequelize.STRING,
          allowNull: false
      }, 
      estadoNacimiento: {
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
	
	return Psicologo;
}