define([
    'collections/ConfigsCollection',
    'views/configs/admin_edit',
], function (ConfigsCollection, adminConfigEditView) {
	'use strict';

	var configRouter = Backbone.Router.extend({
		routes: {
            'admin/config': 'admin_editConfig',
        },

        admin_editConfig: function() {
            var editConfig = new App.Models.Config({id: 1});
            editConfig.fetch().then(function() {
                App.router.render(new adminConfigEditView({ model: editConfig }));
            });
        }
	});

	return configRouter;
});