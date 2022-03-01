const mongoose = require('mongoose');

const dbConnection = async() => {
    try {
        const connection = process.env.MONGODB_CNN || 'mongodb://localhost/faveC_DB';
        await mongoose.connect( connection, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });
    
        console.log('DataBase Online');

    } catch (error) {
        console.log(error);
        throw new Error('Error Connecting to DB');
    }
}

module.exports = {
    dbConnection
}
