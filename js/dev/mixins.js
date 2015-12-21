define(function () {
    var mixins = _.mixin({
        capitalize: function(string) {
            return string.charAt(0).toUpperCase() + string.substring(1).toLowerCase();
        },
        truncate: function(string, max) {
            if(string.length >  max) {
                return string.substring(0,100)+'...';
            } else {
                return string;
            }
        }
    });
    return mixins;
});