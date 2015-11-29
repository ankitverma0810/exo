define([
	'models/PortfolioModel',
	'app',
], function (PortfolioModel, App) {
	'use strict';

	App.Collections.Portfolios = Backbone.Collection.extend({
		model: PortfolioModel,
		
		initialize: function() {
			if (Backbone.history.fragment.indexOf('admin') > -1) {
				this.url = App.URL+App.API+"/portfolios/";
			} else {
				this.url = App.URL+"/portfolios/";
			}
		}
	});

	return App.Collections.Portfolios;
});