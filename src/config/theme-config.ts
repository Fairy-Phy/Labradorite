import BackgroundConfig from './background-config';
import MainConfig from './main-config';
import LocalStorage from './LocalStorage';

export default class ThemeConfig {
	public main_config: MainConfig;
	public background: BackgroundConfig;
	public color_hue: number = 0;

	public readonly images: string[];
	public selected_index: number = 0;
	public static selected_image_key: string = "selected_image_path";

	public constructor(images: string[], default_background: string) {
		if (default_background !== "") {
			this.selected_index = images.findIndex(v => v === default_background);
		}
		else {
			const image = LocalStorage.get_value(ThemeConfig.selected_image_key);
			if (image != null) {
				const search_index = images.findIndex((v) => v === image);
				if (search_index !== -1)
					this.selected_index = search_index;
			}
		}
		this.main_config = new MainConfig();
		this.background = new BackgroundConfig();
		this.images = images;
	}

	public get selected_image(): string {
		if (this.images.length === 0) return "";
		return this.images[this.selected_index];
	}
}
