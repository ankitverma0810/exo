define([
	'app',
	'text!templates/users/login.html',
], function (App, loginTemplate) {
	'use strict';

	App.Views.Login = Backbone.View.extend({

		template: _.template(loginTemplate),

		initialize:function () {
	    },

	    events: {
	        'click button#signin': 'login'
	    },

	    login: function(e) {
	        e.preventDefault();

	        var email = this.$el.find('#email').val(),
	        	password = this.$el.find('#password').val();

	        $.ajax({
	            url: App.URL+App.API+'/users/login',
	            type: 'POST',
	            data: { User: { email: email, password: password } },
	            success: function (response) {
	            	var response = $.parseJSON(response);
	                if(response.error) {
	                    App.showAlert('alert alert-danger', response.error);
	                } else {
                		App.session.loggedIn( response );
                		App.router.navigate('', {trigger: true});
	                }
	            },
	            error: function() {
	            	App.showAlert('alert alert-danger', 'Some error occured. Please try again later!!');
	            }
	        });
	    },

	    beforeRender: function() {
	    },

	    render:function () {
            this.$el.html(this.template());
            return this;
        }
	});

	return App.Views.Login;
});