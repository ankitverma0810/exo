define([
    'app',
    'text!templates/common/footer.html'
], function(App, FooterTemplate) {
	'use strict';

	App.Views.FooterView = Backbone.View.extend({

		template: _.template(FooterTemplate),

		initialize: function () {
        },

        render: function () {
            this.$el.html(this.template());
            return this;
        }
	});

	return App.Views.FooterView;
});