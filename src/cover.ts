import delay from "./utils/delay";

const fade_time = 500;
const anim_class = "index_cover_anim";

export default async function cover(is_show: boolean) {
	const cover = document.getElementById("cover");
	if (cover == null) return;

	if (is_show) {
		cover.style.display = "block";
		// つけないとフェードされない
		await delay(100);
		cover.classList.add(anim_class);
		await delay(fade_time);
	}
	else {
		cover.classList.remove(anim_class);
		await delay(fade_time);

		cover.style.display = "none";
	}
}
