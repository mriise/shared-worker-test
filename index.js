import {h, render, Component } from "https://unpkg.com/preact?module"
import {useState} from "./lib/hooks.js"
import htm from 'https://unpkg.com/htm?module'
import Router from 'https://unpkg.com/preact-router?module'
import SessionWatcher from './components/SessionWatcher.js'
const html = htm.bind(h);

var sessionManager = new SharedWorker("./workers/session.js");


const setSession = () => {
	sessionManager.port.postMessage({op: "set", sessionProfile: {e: Math.floor(Math.random() * 10)}})
}

const getSession = () => {
	sessionManager.port.postMessage({op: "get"})
}


function App (props) {
	var sessionProfile

	const [letters, setLetters] = useState(0);

	// sessionManager.port.postMessage({op: "get"})

	sessionManager.port.onmessage = function(e) {
		if(!!e.data){
			if(!!e.data.op ) {
				switch (e.data.op ) {
					case "update":
						sessionManager.port.postMessage({op: "update", sessionProfile: e.data.sessionProfile})
						getSession()
						break;
					case "result":
						sessionProfile = e.data.sessionProfile
						setLetters(sessionProfile.e)
						console.log(sessionProfile.e)
						break;
					default:
						break;
				}
				
			}
		} 		
	}

	return html`<h1>Hello ${letters}!</h1>`;
}

render(
	html`
	<button onclick=${e => setSession()}>set</button> <br/>
	<button onclick=${e => getSession()}>get</button>
	open another tab to view the shared state
	<${App}/>

`, document.body);

export default html