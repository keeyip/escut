module.exports = {
    help: {
        arguments: [
            {
                name: 'node',
                description: 'An AST node'
            }
        ],
        description: 'Gets the value via a path on the specified node',
        attributes: [
            {
                name: 'path',
                description: 'A relative path'
            }
        ]
    },
    helper: helper
}

var objectPath = require('object-path');

function helper(node, options) {
    var up = options.hash.path.split('../')
    var down = up.pop();
    var relnode = node;
    for (; up.length > 0; up.pop()) {
        relnode = relnode.parent;
    }
    return objectPath.get(relnode, down);
}

