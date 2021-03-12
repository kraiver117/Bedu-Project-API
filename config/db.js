const mongoose = require('mongoose');

const connectBD = async () => {
    const connection = await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    });

    console.log(`MongoDB connected: ${connection.connection.host}`.cyan.underline);
};

module.exports = connectBD;