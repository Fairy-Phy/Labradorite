import SliderData from './slider-data';

export default class BackgroundConfig {
	public brightness: SliderData = new SliderData("Brightness", "brightness", 0.8, 1, 0, 0.01, "");
	public blur: SliderData = new SliderData("Blur", "blur", 5, 100, 0, 1, "px");
}
