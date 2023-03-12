<script lang="ts">
	import InlineSVG from "svelte-inline-svg";
	import arrow_right from "../../assets/arrow_right.svg";
    import delay from "../../utils/delay";

	export let is_entered = false;
	export let custom_class = "";

	export let font: string;
	export let letter_spacing: string;
	export let textbox_max_width: number;

	export let input_bind_replacer = (text: string) => {};

	let text_element: HTMLSpanElement;
	let caret_element: HTMLSpanElement | undefined;

	$: if (text_element) {
		text_element.focus();
	}

	let is_focus = false;
	const toggle_focus = () => {
		is_focus = !is_focus;
	};

	export const ctx = document.createElement("canvas").getContext("2d");
	if (!ctx) throw new Error("canvas is null...");
	ctx.letterSpacing = letter_spacing;
	ctx.font = font;

	const caret_animate_class = "input-caret-animate";
	let current_timeout: number | null = null;
	const pause_caret = () => {
		if (current_timeout) {
			clearTimeout(current_timeout);
		}

		caret_element?.classList.remove(caret_animate_class);
		setTimeout(() => {
			caret_element?.classList.add(caret_animate_class);
			current_timeout = null;
		}, 1000);
	};

	let current_cur = 0;
	let caret_position: number = 0;
	let caret_moved_minus_position = 0;
	let displayed_caret_position: number;
	$: displayed_caret_position = Math.max(0, Math.min(textbox_max_width, Math.min(textbox_max_width, caret_position) - caret_moved_minus_position));
	let caret_overflowed = false;
	let caret_midway_removed = false;
	$: caret_overflowed = caret_position > textbox_max_width;
	let prev_text = "";
	const update_caret = (force?: any) => {
		const new_cur = window.getSelection()?.anchorOffset ?? 0;
		if (current_cur !== new_cur || (typeof force === "boolean" && force)) {
			const old_cur = current_cur;
			current_cur = new_cur;
			pause_caret();
			const text = (text_element?.innerText ?? "");
			const new_position = ctx.measureText(text.substring(0, current_cur)).width;
			const max_position = ctx.measureText(text).width;
			if (caret_overflowed && current_cur === 0) {
				caret_moved_minus_position = 0;
				caret_overflowed = false;
			}

			try {
				if (
					caret_overflowed &&
					displayed_caret_position > 0 &&
					displayed_caret_position < textbox_max_width &&
					text.length < prev_text.length &&
					max_position > textbox_max_width
				) {
					// はみ出している時に途中で文字を削除させた時
					caret_midway_removed = true;
					return;
				}

				if (caret_overflowed && caret_position > new_position && text.length <= prev_text.length) {
					if (max_position < textbox_max_width) {
						// はみ出している時に途中で削除していた時にはみ出さなくなった時
						caret_moved_minus_position = 0;
						caret_overflowed = false;
						caret_position = new_position;
					}
					else {
						// はみ出している時に途中のキャレットを移動させた時
						if (caret_midway_removed) {
							// 途中で文字削除が働いた時
							caret_midway_removed = false;
							caret_position = max_position;
							caret_moved_minus_position = max_position - new_position;
						}
						else if (old_cur < current_cur) {
							// カーソルを前に移動した時
							if (displayed_caret_position === 0) {
								caret_moved_minus_position = textbox_max_width;
							}
							const moved_text_width = ctx.measureText(text[old_cur]).width;
							caret_moved_minus_position -= moved_text_width;
						}
						else {
							// カーソルを後ろに移動した時
							caret_moved_minus_position = caret_position - new_position;
						}
					}
				}
				else if (caret_overflowed && text.length > prev_text.length && displayed_caret_position < textbox_max_width) {
					// はみ出している時に途中で入力された場合
					const entered_text_width = ctx.measureText(text[current_cur - 1]).width;
					caret_moved_minus_position -= entered_text_width;
				}
				else {
					caret_position = new_position;
				}
			}
			finally {
				prev_text = text;
			}
		}
	};

	const copy_paste_cancel = (e: Event) => {
		e.preventDefault();
		return false;
	};

	let textbox_main_element: HTMLDivElement;
	export let in_final_text: (text: string) => void;
	const next_state = async () => {
		if (text_element.innerText === "") {
			textbox_main_element.classList.add("textbox-missing");
			await delay(250);
			textbox_main_element.classList.remove("textbox-missing");
			return;
		}

		in_final_text(text_element.innerText);
		is_entered = true;
	};

	const key_press_next_state = (e: KeyboardEvent) => {
		if (e.key === "Enter") {
			e.preventDefault();
			next_state();
			return false;
		}

		update_caret();
		return true;
	};
	export const input_event = (force: any) => {
		input_bind_replacer(text_element.innerText);
		update_caret(force);
	};
</script>

<div class="textbox-frame">
	<div class="textbox-main {custom_class}" id="textbox_main" bind:this={textbox_main_element}>
		<span
			contenteditable=true
			on:keydown={key_press_next_state}
			on:keyup={update_caret}
			on:mousedown={update_caret}
			on:input={input_event}
			on:pause={update_caret}
			on:cut={update_caret}
			on:mousemove={update_caret}
			on:select={update_caret}
			on:selectstart={update_caret}
			on:click={update_caret}

			on:focus={toggle_focus}
			on:blur={toggle_focus}

			on:copy={copy_paste_cancel}
			on:paste={copy_paste_cancel}
			on:contextmenu={copy_paste_cancel}

			bind:this={text_element}
		></span>
		{#if is_focus}
		<span
			class="input-caret {caret_animate_class}"
			style="--caret-position: {displayed_caret_position}px;"
			bind:this={caret_element}
		></span>
		{/if}
		<slot></slot>
	</div>
	<div class="textbox-arrow" on:click={next_state} on:keypress={() => {}}>
		<InlineSVG src={arrow_right} />
	</div>
</div>
