import {h, Component} from "https://unpkg.com/preact?module"
import htm from 'https://unpkg.com/htm?module';
const html = htm.bind(h);

const copyPort = (port) => {
	let newPort
	Object.assign(newPort, port)
	return newPort
}

export default class SessionWatcher extends Component {

	constructor(props) {
		// let newPort
		// Object.assign(newPort, props.port)
		super();
		
		// this.state = { letters: props.letters };

		
	}
  
	render(props, state) {
		return html`<h2>${props.letters}</h2>`;
	}
  }