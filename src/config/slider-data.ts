import LocalStorage from './LocalStorage';
export default class SliderData {
	private _value: number;
	public readonly max: number;
	public readonly min: number;
	public readonly step: number;

	public title: string;
	public readonly unit: string;

	private readonly key: string;

	public constructor(title: string, key: string, default_value: number, max: number, min: number, step: number, unit: string) {
		this.key = key;
		const get_storage_value = LocalStorage.get_value(this.key);
		if (get_storage_value == null) {
			this._value = default_value;
		}
		else {
			this._value = Number(get_storage_value);
		}

		this.title = title;
		this.max = max;
		this.min = min;
		this.step = step;
		this.unit = unit;
	}

	public get value(): number {
		return this._value;
	}

	public set value(value: number) {
		LocalStorage.set_value(this.key, String(value));
		this._value = value;
	}
}