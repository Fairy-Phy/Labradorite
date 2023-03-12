<script lang="ts">
    import { onMount } from "svelte";
    import { quintInOut, quintOut } from "svelte/easing";
	import TextBoxPlain from "../components/input/TextBoxPlain.svelte";
    import TextBoxSecret from "../components/input/TextBoxSecret.svelte";
    import UserSelectionList from "../components/input/user-selection-list";
    import delay from "../utils/delay";

	onMount(() => {
		window.lightdm?.authenticate(null);
	});

	let user_selection = new UserSelectionList(window.lightdm?.users.map(v => v.username) ?? []);
	let final_user_text = "";
	let user_entered: boolean;

	let final_pass_text = "";
	let pass_entered: boolean;

	let is_enter_password = false;
	$: is_enter_password = user_entered;

	$: if (user_entered && pass_entered) {
		const authed = window.lightdm?.authenticate(final_user_text);
		console.log("auth:", authed);
		delay(100).then(() => {
			const logged = window.lightdm?.respond(final_pass_text);
			console.log("logged:", logged);
			pass_entered = logged ?? false;
		});
	}

	const textbox_animation = (node: Element, option: {duration: number, delay: number}) => {
		return {
			duration: option.duration,
			delay: option.delay,
			easing: quintInOut,
			css: (time: number) => `opacity: ${time};`
		};
	};

	const textbox_next_animation = (node: Element, option: {delay: number, rev: boolean}) => {
		return {
			duration: 500,
			delay: option.delay,
			easing: quintOut,
			css: (time: number) => `position: absolute; z-index: -1; opacity: ${time}; transform: translate3d(calc(-50% ${option.rev ? "-" : "+"} ${100 - (time * 100)}px), -50%, 0)`
		};
	};
</script>

<div
	class="logging-panel"
	in:textbox_animation={{duration: 300, delay: 200}}
	out:textbox_animation={{duration: 100, delay: 0}}
>
	{#if is_enter_password}
	<div in:textbox_next_animation={{delay: 250, rev: true}}>
		<p>Enter the Password</p>
		<TextBoxSecret bind:is_entered={pass_entered} bind:final_text={final_pass_text} custom_class="pass-text-box" />
	</div>
	{:else}
	<div out:textbox_next_animation={{delay: 0, rev: false}}>
		<p>Enter the Username</p>
		<TextBoxPlain bind:is_entered={user_entered} bind:user_selection bind:final_text={final_user_text} custom_class="user-text-box" />
	</div>
	{/if}
</div>
