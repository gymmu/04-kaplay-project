import k from "../main";

export default function jump() {
	return {
		id: "jump",
		add() {
			this.onKeyDown("space", () => {
				if (this.isGrounded()) {
					this.jump();
				}
			});
			this.onCollide("npc", (npc, col) => {
				if (col.normal.y < 0) {
					//npc.destroy();
					this.jump();
				} else {
					//this.destroy();
				}
			});
		},
	};
}
