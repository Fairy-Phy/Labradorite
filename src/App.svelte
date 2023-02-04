<script lang="ts">
	import Base from "./views/Base.svelte";
	import Clock from "./views/Clock.svelte";
	import ThemeConfig from "./config/theme-config";
	import Background from "./components/Background.svelte";
    import Logging from "./views/Logging.svelte";

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

	let is_logging = false;
	let base_component: Element;

	const state_change = () => {
		if (!is_logging) {
			is_logging = true;
		}
	};

	const state_change_click = (e: any) => {
		if (!base_component.contains(e.target)) {
			state_change();
		}
	};
</script>

<svelte:window on:click={state_change_click} on:keypress={state_change} />

<main>
	<Background bind:config />
	<Base bind:config bind:base_component />
	{#if is_logging}
		<Logging />
	{:else}
		<Clock />
	{/if}
</main>
