<script lang="ts">
	import InlineSVG from "svelte-inline-svg";
	import screen_light_svg from "../assets/screen-light.svg";
	import battery_0_25_svg from "../assets/battery-0-25.svg";
	import battery_25_60_svg from "../assets/battery-25-60.svg";
	import battery_60_90_svg from "../assets/battery-60-90.svg";
	import battery_90_100_svg from "../assets/battery-90-100.svg";

	let screen_light: number = 0;
	let battery: number = 0;

	if (window.lightdm?.can_access_brightness) {
		screen_light = window.lightdm?.brightness ?? 0;
		window.lightdm.brightness_update.connect(() => {
			screen_light = window.lightdm?.brightness ?? 0;
		});
	}
	if (window.lightdm?.can_access_battery) {
		battery = window.lightdm?.battery_data?.level ?? 0;
		window.lightdm.battery_update.connect(() => {
			battery = window.lightdm?.battery_data?.level ?? 0;
		});
	}

	const battery_svgs: [number, number, string][] = [
		[100, 90, battery_90_100_svg],
		[89, 60, battery_60_90_svg],
		[59, 25, battery_25_60_svg],
		[24, 0, battery_0_25_svg]
	];
</script>

<div class="status-bar">
	{#if window.lightdm?.can_access_brightness}
	<div class="monitor-brightness">
		<InlineSVG src={screen_light_svg} />
		<span>{screen_light}%</span>
	</div>
	{/if}
	{#if window.lightdm?.can_access_battery}
	<div class="battery-percent">

		{#each battery_svgs as data}
			{#if battery <= data[0] && battery >= data[1]}
			<InlineSVG src={data[2]} />
			{/if}
		{/each}
		<span>{battery}%</span>
	</div>
	{/if}
</div>
