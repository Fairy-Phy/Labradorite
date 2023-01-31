<script lang="ts">
	import type ThemeConfig from "../config/theme-config";
	import delay from "../utils/delay";
    import get_color from "../utils/get-color";

	export let config: ThemeConfig;

	let background_element: HTMLImageElement;
	let fading_background_element: HTMLImageElement;

	let set_fade_class = false;
	const fade_duration = 1000;

	let current_src: string = config.selected_image;

	const change_background = async (after_background_src: string) => {
		fading_background_element.src = after_background_src;
		fading_background_element.hidden = false;
		set_fade_class = true;
		await delay(fade_duration);

		current_src = after_background_src;
		set_fade_class = false;
		fading_background_element.hidden = true;
		fading_background_element.src = "";
	};
	const update_color = () => {
		if (typeof background_element === "undefined") return;

		config.color_hue = get_color(background_element);
	};

	$: if (current_src !== config.selected_image) {
		change_background(config.selected_image);
	}
</script>

<div class="bg">
	<img
		class:bg-fade-out={set_fade_class}
		style="--bg-blur: {config.background.blur.value}; --bg-bright: {config.background.brightness.value}; --fade-duration: {fade_duration}ms;"
		src={current_src}
		alt=""
		bind:this={background_element}
		on:load={update_color}
	>
	<img style="--bg-blur: {config.background.blur.value}; --bg-bright: {config.background.brightness.value};" src="" alt="" bind:this={fading_background_element} hidden>
</div>
