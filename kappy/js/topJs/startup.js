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
    console.log("jQuery start");

    //load startup
    kappy.startup = (function(){
        var loadScript = function(src) {
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
        return {loadScript: loadScript}
    })();

    // load src
    var src = "js/topJs/diaryMaker.js";
    kappy.startup.loadScript(src)
        .then(function(){
            console.log("loaded deferred : " + src);
    });;
});




