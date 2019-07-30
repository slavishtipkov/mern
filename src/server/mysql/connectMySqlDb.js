const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "mydb"
});

connection.connect(function(err) {
  if (!err) {
    console.log("Database is connected ... \n\n");
  } else {
    console.log("Error connecting database ... \n\n");
  }
});

connection.query("SELECT * FROM USERS", function(error, results, fields) {
  if (error) {
    throw error;
  }

  results.forEach(result => {
    console.log(result);
  });
});

connection.end();
