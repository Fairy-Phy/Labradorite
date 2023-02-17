import calc_jaccard from '../../utils/jaccard';
export default class UserSelectionList {
	private user_list;
	public current_select = -1;
	private current_text = "";
	public sorted_list: string[];

	public constructor(users: string[]) {
		this.user_list = [...users];
		this.sorted_list = this.getList();
	}

	public getList(): string[] {
		if (this.current_text.length === 0) return [];

		return this.user_list
			.slice(0, 5)
			.filter((v) => calc_jaccard(v, this.current_text) !== 0);
	}

	private updateList() {
		this.user_list.sort((a, b) => this.sortCompare(a, b));
	}

	private sortCompare(a: string, b: string): number {
		const a_s = Number(a.startsWith(this.current_text));
		const b_s = Number(b.startsWith(this.current_text));
		if (a_s === b_s) {
			if (a < b) return -1;
			else if (a > b) return 1;
			else return 0;
		}

		return b_s - a_s;
	}

	public updateText(text: string) {
		this.current_text = text;

		this.updateList();

		this.current_select = -1;
	}

	public select(): string {
		if (this.current_select === -1) return this.current_text;
		return this.user_list[this.current_select];
	}

	public changeSelectFromKeyEvent(e: KeyboardEvent) {
		console.log("update");
		if (e.key === "ArrowDown" && this.current_select !== this.sorted_list.length - 1) {
			console.log("down");
			this.current_select++;
		}
		else if (e.key === "ArrowUp" && this.current_select !== 0) {
			console.log("up");
			this.current_select--;
		}
	}
}
