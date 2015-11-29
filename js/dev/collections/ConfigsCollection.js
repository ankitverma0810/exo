define([
	'models/ConfigModel',
	'app',
], function (ConfigModel, App) {
	'use strict';

	App.Collections.Configs = Backbone.Collection.extend({
		model: ConfigModel,
		url: App.URL+App.API+"/details/"
	});

	return App.Collections.Configs;
});