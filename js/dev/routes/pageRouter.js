define([
    'collections/PagesCollection',
    'views/pages/home',
    'views/pages/admin_index',
    'views/pages/admin_add',
], function (PagesCollection, HomePageView, adminPageIndexView, adminPageAddView) {
	'use strict';

	var pageRouter = Backbone.Router.extend({
		routes: {
            '' : 'index',
            'pages/:name/:id': 'viewPage',
            'admin/pages': 'admin_listPages',
            'admin/pages/add': 'admin_addPage',
            'admin/pages/edit/:id' : 'admin_editPage'
        },

        index: function() {
            $.ajax({
                url: App.URL+'/',
                type: 'GET',
                success: function (response) {
                    var data = $.parseJSON(response);
                    console.log(data);
                    App.router.render(new HomePageView({ response: data }));
                },
                error: function(err) {
                    console.log(err);
                    App.showAlert('alert alert-danger', 'Some error occured while loading view.');
                }
            });
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