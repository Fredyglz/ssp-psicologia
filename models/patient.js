module.exports = (sequelize, Sequelize) => {
    const Patient = sequelize.define('Patient', {
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
        primerContacto: {
            type: Sequelize.BOOLEAN,
            allowNull: false
        },
        mesYAnioIngreso: {
            type: Sequelize.STRING,
            allowNull: false
        },
        comoSeEntero: {
            type: Sequelize.JSON,
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
        nua: {
            type: Sequelize.INTEGER,
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
        campus_enms: {
            type: Sequelize.STRING,
            allowNull: false
        },
        division_sede: {
            type: Sequelize.STRING,
            allowNull: false
        },
        programaEducativo: {
            type: Sequelize.STRING,
            allowNull: false
        },
        periodo: {
            type: Sequelize.STRING,
            allowNull: false
        },
        grado: {
            type: Sequelize.STRING
        },
        grupo: {
            type: Sequelize.STRING
        },
        tipoPeriodo: {
            type: Sequelize.STRING,
            allowNull: false
        },
        telefonoCelular: {
            type: Sequelize.STRING,
            allowNull: false
        },
        telefonoCasaCiudad: {
            type: Sequelize.STRING,
            allowNull: false
        },
        telefonoCasaOrigen: {
            type: Sequelize.STRING,
            allowNull: false
        },
        calleDomicilioCiudad: {
            type: Sequelize.STRING,
            allowNull: false
        },
        numeroDomicilioCiudad: {
            type: Sequelize.STRING,
            allowNull: false
        },
        coloniaDomicilioCiudad: {
            type: Sequelize.STRING,
            allowNull: false
        },
        cpDomicilioCiudad: {
            type: Sequelize.STRING,
            allowNull: false
        },
        localidadDomicilioCiudad: {
            type: Sequelize.STRING,
            allowNull: false
        },
        ciudadDomicilioCiudad: {
            type: Sequelize.STRING,
            allowNull: false
        },
        estadoDomicilioCiudad: {
            type: Sequelize.STRING,
            allowNull: false
        },
        calleDomicilioOrigen: {
            type: Sequelize.STRING,
            allowNull: false
        },
        numeroDomicilioOrigen: {
            type: Sequelize.STRING,
            allowNull: false
        },
        coloniaDomicilioOrigen: {
            type: Sequelize.STRING,
            allowNull: false
        },
        cpDomicilioOrigen: {
            type: Sequelize.STRING,
            allowNull: false
        },
        localidadDomicilioOrigen: {
            type: Sequelize.STRING,
            allowNull: false
        },
        ciudadDomicilioOrigen: {
            type: Sequelize.STRING,
            allowNull: false
        },
        estadoDomicilioOrigen: {
            type: Sequelize.STRING,
            allowNull: false
        },
        conAgenda: {
            type: Sequelize.BOOLEAN,
            allowNull: false
        },
        terminosYCondiciones: {
            type: Sequelize.BOOLEAN,
            allowNull: false
        },
        });

    return Patient
}

