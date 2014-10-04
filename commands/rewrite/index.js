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
var printAdjustedAst = require('../../ast/printAdjustedAst');
var handlebars = require('handlebars');

var rewriter = handlebars.create();
rewriter.registerHelper('escut', function(options) {
    var data = rewriter.createFrame({
        ast: this.ast,
        code: this.code
    });
    return options.fn(this.node, {
        data: data
    });
});

rewriter.registerHelper('js', require('./helpers/js').helper);
rewriter.registerHelper('splat', require('./helpers/splat').helper);

function run(config, template) {
    var rewrite = rewriter.compile('{{#escut}}' + template + '{{/escut}}', {
        noEscape: true
    });
    _.each(config.queryResults, function(node) {
        node.__escutNewCode = rewrite({
            code: config.code,
            ast: config.ast,
            node: node
        });
    });
    return printAdjustedAst(config.code, config.ast);
}


