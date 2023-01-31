import BackgroundConfig from './background-config';
import MainConfig from './main-config';

export default class ThemeConfig {
	public main_config: MainConfig;
	public background: BackgroundConfig;
	public color_hue: number = 0;

	public readonly images: string[];
	public selected_index: number = 0;

	public constructor(images: string[]) {
		this.main_config = new MainConfig();
		this.background = new BackgroundConfig();
		this.images = images;
	}

	public get selected_image(): string {
		if (this.images.length === 0) return "";
		return this.images[this.selected_index];
	}
}
