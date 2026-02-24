/**
 *
 * @param {import("kaplay").KAPLAYCtxT} k
 * @returns
 */
export default function level01(k) {
	return () => {
		k.setGravity(1600);

		const player = k.add([
			k.rect(100, 100),
			k.pos(100, 100),
			k.area(),
			k.body(),
			k.color(),
			k.offscreen({ destroy: true }),
			k.anchor("center"),
			shoot(),
		]);
		k.add([
			k.rect(640, 20),
			k.pos(0, 460),
			k.color("green"),
			k.area(),
			k.body({ isStatic: true }),
			"world",
		]);

		k.add([
			k.rect(60, 180),
			k.pos(580, 280),
			k.color("green"),
			k.area(),
			k.body({ isStatic: true }),
			"world",
		]);

		k.add([
			k.rect(120, 60),
			k.pos(k.width() - 60, k.height() - 20),
			k.anchor("botright"),
			k.color("green"),
			k.area(),
			k.body({ isStatic: true }),
			"world",
		]);

		player.onKeyDown("d", () => {
			player.moveBy(10, 0);
		});

		player.onKeyDown("a", () => {
			player.moveBy(-10, 0);
		});

		player.onKeyDown("w", () => {
			if (player.isGrounded()) {
				player.jump();
			}
		});

		player.onDestroy(() => {
			alert("Game Over");
		});

		player.onKeyPress("space", () => {
			player.shoot();
		});

		k.on("collide", "projectile", (proj, gmaeObject) => {
			gmaeObject.destroy();
			proj.destroy();
		});
	};

	function shoot() {
		return {
			id: "shoot",
			shoot() {
				this.add([
					k.circle(16),
					k.color(k.RED),
					k.pos(this.width / 2 + 8, 0),
					k.move(k.RIGHT, 600),
					k.body({ gravityScale: 0 }),
					k.area(),
					"projectile",
				]);
			},
		};
	}
}
