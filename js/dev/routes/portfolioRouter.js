define([
    'collections/PortfoliosCollection',
    'views/portfolios/admin_index',
    'views/portfolios/admin_add',
], function (PortfoliosCollection, adminPortfolioIndexView, adminPortfolioAddView) {
	'use strict';

	var portfolioRouter = Backbone.Router.extend({
		routes: {
            'admin/portfolios': 'admin_listPortfolios',
            'admin/portfolios/add': 'admin_addPortfolio',
            'admin/portfolios/edit/:id' : 'admin_editPortfolio',
        },

        admin_listPortfolios: function() {
            var portfolios = new PortfoliosCollection;
            portfolios.fetch().then(function() {
                App.router.render( new adminPortfolioIndexView( { collection: portfolios } ) );
            });
        },

        admin_addPortfolio: function() {
            var addPortfolio = new App.Models.Portfolio();
            App.router.render( new adminPortfolioAddView({ model: addPortfolio }), {renderImage: true} );
        },

        admin_editPortfolio: function(id) {
            var editPortfolio = new App.Models.Portfolio({id: id});
            editPortfolio.fetch().then(function() {
                App.router.render( new adminPortfolioAddView({ model: editPortfolio }), {renderImage: true} );
            });
        }
	});

	return portfolioRouter;
});