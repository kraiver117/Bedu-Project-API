const fs = require('fs');
const { MongoClient } = require('mongodb');
const colors = require('colors');
const dotenv = require('dotenv');

// Load env vars
dotenv.config({ path: './config/config.env' });

const MONGO_URI = process.env.MONGO_URI;


// Read JSON files
const users = JSON.parse(fs.readFileSync(`${__dirname}/_data/users.json`, 'utf-8'));
const products = JSON.parse(fs.readFileSync(`${__dirname}/_data/products.json`, 'utf-8'));
const orders = JSON.parse(fs.readFileSync(`${__dirname}/_data/orders.json`, 'utf-8'));

//Connect to DB
class MongoLib {
    constructor() {
        this.client = new MongoClient(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        this.db_name = process.env.DB_NAME;
    }

    connect() {
        if (!MongoLib.connection) {
            MongoLib.connection = new Promise((resolve, reject) => {
                this.client.connect(err => {
                    if (err) {
                        reject(err);
                    }

                    console.log('Connected succesfully to mongo');
                    resolve(this.client.db(this.db_name));
                });
            });
        }

        return MongoLib.connection;
    }

    create(collection, data) {
        return this.connect().then(db => {
            return db.collection(collection).insertMany(data);
        }).then(result => result.insertId);
    }

    delete(collection) {
        return this.connect().then(db => {
            return db.collection(collection).deleteMany();
        }).then(() => collection);
    }
}

// Create an instance of the DB Connection
this.mongoDB = new MongoLib();

// Import into DB
const importData = async () => {
    try {
        await this.mongoDB.create('users', JSON.parse(JSON.stringify(users)));
        await this.mongoDB.create('products', JSON.parse(JSON.stringify(products)));
        await this.mongoDB.create('orders', JSON.parse(JSON.stringify(orders)));

        console.log('Data imported'.green.inverse);
        process.exit();
    } catch (error) {
        console.error(error);
    }
};

// Delete Data on DB
const deleteData = async () => {
    try {
        await this.mongoDB.delete('users');
        await this.mongoDB.delete('products');
        await this.mongoDB.delete('orders');

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