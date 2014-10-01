// NOTE: Taking straight from esprima.js

// 7.6.1.2 Future Reserved Words

var _ = require('underscore');
var objectPath = require('object-path');

var API = {
    isFutureReservedWord: isFutureReservedWord,
    isStrictModeReservedWord: isStrictModeReservedWord,
    isRestrictedWord: isRestrictedWord,
    isKeyword: isKeyword,
    _isBadForInternetExplorer8: function(id) {
        return _.any([
            isKeyword,
            isRestrictedWord,
            isStrictModeReservedWord,
            isFutureReservedWord
        ], function(isBad) {
            return isBad(id);
        });
    },
    isBadForInternetExplorer8: function(args, node, ancestry) {
        return API._isBadForInternetExplorer8(objectPath.get(node, args[0]));
    }
};
module.exports = API;

function isFutureReservedWord(id) {
    switch (id) {
    case 'class':
    case 'enum':
    case 'export':
    case 'extends':
    case 'import':
    case 'super':
        return true;
    default:
        return false;
    }
}

function isStrictModeReservedWord(id) {
    switch (id) {
    case 'implements':
    case 'interface':
    case 'package':
    case 'private':
    case 'protected':
    case 'public':
    case 'static':
    case 'yield':
    case 'let':
        return true;
    default:
        return false;
    }
}

function isRestrictedWord(id) {
    return id === 'eval' || id === 'arguments';
}

// 7.6.1.1 Keywords

function isKeyword(id, strict) {
    if (strict && isStrictModeReservedWord(id)) {
        return true;
    }

    // 'const' is specialized as Keyword in V8.
    // 'yield' and 'let' are for compatiblity with SpiderMonkey and ES.next.
    // Some others are from future reserved words.

    switch (id.length) {
    case 2:
        return (id === 'if') || (id === 'in') || (id === 'do');
    case 3:
        return (id === 'var') || (id === 'for') || (id === 'new') ||
            (id === 'try') || (id === 'let');
    case 4:
        return (id === 'this') || (id === 'else') || (id === 'case') ||
            (id === 'void') || (id === 'with') || (id === 'enum');
    case 5:
        return (id === 'while') || (id === 'break') || (id === 'catch') ||
            (id === 'throw') || (id === 'const') || (id === 'yield') ||
            (id === 'class') || (id === 'super');
    case 6:
        return (id === 'return') || (id === 'typeof') || (id === 'delete') ||
            (id === 'switch') || (id === 'export') || (id === 'import');
    case 7:
        return (id === 'default') || (id === 'finally') || (id === 'extends');
    case 8:
        return (id === 'function') || (id === 'continue') || (id === 'debugger');
    case 10:
        return (id === 'instanceof');
    default:
        return false;
    }
}
