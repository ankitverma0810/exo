define([
	'app',
	'text!templates/testimonials/admin_add.html',
], function (App, admin_add) {
	'use strict';

	App.Views.AddTestimonial = Backbone.View.extend({
		template: _.template(admin_add),
		className: 'testimonial-container',

		initialize: function() {
			this.model.on("invalid", function(model, errs) {
				App.showValidationErrors(errs);
			});
		},

		events: {
			'click #submitTestimonial': 'submitTestimonial'
		},

		submitTestimonial: function(e) {
			e.preventDefault();

			var $author = this.$el.find('#author'),
				$description = this.$el.find('#description'),
				$filename = this.$el.find('#filename');

			this.model.save({
					author: $author.val(),
					description: $description.val(),
					filename: $filename.val()
				}, {
					validate: true,
					success: function (model, response) {
		                Backbone.history.loadUrl(Backbone.history.fragment);
		                App.showAlert('alert alert-success', response.success);
		            },
		            error: function (error) {
		            	console.log(error);
		                App.showAlert('alert alert-danger', error);
			    	}
			});
		},

		render: function() {
			this.$el.html(this.template(this.model.toJSON()));
			return this;
		}
	});

	return App.Views.AddTestimonial;
});