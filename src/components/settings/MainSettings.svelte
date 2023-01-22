<script lang="ts">
    import Checkbox from "./Checkbox.svelte";
    import Slider from "./Slider.svelte";

</script>

<div>
	<Checkbox description="Test" />
	<Slider title="Test" unit="px" min_value={0} max_value={1} step_value={0.01} />
</div>
