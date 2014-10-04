module.exports = {
    help: {
        arguments: '',
        description: '',
        examples: [
        ]
    },
    run: run
};

var sortByRange0 = require('../ast/sortByRange0')
var estraverse = require('estraverse');
var _ = require('underscore');
var escodegen = require('escodegen');
var printAdjustedAst = require('../ast/printAdjustedAst');

function run(config) {
    // Sort for speedup during in-order transformation.
    var descendingMatchedNodes = sortByRange0(_.where(config.queryResults, {type:'MemberExpression'}));

    config.ast = estraverse.replace(config.ast, {
        enter: function(node) {
            if (descendingMatchedNodes.length === 0) {
                return estraverse.VisitorOption.Break;
            }
            if (descendingMatchedNodes[0].property === node) {
                var literal = {
                    type: 'Literal',
                    value: node.name,
                    range: node.range,
                };
                literal.__escutNewCode = literal.raw = escodegen.generate(literal);
                return literal;
            }
        },
        leave: function(node) {
            if (descendingMatchedNodes[0] === node) {
                descendingMatchedNodes.shift();
                return _.extend({}, node, {
                    computed: true,
                    __escutNewCode:
                        printAdjustedAst(config.code, node.object, node.object.range[0], node.object.range[1]) +
                        '[' +
                            node.property.__escutNewCode +
                        ']'
                });
            }
        }
    });
}

