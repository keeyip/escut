var _ = require('underscore');

module.exports = function (str, prefix) {
    return _.map(str.split('\n'), function(s) {
        return prefix + s
    }).join('\n')
}

