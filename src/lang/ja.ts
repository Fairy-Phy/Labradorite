import type { Lang } from "./lang-type";

const Ja: Lang = {
	key: "Japanese",
	override_font_class: "locale-ja-font",
	settings: {
		title: "設定",
		main: {
			title: "メイン設定",
			readable_clock: "時計を標準表示にする",
			logging_blur: "ログイン時にぼかしを変える",
			change_blur: "変更後のぼかし"
		},
		background: {
			title: "背景の設定",
			brightness: "明るさ",
			blur: "ぼかし",
			image: "画像",
		},
	},
	power: {
		sleep: "スリープ",
		hibernate: "休止",
		shutdown: "シャットダウン",
		restart: "再起動",
	},
	textbox: {
		user: "ユーザー名を入力",
		pass: "パスワードを入力",
	},
};

export default Ja;
