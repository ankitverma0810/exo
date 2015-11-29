define([
	'models/UserModel',
	'app',
], function (UserModel, App) {
	'use strict';

	App.Collections.Users = Backbone.Collection.extend({
		model: UserModel,
		url: App.URL+App.API+"/users/"
	});

	return App.Collections.Users;
});