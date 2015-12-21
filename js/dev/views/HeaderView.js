define([
    'app',
    'text!templates/common/header.html'
], function(App, HeaderTemplate) {
	'use strict';

	App.Views.HeaderView = Backbone.View.extend({

		template: _.template(HeaderTemplate),

		initialize: function () {
            App.session.on('change:access_token', this.render, this);
        },
        
        events: {
            'click #logout' : 'logout'
        },

        logout: function(e) {
            e.preventDefault();
            Backbone.ajax({
                url: App.URL+App.API+'/users/logout',
                type: 'GET',
                success: function (response) {
                    var response = $.parseJSON(response);
                    if(response.error) {
                        App.showAlert('alert alert-danger', response.error);
                    } else {
                        App.session.loggedOut();
                        App.showAlert('alert alert-success', response.success);
                        App.router.navigate('login', {trigger: true});
                    }
                },
                error: function() {
                    App.showAlert('alert alert-danger', 'Some error occured. Please try again later!!');
                }
            });
        },

        render: function () {
            this.$el.html(this.template({ 
                logged_in: App.session.authenticated(),
                email: App.session.user.get('email')
            }));
            return this;
        }
	});

	return App.Views.HeaderView;
});