const   express = require('express'),
        bodyParser = require('body-parser'),
        cors = require('cors');

// Global Object
const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const server = app.listen(process.env.PORT || 3000, function() {
    console.log(`Escuchando en el puerto ${server.address().port}`);
});
