require([
	'app',
    'routes/appRouter',
    'models/SessionModel',
    'mixins'
], function (App, appRouter, SessionModel) {
	'use strict';
	
	App.router = new appRouter();
	App.session = new SessionModel();
	// Check the auth status upon initialization,
    // before rendering anything or matching routes
	App.session.checkAuth({
		complete: function() {
			// HTML5 pushState for URLs without hashbangs
            var hasPushstate = !!(window.history && history.pushState);
            if(hasPushstate) Backbone.history.start({ pushState: true, root: '/exo' });
            else Backbone.history.start();
		}
	});

	// All navigation that is relative should be passed through the navigate
    // method, to be processed by the router. If the link has a `data-bypass`
    // attribute, bypass the delegation completely.
	$(document).on("click", "a:not([data-bypass])", function(e) {
        e.preventDefault();
        var href = $(e.currentTarget).attr('href');
        App.router.navigate(href, { trigger : true, replace : false });
    });

    //affixnav
	$('header').affix({
		offset: {
			top: 0
		}
	});

	//global sync functions as per cake api
	Backbone.Model.prototype.sync = function(method, model, options) {
		if(method == 'read') {
    		options.url = model.urlRoot+'view/'+model.id;
    	}
    	if(method == 'create') {
    		options.url = model.urlRoot+'add';
    	}
    	if(method == 'update') {
    		options.url = model.urlRoot+'edit/'+model.id; 
    	}
    	if(method == 'delete') {
    		options.url = model.urlRoot+'delete/'+model.id;
    	}
   		return Backbone.sync(method, model, options);
  	}

	//default ajax setup
	$.ajaxSetup({
		cache: false,
		beforeSend: function(xhr) {
			xhr.setRequestHeader('X-CSRF-Token', App.session.get('access_token'));
        },
	    statusCode: {
	        401: function() {
	            window.location.replace('');	         
	        },
	        403: function() {
	            window.location.replace('');
	        }
	    }
	});
});