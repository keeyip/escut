var _ = require('underscore');
var objectPath = require('object-path');
var ESCOPE = require('escope').Scope.mangledName;

var API = function(args, node, ancestry) {
    var globalScope = _.last(ancestry)[ESCOPE];
    return !!_.find(globalScope.through, function(t) {
        return t.identifier === node;
    });
}
module.exports = API;
