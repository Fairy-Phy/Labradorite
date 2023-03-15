<script lang="ts">
	import { quintOut } from "svelte/easing";
	import type ThemeConfig from "../config/theme-config";


	let is_show = false;
	const session_list = window.lightdm?.sessions ?? [];

	export let theme_config: ThemeConfig;


	const toggle_show = () => {
		is_show = !is_show;
	};

	const click_button = (session: string) => {
		theme_config.select_session = session;
		toggle_show();
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

<div class="text-list">
	{#if is_show}
	<div class="text-list-panel" transition:panel_animation bind:this={panel_element}>
		{#each session_list as session}
		<div on:click={() => click_button(session.key)} on:keypress={() => {}}>
			{session.name}
		</div>
		{/each}
	</div>
	{/if}
	<div class="text-list-button" on:click={toggle_show} on:keypress={() => {}} bind:this={button_element}>
		<p>{theme_config.select_session ?? "No select"}</p>
	</div>
</div>
