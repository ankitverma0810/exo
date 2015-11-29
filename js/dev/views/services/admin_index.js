define([
	'app',
	'views/services/admin_list',
	'text!templates/services/admin_index.html',
], function (App, adminServiceListView, admin_index) {
	'use strict';

	App.Views.Services = Backbone.View.extend({
		template: _.template(admin_index),
		className: 'service-container',

		initialize: function() {
			this.$el.html(this.template());
		},

		render: function() {
			this.collection.each(this.addOne, this);
			return this;
		},

		addOne: function(service) {
			var serviceView = new adminServiceListView({ model: service});
			this.$el.find('table tbody').append(serviceView.render().el);
		}
	});

	return App.Views.Services;
});