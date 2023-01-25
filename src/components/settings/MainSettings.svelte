<script lang="ts">
    import Checkbox from "./Checkbox.svelte";
    import Slider from "./Slider.svelte";

	export let color_hue: number;
</script>

<div class="main-settings-panel">
	<Checkbox bind:main_color_hue={color_hue} description="Test" />
	<Checkbox bind:main_color_hue={color_hue} description="Test two" />
	<Checkbox bind:main_color_hue={color_hue} description="Test three" />
	<Checkbox bind:main_color_hue={color_hue} description="Test four" />
	<Slider title="Test" unit="px" min_value={0} max_value={1} step_value={0.01} />
</div>
