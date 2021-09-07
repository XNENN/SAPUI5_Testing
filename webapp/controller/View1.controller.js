
	sap.ui.define([
		"sap/ui/core/mvc/Controller",
		"sap/m/MessageToast",
		'sap/ui/model/json/JSONModel'
	], function (Controller, MessageToast, JSONModel) {
		"use strict";

		return Controller.extend("sapui5test.controller.View1", {
			onShowHello : function () {
				MessageToast.show("Hello World");
			},
			onInit : function () {
				// set mock model
				var sPath = sap.ui.require.toUrl('../data/data.json'),
					oModel = new JSONModel(sPath);
	
				this.getView().setModel(oModel);
			},
	
			handleEditPress : function (oEvent) {
				var oTileContainer = this.byId("container"),
					bEditable = !oTileContainer.getEditable();
	
				oTileContainer.setEditable(bEditable);
				oEvent.getSource().setText(bEditable ? "Done" : "Edit");
			},
	
			handleBusyPress : function (oEvent) {
				var oTileContainer = this.byId("container"),
					bBusy = !oTileContainer.getBusy();
	
				oTileContainer.setBusy(bBusy);
				oEvent.getSource().setText(bBusy ? "Done" : "Busy state");
			},
	
			handleTileDelete : function (oEvent) {
				var oTile = oEvent.getParameter("tile");
				oEvent.getSource().removeTile(oTile);
			}
		});
	});


