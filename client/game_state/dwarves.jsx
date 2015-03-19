Dwarf = {
	/**
	 * Creates a new dwarf.
	 * @param params
	 * - name: The name of the dwarf, must be one from the DWARF_NAMES array, required
	 */
	instantiate: function (params) {
		"use strict";

		check(params.name, String);
		check(params.color, String);

		params.char = "P";
		params.priority = Entity.ENTITY;

		const dwarf = Entity.instantiate(params);
		dwarf.nameame = params.name;

		dwarf.setAI = setAI.bind(dwarf);
		return dwarf;
	}
};

// Public methods

function setAI(ai) {
	this.act = ai;
}
