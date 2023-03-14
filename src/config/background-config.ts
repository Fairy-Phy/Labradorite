import SliderData from './slider-data';
import type { Lang } from '../lang/lang-type';

export default class BackgroundConfig {

	public brightness: SliderData;
	public blur: SliderData;

	public constructor(lang_data: Lang) {
		this.brightness = new SliderData(lang_data.settings.background.brightness, "brightness", 0.8, 1, 0, 0.01, "");
		this.blur = new SliderData(lang_data.settings.background.blur, "blur", 5, 100, 0, 1, "px");
	}

	public update_text(lang_data: Lang) {
		this.brightness.title = lang_data.settings.background.brightness;
		this.blur.title = lang_data.settings.background.blur;
	}
}
