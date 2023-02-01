<script lang="ts">
	import InlineSVG from "svelte-inline-svg";
	import screen_light_svg from "../assets/screen-light.svg";
	import battery_0_25_svg from "../assets/battery-0-25.svg";
	import battery_25_60_svg from "../assets/battery-25-60.svg";
	import battery_60_90_svg from "../assets/battery-60-90.svg";
	import battery_90_100_svg from "../assets/battery-90-100.svg";

	export let screen_light: number;
	export let battery: number;
</script>

<div class="status-bar">
	<div class="monitor-brightness">
		<InlineSVG src={screen_light_svg} />
		<span>{screen_light}%</span>
	</div>
	<div class="battery-percent">
		<InlineSVG src={
			battery >= 90 ?
				battery_90_100_svg
			: battery >= 60 ?
				battery_60_90_svg
			: battery >= 25 ?
				battery_25_60_svg
			:
				battery_0_25_svg
		} />
		<span>{battery}%</span>
	</div>
</div>
