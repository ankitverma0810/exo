define([
    'collections/PagesCollection',
    'views/pages/admin_index',
    'views/pages/admin_add',
], function (PagesCollection, adminPageIndexView, adminPageAddView) {
	'use strict';

	var pageRouter = Backbone.Router.extend({
		routes: {
            'admin/pages': 'admin_listPages',
            'admin/pages/add': 'admin_addPage',
            'admin/pages/edit/:id' : 'admin_editPage',
            'pages/:name/:id': 'viewPage',
        },

        admin_listPages: function() {
            var pages = new PagesCollection;
            pages.fetch().then(function() {
                App.router.render( new adminPageIndexView( { collection: pages } ) );
            });
        },

        admin_addPage: function() {
            var addPage = new App.Models.Page();
            App.router.render( new adminPageAddView({ model: addPage }), {renderImage: true} );
        },

        admin_editPage: function(id) {
            var editPage = new App.Models.Page({id: id});
            editPage.fetch().then(function() {
                App.router.render( new adminPageAddView({ model: editPage }), {renderImage: true} );
            });
        }
	});

	return pageRouter;
});