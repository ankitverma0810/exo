define([
    'collections/ServicesCollection',
    'views/services/admin_index',
    'views/services/admin_add',
], function (ServicesCollection, adminServiceIndexView, adminServiceAddView) {
	'use strict';

	var serviceRouter = Backbone.Router.extend({
		routes: {
            'admin/services': 'admin_listServices',
            'admin/services/add': 'admin_addService',
            'admin/services/edit/:id' : 'admin_editService',
        },

        admin_listServices: function() {
            var services = new ServicesCollection;
            services.fetch().then(function() {
                App.router.render( new adminServiceIndexView( { collection: services } ) );
            });
        },

        admin_addService: function() {
            var addService = new App.Models.Service();
            App.router.render( new adminServiceAddView({ model: addService }), {renderImage: true} );
        },

        admin_editService: function(id) {
            var editService = new App.Models.Service({id: id});
            editService.fetch().then(function() {
                App.router.render( new adminServiceAddView({ model: editService }), {renderImage: true} );
            });
        }
	});

	return serviceRouter;
});