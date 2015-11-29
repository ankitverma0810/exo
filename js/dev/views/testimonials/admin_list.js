define([
	'app',
	'text!templates/testimonials/admin_list.html',
], function (App, admin_list) {
	'use strict';

	App.Views.Testimonial = Backbone.View.extend({
		tagName: 'tr',
		template:  _.template(admin_list),

		initialize: function() {
			this.model.on('destroy', this.remove, this);
			this.model.on('change', this.render, this);
		},

		events: {
			'click a.status': 'status',
			'click a.delete': 'destroy'
		},

		status: function(ev) {
			var status = parseInt($(ev.currentTarget).data('status'));
			this.model.save({'status_id': status});
	        return false;
		},

		destroy: function() {
			if(confirm('Are you sure you want to delete the user permanently?')) {
				this.model.destroy({
		            success: function (model, response) {
		            	App.showAlert('alert alert-success', response.success);
		            },
		            error: function() {
		            	App.showAlert('alert alert-error', 'Some error occured. Please try again later.');
		            }
		        });
			}
	        return false;
		},

		render: function() {
			this.$el.html( this.template( this.model.toJSON() ) );
			return this;
		}
	});

	return App.Views.Testimonial;
});