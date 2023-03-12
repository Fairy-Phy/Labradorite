export default class PreloadImages {
	private image_load_task: Promise<unknown>[] = [];

	constructor(images: string[]) {
		for (const src of images) {
			this.image_load_task.push(new Promise(r => {
				const image = new Image();
				image.src = src;
				image.onload = r;
			}));
		}
	}

	public async wait_load(): Promise<void> {
		await Promise.all(this.image_load_task);
	}
}
