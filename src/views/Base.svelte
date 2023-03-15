<script lang="ts">
	import Status from "../components/Status.svelte";
	import Power from "../components/Power.svelte";
	import Settings from "../components/Settings.svelte";
	import type ThemeConfig from "../config/theme-config";
	import Language from "../components/Language.svelte";
	import Session from "../components/Session.svelte";

	export let config: ThemeConfig;
	export let base_component: Element;
</script>

<div bind:this={base_component}>
	<Settings bind:config />
	<div class="left-bottom-buttons">
		<Session bind:theme_config={config} />
		<Language bind:theme_config={config} />
		<Power bind:theme_config={config} />
	</div>
	<Status />
</div>
