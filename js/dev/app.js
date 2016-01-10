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
        DEBUG: true,
		Models: {},
		Collections: {},
		Views: {},
		Router: {},
		Vent: _.extend( {}, Backbone.Events ),

		initialize: function() {
			this.initPageElements();
			this.debugging();
		},

		initPageElements: function() {
			//affixnav for header
			$('header').affix();
		},

		debugging: function() {
		    if(!this.DEBUG){
		        if(!window.console) window.console = {};
		        var methods = ["log", "debug", "warn", "info"];
		        for(var i=0;i<methods.length;i++){
		            console[methods[i]] = function(){};
		        }
		    }
		},

		showAlert: function(className, message) {
			$('#flashMessage').html('<div class="errorMsg container '+className+'">'+message+'</div>');
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
	            progressUpload: function(evt) {
			        if (evt.lengthComputable) {
			            console.log("Loaded " + parseInt( (evt.loaded / evt.total * 100), 10) + "%");
			        }
			        else {
			            console.log("Length not computable.");
			        }
			    },
	            success: function (response) {
	            	var response = $.parseJSON(response);
	            	callback(response);
	            },
	            error: function(response) {
	            	self.showAlert('alert alert-danger', 'An error occurred while uploading ' + file.name);
	            }
	        });
	    },

	    transitionIn: function(view, callback) {
            var delay;
            var transitionIn = function() {
                view.$el.addClass('is-visible');
                view.$el.one('transitionend', function() {
                    if (_.isFunction(callback)) {
                        callback();
                    }
                })
            };
            _.delay(transitionIn, 20);
        },

        transitionOut: function(view, callback) {
            view.$el.removeClass('is-visible');
            view.$el.one('transitionend', function() {
                if (_.isFunction(callback)) {
                    callback();
                };
            });
        }
	}

	$(document).ready(function() {
		App.initialize();
	});

	return window.App;
});