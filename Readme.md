# Install as command-line tool

    npm install -g esdiff

    Usage: esdiff comparison file1.js file2.js

        @param comparison: --chars | --words | --lines | --css

        Example: esdiff --chars file1.js file2.js

# Example

    esdiff --words samples/test1_a.js samples/test1_b.js

    Comparing: samples/test1_a.js, samples/test1_b.js
    --------------------------------------------------------------------------------
        function x() {
            alert('[7m[32mbye[39m[27m[7m[31mhi[39m[27m');
        }
    --------------------------------------------------------------------------------
