sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel) {
        "use strict";

        return Controller.extend("mm.materialmanagement.controller.material", {
            onInit: function () {
                this.materialItem = new JSONModel();

            },
            createMaterial: function () {
                var that = this;
                if (!that._Dialog) {
                    // Load fragment
                    that._Dialog = sap.ui.core.Fragment.load({
                        id: that.getView().getId(),
                        name: "mm.materialmanagement.fragments.CreateMaterial",
                        controller: that
                    }).then(function (oDialog) {
                        that.getView().addDependent(oDialog);
                        return oDialog;
                    }.bind(that));
                }

                that._Dialog.then(function (oDialog) {
                    // Open dialog and set the model
                    that.oDialog = oDialog;
                    oDialog.open();
                });

            },
            onCancel: function () {
                //On press of cancel button close the dialog
                this.oDialog.close();
            }

        });
    });
