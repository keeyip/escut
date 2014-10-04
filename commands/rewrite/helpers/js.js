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

var printAdjustedAst = require('../../../ast/printAdjustedAst');

function helper(node, options) {
    return printAdjustedAst(options.data.code, node, node.range[0], node.range[1]);
}

