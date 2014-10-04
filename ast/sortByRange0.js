var _ = require('underscore');

module.exports = function(nodes) {
    return _.sortBy(nodes, function(node) {
        return node.range[0];
    });
}

