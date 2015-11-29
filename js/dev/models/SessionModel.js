define([
	'app',
	'models/UserModel',
], function (App, UserModel) {
	'use strict';

	App.Models.Session = Backbone.Model.extend({
		defaults: {
			access_token: null,
			user_id: null
	    },

	    initialize: function () {
	    	this.user = new UserModel({});
	    },

	    authenticated: function() {
	    	return Boolean(this.get('access_token'));
	    },

	    checkAuth: function(callback, args) {
	    	var self = this;
	    	$.ajax({
	            url: App.URL+App.API+'/users/login',
	            type: 'GET',
	            success: function (response) {
	            	var response = $.parseJSON(response);
	            	//success
	            	if(!response.error){
                        self.updateSessionUser(response.user);
                        self.set({ access_token : response.token, user_id: response.user.id });
                        if('success' in callback) callback.success(response);
                    } else {
                        self.set({ access_token : null, user_id: null });
                        if('error' in callback) callback.error(response);
                    }
	            },
	            error: function(response) {
	            	self.set({ access_token : null, user_id: null });
	            	if('error' in callback) callback.error(response);
	            },
	            complete: function() {
	            	if('complete' in callback) callback.complete();
	            }
	        });
	    },

	    updateSessionUser: function(userData) {
	    	this.user.set(_.pick(userData, _.keys(this.user.defaults)));
        },

	    loggedIn: function(options) {
    		this.updateSessionUser( options.user );
    		this.set({access_token: options.token, user_id: options.user.id});
	    },

	    loggedOut: function() {
	    	this.set({ access_token : null, user_id: null });
	    }
	});

	return App.Models.Session;
});