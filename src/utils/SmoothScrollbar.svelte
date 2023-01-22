<script lang="ts">
	import { onDestroy, onMount } from "svelte";
	import Scrollbar from 'smooth-scrollbar';

	let smooth_content: HTMLDivElement;
	let scrollbar: Scrollbar;
	export let custom_class: string = "";
	export let damping = 0.1;
	export let thumbMinSize = 20;
	export let renderByPixels = true;
	export let alwaysShowTracks = false;
	export let continuousScrolling = true;
	export let delegateTo: EventTarget | null = null;
	export let plugins: object = {};

	onMount(() => {
		scrollbar = Scrollbar.init(smooth_content, {
			damping,
			thumbMinSize,
			renderByPixels,
			alwaysShowTracks,
			continuousScrolling,
			delegateTo,
			plugins,
		});
	});

	onDestroy(() => {
		scrollbar.destroy();
	});
</script>

<div class={custom_class} bind:this={smooth_content}>
	<slot></slot>
</div>
