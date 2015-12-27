define([
    'app',
    'text!templates/pages/home.html'
], function(App, HomePage) {
	'use strict';

	App.Views.HomePage = Backbone.View.extend({

		template: _.template(HomePage),

		initialize: function (options) {
            this.options = options.response;
        },
        
        events: {
            'click #quickContact': 'submitContact'
        },

        submitContact: function(e) {
            e.preventDefault();

            var $name = this.$el.find('#name').val(),
                $email = this.$el.find('#email').val(),
                $message = this.$el.find('#message').val();

            //need to open modal on success and error
            //no need to loadurl again. Jsut empty the form and open modal
            $.ajax({
                url: App.URL+'/pages/submitContact',
                type: 'POST',
                data: JSON.stringify({ name: $name, email: $email, message: $message }),
                success: function (response) {
                    Backbone.history.loadUrl(Backbone.history.fragment);
                    App.showAlert('alert alert-success', response.success);
                },
                error: function() {
                    App.showAlert('alert alert-danger', 'Some error occured. Please try again later!!');
                }
            });
        },

        render: function () {
            this.$el.html(this.template({
                pages: this.options.pages,
                banners: this.options.banners,
                services: this.options.services,
                portfolios: this.options.portfolios,
                testimonials: this.options.testimonials,
                blogs: this.options.blogs
            }));
            return this;
        }
	});

	return App.Views.HomePage;
});