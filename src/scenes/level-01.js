/**
 *
 * @param {import("kaplay").KAPLAYCtxT} k
 * @returns
 */
export default function level01(k) {
	let player = null;

	return () => {
		k.setGravity(1600);

		player = k.add([
			k.rect(50, 50),
			k.pos(100, 100),
			k.area({ restitution: 0.2 }),
			k.body(),
			k.color(k.BLUE),
			k.offscreen({ destroy: true }),
			k.anchor("center"),
			shoot(),
			camCenter(),
			controller(),
			scare(),
			"player",
		]);

		k.add([
			k.rect(50, 50),
			k.pos(1000, 100),
			k.area(),
			k.body(),
			k.color(k.RED),
			k.offscreen({ destroy: false }),
			k.anchor("center"),
			hunt(),
			fear(),
			"npc",
			{
				speed: 2,
			},
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

		k.onCollide("player", "npc", (p, n, col) => {
			console.log(col);
			if (col.normal.y < 0) {
				n.destroy();
				p.jump();
			} else {
				p.destroy();
			}
		});

		k.on("shoot", "npc", (npc) => {
			npc.jump();
			console.log("Shot fired");
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
				k.trigger("shoot", "npc");
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

	function hunt() {
		return {
			id: "hunt",
			update() {
				const playerPos = player.pos;
				const selfPos = this.pos;

				if (Math.abs(playerPos.x - selfPos.x) > 400) return;

				if (playerPos.x > selfPos.x) {
					this.moveBy(this.speed, 0);
				} else if (playerPos.x < selfPos.x) {
					this.moveBy(-this.speed, 0);
				}
			},
		};
	}

	function scare() {
		return {
			id: "scare",
			add() {
				this.onKeyPress("enter", () => {
					k.trigger("scare", "fearfull");
					console.log("Scare enemies");
				});
			},
		};
	}

	function fear() {
		return {
			id: "fear",
			add() {
				this.tag("fearfull");
				this.on("scare", () => {
					console.log("Running in fear");
					this.speed = -Math.abs(this.speed);
					k.wait(1, () => {
						this.speed = Math.abs(this.speed);
					});
				});
			},
		};
	}
}
