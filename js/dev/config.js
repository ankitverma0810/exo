'use strict';
requirejs.config({
	baseUrl: '/exo/js/dev',
	paths: {
		'jquery': '../vendors/jquery/jquery.min',
		'underscore': '../vendors/underscore/underscore-min',
		'backbone': '../vendors/backbone/backbone-min',
		'bootstrap': '../vendors/bootstrap-sass/bootstrap.min',
		'text': '../vendors/requirejs-text/text'
	},
	shim: {
    }
});

require(['main']);