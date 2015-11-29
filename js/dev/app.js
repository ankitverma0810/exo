define([
	'jquery',
	'underscore',
	'backbone',
	'bootstrap',
], function ($, _, Backbone) {
	'use strict';

	window.App = {
		root : "/",                     			   // The root path to run the application through.
        URL : "/exo-backend",                  		  // Base application URL
        API : "/admin",								 // Base API URL (used by models & collections)
		Models: {},
		Collections: {},
		Views: {},
		Router: {},
		Vent: _.extend( {}, Backbone.Events ),

		showAlert: function(className, message) {
            $('#flashMessage').prepend('<div class="'+className+'">'+message+'</div>');
            setTimeout(function() {
                $('#flashMessage').html('');
            }, 3000 );
        },

        showValidationErrors: function(errs) {
        	this.removeValidationErrors();
        	$.each( errs, function( key, value ) {
        		var el = $('#'+key),
    				parentNode = el.parents('.form-group');

    			parentNode.addClass('has-error');
        		parentNode.find('p.help-block').text(value['message']);	        	
	        });
        },
        
        removeValidationErrors: function() {
        	$('.form-group').removeClass('has-error');
        	$('.form-group').find('.help-block').empty();
        },

        uploadFile: function (file, controller, callback) {
	        var self = this,
	        	data = new FormData();

	        data.append('file', file);
	        $.ajax({
	            url: self.URL+self.API+'/'+controller+'/uploadFile',
	            type: 'POST',
	            data: data,
	            processData: false,
	            contentType: false,
	            success: function (response) {
	            	var response = $.parseJSON(response);
	            	callback(response);
	            },
	            error: function(response) {
	            	self.showAlert('alert alert-danger', 'An error occurred while uploading ' + file.name);
	            }
	        });
	    }
	}

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

	return window.App;
});