define([
    'app',
    '../modals/contact',
    'text!templates/pages/home.html'
], function(App, Modal, HomePage) {
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

            $.ajax({
                url: App.URL+'/pages/submitContact',
                type: 'POST',
                data: JSON.stringify({ name: $name, email: $email, message: $message }),
                success: function (response) {
                    var response = $.parseJSON(response);                    
                    if(response.error) {
                        var ContactModal = new Modal({ data: response.error });
                    } else {
                        var ContactModal = new Modal({ data: response.success });
                    }
                    $('.contact-container form')[0].reset();
                },
                error: function(response) {
                    console.log(response);
                    $('.contact-container form')[0].reset();
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