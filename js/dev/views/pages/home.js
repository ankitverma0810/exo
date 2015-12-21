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
            this.portfolios = options.portfolios;
            this.testimonials = options.testimonials;
            this.blogs = options.blogs;
        },
        
        events: {
        },

        render: function () {
            this.$el.html(this.template({
                banners: this.banners,
                services: this.services,
                portfolios: this.portfolios,
                testimonials: this.testimonials,
                blogs: this.blogs
            }));
            return this;
        }
	});

	return App.Views.HomePage;
});