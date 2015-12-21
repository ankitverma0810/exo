define([
	'app',
	'text!templates/banners/admin_add.html',
], function (App, admin_add) {
	'use strict';

	App.Views.AddBanner = Backbone.View.extend({
		template: _.template(admin_add),
		className: 'inner-container banner-container',

		initialize: function() {
			this.model.on("invalid", function(model, errs) {
				App.showValidationErrors(errs);
			});
		},

		events: {
			'click #submitBanner': 'beforeSave'
		},

		beforeSave: function() {
			var self = this,
				$title = this.$el.find('#title'),
				$description = this.$el.find('#description'),
				$url = this.$el.find('#url'),
				$filename = this.$el.find('#filename');

			this.model.set( { filename: $filename[0]['files'][0], url: $url.val(), title: $title.val(), description: $description.val() } );
			if( this.model.isValid() ) {
				App.uploadFile(this.model.get('filename'), 'banners',
	                function (response) {
	                    self.addBanner(response.filename);
	                }
	            );
			}
		},

		addBanner: function(filename) {
			this.model.set( { filename: filename } );
			this.model.save( null, {
				success: function (model, resp) {
					Backbone.history.loadUrl(Backbone.history.fragment);
	                App.showAlert('alert alert-success', resp.success);
	            },
	            error: function ( error ) {
	            	console.log(error);
	                App.showAlert('alert alert-danger', error);
		    	}
			});
		},

		render: function() {
			this.$el.html(this.template());
			return this;
		}
	});

	return App.Views.AddBanner;
});