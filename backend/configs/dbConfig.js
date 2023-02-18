const mysql = require('mysql');

const HOST = "localhost";
const USER = "root";
const PASSWORD = "password";
const DB = "smart_home";

const connection = mysql.createConnection({
    host: HOST,
    user: USER,
    password: PASSWORD,
    database: DB
});

connection.connect(
	(err) => {
		if (err) 
			console.log(err.message);
		else 
			console.log('Database connected')
	}
);

module.exports = {
	connection,
}