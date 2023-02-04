<script lang="ts">
	import InlineSVG from "svelte-inline-svg";
	import power_off_button from "../assets/power-off-button.svg";
	import sleep_icon from "../assets/sleep-icon.svg";
	import hide_icon from "../assets/hide-icon.svg";
	import restart_icon from "../assets/restart-icon.svg";
    import { quintOut } from "svelte/easing";

	let is_show = false;
	let power_icon_element: Element;
	let panel_element: Element;

	const toggle_show = () => {
		is_show = !is_show;
	};

	const panel_animation = (node: Element) => {
		return {
			duration: 500,
			easing: quintOut,
			css: (time: number) => `opacity: ${time}; transform: translate3d(0, ${100 - (time * 100)}%, 0)`
		};
	};

	const non_target_close = (e: any) => {
		if (!is_show || power_icon_element?.contains(e.target)) return;

		if (!panel_element.contains(e.target)) {
			toggle_show();
		}
	};
</script>

<svelte:window on:click={non_target_close} />

<div class="power">
	{#if is_show}
	<div class="power-panel" transition:panel_animation bind:this={panel_element}>
		<div class="sleep-pad">
			<InlineSVG src={sleep_icon} />
			<span>Sleep</span>
		</div>
		<div>
			<InlineSVG src={hide_icon} />
			<span>Hidenate</span>
		</div>
		<div>
			<InlineSVG src={power_off_button} />
			<span>Shutdown</span>
		</div>
		<div>
			<InlineSVG src={restart_icon} />
			<span>Restart</span>
		</div>
	</div>
	{/if}
	<div class="power-button" on:click={toggle_show} on:keypress={() => {}} bind:this={power_icon_element}>
		<InlineSVG src={power_off_button} />
	</div>
</div>
