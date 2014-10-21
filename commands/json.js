module.exports = {
    help: {
        arguments: '',
        description: '',
        examples: [
        ]
    },
    run: run
};

var ESCOPE = require('escope').Scope.mangledName;

function run(config) {
    return JSON.stringify(config.queryResults, function(key, value) {
        if (key === 'parent') return '[' + value.type + ']';
        if (key === ESCOPE) return '[Scope]';
        return value;
    }, 4)
}

