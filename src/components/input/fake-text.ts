import { diffChars } from "diff";

export default class FakeText {
	public original_text: string = "";

	private readonly charset = "ACDEFGHJKLMNOQTVXYZh&_!^";

	public prev_convert_text = "";

	constructor() {}

	public change(text: string): string {
		if (this.prev_convert_text === text) return text;

		let result = "";

		const diff_list = diffChars(this.prev_convert_text, text);
		let prev_value_position = 0;
		let current_position = 0;
		for (const diff of diff_list) {
			if (diff.added) {
				this.original_text =
					this.original_text.slice(0, current_position) +
					diff.value +
					this.original_text.slice(current_position, this.original_text.length);
				for (let i = 0; i < diff.value.length; i++) {
					result += this.choose_char();
				}
			}
			else if (diff.removed) {
				this.original_text =
					this.original_text.slice(0, current_position) +
					this.original_text.slice(current_position + diff.count, this.original_text.length);
				prev_value_position += diff.count;
			}
			else {
				result += this.prev_convert_text.slice(
					prev_value_position,
					prev_value_position + diff.count
				);
				prev_value_position += diff.count;
			}

			current_position += diff.count;
		}

		this.prev_convert_text = result;
		return result;
	}

	private choose_char(): string {
		return this.charset[Math.floor(Math.random() * this.charset.length)];
	}
}