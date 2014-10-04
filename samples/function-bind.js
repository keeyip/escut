x = function(){
    stuff = 2;
}.bind(this);

y = (/*comment...*/function() {
    stuff = 1;
}/*comment...*/).bind(this)/*wefwef*/;

z = map(/*comment...*/function() {
    stuff = 2;
    for (var i = 0; i < 10; i++) {
        stuff += i;
    }
}.bind(/*comment...*/this)); /*wefwef*/

// Comment 1
        controller = {};
        // Comment 2
        w = setTimeout(x.bind(controller/*hello*/,a,b,c,d));


        blah.wef.bind(this,1,2);
        _(wef.wef).bind(this);
        _.bind(blah.blah, 1,2);
        _.bind(x);
        _(wef).bind(x);
// Comment 3
// Comment 4
// Comment 5
// Comment 6
// Comment 7
