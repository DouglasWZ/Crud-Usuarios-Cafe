const mongoose = require('mongoose');

const dbConnection = async () => {

    try {
        await mongoose.connect(process.env.MONGODB_CNN, {
            UseNewUrlParser: true,
            UseUnifiedTopology: true,
            /* useCreateIndex: true,
            useFindAndModify: false */
        });

        console.log('Base de Datos online');

    } catch (error) {
        console.log(error);
        throw new Error('Error a la hora de iniciar la base de datos');
    }
}

module.exports = {
    dbConnection
}