define([
	'app',
	'text!templates/portfolios/admin_add.html',
], function (App, admin_add) {
	'use strict';

	App.Views.AddPortfolio = Backbone.View.extend({
		template: _.template(admin_add),
		className: 'portfolio-container',

		initialize: function() {
			this.model.on("invalid", function(model, errs) {
				App.showValidationErrors(errs);
			});
		},

		events: {
			'click #submitPortfolio': 'submitPortfolio',
		},

		submitPortfolio: function(e) {
			e.preventDefault();
			//updating ckeditor instance
			CKEDITOR.instances.description.updateElement();

			var $title = this.$el.find('#title'),
				$description = this.$el.find('#description'),
				$filename = this.$el.find('#filename');

			this.model.save({
					title: $title.val(),
					url: $title.val().replace(/\s+/g, '-').toLowerCase(),
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

	return App.Views.AddPortfolio;
});