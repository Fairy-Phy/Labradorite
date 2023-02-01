<script lang="ts">
	import Status from "./components/Status.svelte";
	import Base from "./views/Base.svelte";
    import Clock from "./views/Clock.svelte";
</script>

<main>
	<Base />
	<Clock />
	<Status screen_light={57} battery={85.1} />
</main>
