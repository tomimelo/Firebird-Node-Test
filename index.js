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

const options = {

    "host" : '127.0.0.1',
    "port" : 3050,
    "database" : 'D:/db/prueba2.fdb',
    "user" : 'SYSDBA',
    "password" : 'masterkey',
    "lowercase_keys" : false, // set to true to lowercase keys
    "role" : null,            // default
    "pageSize" : 4096         // default when creating database

};

Firebird.attach(options, function(err, db) {
 
    if (err) {
        throw err;
    }
    
    // db = DATABASE
    db.query("SELECT * FROM USERS", function(err, result) {
        if(err){
            console.log(err);
        }
        console.log(result);
        // IMPORTANT: close the connection
        db.detach();
    });

 
});
 

app.listen(process.env.PORT, () => {
    console.log("Server running on port " + process.env.PORT);
});