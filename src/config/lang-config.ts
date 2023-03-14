import En from '../lang/en';
import Ja from '../lang/ja';
import type { Lang } from '../lang/lang-type';
import LocalStorage from './LocalStorage';

export default class LangConfig {
	private readonly lang_list = [
		En,
		Ja
	];

	public readonly lang_key_list = this.lang_list.map(v => v.key);

	private current_index = 0;

	private readonly key = "language";

	public constructor() {
		const get_storage_value = LocalStorage.get_value(this.key);
		if (get_storage_value == null) {
			this.current_language = window.lightdm?.language?.name ?? En.key;
		}
		else {
			this.current_language = get_storage_value;
		}
	}

	public get_language(): Lang {
		return this.lang_list[this.current_index];
	}

	public get current_language(): string {
		return this.lang_list[this.current_index].key;
	}

	public set current_language(value: string) {
		const value_index = this.lang_list.findIndex(v => value.includes(v.key));
		if (value_index === -1) this.current_index = 0;
		else this.current_index = value_index;

		LocalStorage.set_value(this.key, this.lang_list[this.current_index].key);
	}
}