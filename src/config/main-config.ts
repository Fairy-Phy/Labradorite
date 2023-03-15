import CheckboxData from './checkbox-data';
import SliderData from './slider-data';
import type { Lang } from '../lang/lang-type';

export default class MainConfig {

	public normal_clock_checkbox: CheckboxData;
	public logging_blur_checkbox: CheckboxData;
	public change_blur_slider: SliderData;

	public constructor(lang_data: Lang) {
		this.normal_clock_checkbox = new CheckboxData(lang_data.settings.main.readable_clock, "readable_clock");
		this.logging_blur_checkbox = new CheckboxData(lang_data.settings.main.logging_blur, "logging_blur");
		this.change_blur_slider = new SliderData(lang_data.settings.main.change_blur, "change_blur", 5, 100, 0, 1, "px");
	}

	public update_text(lang_data: Lang) {
		this.normal_clock_checkbox.description = lang_data.settings.main.readable_clock;
		this.logging_blur_checkbox.description = lang_data.settings.main.logging_blur;
		this.change_blur_slider.title = lang_data.settings.main.change_blur;
	}
}
