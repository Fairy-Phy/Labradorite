const browser = import.meta.env?.SSR ?? typeof window !== "undefined";

export default class LocalStorage {
	public static get_value(key: string): string | null {
		if (browser) {
			return localStorage.getItem(key);
		}

		return null;
	}

	public static set_value(key: string, value: string) {
		if (browser) {
			localStorage.setItem(key, value);
		}
	}
}
