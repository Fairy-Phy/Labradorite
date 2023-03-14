import BackgroundConfig from './background-config';
import MainConfig from './main-config';
import LocalStorage from './LocalStorage';
import LangConfig from './lang-config';
import type { Lang } from '../lang/lang-type';

export default class ThemeConfig {
	public main_config: MainConfig;
	public background: BackgroundConfig;
	public color_hue: number = 0;

	public readonly images: string[];
	public selected_index: number = 0;
	public static selected_image_key: string = "selected_image_path";

	public language_config: LangConfig;
	private _current_lang_data: Lang;

	public constructor(images: string[], default_background: string) {
		this.language_config = new LangConfig();
		this._current_lang_data = this.language_config.get_language();

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
		this.background = new BackgroundConfig(this.current_lang_data);
		this.images = images;
	}

	public update_lang() {
		this.background.update_text(this.current_lang_data);
	}

	public get selected_image(): string {
		if (this.images.length === 0) return "";
		return this.images[this.selected_index];
	}

	public get current_lang_data(): Lang {
		return this._current_lang_data;
	}

	public set current_lang_data(value: Lang) {
		this._current_lang_data = value;
		this.update_lang();
	}
}
