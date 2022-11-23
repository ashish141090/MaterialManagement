sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast",
    "sap/m/MessageBox",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel, MessageToast, MessageBox, Filter, FilterOperator) {
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
                debugger;

                var oData = {
                    MaterialId: this.oMaterialJson.MaterialId,
                    Batch: this.oMaterialJson.Batch,
                    ProducedOn: new Date( this.oMaterialJson.ProducedOn ),
                    Plant: this.oMaterialJson.Plant,
                };
                var odataModel = this.getView().getModel();
                odataModel.create("/MatBatchSet", oData, {
                    success: function (data, response) {
                        MessageBox.success("Material created successfully");
                    },
                    error: function (error) {
                        MessageBox.error("Error while creating the Material");
                    }
                });
            },

            onChangeCancel: function () {
                //On press of cancel button close the dialog
                this.oChangeDialog.close();
            },

            onChange: function () {
                //On press of cancel button close the dialog
                debugger;
                this.oChangeDialog.close();

                var oData = {
                    MaterialId: this.oMaterialJson.MaterialId,
                    Batch: this.oMaterialJson.Batch,
                    ProducedOn: this.oMaterialJson.ProducedOn,
                    Plant: this.oMaterialJson.Plant,
                };
                
                var odataModel = this.getView().getModel();

                var path = "/MatBatchSet(" + "MaterialId='" + this.oMaterialJson.MaterialId + 
                                "',Batch='" + this.oMaterialJson.Batch + "')";
                
                odataModel.update(path,oData,{
                    success: function(data,response){
                        MessageBox.success("Material Successfully Updated");
                    },
                    error: function(error){
                        MessageBox.error("Error while updating the Material");
                    }
                });                
            },

            onSearch: function (oEvent) {
                var aTableSearchState = [];
                var sQuery = oEvent.getParameter("query");

                if (sQuery && sQuery.length > 0) {
                    aTableSearchState = [new Filter("MaterialId", FilterOperator.Contains, sQuery)];
                }
                this._applySearch(aTableSearchState);
            },

            _applySearch: function (aTableSearchState) {
                var oTable = this.byId("table");
                oTable.getBinding("items").filter(aTableSearchState);
            },

            changeMaterial: function () {
                var sSelectedMat = this.getView().byId("table").getSelectedContexts()[0].getProperty();
                this.oMaterialJson.MaterialId = sSelectedMat.MaterialId;
                this.oMaterialJson.Batch = sSelectedMat.Batch;
                this.oMaterialJson.ProducedOn = new Date(sSelectedMat.ProducedOn);
                this.oMaterialJson.Plant = sSelectedMat.Plant;
                debugger;
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
