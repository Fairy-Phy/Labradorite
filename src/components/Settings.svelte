<script lang="ts">
	import { quintOut } from 'svelte/easing';
	import InlineSVG from "svelte-inline-svg";
	import setting_icon from "../assets/setting-button.svg";
	import setting_close_icon from "../assets/setting-close-button.svg";
    import BackgroundImages from './settings/BackgroundImages.svelte';
    import MainSettings from './settings/MainSettings.svelte';
	import SmoothScrollbar from '../utils/SmoothScrollbar.svelte';

	import ColorThief from "colorthief";
	const rgb_to_hue = (r: number, g: number, b: number) => {
		r /= 255;
		g /= 255;
		b /= 255;
		const max = Math.max(r, g, b), min = Math.min(r, g, b);

		let h: number = 0;
		if (max !== min) {
			const d = max - min;
			switch (max) {
				case r:
					h = (g - b) / d + (g < b ? 6 : 0);
					break;
				case g:
					h = (b - r) / d + 2;
					break;
				case b:
					h = (r - g) / d + 4;
					break;
			}
			h /= 6;
		}

		return Math.round(h * 360);
	};
	const get_color = (image_element: HTMLImageElement) => {
		const color_thief = new ColorThief();
		return rgb_to_hue(...color_thief.getColor(image_element));
	};

	export let background_image_element: HTMLImageElement;
	let background_hue = 0;

	let is_show = false;

	let show_icon_element: Element;
	let menu_element: Element;

	$: if (is_show) {
		if (background_image_element) {
			background_hue = get_color(background_image_element);
		}
		else {
			console.error("could not load image...");
		}
	}

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
			<MainSettings bind:color_hue={background_hue} />
			<h2>Background Settings</h2>
			<BackgroundImages />
			<div style="margin: 0 1%; display: flex; flex-wrap: wrap; gap: 1%;">
				<img src="/test-bg.png" alt="" style="margin-top: 1%; width: 49%;">
				<img src="/test-bg.png" alt="" style="margin-top: 1%; width: 49%;">
				<img src="/test-bg.png" alt="" style="margin-top: 1%; width: 49%;">
				<img src="/test-bg.png" alt="" style="margin-top: 1%; width: 49%;">
				<img src="/test-bg.png" alt="" style="margin-top: 1%; width: 49%;">
				<img src="/test-bg.png" alt="" style="margin-top: 1%; width: 49%;">
				<img src="/test-bg.png" alt="" style="margin-top: 1%; width: 49%;">
				<img src="/test-bg.png" alt="" style="margin-top: 1%; width: 49%;">
				<img src="/test-bg.png" alt="" style="margin-top: 1%; width: 49%;">
				<img src="/test-bg.png" alt="" style="margin-top: 1%; width: 49%;">
				<img src="/test-bg.png" alt="" style="margin-top: 1%; width: 49%;">
				<img src="/test-bg.png" alt="" style="margin-top: 1%; width: 49%;">
				<img src="/test-bg.png" alt="" style="margin-top: 1%; width: 49%;">
				<img src="/test-bg.png" alt="" style="margin-top: 1%; width: 49%;">
				<img src="/test-bg.png" alt="" style="margin-top: 1%; width: 49%;">
				<img src="/test-bg.png" alt="" style="margin-top: 1%; width: 49%;">
				<img src="/test-bg.png" alt="" style="margin-top: 1%; width: 49%;">
				<img src="/test-bg.png" alt="" style="margin-top: 1%; width: 49%;">
				<img src="/test-bg.png" alt="" style="margin-top: 1%; width: 49%;">
			</div>
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
