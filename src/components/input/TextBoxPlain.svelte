<script lang="ts">
	import TextBoxFrame from "./TextBoxFrame.svelte";
	import type UserSelectionList from "./user-selection-list";

	export let final_text: string;
	export let user_selection: UserSelectionList;
	export let is_entered = false;
	export let custom_class = "";

	const in_final_text = () => {
		final_text = user_selection.select();
	};

	const input_bind_wrapper = (t: string) => {
		user_selection.updateText(t);
		user_selection.sorted_list = user_selection.getList();
	};

	const change_select_from_key_event = (e: KeyboardEvent) => {
		if (e.key === "ArrowDown" && user_selection.current_select !== user_selection.sorted_list.length - 1) {
			user_selection.current_select++;
		}
		else if (e.key === "ArrowUp" && user_selection.current_select !== 0) {
			user_selection.current_select--;
		}
		else if (e.key === "Tab") {
			e.preventDefault();
			if (user_selection.current_select + 1 === user_selection.sorted_list.length) {
				user_selection.current_select = 0;
			}
			else {
				user_selection.current_select++;
			}
		}
	};
</script>

<svelte:window on:keydown={change_select_from_key_event} />

<TextBoxFrame
	in_final_text={in_final_text} bind:is_entered bind:custom_class
	font='normal 500 20px "Rajdhani"'
	letter_spacing="0.05em"
	textbox_max_width={270}
	input_bind_replacer={input_bind_wrapper}
>
	<div class="user-list-panel">
		{#each user_selection.sorted_list as user, i}
			{#if user_selection.current_select === i}
				<p class="user-list-content user-list-content-selected">{user}</p>
			{:else}
				<p class="user-list-content">{user}</p>
			{/if}
		{/each}
	</div>
</TextBoxFrame>
