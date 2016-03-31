kappy.startup = new function () {
    this.start = function(){
        // load headerMaker
        kappy.setup.loadScript("js/topJs/headerMaker.js")
            .then(function(){
                return kappy.headerMaker.makeHeader();
            })
            .then(function(){
                // load diaryMaker
                return kappy.setup.loadScript("js/topJs/diaryMaker.js")
            })
            .then(function(){
                return kappy.diaryMaker.importDiary();
            }).then(function(){

            // star Masonry
            new Masonry("body",{
                itemSelector: " .item",
                columnWidth: 180,
                gutter: 4
            });
        });
    };
};





