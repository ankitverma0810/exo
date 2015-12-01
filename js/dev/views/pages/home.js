define([
    'app',
    'text!templates/pages/home.html'
], function(App, HomePage) {
	'use strict';

	App.Views.HomePage = Backbone.View.extend({

		template: _.template(HomePage),

		initialize: function (options) {
            this.banners = options.banners;
            this.services = options.services;
        },
        
        events: {
        },

        render: function () {
            this.$el.html(this.template({
                banners: this.banners,
                services: this.services
            }));
            return this;
        }
	});

	return App.Views.HomePage;
});