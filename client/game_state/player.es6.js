"use strict";

GemThief.Player = {
	instantiate: function (params) {
		params.priority = GemThief.Entity.ENTITY;
		params.char = "@";
		params.color = "white";

		const player = GemThief.Entity.instantiate(params);
		player.act = act.bind(player);
		return player;
	}
};

// Public methods

function act() {
	GemThief.Game.state.engine.lock();

	// Wait for user input, do stuff when the user hits a key
	window.addEventListener("keypress", _handleEvent);
	window.addEventListener("keydown", _handleEvent);
}

// Private methods

function _handleEvent(event) {
	// Process user input
	const action = GemThief.PlayerActions[event.keyCode];
	if (action) {
		action();

		window.removeEventListener("keypress", _handleEvent);
		window.removeEventListener("keydown", _handleEvent);
		GemThief.Game.state.engine.unlock();
	}
}
