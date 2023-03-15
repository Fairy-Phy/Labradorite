import type { Lang } from "./lang-type";

const En: Lang = {
	key: "English",
	override_font_class: "",
	settings: {
		title: "Settings",
		main: {
			title: "Main Settings",
			readable_clock: "Display normal clock",
			logging_blur: "Change blur when logging",
			change_blur: "Changing blur"
		},
		background: {
			title: "Background Settings",
			brightness: "Brightness",
			blur: "Blur",
			image: "Background images",
		},
	},
	power: {
		sleep: "Sleep",
		hibernate: "hibernate",
		shutdown: "Shutdown",
		restart: "Restart",
	},
	textbox: {
		user: "Enter the Username",
		pass: "Enter the Password",
	},
};

export default En;
