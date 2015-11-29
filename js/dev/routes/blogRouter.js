define([
    'collections/BlogsCollection',
    'views/blogs/admin_index',
    'views/blogs/admin_add',
], function (BlogsCollection, adminBlogIndexView, adminBlogAddView) {
	'use strict';

	var blogRouter = Backbone.Router.extend({
		routes: {
            'admin/blogs'               : 'admin_listBlogs',
            'admin/blogs/add'           : 'admin_addBlog',
            'admin/blogs/edit/:id'      : 'admin_editBlog',
            'blogs/:name/:id'           : 'viewBlog',
        },

        admin_listBlogs: function() {
            var blogs = new BlogsCollection;
            blogs.fetch().then(function() {
                App.router.render( new adminBlogIndexView( { collection: blogs } ) );
            });
        },

        admin_addBlog: function() {
            var addBlog = new App.Models.Blog();
            App.router.render( new adminBlogAddView({ model: addBlog }), {renderImage: true} );
        },

        admin_editBlog: function(id) {
            var editBlog = new App.Models.Blog({id: id});
            editBlog.fetch().then(function() {
                App.router.render( new adminBlogAddView({ model: editBlog }), {renderImage: true} );
            });
        }
	});

	return blogRouter;
});