<script lang="ts">
	export let current_value = 0;

	export let min_value = 0;
	export let max_value = 0;
	export let step_value = 0;

	export let title = "";

	export let unit = "";

	export let main_color_hue: number;
</script>

<div class="slider-main">
	<p><span>{title}</span><span>{current_value}{unit}</span></p>
	<input style="--slider-main-color: hsl({main_color_hue}, 100%, 70%);" type="range" name="" id="" bind:value={current_value} min={min_value} max={max_value} step={step_value} />
</div>
