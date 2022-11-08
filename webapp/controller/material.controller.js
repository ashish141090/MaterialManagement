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
                this.oMaterial = new JSONModel();
                this.oMaterial.setDefaultBindingMode(sap.ui.model.BindingMode.TwoWay);
                this.oMaterialJson = {};
                this.oMaterialJson.MaterialId = "";
                this.oMaterialJson.Batch = "";
                this.oMaterialJson.ProducedOn = "";
                this.oMaterialJson.Plant = "";
            },

            clearMaterial: function () {
                this.oMaterialJson.MaterialId = "";
                this.oMaterialJson.Batch = "";
                this.oMaterialJson.ProducedOn = "";
                this.oMaterialJson.Plant = "";
            },

            createMaterial: function () {                
                this.clearMaterial();
                this.oMaterial.setData(this.oMaterialJson);
                var that = this;
                
                if (!that._CreateDialog) {
                    // Load fragment
                    that._CreateDialog = sap.ui.core.Fragment.load({
                        id: that.getView().getId() + "Create",
                        name: "mm.materialmanagement.fragments.CreateMaterial",
                        controller: that
                    }).then(function (oDialog) {
                        that.getView().addDependent(oDialog);
                        return oDialog;
                    }.bind(that));
                }

                that._CreateDialog.then(function (oCreateDialog) {
                    // Open dialog and set the model
                    that.oCreateDialog = oCreateDialog;
                    oCreateDialog.setModel(that.oMaterial);
                    oCreateDialog.open();
                });

            },

            onCreateCancel: function () {
                //On press of cancel button close the dialog
                this.oCreateDialog.close();
            },

            onCreate: function () {
                //On press of cancel button close the dialog
                this.oCreateDialog.close();
            },

            onChangeCancel: function () {
                //On press of cancel button close the dialog
                this.oChangeDialog.close();
            },

            onChange: function () {
                //On press of cancel button close the dialog
                this.oChangeDialog.close();                
            },

            changeMaterial: function () {     
                var sSelectedMat = this.getView().byId("table").getSelectedContexts()[0].getProperty();
                this.oMaterialJson.MaterialId = sSelectedMat.MaterialId;
                this.oMaterialJson.Batch = sSelectedMat.Batch;
                this.oMaterialJson.ProducedOn = sSelectedMat.ProducedOn;
                this.oMaterialJson.Plant = sSelectedMat.Plant;
                var that = this;

                this.oMaterial.setData(this.oMaterialJson);

                if (!that._ChangeDialog) {
                    // Load fragment
                    that._ChangeDialog = sap.ui.core.Fragment.load({
                        id: that.getView().getId() + "Change",
                        name: "mm.materialmanagement.fragments.ChangeMaterial",
                        controller: that
                    }).then(function (oChangeDialog) {
                        that.getView().addDependent(oChangeDialog);
                        return oChangeDialog;
                    }.bind(that));
                }

                that._ChangeDialog.then(function (oChangeDialog) {
                    // Open dialog and set the model
                    that.oChangeDialog = oChangeDialog;
                    oChangeDialog.setModel(that.oMaterial);
                    oChangeDialog.open();
                });

            }

        });
    });
