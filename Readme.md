# Install as command-line tool

    npm install -g escut



    Usage: escut selector command file.js

        @param selector: see https://github.com/jrfeenst/esquery
        @param command: remove | yank | json

        Example: escut "Property[key.name='render'][value.type='FunctionExpression']" "yank" samples/test1.js


# Example


    escut "Property[key.name='render'][value.type='FunctionExpression']" "yank" samples/test1.js

        render: function() {
        }




    escut "Property[key.name='build'][value.type='FunctionExpression']" "remove" samples/test1.js
    var x = {

        /*
        Do not remove this
        */
        render: function() {
        },
        close: function() {
        }
    }


# Howto

## Rename an object property in many files

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
