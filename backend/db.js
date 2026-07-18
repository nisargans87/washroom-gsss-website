const mysql = require("mysql2");


const connection = mysql.createConnection({

    host: "localhost",

    user: "root",

    password: "root",

    database: "washroom_gss"

});


connection.connect((error)=>{

    if(error){

        console.log("Database connection failed");

        console.log(error);

    }
    else{

        console.log("MySQL Connected Successfully");

    }

});


module.exports = connection;