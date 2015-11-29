define([
    'app',
    'text!templates/pages/home.html'
], function(App, HomePage) {
	'use strict';

	App.Views.HomePage = Backbone.View.extend({

		template: _.template(HomePage),

		initialize: function () {
        },
        
        events: {
        },

        render: function () {
            this.$el.html(this.template());
            return this;
        }
	});

	return App.Views.HomePage;
});