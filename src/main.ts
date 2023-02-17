import "ress";
import './font.css';
import './app.css';

import App from './App.svelte';
import Scrollbar from 'smooth-scrollbar';
import OverscrollPlugin from 'smooth-scrollbar/plugins/overscroll';

Scrollbar.use(OverscrollPlugin);

const root_div = document.getElementById("app");

let app: App | null = null;
if (root_div === null) {
	console.error("Not found app root div...");
}
else {
	app = new App({
		target: root_div
	});
}

export default app;
