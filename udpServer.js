var dgram = require("dgram");
var sql = require("./lib/sql");
//var mongo = require("./mongo");

var conn_str = "Driver={SQL Server Native Client 11.0};Server=10.253.32.181,1433;Database=josh_qa;UID=josh_stupplebeen;PWD=Pr0m3th3u53;Connection Timeout=30;";
//var conn_str = "Driver={SQL Server Native Client 11.0};Server=(local);Database=josh_test;Trusted_Connection={Yes}";

sock = dgram.createSocket("udp4", function (msg, r)
{
	console.log("Message received from " + r.address + ":" + r.port);
	console.log("Data len: " + r.size + " data: " + msg.toString("ascii", 0, r.size));
	
	sql.open(conn_str, function(err,conn) {
		if (err) {
			console.log("Error opening the connection");
			return;
		}
//		conn.queryRaw("INSERT INTO udpTest (messageString, timestamp) VALUES ('" + msg.toString("ascii", 0, r.size) + "', '" + Date.now() + "');", function(err, results) {
		conn.queryRaw("INSERT INTO udpTest (messageString) VALUES ('" + msg.toString("ascii", 0, r.size) + "');", function(err, results) {
			if(err) {
				console.log("Error running query");
				return;
			}
	//		console.log(results);
	//		for (var i = 0; i < results.rows.length; i++) {
	//		    console.log("Bar: " + results.rows[i][0]);
	//		    console.log("First Name: " + results.rows[i][0] + " Last Name: " + results.rows[i][1]);
	//		}
		});
	});
});

sock.bind(8888, "0.0.0.0");