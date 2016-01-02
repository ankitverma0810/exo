define([
    'app',
    'text!templates/modals/contact.html'
], function(App, ContactModal) {
	'use strict';

	App.Views.ContactModal = Backbone.View.extend({

		template: _.template(ContactModal),

		initialize: function (options) {
            this.options = options.data;
            App.Vent.on('render', this.openModal, this);
            $('body').append(this.render().$el);
        },

        openModal: function() {
            this.$el.find('.modal').modal('show');
        },

        render: function () {
            this.$el.html(this.template({
                title: this.options.title,
                description: this.options.description
            }));
            App.Vent.trigger('render');
            return this;
        }
	});

	return App.Views.ContactModal;
});