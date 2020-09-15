import {h, render, Component} from "https://unpkg.com/preact?module"
import htm from 'https://unpkg.com/htm?module';
import Router from 'https://unpkg.com/preact-router?module';

const html = htm.bind(h);


function App (props) {
	return html`<h1>Hello ${props.name}!</h1>`;
}

render(html`<${App}/>`, document.body);

export default html