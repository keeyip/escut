all: test_quote_reserved_words test_quote_reversed_words_member_expression test_quote_reversed_words_property_literals test_reserved_words_property_literals test_reserved_words_member_expression test_yank test_remove_after_multiline_comment

test_quote_reserved_words:
	escut "Property:{badWords.isBadForInternetExplorer8 key.name}[key.type='Identifier'],MemberExpression:{badWords.isBadForInternetExplorer8 property.name}[computed=false][property.type='Identifier']" "quote-member|quote-property|print" samples/reserved-word-as-unquoted-property-key.js

test_quote_reversed_words_property_literals:
	escut "Property:{badWords.isBadForInternetExplorer8 key.name}[key.type='Identifier']" "quote-property|print" samples/reserved-word-as-unquoted-property-key.js

test_reserved_words_property_literals:
	escut "Property:{badWords.isBadForInternetExplorer8 key.name}[key.type='Identifier']" "yank" samples/reserved-word-as-unquoted-property-key.js

test_quote_reversed_words_member_expression:
	escut "MemberExpression:{badWords.isBadForInternetExplorer8 property.name}[computed=false][property.type='Identifier']" "quote-member|print" samples/reserved-word-as-unquoted-property-key.js

test_reserved_words_member_expression:
	escut "MemberExpression:{badWords.isBadForInternetExplorer8 property.name}[computed=false][property.type='Identifier']" "yank" samples/reserved-word-as-unquoted-property-key.js

test_yank:
	escut "Property[key.name='render'][value.type='FunctionExpression']" "yank" samples/test1.js

test_json:
	escut "Property[key.name='render'][value.type='FunctionExpression']" "json" samples/test1.js

test_remove:
	escut "Property[key.name='render'][value.type='FunctionExpression']" "remove" samples/test1.js

test_remove_after_multiline_comment:
	escut "Property[key.name='build'][value.type='FunctionExpression']" "remove" samples/test1.js
