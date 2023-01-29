<script lang="ts">
	import BackgroundImage from "./BackgroundImage.svelte";
    import Slider from "./Slider.svelte";

	export let color_hue: number;

	export let images: string[];
	export let selected_index: number;
</script>

<div class="bg-settings-panel">
	<Slider bind:main_color_hue={color_hue} title="Test" unit="px" min_value={0} max_value={1} step_value={0.01} />
	<p>Background image</p>
	<div class="bg-panel">
		{#each images as image_src, i}
		<BackgroundImage bind:current_index={selected_index} index={i} {image_src} bind:color_hue={color_hue} />
		{/each}
	</div>
</div>
