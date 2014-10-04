var _ = require('underscore');
var estraverse = require('estraverse');

module.exports = function (code, ast, start, stop) {
    // Use escodgen as a last resort, it is not good at maintaining comments.

    var newCode = '';
    var cursor = start || 0;
    if (!_.isUndefined(stop)) {
        code = code.substring(0, stop);
    }
    estraverse.traverse(ast, {
        enter: function(node) {
            if (node.__escutNewCode) {
                newCode += code.substring(cursor, node.range[0]);
                newCode += node.__escutNewCode;
                cursor = node.range[1];
                return estraverse.VisitorOption.Skip;
            } else {
                newCode += code.substring(cursor, node.range[0]);
                cursor = node.range[0];
            }
        },
        leave: function(node) {
            if (node.__escutNewCode) return;

            newCode += code.substring(cursor, node.range[1]);
            cursor = node.range[1];
        }
    });
    newCode += code.substring(cursor);
    return newCode;
}
