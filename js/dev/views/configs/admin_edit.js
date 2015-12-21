define([
	'app',
	'text!templates/configs/admin_edit.html',
], function (App, admin_edit) {
	'use strict';

	App.Views.EditConfig = Backbone.View.extend({
		template: _.template(admin_edit),
		className: 'inner-container config-container',

		initialize: function(options) {
			this.model.on("invalid", function(model, errs) {
				App.showValidationErrors(errs);
			});
		},

		events: {
			'click #submitConfig': 'editConfig'
		},

		editConfig: function(e) {
			e.preventDefault();

			var $email = this.$el.find('#email'),
				$host = this.$el.find('#host'),
				$username = this.$el.find('#username'),
				$password = this.$el.find('#password'),
				$port = this.$el.find('#port'),
				$powered_by = this.$el.find('#powered_by'),
				$copyright = this.$el.find('#copyright');

			this.model.save({
					email: $email.val(),
					host: $host.val(),
					username: $username.val(),
					password: $password.val(),
					port: $port.val(),
					powered_by: $powered_by.val(),
					copyright: $copyright.val()
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
			this.$el.html(this.template( this.model.toJSON() ));
			return this;
		}
	});

	return App.Views.EditConfig;
});