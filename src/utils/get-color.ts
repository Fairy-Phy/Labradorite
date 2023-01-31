import ColorThief from "colorthief";
import rgb_to_hue from "./rgb-to-hue";

export default function get_color(image_element: HTMLImageElement) {
	const color_thief = new ColorThief();
	return rgb_to_hue(...color_thief.getColor(image_element));
}
