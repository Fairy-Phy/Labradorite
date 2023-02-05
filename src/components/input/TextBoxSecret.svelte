<script lang="ts">
	import InlineSVG from "svelte-inline-svg";
	import show_pass_icon from "../../assets/show-pass-icon.svg";
	import no_show_pass_icon from "../../assets/no-show-pass-icon.svg";
    import FakeText from "./fake-text";
    import TextBoxFrame from "./TextBoxFrame.svelte";

	export let final_text: string;
	export let is_entered = false;
	export let custom_class = "";
	let final_custom_class = custom_class;

	const show_pass_class = "pass-showed-text-box";

	let is_show_pass = false;

	const ft = new FakeText();
	const change_text = (text: string) => {
		const ws = window.getSelection();
		if (!ws) return;
		const text_element = ws.getRangeAt(0).commonAncestorContainer;
		const cursor_position = ws.anchorOffset;

		const a = ft.change(text);
		if (is_show_pass) {
			text_element.nodeValue = ft.original_text;
		}
		else {
			text_element.nodeValue = a;
		}

		const r = document.createRange();
		r.setStart(text_element, cursor_position);
		r.setEnd(text_element, cursor_position);
		ws.removeAllRanges();
		ws.addRange(r);
	};

	let ctx: CanvasRenderingContext2D;
	let manual_update: (force: any) => void;
	const toggle_show = () => {
		is_show_pass = !is_show_pass;
		if (is_show_pass) {
			final_custom_class = `${custom_class} ${show_pass_class}`;
			ctx.font = 'normal 500 20px "Rajdhani"';
			ctx.letterSpacing = "0.05em";
		}
		else {
			final_custom_class = custom_class;
			ctx.font = 'normal 400 20px "Phyrexia Neue"';
			ctx.letterSpacing = "-0.24em";
		}

		manual_update(true);
	};

	const in_final_text = (text: string) => {
		final_text = ft.original_text;
	};
</script>

<TextBoxFrame
	in_final_text={in_final_text} bind:is_entered bind:custom_class={final_custom_class}
	font='normal 400 20px "Phyrexia Neue"'
	letter_spacing="-0.24em"
	textbox_max_width={240}
	input_bind_replacer={change_text}
	bind:input_event={manual_update}
	bind:ctx
>
	<div class="pass-icon" on:click={toggle_show} on:keypress={() => {}}>
		{#if is_show_pass}
		<InlineSVG src={show_pass_icon} />
		{:else}
		<InlineSVG src={no_show_pass_icon} />
		{/if}
	</div>
</TextBoxFrame>
