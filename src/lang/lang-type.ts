type MainSettings = {
	title: string;
};

type Background = {
	title: string;
	brightness: string;
	blur: string;
	image: string;
};

type Settings = {
	title: string;
	main: MainSettings;
	background: Background;
};

type Power = {
	sleep: string;
	hibernate: string;
	shutdown: string;
	restart: string;
};

type Textbox = {
	user: string;
	pass: string;
};

export type Lang = {
	override_font_class: string;
	settings: Settings;
	power: Power;
	textbox: Textbox;
};
