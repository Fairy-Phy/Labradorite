<script lang="ts">
    import { onMount } from "svelte";


	export let current_index: number;
	export let index: number;
	export let image_src: string;
	export let color_hue: number;

	let content_up_down_element: HTMLElement;
	onMount(() => {
		content_up_down_element
	});

	let is_selected: boolean;
	$: is_selected = current_index === index;
	const image_clicked = () => {
		if (!is_selected) {
			current_index = index;
		}
	};
</script>

<div class="bg-content {is_selected ? 'selected-bg' : ''}" on:click={image_clicked} on:keypress={() => {}} style="--bg-content-color: hsl({color_hue}, 100%, {is_selected ? 100 : 70}%);">
	<span class="content-up-down" bind:this={content_up_down_element}>
		<span class="content-left-right">
			<img src={image_src} alt="">
		</span>
	</span>
</div>
