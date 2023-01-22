<script lang="ts">
	export let isChecked: boolean = false;
	export let description = "";
</script>

<div>
	<p>{description} {isChecked}</p>
	<input type="checkbox" name="" id="" bind:checked={isChecked} />
</div>
