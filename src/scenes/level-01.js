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
			camCenter(),
			controller(),
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
			k.rect(640, 20),
			k.pos(680, 460),
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

		player.onKeyDown("space", () => {
			if (player.isGrounded()) {
				player.jump();
			}
		});

		player.onDestroy(() => {
			alert("Game Over");
		});

		player.onKeyPress("e", () => {
			player.shoot();
		});

		k.on("collide", "projectile", (proj, gameObject) => {
			gameObject.destroy();
			proj.destroy();
		});
	};

	function shoot() {
		const radius = 8;
		const speed = 600; // pixels pro sekunde; oder :60 falls pixel pro frame

		return {
			id: "shoot",
			shoot() {
				const projectile = k.add([
					k.anchor("center"),
					k.circle(radius),
					k.color(k.RED),
					k.pos(this.pos.add(this.width / 2 + radius + 1, 0)),
					k.body({ gravityScale: 0 }),
					k.area({ restitution: 1 }),
					"projectile",
				]);
				projectile.applyImpulse(k.vec2(speed, 0));
			},
		};
	}

	function camCenter() {
		return {
			id: "camCenter",
			update() {
				let { x, y } = this.pos;
				x = Math.max(k.width() / 2 - 100, x);
				y = Math.min(y, k.height() / 2 + 100);
				k.setCamPos(x, y);
			},
		};
	}

	function followMouse() {
		return {
			id: "followMouse",
			update() {
				this.moveTo(k.mousePos());
			},
		};
	}

	function controller() {
		return {
			id: "controller",
			add() {
				this.onKeyDown("d", () => {
					this.moveBy(10, 0);
				});

				this.onKeyDown("a", () => {
					this.moveBy(-10, 0);
				});
			},
		};
	}
}
