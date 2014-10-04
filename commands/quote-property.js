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

function run(config) {
    // Sort for speedup during in-order transformation.
    var descendingMatchedNodes = sortByRange0(_.where(config.queryResults, {type:'Property'}));

    config.ast = estraverse.replace(config.ast, {
        enter: function(node) {
            if (descendingMatchedNodes.length === 0) {
                return estraverse.VisitorOption.Break;
            }

            if (descendingMatchedNodes[0].key === node) {
                descendingMatchedNodes.shift();
                var literal = {
                    type: 'Literal',
                    value: node.name,
                    range: node.range,
                };
                literal.__escutNewCode = literal.raw = escodegen.generate(literal);
                return literal;
            }
        }
    });
}

