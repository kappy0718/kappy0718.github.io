//for Masonry
window.onload = function(){
    new Masonry("body",{
        itemSelector: " .item",
        columnWidth: 180,
        gutter: 4
    });
}
// for jQuery
$(document).ready(function(){
    console.log("start jQuery");

    //make startup
    kappy.startup = new (function(){
        this.loadScript = function(src) {
            var script = document.createElement( "script" );
            var d = new $.Deferred;

            script.type = "text/javascript";
            script.src = src;
            script.onload = function( e )
            {
                console.log("loaded event : " + src);
                d.resolve();
            }
            var firstScript = document.getElementsByTagName( "script" )[0];
            firstScript.parentNode.insertBefore( script, firstScript );
            document.body.appendChild( script );
            return d.promise();
        }
    });

    // load diaryMaker
    var src = "js/topJs/diaryMaker.js";
    kappy.startup.loadScript(src)
        .then(function(){
            kappy.diaryMaker.importDiary();
    });;
});




