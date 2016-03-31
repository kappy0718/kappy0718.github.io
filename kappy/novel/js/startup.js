kappy.startup = new (function(){
    this.start = function() {
        // load headerMaker
        kappy.setup.loadScript("js/topJs/headerMaker.js")
            .then(function () {
                // load diaryMaker
                return kappy.setup.loadScript("js/topJs/diaryMaker.js");
            })
            .then(function () {
                return kappy.headerMaker.makeHeader();
            })
            .then(function () {
                kappy.diaryMaker.MODE = "NOVEL";
                return kappy.diaryMaker.importDiaryBody();
            }).then(function () {
            console.log("imported diary");
        });
    }
})

