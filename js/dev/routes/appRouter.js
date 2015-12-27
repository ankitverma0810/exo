define([
	'app',
    'models/SessionModel',
    'views/HeaderView',
    'views/FooterView',
    'views/uploads/attachable',
    'views/errors/404',
    'routes/userRouter',
    'routes/bannerRouter',
    'routes/menuRouter',
    'routes/configRouter',
    'routes/blogRouter',
    'routes/pageRouter',
    'routes/portfolioRouter',
    'routes/serviceRouter',
    'routes/testimonialRouter',
], function (App, SessionModel, HeaderView, FooterView, attachableView, ErrorView, userRouter, bannerRouter, menuRouter, configRouter, blogRouter, pageRouter, portfolioRouter, serviceRouter, testimonialRouter) {
	'use strict';

	App.Router = Backbone.Router.extend({
		routes: {
            '*other': '404'
        },

        initialize: function() {
            this.initializeRoutes();
        },

        initializeRoutes: function() {
            userRouter = new userRouter();
            bannerRouter = new bannerRouter();
            menuRouter = new menuRouter();
            configRouter = new configRouter();
            blogRouter = new blogRouter();
            pageRouter = new pageRouter();
            portfolioRouter = new portfolioRouter();
            serviceRouter = new serviceRouter();
            testimonialRouter = new testimonialRouter();
        },

        beforeRender: function() {
            if(Backbone.history.fragment !== 'login') {
                //assigning header view to all the current view
                this.headerView = new HeaderView();
                $('header').html(this.headerView.render().$el);

                //assigning footer view
                this.footerView = new FooterView();
                $('footer').html(this.footerView.render().$el);
            } else {
                $('header, footer').empty();
            }
        },

        render: function(view, options) {
            this.beforeRender();
            this.currentView = view;

            if(typeof options !== 'undefined' && options.requiresAuth) {
                //re-checking authorization
                var self = this;
                App.session.checkAuth({
                    success: function(res) {
                        $('#container').html(self.currentView.render().$el);
                    }, error: function(res) {
                        App.router.navigate('login', {trigger: true});
                    }
                });
            } else {
                $('#container').html(this.currentView.render().$el);

                //rendering image view through attachable view
                if( typeof options !== 'undefined' && options.renderImage ) {
                    var uploadImage = new attachableView({ model: this.currentView.model });
                    this.currentView.$el.find('#imageContainer').append(uploadImage.render().el);
                }
            }
        },

        404: function(route) {
            this.render(new ErrorView({page: route}));
        }
	});

	return App.Router;
});