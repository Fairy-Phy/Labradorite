<script lang="ts">
	import Background from "../components/Background.svelte";
	import Settings from "../components/Settings.svelte";
	import ThemeConfig from "../config/theme-config";

	let config: ThemeConfig = new ThemeConfig([
		"test-bg.png",
		"nahi.png",
		"ki.png",
		"pink.png",
		"test-bg.png",
		"test-bg.png",
		"test-bg.png",
		"test-bg.png",
		"test-bg.png",
		"test-bg.png",
		"test-bg.png",
	]);
</script>

<div>
	<Background bind:config />
	<Settings bind:config />
</div>
