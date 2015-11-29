define([
	'models/ServiceModel',
	'app',
], function (ServiceModel, App) {
	'use strict';

	App.Collections.Services = Backbone.Collection.extend({
		model: ServiceModel,
		
		initialize: function() {
			if (Backbone.history.fragment.indexOf('admin') > -1) {
				this.url = App.URL+App.API+"/services/";
			} else {
				this.url = App.URL+"/services/";
			}
		}
	});

	return App.Collections.Services;
});