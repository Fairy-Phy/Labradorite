export default class SliderData {
	public value: number;
	public readonly max: number;
	public readonly min: number;
	public readonly step: number;

	public readonly title: string;
	public readonly unit: string;

	public constructor(title: string, value: number, max: number, min: number, step: number, unit: string) {
		this.title = title;
		this.value = value;
		this.max = max;
		this.min = min;
		this.step = step;
		this.unit = unit;
	}
}