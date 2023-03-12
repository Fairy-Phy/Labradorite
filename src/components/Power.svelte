<script lang="ts">
	import InlineSVG from "svelte-inline-svg";
	import power_off_button from "../assets/power-off-button.svg";
	import sleep_icon from "../assets/sleep-icon.svg";
	import hide_icon from "../assets/hide-icon.svg";
	import restart_icon from "../assets/restart-icon.svg";
	import { quintOut } from "svelte/easing";
	import cover from "../cover";

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
			css: (time: number) =>
				`opacity: ${time}; transform: translate3d(0, ${
					100 - time * 100
				}%, 0)`,
		};
	};

	const non_target_close = (e: any) => {
		if (!is_show || power_icon_element?.contains(e.target)) return;

		if (!panel_element.contains(e.target)) {
			toggle_show();
		}
	};

	const click_suspend = async () => {
		await cover(true);
		window.lightdm?.suspend();
	};
	const click_hibernate = async () => {
		await cover(true);
		window.lightdm?.hibernate();
	};
	const click_shutdown = async () => {
		await cover(true);
		window.lightdm?.shutdown();
	};
	const click_restart = async () => {
		await cover(true);
		window.lightdm?.restart();
	};
</script>

<svelte:window on:click={non_target_close} />

<div class="power">
	{#if is_show}
		<div
			class="power-panel"
			transition:panel_animation
			bind:this={panel_element}
		>
			{#if window.lightdm?.can_suspend}
				<div class="sleep-pad" on:click={click_suspend} on:keypress={() => {}}>
					<InlineSVG src={sleep_icon} />
					<span>Sleep</span>
				</div>
			{/if}
			{#if window.lightdm?.can_hibernate}
				<div on:click={click_hibernate} on:keypress={() => {}}>
					<InlineSVG src={hide_icon} />
					<span>hibernate</span>
				</div>
			{/if}
			{#if window.lightdm?.can_shutdown}
				<div on:click={click_shutdown} on:keypress={() => {}}>
					<InlineSVG src={power_off_button} />
					<span>Shutdown</span>
				</div>
			{/if}
			{#if window.lightdm?.can_restart}
				<div on:click={click_restart} on:keypress={() => {}}>
					<InlineSVG src={restart_icon} />
					<span>Restart</span>
				</div>
			{/if}
		</div>
	{/if}
	<div
		class="power-button"
		on:click={toggle_show}
		on:keypress={() => {}}
		bind:this={power_icon_element}
	>
		<InlineSVG src={power_off_button} />
	</div>
</div>
