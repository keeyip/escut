module.exports = {
    about: {
        arguments: '',
        description: '',
        examples: [
        ]
    },
    run: run
};

var _ = require('underscore');
var estraverse = require('estraverse');
var getNextCommaSeparableSibling = require('../ast/getNextCommaSeparableSibling');
var canBeCommaSeparable = require('../ast/canBeCommaSeparable');

function run(config) {
    var sorted = _.sortBy(config.queryResults, function(node) {
        return node.range[0]
    })

    var code = config.code;
    var newCode = '';
    var x = 0;
    var comments = config.ast.comments;
    var commentIndex = 0;
    function skipCommentsUntil(stop) {
        var comment
        for (; commentIndex < comments.length; commentIndex++) {
            comment = comments[commentIndex]
            if (comment.range[1] >= stop) break;
        }
        return comment
    }
    estraverse.traverse(config.ast, {
        enter: function(node, parent) {
            skipCommentsUntil(node.range[0])
            if (sorted.indexOf(node) >= 0) {
                newCode += code.substring(x, node.range[0])
                x = node.range[0]
                return estraverse.VisitorOption.Skip
            } else {
                newCode += code.substring(x, node.range[0])
                x = node.range[0]
            }
        },
        leave: function(node, parent) {
            skipCommentsUntil(node.range[1])
            if (sorted.indexOf(node) >= 0) {
                x = node.range[1]
                if (canBeCommaSeparable(parent)) {
                    var substr = code.substring(node.range[1])
                    var matchTrailingComma = substr.match(/^[\s\n\r]*,/)
                    if (matchTrailingComma) {
                        x += matchTrailingComma[0].length
                    } else {
                        var nextSibling = getNextCommaSeparableSibling(parent, node)
                        if (nextSibling) {
                            var maybeSkippableStr = code.substring(x, nextSibling.range[0])
                            var x1 = x;
                            var i = maybeSkippableStr.indexOf(',');
                            while (i >= 0) {
                                var comment = skipCommentsUntil(x1 + i);
                                if (comment) {
                                    if (comment.range[0] <= x1 + i) {
                                        x1 = comment.range[1]
                                    } else {
                                        x1 += i+1
                                    }
                                } else {
                                    x1 += i+1
                                    break;
                                }
                                maybeSkippableStr = code.substring(x1, nextSibling.range[0])
                                i = maybeSkippableStr.indexOf(',')
                            }
                            x = x1
                        }
                    }
                }
            } else {
                newCode += code.substring(x, node.range[1])
                x = node.range[1]
            }
        }
    });
    newCode += code.substring(x);
    return newCode;
}
