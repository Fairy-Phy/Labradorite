<script lang="ts">
	import InlineSVG from "svelte-inline-svg";
	import check_mark_svg from "../../assets/check_stroke.svg";

	export let isChecked: boolean = false;
	export let description = "";
	export let id = Math.random().toString(36).substring(2);

	export let main_color_hue: number;
</script>

<div class="checkbox-main">
	<input class="checkbox-input" type="checkbox" id={id} bind:checked={isChecked} />
	<label class="checkbox-label" style="--checkbox-main-color: hsl({main_color_hue}, 100%, 80%);" for={id}>
		<InlineSVG src={check_mark_svg} />
		<span>{description} {isChecked}</span>
	</label>
</div>
