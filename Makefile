all: test_reserved_words test_yank test_remove_after_multiline_comment

test_reserved_words:
	escut "Property:{badWords.isBadForInternetExplorer8 key.name}[key.type='Identifier']" "yank" samples/reserved-word-as-unquoted-property-key.js

test_yank:
	escut "Property[key.name='render'][value.type='FunctionExpression']" "yank" samples/test1.js

test_json:
	escut "Property[key.name='render'][value.type='FunctionExpression']" "json" samples/test1.js

test_remove:
	escut "Property[key.name='render'][value.type='FunctionExpression']" "remove" samples/test1.js

test_remove_after_multiline_comment:
	escut "Property[key.name='build'][value.type='FunctionExpression']" "remove" samples/test1.js
