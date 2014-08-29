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
