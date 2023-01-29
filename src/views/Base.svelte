<script lang="ts">
	import Background from "../components/Background.svelte";
    import Settings from "../components/Settings.svelte";

	let background_element: HTMLImageElement;
	let background_component: Background;

	let background_src: string = "/test-bg.png";
	let after_background_src = background_src;

	let settings_component: Settings;
	$: if (background_src !== after_background_src) {
		background_component.change_background(after_background_src)
		.then(() => {
			settings_component.update_color_hue();
		});
	}
</script>

<div>
	<Background bind:background_src bind:background_element={background_element} bind:this={background_component} />
	<Settings bind:this={settings_component} bind:background_src={after_background_src} bind:background_image_element={background_element} />
</div>
