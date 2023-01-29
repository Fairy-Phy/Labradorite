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
	<Slider bind:main_color_hue={color_hue} title="Test" unit="px" min_value={0} max_value={1} step_value={0.01} />
	<Slider bind:main_color_hue={color_hue} title="Test two" unit="%" min_value={0} max_value={1} step_value={0.01} />
	<Slider bind:main_color_hue={color_hue} title="Test three" unit="" min_value={0} max_value={1} step_value={0.01} />
</div>
