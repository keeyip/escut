all: test_yank test_remove_after_multiline_comment

test_yank:
	escut "Property[key.name='render'][value.type='FunctionExpression']" "yank" samples/test1.js

test_json:
	escut "Property[key.name='render'][value.type='FunctionExpression']" "json" samples/test1.js

test_remove:
	escut "Property[key.name='render'][value.type='FunctionExpression']" "remove" samples/test1.js

test_remove_after_multiline_comment:
	escut "Property[key.name='build'][value.type='FunctionExpression']" "remove" samples/test1.js
