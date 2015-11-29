define([
    'collections/MenusCollection',
    'views/menus/admin_index',
    'views/menus/admin_add',
], function (MenusCollection, adminMenuIndexView, adminMenuAddView) {
	'use strict';

	var menuRouter = Backbone.Router.extend({
		routes: {
            'admin/menus': 'admin_listMenus',
            'admin/menus/add': 'admin_addMenu'
        },

        admin_listMenus: function() {
            var menus = new MenusCollection;
            menus.fetch().then(function() {
                App.router.render( new adminMenuIndexView( { collection: menus } ) );
            });
        },

        admin_addMenu: function() {
            $.ajax({
                url: App.URL+App.API+'/menus/add',
                type: 'GET',
                success: function (response) {
                    var response = $.parseJSON(response),
                        addMenu = new App.Models.Menu();

                    App.router.render(new adminMenuAddView({ model: addMenu, parents: response.parents}));
                },
                error: function(err) {
                    console.log(err);
                    App.showAlert('alert alert-danger', 'Some error occured while loading view.');
                }
            });
        }
	});

	return menuRouter;
});