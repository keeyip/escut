var getCommaSeparableChildren = require('./getCommaSeparableChildren')

module.exports = function(parent, node) {
    var siblings = getCommaSeparableChildren(parent);
    var i = siblings.indexOf(node)
    return siblings[i+1] || null
}
