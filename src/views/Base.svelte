<script lang="ts">
	import Status from "../components/Status.svelte";
    import Power from "../components/Power.svelte";
	import Settings from "../components/Settings.svelte";
    import type ThemeConfig from "../config/theme-config";

	export let config: ThemeConfig;
	export let base_component: Element;
</script>

<div bind:this={base_component}>
	<Settings bind:config />
	<Power />
	<Status screen_light={57} battery={85.1} />
</div>
