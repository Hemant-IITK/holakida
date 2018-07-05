const mysql = require('mysql');

function MySQLConnect() {
var config =
{
    host: 'localhost',
    user: 'root',
    password: 'Rama@1234',
    database: 'test',
    //port: 3306,
    //ssl: true
};

this.pool = null;

this.init = function() {
	 this.pool = mysql.createPool(config);
};

this.acquire = function(callback) {
	this.pool.getConnection(function (err,connection) {
			callback(err,connection);
		/*if (err) { 
			console.log("!!! Cannot connect !!! Error:");
			throw err;
		}
		else
		{
			console.log("Connection established.");
           //queryDatabase();
		}  */ 
		});
	};
};

module.exports = new MySQLConnect();
