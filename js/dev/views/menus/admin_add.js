define([
	'app',
	'text!templates/menus/admin_add.html',
], function (App, admin_add) {
	'use strict';

	App.Views.AddMenu = Backbone.View.extend({
		template: _.template(admin_add),
		className: 'inner-container menu-container',

		initialize: function(options) {
			this.model.on("invalid", function(model, errs) {
				App.showValidationErrors(errs);
			});

			this.parents = options.parents;
		},

		events: {
			'click #submitBanner': 'addMenu'
		},

		addMenu: function(e) {
			e.preventDefault();

			var $parent_id = this.$el.find('#parent_id'),
				$title = this.$el.find('#title'),
				$controller = this.$el.find('#controller'),
				$action = this.$el.find('#action');

			this.model.save({
					parent_id: $parent_id.val(),
					title: $title.val(),
					controller: $controller.val(),
					action: $action.val(),
					status_id: 1
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
			this.$el.html(this.template({
				parents: this.parents
			}));
			return this;
		}
	});

	return App.Views.AddMenu;
});