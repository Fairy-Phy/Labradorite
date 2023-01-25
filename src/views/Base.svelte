<script lang="ts">
	import Background from "../components/Background.svelte";
    import Settings from "../components/Settings.svelte";

	let background_element: HTMLImageElement;
</script>

<div>
	<Background bind:background_element={background_element} />
	<Settings bind:background_image_element={background_element} />
</div>
