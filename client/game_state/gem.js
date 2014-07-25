/**
 * Create a new gem.
 * @param x coordinate
 * @param y coordinate
 * @returns {*}
 */
createGem = function (params)
{
	"use strict";

	// Private fields

	params.char = "*";
	params.color = "orange";
	params.priority = Entity.ITEM;

	var gem = createEntity(params);
	return gem;
};