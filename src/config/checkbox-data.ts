import LocalStorage from './LocalStorage';
export default class CheckboxData {
	private _value: boolean;

	public description: string;

	private readonly key: string;

	public constructor(description: string, key: string, default_value: boolean = false) {
		this.key = key;

		const get_storage_value = LocalStorage.get_value(this.key);
		if (get_storage_value == null) {
			this._value = default_value;
		}
		else {
			this._value = get_storage_value === "true";
		}
		this.description = description;
	}

	public get value(): boolean {
		return this._value;
	}

	public set value(value: boolean) {
		LocalStorage.set_value(this.key, String(value));
		this._value = value;
	}
}