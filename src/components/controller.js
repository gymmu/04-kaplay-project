import k from "../main";

export default function controller() {
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
