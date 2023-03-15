<script lang="ts">
	import InlineSVG from "svelte-inline-svg";
	import check_mark_svg from "../../assets/check_stroke.svg";
	import type CheckboxData from "../../config/checkbox-data";

	export let checkbox_data: CheckboxData;
	export let color: number;

	let id = Math.random().toString(36).substring(2);
</script>

<div class="checkbox-main">
	<input class="checkbox-input" type="checkbox" id={id} bind:checked={checkbox_data.value} />
	<label class="checkbox-label" style="--checkbox-main-color: hsl({color}, 100%, 80%);" for={id}>
		<InlineSVG src={check_mark_svg} />
		<span>{checkbox_data.description}</span>
	</label>
</div>
