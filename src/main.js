import kaplay from "kaplay";

const k = kaplay({
	height: 480,
	width: 640,
	canvas: document.getElementById("game-canvas"),
	background: "#82b4b4",
	global: false,
});

k.setGravity(1600);

const player = k.add([
	k.rect(100, 100),
	k.pos(100, 100),
	k.area(),
	k.body(),
	k.color(),
	k.offscreen({ destroy: true }),
]);
k.add([
	k.rect(640, 20),
	k.pos(0, 460),
	k.color("green"),
	k.area(),
	k.body({ isStatic: true }),
]);

k.add([
	k.rect(60, 200),
	k.pos(580, 260),
	k.color("green"),
	k.area(),
	k.body({ isStatic: true }),
]);

player.onKeyDown("d", () => {
	player.moveBy(10, 0);
});

player.onKeyDown("a", () => {
	player.moveBy(-10, 0);
});

player.onDestroy(() => {
	alert("Game Over");
});
