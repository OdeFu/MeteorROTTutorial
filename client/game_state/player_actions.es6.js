"use strict";

function createMoveAction(dirKey) {
	function checkGem(player) {
		const gem = GemThief.Game.state.dungeon.getGem(player.x, player.y);
		if (gem) {
			GemThief.Game.state.mapDisplay.setMessage("You picked up a gem.", 1);
			GemThief.PlayerData.addGem();
			GemThief.Game.state.dungeon.removeGem(gem);
		}
	}

	function moveAction() {
		const player = GemThief.Game.state.dungeon.player;
		const dir = ROT.DIRS[8][dirKey];
		const newX = player.x + dir[0];
		const newY = player.y + dir[1];

		if (GemThief.Game.state.dungeon.map.isBlocking(newX, newY)) {
			/* Cannot move in this direction */
			return;
		}

		GemThief.Game.state.dungeon.map.moveEntity(player, newX, newY);

		checkGem(player);

		GemThief.PlayerData.addMove(GemThief.Game.state.dungeon.map.level);
	}

	return moveAction;
}

function createClimbStairsAction(down) {
	function climbStairsAction() {
		const player = GemThief.Game.state.dungeon.player;
		const tile = GemThief.Game.state.dungeon.map.getTile(player.x, player.y);
		const entity = tile.getEntity(GemThief.Entity.FLOOR);
		if (entity.type === GemThief.Stairs.type) {
			if (entity.down === down) {
				const nextLevel = GemThief.Game.state.dungeon.map.level + (down ? 1 : -1);
				GemThief.Game.moveToLevel(nextLevel);
			}
			else {
				GemThief.Game.state.mapDisplay.setMessage("You cannot climb " + (down ? "down" : "up") +
				" these stairs.");
			}
		}
		else {
			GemThief.Game.state.mapDisplay.setMessage("There are no stairs here.");
		}
	}

	return climbStairsAction;
}

GemThief.PlayerActions = [];

// Movement
GemThief.PlayerActions[ROT.VK_UP] = createMoveAction(0);
GemThief.PlayerActions[ROT.VK_PAGE_UP] = createMoveAction(1);
GemThief.PlayerActions[ROT.VK_RIGHT] = createMoveAction(2);
GemThief.PlayerActions[ROT.VK_PAGE_DOWN] = createMoveAction(3);
GemThief.PlayerActions[ROT.VK_DOWN] = createMoveAction(4);
GemThief.PlayerActions[ROT.VK_END] = createMoveAction(5);
GemThief.PlayerActions[ROT.VK_LEFT] = createMoveAction(6);
GemThief.PlayerActions[ROT.VK_HOME] = createMoveAction(7);

// GemThief.Stairs
GemThief.PlayerActions[ROT.VK_LESS_THAN] = createClimbStairsAction(false);
GemThief.PlayerActions[ROT.VK_GREATER_THAN] = createClimbStairsAction(true);