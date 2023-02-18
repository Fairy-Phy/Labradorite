import {
	Signal as SignalBase,
	Greeter as GreeterBase,
	GreeterConfig as GreeterConfigBase,
	ThemeUtils as ThemeUtilsBase,
	MessageSignal,
	PromptSignal,
} from "nody-greeter-types";
import type {
	LightDMLanguage as ILightDMLanguage,
	LightDMLayout as ILightDMLayout,
	LightDMUser as ILightDMUser,
	LightDMSession as ILightDMSession,
	LightDMBattery as ILightDMBattery
} from "nody-greeter-types/ldm_interfaces";


const pass = "test";

// Impl Class

class LightDMLanguage implements ILightDMLanguage {
	public code: string;
	public name: string;
	public territory: string;

	public constructor(code: string, name: string, territory: string) {
		this.code = code;
		this.name = name;
		this.territory = territory;
	}
}

class LightDMLayout implements ILightDMLayout {
	public name: string;
	public description: string;
	public short_description: string;
	public constructor(name: string, description: string, short_description: string) {
		this.name = name;
		this.description = description;
		this.short_description = short_description;
	}
}

class LightDMUser implements ILightDMUser {
	public background: string = "";
	public display_name: string;
	public home_directory: string;
	public image: string;
	public language: string = "";
	public layout: string = "";
	public layouts: string[] = [];
	public logged_in: boolean = false;
	public session: string;
	public username: string;

	public constructor(
		username: string,
		display_name: string,
		image: string,
		session?: string
	) {
		this.username = username;
		this.display_name = display_name;
		this.image = image;
		this.session = session ?? "";

		this.home_directory = `/home/${username}/`;
	}
}

class LightDMSession implements ILightDMSession {
	public comment: string;
	public key: string;
	public name: string;
	public type: string;

	public constructor(
		key: string,
		name: string,
		comment?: string,
		type?: string
	) {
		this.key = key;
		this.name = name;
		this.comment = comment ?? "";
		this.type = type ?? "X";
	}
}

class LightDMBattery implements ILightDMBattery {
	public name: string;
	public level: number;
	public status: string;
	public ac_status: boolean;
	public capacity: number;
	public time: string;
	public watt: number;

	public constructor(
		name: string,
		level: number,
		status: string,
		ac_status: boolean,
		capacity: number,
		time: string,
		watt: number
	) {
		this.name = name;
		this.level = level;
		this.status = status;
		this.ac_status = ac_status;
		this.capacity = capacity;
		this.time = time;
		this.watt = watt;
	}
}

// Mock Data

type ClassProperty<T> = Pick<T, keyof T>;

class Signal implements ClassProperty<SignalBase> {
	private _name: string;
	private _callbacks: ((...args: unknown[]) => void)[] = [];

	public constructor(name: string) {
		this._name = name;
	}

	public connect(callback: (...args: any[]) => void): void {
		this._callbacks.push(callback);
	}

	public disconnect(callback: () => void): void {
		const i = this._callbacks.findIndex(v => v === callback);
		if (i === -1) return;

		this._callbacks.splice(i, 1);
	}

	public _emit(...args: unknown[]): void {
		for (const cb of this._callbacks) {
			cb(...args);
		}
	}
}

const battery = new LightDMBattery("Battery", 85, "Discharging", false, 100, "00:00", 0);

const ToSignalBase = (v: Signal) => v as unknown as SignalBase;
const ToSignal = (v: SignalBase) => v as unknown as Signal;

class Greeter extends GreeterBase {
	public authentication_complete: SignalBase = ToSignalBase(
		new Signal("authentication_complete")
	);
	public autologin_timer_expired: SignalBase = ToSignalBase(
		new Signal("autologin_timer_expired")
	);
	public idle: SignalBase = ToSignalBase(new Signal("idle"));
	public reset: SignalBase = ToSignalBase(new Signal("reset"));
	public show_message: MessageSignal = ToSignalBase(
		new Signal("show_message")
	);
	public show_prompt: PromptSignal = ToSignalBase(new Signal("show_prompt"));
	public brightness_update: SignalBase = ToSignalBase(
		new Signal("brightness_update")
	);
	public battery_update: SignalBase = ToSignalBase(
		new Signal("battery_update")
	);

	private _authentication_user: string | null = null;
	public get authentication_user(): string | null {
		return this._authentication_user;
	}
	public get autologin_guest(): boolean {
		return false;
	}
	public get autologin_timeout(): number {
		return 0;
	}
	public get autologin_user(): string {
		return "";
	}
	public get battery_data(): ILightDMBattery {
		return battery;
	}

	private _brightness: number = 50;
	public get brightness(): number {
		return this._brightness;
	}
	public set brightness(quantity: number) {
		if (quantity < 0) quantity = 0;
		else if (quantity > 100) quantity = 100;

		this._brightness = quantity;

		ToSignal(this.brightness_update)._emit();
	}

	public get can_access_battery(): boolean {
		return true;
	}
	public get can_access_brightness(): boolean {
		return true;
	}
	public get can_hibernate(): boolean {
		return true;
	}
	public get can_restart(): boolean {
		return true;
	}
	public get can_shutdown(): boolean {
		return true;
	}
	public get can_suspend(): boolean {
		return true;
	}

	public get default_session(): string {
		return "gnome-shell";
	}
	public get has_guest_account(): boolean {
		return false;
	}
	public get hide_users_hint(): boolean {
		return false;
	}
	public get hostname(): string {
		return "Debug";
	}
	private _in_authentication: boolean = false;
	public get in_authentication(): boolean {
		return this._in_authentication;
	}
	private _is_authenticated: boolean = false;
	public get is_authenticated(): boolean {
		return this._is_authenticated;
	}

