import kaplay from "kaplay";
import loadingScene from "./scenes/loading-scene.js";
import level01 from "./scenes/level-01.js";

export const k = kaplay({
	height: 480,
	width: 640,
	canvas: document.getElementById("game-canvas"),
	background: "#82b4b4",
	global: false,
	debug: true,
	debugKey: "r",
});

k.scene("loading", loadingScene(k));
k.scene("level-01", level01(k));

k.go("loading");

export default k;
