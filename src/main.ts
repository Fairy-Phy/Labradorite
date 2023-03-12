import './lightdm_mock';

import "ress";
import './font.css';
import './app.css';

import App from './App.svelte';
import Scrollbar from 'smooth-scrollbar';
import OverscrollPlugin from 'smooth-scrollbar/plugins/overscroll';
import delay from './utils/delay';

let app: App | null = null;

const initTheme = () => {
	Scrollbar.use(OverscrollPlugin);

	const root_div = document.getElementById("app");

	if (root_div === null) {
		console.error("Not found app root div...");
	}
	else {
		app = new App({
			target: root_div,
		});
	}

	console.log("Inited Greeter!");
};

window.addEventListener("GreeterReady", initTheme);

export default app;
