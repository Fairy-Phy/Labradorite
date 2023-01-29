<script lang="ts">
    import delay from "../utils/delay";


	export let background_src: string;
	let background_brightness = 0.8;
	let background_blur = 5; // px (min: 0.0, max: 100.0)

	export let background_element: HTMLImageElement;

	let fading_background_element: HTMLImageElement;
	let set_fade_class = false;
	const fade_duration = 1000;
	export const change_background = async (after_background_src: string) => {
		console.log("changing...");
		fading_background_element.src = after_background_src;
		fading_background_element.hidden = false;
		set_fade_class = true;
		await delay(fade_duration);

		background_src = after_background_src;
		set_fade_class = false;
		fading_background_element.hidden = true;
		fading_background_element.src = "";
	};
</script>

<div class="bg">
	<img class:bg-fade-out={set_fade_class} style="--bg-blur: {background_blur}; --bg-bright: {background_brightness}; --fade-duration: {fade_duration}ms;" src={background_src} alt="" bind:this={background_element}>
	<img style="--bg-blur: {background_blur}; --bg-bright: {background_brightness};" src="" alt="" bind:this={fading_background_element} hidden>
</div>
