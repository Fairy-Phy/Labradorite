<script lang="ts">
	import type ThemeConfig from "../../config/theme-config";
	import BackgroundImage from "./BackgroundImage.svelte";
	import Slider from "./Slider.svelte";

	export let config: ThemeConfig;
</script>

<div class="bg-settings-panel">
	<Slider bind:slider_data={config.background.brightness} bind:color={config.color_hue} />
	<Slider bind:slider_data={config.background.blur} bind:color={config.color_hue} />
	<p>{config.current_lang_data.settings.background.image}</p>
	<div class="bg-panel">
		{#each Array(config.images.length) as _, i}
		<BackgroundImage bind:config index={i} />
		{/each}
	</div>
</div>
