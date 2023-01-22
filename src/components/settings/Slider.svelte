<script lang="ts">
	export let current_value = 0;

	export let min_value = 0;
	export let max_value = 0;
	export let step_value = 0;

	export let title = "";

	export let unit = "";
</script>

<div>
	<p>{title}  {current_value}{unit}</p>
	<input type="range" name="" id="" bind:value={current_value} min={min_value} max={max_value} step={step_value} />
</div>
