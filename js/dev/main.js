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
	$(document).on("click", "a", function(e) {
        e.preventDefault();
        var hasAttr = $(this).attr('data-bypass'),
            hasClass = $(this).is('[class*="cke"]'),
            href = $(e.currentTarget).attr('href');

        if( !hasAttr && !hasClass ) {
            App.router.navigate(href, { trigger : true, replace : false });
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
	var originalXhr = $.ajaxSettings.xhr;
	$.ajaxSetup({
		cache: false,
		progress: function() { 
			console.log("standard progress callback"); 
		},
        progressUpload: function() { 
        	console.log("standard upload progress callback"); 
        },
		xhr: function() {
            var req = originalXhr(), 
            	that = this;

            if (req.upload) {
                if ( typeof req.upload.addEventListener == "function" ) {
                    req.upload.addEventListener("progress", function(evt) {
                        that.progressUpload(evt);
                    }, false);
                }
            }
            return req;
        },
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