module.exports = {
    help: {
        arguments: [
            {
                name: 'node',
                description: 'An AST node'
            }
        ],
        description: 'Prints javascript for the given AST node',
        attributes: [
        ]
    },
    helper: helper
}

var printAdjustedAst = require('../../../ast/printAdjustedAst');

function helper(node, options) {
    return printAdjustedAst(options.data.code, node, node.range[0], node.range[1]);
}

