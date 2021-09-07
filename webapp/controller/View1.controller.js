
	sap.ui.define([
		"sap/ui/core/mvc/Controller",
		"sap/m/MessageToast",
		'sap/ui/model/json/JSONModel'
	], function (Controller, MessageToast, JSONModel) {
		"use strict";

		return Controller.extend("sapui5test.controller.View1", {

			onShowHello : function () {
				MessageToast.show("That doesn't do anything, does it?");
			},

			onInit : function () {
				// set mock model

				var sPath = 'data/data.json',
				oModel = new JSONModel(sPath);

				this.getView().setModel(oModel);
			},

			onCallAPI : function () {

				$.ajax({
					type: "GET",
					url: "https://sv443.net/jokeapi/v2/joke/any?format=json",
					contentType: "application/json",
					dataType : "json",
					success : this.successAPI.bind(this)

				});
			},
			successAPI : function (Jokes) {

				var oModel = new JSONModel();
				oModel.setData({
					"myJokes": [Jokes]
				});
				var oList = this.getView().byId("restdata");

				oList.setModel(oModel);
				if(Jokes.type == "twopart"){
				oList.bindItems({
					path: "/myJokes",
					template: new sap.m.DisplayListItem({
						label: "{category}",
						value: "{setup} {delivery}"
					})
				});
			} else {
				oList.bindItems({
					path: "/myJokes",
					template: new sap.m.DisplayListItem({
						label: "{category}",
						value: "{joke}"
					})
				});
			}
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
