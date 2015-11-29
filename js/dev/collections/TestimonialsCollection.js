define([
	'models/TestimonialModel',
	'app',
], function (TestimonialModel, App) {
	'use strict';

	App.Collections.Testimonials = Backbone.Collection.extend({
		model: TestimonialModel,
		
		initialize: function() {
			if (Backbone.history.fragment.indexOf('admin') > -1) {
				this.url = App.URL+App.API+"/testimonials/";
			} else {
				this.url = App.URL+"/testimonials/";
			}
		}
	});

	return App.Collections.Testimonials;
});