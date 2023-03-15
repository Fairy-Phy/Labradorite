<script lang="ts">
	import { onMount } from "svelte";
	import { expoOut } from "svelte/easing";

	export let is_normal_clock: boolean;

	let current_time = new Date();
	onMount(() => {
		let update_interval = setInterval(() => {
			current_time = new Date();
		}, 1000);

		return () => {
			clearInterval(update_interval);
		};
	});

	let year: string;
	let month: string;
	let day: string;

	let hour: string;
	let min: string;
	let sec: string;

	$: year = current_time.getFullYear().toString();
	$: month = (current_time.getMonth() + 1).toString().padStart(2, "0");
	$: day = current_time.getDate().toString().padStart(2, "0");
	$: hour = current_time.getHours().toString().padStart(2, "0");
	$: min = current_time.getMinutes().toString().padStart(2, "0");
	$: sec = current_time.getSeconds().toString().padStart(2, "0");

	const clock_out_animation = (node: Element) => {
		const current_height = Number(getComputedStyle(node).height.replace("px", ""));

		return {
			duration: 400,
			easing: expoOut,
			css: (time: number) => `opacity: ${time}; transform: translate3d(0, ${-current_height + (time * current_height)}px, 0)`
		};
	};
</script>

<div class="clock {is_normal_clock ? 'normal-clock' : ''}">
	<p transition:clock_out_animation>
		{year}<span>/</span>{month}<span>/</span>{day}<br>
		{hour}<span class="time-colon">:</span>{min}<span class="time-colon">:</span>{sec}
	</p>
</div>
