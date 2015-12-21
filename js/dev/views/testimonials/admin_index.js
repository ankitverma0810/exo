define([
	'app',
	'views/testimonials/admin_list',
	'text!templates/testimonials/admin_index.html',
], function (App, adminTestimonialListView, admin_index) {
	'use strict';

	App.Views.Testimonials = Backbone.View.extend({
		template: _.template(admin_index),
		className: 'inner-container testimonial-container',

		initialize: function() {
			this.$el.html(this.template());
		},

		render: function() {
			this.collection.each(this.addOne, this);
			return this;
		},

		addOne: function(testimonial) {
			var testimonialView = new adminTestimonialListView({ model: testimonial});
			this.$el.find('table tbody').append(testimonialView.render().el);
		}
	});

	return App.Views.Testimonials;
});