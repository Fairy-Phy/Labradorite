<script lang="ts">
    import TextBoxFrame from "./TextBoxFrame.svelte";

	export let final_text: string;
	export let is_entered = false;
	export let custom_class = "";

	const in_final_text = (text: string) => {
		final_text = text;
	};
</script>

<TextBoxFrame
	in_final_text={in_final_text} bind:is_entered bind:custom_class
	font='normal 500 20px "Rajdhani"'
	letter_spacing="0.05em"
	textbox_max_width={270}
>
</TextBoxFrame>
