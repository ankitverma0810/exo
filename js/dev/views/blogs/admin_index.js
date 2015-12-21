define([
	'app',
	'views/blogs/admin_list',
	'text!templates/blogs/admin_index.html',
], function (App, adminBlogListView, admin_index) {
	'use strict';

	App.Views.Blogs = Backbone.View.extend({
		template: _.template(admin_index),
		className: 'inner-container blog-container',

		initialize: function() {
			this.$el.html(this.template());
		},

		render: function() {
			this.collection.each(this.addOne, this);
			return this;
		},

		addOne: function(blog) {
			var blogView = new adminBlogListView({ model: blog});
			this.$el.find('table tbody').append(blogView.render().el);
		}
	});

	return App.Views.Blogs;
});