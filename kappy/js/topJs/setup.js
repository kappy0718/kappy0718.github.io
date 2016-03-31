// for jQuery
$(document).ready(function() {
    console.log("start jQuery");

    //make startup
    kappy.setup = new (function () {
        this.loadScript = function (src) {
            var script = document.createElement("script");
            var d = new $.Deferred;

            script.type = "text/javascript";
            script.src = src;
            script.onload = function (e) {
                console.log("loaded script : " + src);
                d.resolve();
            }
            var firstScript = document.getElementsByTagName("script")[0];
            firstScript.parentNode.insertBefore(script, firstScript);
            document.body.appendChild(script);
            return d.promise();
        }
    });
    
    console.log("made startup");
    
    kappy.startup.start();
});
