define([
    'views/users/login',
], function (LoginView) {
	'use strict';

	var userRouter = Backbone.Router.extend({
		routes: {
            'login': 'login'
        },

        login: function() {
            if(App.session.authenticated()) App.router.navigate('', {trigger: true});
            else App.router.render(new LoginView());
        }
	});

	return userRouter;
});