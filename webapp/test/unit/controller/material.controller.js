/*global QUnit*/

sap.ui.define([
	"mm/material_management/controller/material.controller"
], function (Controller) {
	"use strict";

	QUnit.module("material Controller");

	QUnit.test("I should test the material controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