	private _language: ILightDMLanguage | null = null;
	public get language(): ILightDMLanguage | null {
		return this._language;
	}
	public get languages(): ILightDMLanguage[] {
		return [
			new LightDMLanguage("en_US.utf8", "English", ""),
			new LightDMLanguage("ja_JP.utf8", "japanese", ""),
		];
	}

	private _layout: ILightDMLayout = new LightDMLayout(
		"us",
		"English (US)",
		"en"
	);
	public get layout(): ILightDMLayout {
		return this._layout;
	}
	public set layout(layout: ILightDMLayout) {
		this._layout = layout;
	}
	public get layouts(): ILightDMLayout[] {
		return [
			new LightDMLayout("us", "English (US)", "en"),
			new LightDMLayout("jp", "Japanese", "ja"),
		];
	}

	public get lock_hint(): boolean {
		return false;
	}
	public get remote_sessions(): ILightDMSession[] {
		return [];
	}
	public get select_guest_hint(): boolean {
		return false;
	}
	public get select_user_hint(): string | undefined {
		return "";
	}
	public get sessions(): ILightDMSession[] {
		return [
			new LightDMSession("gnome-shell", "Gnome 3"),
			new LightDMSession("i3", "i3"),
			new LightDMSession(
				"gnome-shell-wayland",
				"Gnome Wayland",
				"",
				"wayland"
			),
			new LightDMSession("plasma-shell", "Plasma (X11)"),
			new LightDMSession("mate", "MATE"),
			new LightDMSession("cinnamon", "Cinnamon"),
			new LightDMSession("openbox", "Openbox"),
		];
	}

	public get show_manual_login_hint(): boolean {
		return true;
	}
	public get show_remote_login_hint(): boolean {
		return false;
	}

	public get users(): ILightDMUser[] {
		return [
			new LightDMUser("User1", "user1", "", "gnome-shell"),
			new LightDMUser("uSer2", "user2", "", "i3"),
			new LightDMUser("usEr3", "user3", "", "plasma-shell"),
			new LightDMUser("useR4", "user4", "", "mate"),
			new LightDMUser("user5", "user5", "", "cinnamon"),
		];
	}

	public authenticate(username: string | null): boolean {
		this._authentication_user = username;
		this._in_authentication = true;

		if (username == null) ToSignal(this.show_prompt)._emit("login:", 0);

		return true;
	}

	public authenticate_as_guest(): boolean {
		return false;
	}

	public brightness_set(quantity: number): void {
		this.brightness = quantity;
	}
	public brightness_increase(quantity: number): void {
		this.brightness += quantity;
	}
	public brightness_decrease(quantity: number): void {
		this.brightness -= quantity;
	}

	public cancel_authentication(): boolean {
		this._authentication_user = null;
		this._in_authentication = false;
		return true;
	}

	public cancel_autologin(): boolean {
		return true;
	}

	private _reloadWindow(ms: number = 2000): void {
		setTimeout(() => location.reload(), ms);
	}

	public hibernate(): boolean {
		this._reloadWindow();
		return true;
	}
	public restart(): boolean {
		this._reloadWindow();
		return true;
	}
	public shutdown(): boolean {
		this._reloadWindow();
		return true;
	}
	public suspend(): boolean {
		this._reloadWindow();
		return true;
	}

	public respond(response: string): boolean {
		if (!this.in_authentication) return false;

		if (this.authentication_user == null) {
			this._authentication_user = response;
			ToSignal(this.show_prompt)._emit("Password: ", 1);
		} else {
			if (response === pass) {
				this._is_authenticated = true;
				this._in_authentication = false;
				ToSignal(this.authentication_complete)._emit();
			} else {
				setTimeout(() => {
					this._is_authenticated = false;
					ToSignal(this.authentication_complete)._emit();
					ToSignal(this.show_prompt)._emit("Password: ", 1);
				}, 3000);
			}
		}

		return true;
	}

	public set_language(language: string): boolean {
		if (this.is_authenticated) {
			this._language =
				this.languages.find((v) => v.code == language) ?? null;

			return this.language != null;
		}

		return false;
	}

	public start_session(session: string | null): boolean {
		console.log("Session:", session ?? this.default_session);
		this._reloadWindow(100);
		return true;
	}
}

class GreeterConfig implements GreeterConfigBase {
	public branding = {
		background_images_dir: "",
		logo: "",
		user_image: "",
	};

	public greeter = {
		debug_mode: true,
		detect_theme_errors: true,
		screensaver_timeout: 300,
		secure_mode: true,
		time_language: "",
		theme: "none",
	};

	public features = {
		battery: true,
		backlight: {
			enabled: true,
			value: 10,
			steps: 0,
		},
	};

	public layouts = [
		new LightDMLayout("us", "English (US)", "en"),
		new LightDMLayout("jp", "Japanese", "ja"),
	];
}

type ContextRecord = Record<string, any>;

class ThemeUtils implements ThemeUtilsBase {
	public bind_this(context: ContextRecord): ContextRecord {
		throw new Error("Method not implemented.");
	}

	public dirlist(path: string, only_images: boolean = true, callback: (args: string[]) => void): void {
		throw new Error("Method not implemented.");
	}

	public dirlist_sync(path: string, only_images: boolean = true): string[] {
		return [];
	}

	public get_current_localized_date(): string {
		throw new Error("Method not implemented.");
	}

	public get_current_localized_time(): string {
		throw new Error("Method not implemented.");
	}

}

// Process

declare global {
	interface Window {
		lightdm_debug: boolean
	}
};

window.lightdm_debug = typeof window.lightdm === undefined;

if (window.lightdm_debug) {
	console.log("running with mock data...");

}

export default {};
