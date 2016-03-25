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
                console.log("loaded script : " + src);
                d.resolve();
            }
            var firstScript = document.getElementsByTagName( "script" )[0];
            firstScript.parentNode.insertBefore( script, firstScript );
            document.body.appendChild( script );
            return d.promise();
        }
    });
    // load headerMaker
    kappy.startup.loadScript("js/topJs/headerMaker.js")
        .then(function(){
            return kappy.headerMaker.makeHeader();
        })
        .then(function(){
            // load diaryMaker
            return kappy.startup.loadScript("js/topJs/diaryMaker.js")
        })
        .then(function(){
            return kappy.diaryMaker.importDiary();
        }).then(function(){
            console.log("imported diary");

            // star Masonry
            new Masonry("body",{
                itemSelector: " .item",
                columnWidth: 180,
                gutter: 4
            });
    });
});




