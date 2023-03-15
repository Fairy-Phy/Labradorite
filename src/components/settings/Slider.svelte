<script lang="ts">
	import type SliderData from "../../config/slider-data";

	export let slider_data: SliderData;
	export let color: number;
</script>

<div class="slider-main">
	<p><span>{slider_data.title}</span><span>{slider_data.value}{slider_data.unit}</span></p>
	<input
		style="--slider-main-color: hsl({color}, 100%, 70%);"
		type="range"
		name="" id=""
		bind:value={slider_data.value}
		min={slider_data.min}
		max={slider_data.max}
		step={slider_data.step}
	/>
</div>
