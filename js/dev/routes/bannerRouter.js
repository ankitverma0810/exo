define([
    'collections/BannersCollection',
    'views/banners/admin_index',
    'views/banners/admin_add',
], function (BannersCollection, adminBannerIndexView, adminBannerAddView) {
	'use strict';

	var bannerRouter = Backbone.Router.extend({
		routes: {
            'admin/banners': 'admin_listBanners',
            'admin/banners/add': 'admin_addBanner'
        },

        admin_listBanners: function() {
            var banners = new BannersCollection;
            banners.fetch().then(function() {
                App.router.render( new adminBannerIndexView( { collection: banners } ) );
            });
        },

        admin_addBanner: function() {
            var addBanner = new App.Models.Banner();
            App.router.render(new adminBannerAddView({model: addBanner}), {requiresAuth: true});
        }
	});

	return bannerRouter;
});