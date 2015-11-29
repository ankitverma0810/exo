define([
    'app',
    'text!templates/common/sidebar.html'
], function(App, SidebarTemplate) {
	'use strict';

	App.Views.SidebarView = Backbone.View.extend({

		template: _.template(SidebarTemplate),

		initialize: function () {
            App.session.on('change:access_token', this.render, this);
        },

        render: function () {
            this.$el.html(this.template({
                logged_in: App.session.authenticated()
            }));
            return this;
        }
	});

	return App.Views.SidebarView;
});