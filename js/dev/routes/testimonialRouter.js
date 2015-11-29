define([
    'collections/TestimonialsCollection',
    'views/testimonials/admin_index',
    'views/testimonials/admin_add',
], function (TestimonialsCollection, adminTestimonialIndexView, adminTestimonialAddView) {
	'use strict';

	var testimonialRouter = Backbone.Router.extend({
		routes: {
            'admin/testimonials': 'admin_listTestimonials',
            'admin/testimonials/add': 'admin_addTestimonial',
            'admin/testimonials/edit/:id' : 'admin_editTestimonial',
        },

        admin_listTestimonials: function() {
            var testimonials = new TestimonialsCollection;
            testimonials.fetch().then(function() {
                App.router.render( new adminTestimonialIndexView( { collection: testimonials } ) );
            });
        },

        admin_addTestimonial: function() {
            var addTestimonial = new App.Models.Testimonial();
            App.router.render( new adminTestimonialAddView({ model: addTestimonial }), {renderImage: true} );
        },

        admin_editTestimonial: function(id) {
            var editTestimonial = new App.Models.Testimonial({id: id});
            editTestimonial.fetch().then(function() {
                App.router.render( new adminTestimonialAddView({ model: editTestimonial }), {renderImage: true} );
            });
        }
	});

	return testimonialRouter;
});