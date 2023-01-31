<script lang="ts">
	import { quintOut } from 'svelte/easing';
	import InlineSVG from "svelte-inline-svg";
	import setting_icon from "../assets/setting-button.svg";
	import setting_close_icon from "../assets/setting-close-button.svg";
    import BackgroundImages from './settings/BackgroundImages.svelte';
    import MainSettings from './settings/MainSettings.svelte';
	import SmoothScrollbar from '../utils/SmoothScrollbar.svelte';
    import type ThemeConfig from '../config/theme-config';

	export let config: ThemeConfig;

	let is_show = false;
	let show_icon_element: Element;
	let menu_element: Element;

	const toggle_show = () => {
		is_show = !is_show;
	};

	const panel_animation = (node: Element) => {
		const current_width = Number(getComputedStyle(node).width.replace("px", ""));

		return {
			duration: 500,
			easing: quintOut,
			css: (time: number) => `opacity: ${time}; transform: translateX(${-current_width + (time * current_width)}px)`
		};
	};

	const icon_animation = (node: Element, delay: number) => {
		return {
			delay,
			duration: 500,
			easing: quintOut,
			css: (time: number) => `opacity: ${time}`
		};
	};

	const non_target_close = (e: any) => {
		if (!is_show || show_icon_element?.contains(e.target)) return;

		if (!menu_element.contains(e.target)) {
			toggle_show();
		}
	};
</script>

<svelte:window on:click={non_target_close} />

<div class="setting">
	{#if is_show}
	<div class="setting-panel" transition:panel_animation bind:this={menu_element}>
		<SmoothScrollbar custom_class="setting-panel-scroll">
			<h1>Settings</h1>
			<h2>Main Settings</h2>
			<MainSettings bind:main_config={config.main_config} bind:color={config.color_hue} />
			<h2>Background Settings</h2>
			<BackgroundImages bind:config />
		</SmoothScrollbar>
		<div class="setting-icon setting-close" in:icon_animation={400} out:icon_animation={0}>
			<InlineSVG src={setting_close_icon} on:click={toggle_show} />
		</div>
	</div>
	{:else}
	<div class="setting-icon setting-open" in:icon_animation={400} out:icon_animation={0} bind:this={show_icon_element}>
		<InlineSVG src={setting_icon} on:click={toggle_show} />
	</div>
	{/if}
</div>
