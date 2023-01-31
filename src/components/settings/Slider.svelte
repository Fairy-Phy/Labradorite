<script lang="ts">
	import type SliderData from "../../config/slider-data";
    import type ThemeConfig from "../../config/theme-config";

	export let slider_data: SliderData;
	export let config: ThemeConfig;
</script>

<div class="slider-main">
	<p><span>{slider_data.title}</span><span>{slider_data.value}{slider_data.unit}</span></p>
	<input
		style="--slider-main-color: hsl({config.color_hue}, 100%, 70%);"
		type="range"
		name="" id=""
		bind:value={slider_data.value}
		min={slider_data.min}
		max={slider_data.max}
		step={slider_data.step}
	/>
</div>
