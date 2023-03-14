<script lang="ts">
	import Base from "./views/Base.svelte";
	import Clock from "./views/Clock.svelte";
	import ThemeConfig from "./config/theme-config";
	import Background from "./components/Background.svelte";
	import Logging from "./views/Logging.svelte";
	import delay from "./utils/delay";
	import { onMount } from "svelte";
	import PreloadImages from "./utils/PreloadImages";
	import cover from "./cover";

	const image_folder_list = [
		"./",
		"./imgs",
		"/usr/share/backgrounds",
	];
	const background_image_list: string[] = [];
	for (const path of image_folder_list) {
		background_image_list.push(...(window.theme_utils?.dirlist_sync(path, true) ?? []));
	}
	onMount(async () => {
		await (new PreloadImages(background_image_list)).wait_load();

		await cover(false);
	});

	window.lightdm?.authentication_complete.connect(async () => {
		if (window.lightdm?.is_authenticated) {
			await cover(true);

			window.lightdm?.start_session(window.lightdm.default_session);
		}
		else {
			console.log("Login Failed");
			const textbox_main_element = document.getElementById("textbox_main");
			if (textbox_main_element == null) return;
			textbox_main_element.classList.add("textbox-missing");
			await delay(250);
			textbox_main_element.classList.remove("textbox-missing");
		}
	});
	window.lightdm?.reset.connect(async () => {
		await cover(false);
	});

	let authed_user_background = "";
	if (window.lightdm?.authentication_user ?? "" !== "") {
		authed_user_background = window.lightdm?.users.find(v => v.username === window.lightdm?.authentication_user ?? "")?.background ?? "";
	}
	let config: ThemeConfig = new ThemeConfig(background_image_list, authed_user_background);

	let is_logging = false;
	let base_component: Element;

	const escape_clock = (e: KeyboardEvent) => {
		if (is_logging && e.key === "Escape") {
			is_logging = false;
		}
	};

	const state_change = (e?: KeyboardEvent) => {
		if (!is_logging) {
			e?.preventDefault();
			is_logging = true;
		}
	};

	const state_change_click = (e: any) => {
		if (!base_component.contains(e.target)) {
			state_change();
		}
	};

</script>

<svelte:window on:click={state_change_click} on:keypress={state_change} on:keydown={escape_clock} />

<main>
	<Background bind:config />
	<Base bind:config bind:base_component />
	{#if is_logging}
		<Logging />
	{:else}
		<Clock />
	{/if}
</main>
