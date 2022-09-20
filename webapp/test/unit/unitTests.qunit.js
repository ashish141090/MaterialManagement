/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"mm/material_management/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
