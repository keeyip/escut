module.exports = {
    help: {
        arguments: '',
        description: '',
        examples: [
        ]
    },
    run: run 
};

var _ = require('underscore');

function run(config) {
    var code = config.code
    function indentationBefore(x) {
        for (var x0=x-1; /\s/.test(code[x0]); x0--);
        return x0+1;
    }
    return _.map(config.queryResults, function(node) {
        return code.substring(indentationBefore(node.range[0]), node.range[1])
    }).join('\n')
}

