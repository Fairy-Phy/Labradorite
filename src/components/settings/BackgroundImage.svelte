<script lang="ts">
    import type ThemeConfig from "../../config/theme-config";

	export let config: ThemeConfig;
	export let index: number;

	let is_selected: boolean;
	$: is_selected = config.selected_index === index;
	const image_clicked = () => {
		if (!is_selected) {
			config.selected_index = index;
		}
	};
</script>

<div class="bg-content {is_selected ? 'selected-bg' : ''}" on:click={image_clicked} on:keypress={() => {}} style="--bg-content-color: hsl({config.color_hue}, 100%, {is_selected ? 100 : 70}%);">
	<span class="content-up-down">
		<span class="content-left-right">
			<img src={config.images[index]} alt="">
		</span>
	</span>
</div>
