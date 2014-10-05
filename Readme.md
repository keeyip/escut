# Install as command-line tool

    npm install -g escut

    Usage: escut selector command file.js

        # A CSS-like selector, see https://github.com/keeyip/esquery
        @selector

        @command json

        @command print

        @command quote-member

        @command quote-property

        @command remove

        # Rewrites code using a handlebars replacement string
        @command rewrite replacement

            # A handlebars replacement string
            @param replacement

                # Prints javascript for the given AST node
                @helper js node

                    # An AST node
                    @param node

                # Prints each node, separated by `, `
                @helper splat nodes

                    # List of AST nodes
                    @param nodes

            # Use `_.bind` instead of `Function.prototype.bind`
            @example
                @file.js ```y.bind(this, a, b, c)```
                @sh escut "CallExpression[callee.property.name=bind]" "rewrite _.bind({{js callee.object}}, {{splat arguments}})" file.js
                @output  ```_.bind(y, this, a, b, c)```

        @command yank

# Design

# Tutorial

In the code below, suppose you want to rename `about:` to `help:`
```js
// commands/quote-property.js
module.exports = {
    about: {
        arguments: '',
        description: '',
        examples: [
        ]
    },
    run: run
};
...
```

Solution:
```bash
escut "Property[key.name='about'] > .key" "rewrite help" commands/quote-property.js
```

Suppose you want to do this for **each** file below:

    commands/
    ├── json.js
    ├── print.js
    ├── quote-member.js
    ├── quote-property.js
    ├── remove.js
    ├── rewrite
    │   ├── helpers
    │   │   ├── js.js
    │   │   └── splat.js
    │   └── index.js
    └── yank.js

Solution:
```bash
# tree -- http://brewformulas.org/tree
# parallel -- http://brewformulas.org/parallel (not the one in http://brewformulas.org/moreutil)
# sponge -- http://brewformulas.org/moreutil
tree -f -i -n --noreport commands | grep .js$ | parallel "escut \"Property[key.name='about'] > .key\" \"rewrite help\" {} | sponge {}"
```

# Cookbook

## Rename an object property

## Use `_.bind()` instead of `Function.prototype.bind`

