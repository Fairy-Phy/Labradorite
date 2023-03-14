<script lang="ts">
	import { quintOut } from "svelte/easing";
	import type ThemeConfig from "../config/theme-config";


	let is_show = false;
	let current_layout = window.lightdm?.layout.description;

	export let theme_config: ThemeConfig;

	const click_button = (lang_key: string) => {
		theme_config.language_config.current_language = lang_key;
		theme_config.current_lang_data = theme_config.language_config.get_language();
	};

	const toggle_show = () => {
		is_show = !is_show;
	};

	const panel_animation = (_: Element) => {
		return {
			duration: 500,
			easing: quintOut,
			css: (time: number) =>
				`opacity: ${time}; transform: translate3d(0, ${
					100 - time * 100
				}%, 0)`,
		};
	};

	let panel_element: HTMLDivElement;
	let button_element: HTMLDivElement;
	const non_target_close = (e: any) => {
		if (!is_show || button_element.contains(e.target)) return;

		if (!panel_element.contains(e.target)) {
			toggle_show();
		}
	};
</script>

<svelte:window on:click={non_target_close} />

<div class="language">
	{#if is_show}
	<div class="language-panel" transition:panel_animation bind:this={panel_element}>
		{#each theme_config.language_config.lang_key_list as key}
		<div on:click={() => click_button(key)} on:keypress={() => {}}>
			{key}
		</div>
		{/each}
	</div>
	{/if}
	<div class="language-button" on:click={toggle_show} on:keypress={() => {}} bind:this={button_element}>
		<p>{theme_config.language_config.current_language}({current_layout})</p>
	</div>
</div>
