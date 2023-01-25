<script lang="ts">
	let background_src = "/test-bg.png";
	let background_brightness = 0.8;
	let background_blur = 5; // px (min: 0.0, max: 100.0)

	export let background_element: HTMLImageElement;
</script>

<div class="bg">
	<img style="--bg-blur: {background_blur}; --bg-bright: {background_brightness}" src={background_src} alt="" bind:this={background_element}>
</div>

<style>
	.bg img {
		filter: blur(calc(var(--bg-blur) * 1px)) brightness(var(--bg-bright));
	}
</style>
