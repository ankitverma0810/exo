define([
    'app',
    'text!templates/errors/404.html'
], function(App, Error) {
	'use strict';

	App.Views.Error = Backbone.View.extend({

		template: _.template(Error),
        className: 'error-container',

		initialize: function (options) {
            this.page = options.page;
        },

        render: function () {
            this.$el.html(this.template({
                page: this.page
            }));
            return this;
        }
	});

	return App.Views.Error;
});