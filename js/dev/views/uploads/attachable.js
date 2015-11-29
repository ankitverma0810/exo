define([
	'app',
	'text!templates/uploads/attachable.html',
], function (App, attachable) {
	'use strict';

	App.Views.Attachable = Backbone.View.extend({
		template:  _.template(attachable),

		initialize: function() {
			this.model.on('change:filename', this.render, this);
		},

		events: {
			'click #deleteImage': 'deleteImage',
			'change #image': 'uploadImage'
		},

		deleteImage: function() {
			this.model.set({ 'filename': '' });
			return false;
		},

		uploadImage: function() {
			var self = this,
				$image = this.$el.find('#image');

			App.uploadFile($image[0]['files'][0], this.model.uploadLocation,
                function (response) {
                    self.model.set({ 'filename': response.filename });
                }
            );
		},

		render: function() {
			this.$el.html( this.template({ 
				data: this.model.toJSON(),
				location: this.model.uploadLocation+'/'
			}) );
			return this;
		}
	});

	return App.Views.Attachable;
});