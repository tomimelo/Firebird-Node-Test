require("dotenv").config(); //Environment variables
const express = require("express");
const morgan = require("morgan");
const Firebird = require('node-firebird');

//Express Initilization
const app = express();

//MORGAN Configuration
app.use(morgan("dev"));

app.use( express.json() );

app.use( express.static("public") );

var options = {

    "host" : '127.0.0.1',
    "port" : 3050,
    "database" : 'database.fdb',
    "user" : 'SYSDBA',
    "password" : 'masterkey',
    "lowercase_keys" : false, // set to true to lowercase keys
    "role" : null,            // default
    "pageSize" : 4096         // default when creating database

};

Firebird.attach(options, function(err, db) {
 
    if (err)
        throw err;
 
    // db = DATABASE
    db.query('SELECT * FROM TABLE', function(err, result) {
        // IMPORTANT: close the connection
        db.detach();
    });
 
});
 

app.listen(process.env.PORT, () => {
    console.log("Servidor running on port " + process.env.PORT);
});