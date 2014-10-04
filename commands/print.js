module.exports = {
    about: {
        arguments: '',
        description: '',
        examples: [
        ]
    },
    run: run
};

var printAdjustedAst = require('../ast/printAdjustedAst');

function run(config) {
    return printAdjustedAst(config.code, config.ast);
}
