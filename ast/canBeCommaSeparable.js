var _ = require('underscore');
var COMMA_SEPARATED_KEYS = require('./COMMA_SEPARATED_KEYS');

module.exports = function (node) {
    return _.any(COMMA_SEPARATED_KEYS, function(key) {
        return node.hasOwnProperty(key)
    })
}
