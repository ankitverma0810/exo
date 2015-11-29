define([
	'app',
    'models/SessionModel',
    'views/pages/home',
    'views/HeaderView',
    'views/SidebarView',
    'views/uploads/attachable',
    'routes/userRouter',
    'routes/bannerRouter',
    'routes/menuRouter',
    'routes/configRouter',
    'routes/blogRouter',
    'routes/pageRouter',
    'routes/portfolioRouter',
    'routes/serviceRouter',
    'routes/testimonialRouter',
], function (App, SessionModel, HomePageView, HeaderView, SidebarView, attachableView, userRouter, bannerRouter, menuRouter, configRouter, blogRouter, pageRouter, portfolioRouter, serviceRouter, testimonialRouter) {
	'use strict';

	App.Router = Backbone.Router.extend({
		routes: {
            '' : 'index'
        },

        initialize: function() {
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
            //assigning header view to all the current view
            if(!this.headerView) {
                this.headerView = new HeaderView();
                this.headerView.setElement($('#header')).render();
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
                        App.router.navigate('', {trigger: true});
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

        index: function() {
            this.render(new HomePageView());
        }
	});

	return App.Router;
});