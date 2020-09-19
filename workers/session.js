const connections = [];
var sessionProfile;
onconnect = (e) => {
	var f = e.ports[e.ports.length-1];
	if(connections.length !== 0) {
		f.postMessage({op: "update", sessionProfile})
	}
	connections.push(f)
	

	e.ports.forEach(port => {
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
				case "result":
					sessionProfile = e.data.sessionProfile
					break;
				default:
					break;
			}
		}
	});
}