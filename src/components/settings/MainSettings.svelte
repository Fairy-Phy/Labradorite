<script lang="ts">
    import type MainConfig from "../../config/main-config";
    import Checkbox from "./Checkbox.svelte";

	export let main_config: MainConfig;
	export let color: number;
</script>

<div class="main-settings-panel">
	<Checkbox bind:color bind:checkbox_data={main_config.test1} />
	<Checkbox bind:color bind:checkbox_data={main_config.test2} />
	<Checkbox bind:color bind:checkbox_data={main_config.test3} />
	<Checkbox bind:color bind:checkbox_data={main_config.test4} />
</div>
