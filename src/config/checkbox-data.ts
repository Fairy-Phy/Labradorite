export default class CheckboxData {
	public value: boolean;

	public readonly description: string;

	public constructor(description: string, value: boolean = false) {
		this.value = value;
		this.description = description;
	}
}