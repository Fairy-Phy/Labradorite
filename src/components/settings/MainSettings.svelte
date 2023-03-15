<script lang="ts">
	import type MainConfig from "../../config/main-config";
	import Checkbox from "./Checkbox.svelte";
	import Slider from "./Slider.svelte";

	export let main_config: MainConfig;
	export let color: number;
</script>

<div class="main-settings-panel">
	<Checkbox bind:color bind:checkbox_data={main_config.normal_clock_checkbox} />
	<Checkbox bind:color bind:checkbox_data={main_config.logging_blur_checkbox} />
	<Slider bind:slider_data={main_config.change_blur_slider} bind:color />
</div>
