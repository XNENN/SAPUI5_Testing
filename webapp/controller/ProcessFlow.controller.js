sap.ui.define(['sap/suite/ui/commons/library', 'sap/ui/core/mvc/Controller', 'sap/ui/model/json/JSONModel', 'sap/m/MessageToast' ],
	function(SuiteLibrary, Controller, JSONModel, MessageToast) {
	"use strict";

	return Controller.extend("sapui5test.controller.ProcessFlow", {
		onInit: function() {
			var oView = this.getView();
			this.oProcessFlow1 = oView.byId("processflow1");

			var sDataPath = "data/data.json";
			var oModelPf1 = new JSONModel(sDataPath);
			oView.setModel(oModelPf1);
			oModelPf1.attachRequestCompleted(this.oProcessFlow1.updateModel.bind(this.oProcessFlow1));
		},

		onNodePress: function(event) {
			MessageToast.show(event.getParameters().getTexts());
		},

		onZoomIn: function () {
			this.oProcessFlow1.zoomIn();

			MessageToast.show("Zoom level changed to: " + this.oProcessFlow1.getZoomLevel());
		},

		onZoomOut: function () {
			this.oProcessFlow1.zoomOut();

			MessageToast.show("Zoom level changed to: " + this.oProcessFlow1.getZoomLevel());
		}
	});
});
