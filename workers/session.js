const connections = [];

onconnect = (e) => {
	var port = e.ports[0];
	connections.push(port)
	var sessionProfile;

	port.onmessage = (e) => {
		switch (e.data.op) {
			case "get":
				port.postMessage( {op: "result", sessionProfile})
				break;
			case "set":
				sessionProfile = e.data.sessionProfile
				connections.forEach(function(connection) {
					if (connection !== port) {
						connection.postMessage({op: "update", sessionProfile});
					}
				});
				// port.postMessage(e.data)
				port.postMessage( {op: "result", sessionProfile})
				break;
			case "update":
				sessionProfile = e.data.sessionProfile
				break;
			default:
				break;
		}
	}
}