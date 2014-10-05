var _ = require('underscore');
var printAdjustedAst = require('../../ast/printAdjustedAst');
var handlebars = require('handlebars');
var prefixLines = require('../../str/prefixLines');

var rewriter = handlebars.create();
var HELPERS = require('require-children')('./helpers', module);
_.each(HELPERS, function(spec, name) {
    if (_.isString(spec)) HELPERS[name] = require('./helpers/' + name);
    rewriter.registerHelper(name, spec.helper);
});

module.exports = {
    help: {
        arguments: [
            {
                name:'replacement',
                description: 'A handlebars replacement string'
            }
        ],
        description: 'Rewrites code using a handlebars replacement string',
        detail: _.map(HELPERS, function(spec, name) {
            var help = spec.help;

            var lines = [''];
            var help = spec.help;
            if (help.description) lines.push(prefixLines('# ' + help.description, '    '))
            lines.push(prefixLines('@helper ' + name + ' ' + _.pluck(help.arguments, 'name').join(' ') + ' ' + _.pluck(help.attributes, 'name').map(function(x) { return x + '=...' }).join(' '), '    '))
            _.each(help.arguments, function(arg) {
                lines.push('')
                lines.push(prefixLines('# ' + arg.description, '        '))
                lines.push(prefixLines('@param ' + arg.name, '        '))
            });
            _.each(help.attributes, function(attr) {
                lines.push('')
                lines.push(prefixLines('# ' + attr.description, '        '))
                lines.push(prefixLines('@attribute ' + attr.name, '        '))
            });
            return lines.join('\n');
        }).join('\n'),
        examples: [
            {
                description: 'Use `_.bind` instead of `Function.prototype.bind`',
                input: 'y.bind(this, a, b, c)',
                selector: 'CallExpression[callee.property.name=bind]',
                argstring: '_.bind({{js callee.object}}, {{splat arguments}})',
                output: '_.bind(y, this, a, b, c)'
            }
        ]
    },
    run: run
};

rewriter.registerHelper('escut', function(options) {
    var data = rewriter.createFrame({
        ast: this.ast,
        code: this.code
    });
    return options.fn(this.node, {
        data: data
    });
});

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


