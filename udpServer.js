var dgram = require("dgram");
var sql = require("./lib/sql");

// Plain text password bad
var conn_str = "Driver={SQL Server Native Client 11.0};Server=10.253.32.181,1433;Database=josh_qa;UID=josh_stupplebeen;PWD=password;Connection Timeout=30;";

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
	//		}
		});
	});
});

sock.bind(8888, "0.0.0.0");