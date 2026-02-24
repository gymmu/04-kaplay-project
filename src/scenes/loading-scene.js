/**
 *
 * @param {import("kaplay").KAPLAYCtxT} kaplay - Eine Instanz des Spiels in welches die Scene geladen werden soll
 */
export default function loadingScene(kaplay) {
	return () => {
		kaplay.add([
			kaplay.text("Drücke die Leertaste um\ndas Spiel zu starten."),
			kaplay.pos(kaplay.width() / 2, kaplay.height() / 2),
			kaplay.anchor("center"),
		]);

		kaplay.onKeyPress("space", () => {
			kaplay.go("level-01");
		});
	};
}
