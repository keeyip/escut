all:test_quote_reserved_words \
	test_quote_reversed_words_property_literals \
	test_reserved_words_property_literals \
	test_quote_reversed_words_member_expression \
	test_reserved_words_member_expression \
	test_rewrite_function_bind \
	test_function_bind \
	test_yank \
	test_json \
	test_remove \
	test_remove_after_multiline_comment

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

test_rewrite_function_bind:
	escut "CallExpression[callee.type='MemberExpression']:not([callee.object.type='CallExpression'][callee.object.callee.name='_'])[callee.object.name!='_'][callee.property.name='bind']" "rewrite _.bind({{js callee.object}}, {{splat arguments}})" samples/function-bind.js

test_function_bind:
	escut "CallExpression[callee.type='MemberExpression']:not([callee.object.type='CallExpression'][callee.object.callee.name='_'])[callee.object.name!='_'][callee.property.name='bind']" "yank" samples/function-bind.js

test_yank:
	escut "Property[key.name='render'][value.type='FunctionExpression']" "yank" samples/test1.js

test_json:
	escut "Property[key.name='render'][value.type='FunctionExpression']" "json" samples/test1.js

test_remove:
	escut "Property[key.name='render'][value.type='FunctionExpression']" "remove" samples/test1.js

test_remove_after_multiline_comment:
	escut "Property[key.name='build'][value.type='FunctionExpression']" "remove" samples/test1.js

test_rewrite_leaked_globals:
	escut '!AssignmentExpression > Identifier.left:{isGlobal}' "rewrite var {{js this.left}} = {{js right}}" samples/globals.js

test_get:
	escut 'AssignmentExpression > Identifier.left:{isGlobal}' "rewrite {{js (get this path='../right')}}" samples/globals.js
