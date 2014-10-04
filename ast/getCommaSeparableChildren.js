var _ = require('underscore');
var COMMA_SEPARATED_KEYS = require('./COMMA_SEPARATED_KEYS')

module.exports = function (node) {
    var children
    _.any(COMMA_SEPARATED_KEYS, function(key) {
        if (node.hasOwnProperty(key)) {
            children = node[key]
            return true;
        }
    })
    return children || []
}
