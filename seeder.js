const fs = require('fs');
const mongoose = require('mongoose');
const colors = require('colors');
const dotenv = require('dotenv');

// Load env vars
dotenv.config({ path: './config/config.env' });

//Load models
const User = require('./models/User');

//Connect to DB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

// Read JSON files
const users = JSON.parse(fs.readFileSync(`${__dirname}/_data/users.json`, 'utf-8'));
const products = JSON.parse(fs.readFileSync(`${__dirname}/_data/products.json`, 'utf-8'));
const orders = JSON.parse(fs.readFileSync(`${__dirname}/_data/orders.json`, 'utf-8'));


// Import into DB
const importData = async () => {
    try {
        //Delete Data before created in order to avoid errors con CLI
        await User.deleteMany();

        await User.create(users);

        console.log('Data imported'.green.inverse);
        process.exit();
    } catch (error) {
        console.error(error);
    }
};

// Delete Data on DB
const deleteData = async () => {
    try {
        await User.deleteMany();

        console.log('Data destroyed...'.red.inverse);
        process.exit();
    } catch (error) {
        console.error(error);
    }
};

if (process.argv[2] === '-i') {
    //At the root project execute the command in your CLI "node seeder -i" to import data to the DB
    importData();
} else if (process.argv[2] === '-d') {
    //At the root project execute the command in your CLI "node seeder -d" to delete all the data on the DB
    deleteData();
}

/*TIP: Don't forget to add your config.env variables in config/config.env, you'll need MONGO_URI and DB_NAME
to run this seeder successfully */