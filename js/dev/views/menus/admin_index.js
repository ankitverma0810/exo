define([
	'app',
	'views/menus/admin_list',
	'text!templates/menus/admin_index.html',
], function (App, adminMenuListView, admin_index) {
	'use strict';

	App.Views.Menus = Backbone.View.extend({
		template: _.template(admin_index),
		className: 'inner-container menu-container',

		initialize: function() {
			this.$el.html(this.template());
		},

		render: function() {
			this.collection.each(this.addOne, this);
			return this;
		},

		addOne: function(menu) {
			var menuView = new adminMenuListView({ model: menu});
			this.$el.find('table tbody').append(menuView.render().el);
		}
	});

	return App.Views.Menus;
});