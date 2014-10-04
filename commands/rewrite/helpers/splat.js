module.exports = {
    help: {
        arguments: '',
        description: '',
        attributes: {
        },
        examples: [
        ]
    },
    helper: helper
}

var _ = require('underscore');
var printAdjustedAst = require('../../../ast/printAdjustedAst');

function helper(nodes, options) {
    return _.map(nodes, function(node) {
        return printAdjustedAst(options.data.code, node, node.range[0], node.range[1]);
    }).join(', ');
}


