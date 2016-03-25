kappy.diaryMaker = new (function(){
    this.DIARY_SOURCE = [
        "diary/201603/json/kappy_20160320.json",
        "diary/201603/json/kappy_20160319.json",
        "diary/201603/json/kappy_20160318.json",
        "diary/201603/json/kappy_20160317.json",
        "diary/201603/json/kappy_20160316.json",
        "diary/201603/json/kappy_20160315.json",
        "diary/201603/json/kappy_20160314.json",
        "diary/201603/json/kappy_20160313.json",
        "diary/201603/json/kappy_20160312.json"
    ]
    // for body --
    this.importDiaryBody = function(){
        console.log("start diary maker for body");
        var self = this;
        var d = new $.Deferred;
        // get json name from hash
        var name = location.hash.substr(1);
        // make json path
        var s = name.split("_");
        // 20160320 -> 201603
        var src = s[1].substr(0,6);
        src =  "diary/" + src + "/json/" + name + ".json";

        // get json file
        $.getJSON(src, function(data){
            console.log("loaded : " + src);

            var diary = self.makeDiaryBody(data);
            
            self.addDiary(diary);

            d.resolve();
        })

        return d.promise();
    }
    this.makeDiaryBody = function(data){
        var isBody = data.diary.body && data.diary.body.content,
            noBody = !isBody;

        // force noBody
        //noBody = true;
        if(noBody){
            return this.makeSectionByHeadline(data, noBody);
        }else{
            return this.makeSectionByBody(data);
        }
        
    }
    this.makeSectionByBody = function(data){
        var headline = data.diary.headline,
            body = data.diary.body,
            content = body.content;

        var s = $('<section></section>');
        // class item
        s.addClass("item");

        // section size, class item-l
        s.addClass("item-l");

        // section category
        s.addClass(this.getSectionCategory(headline))

        for(var i = 0; i < content.length; i++){
            this.makeSingleSectionByBody(data, content[i], s);
            if(i < content.length - 1 ){
                var br = $("<br><br>");
                s.append(br);
            }
        }

        s.append(this.makeDate(data));

        return s;
    }
    this.makeSingleSectionByBody = function(data, content, s){
        var body = data.diary.body,
            noBody = false,
            type = content.type;

        switch (type){
            case "image" :
                this.makeSingleImageSectionByBody(data, noBody, content, s);
                break;
            case "video" :
                this.makeSingleVideoSectionByBody(data, noBody, content, s);
                break;
        }
    }
    this.makeSingleVideoSectionByBody = function(data, noBody, content, s){

        s.append(this.makeVideoBody(data, noBody, content));

        s.append(this.makeCategoryBody(data, noBody, content));

        s.append(this.makeDescriptionBody(data, noBody, content));

    }
    this.makeSingleImageSectionByBody = function(data, noBody, content, s){

        s.append(this.makeImageBody(data, noBody, content));

        s.append(this.makeCategoryBody(data, noBody, content));

        s.append(this.makeDescriptionBody(data, noBody, content));
    }
    this.makeSectionByHeadline = function (data, noBody) {
        var headline = data.diary.headline;

        var s = $("<section></section>");
        // class item
        s.addClass("item");

        // section size, class item-l
        s.addClass("item-l");

        // section category
        s.addClass(this.getSectionCategory(headline));

        s.append(this.makeImageBody(data, noBody));

        s.append(this.makeCategoryBody(data, noBody));

        s.append(this.makeDescriptionBody(data, noBody));

        s.append(this.makeDate(data));

        return s;
    }
    // --

    // for headlines
    this.importDiary = function(){
        console.log("start diary maker");
        var d = new $.Deferred;
        var position = 0;

        this.importNext(position, d);

        return d.promise();

    }
    this.importNext = function(position, d){
        var self = this;
        $.getJSON(this.DIARY_SOURCE[position], function(data){

            console.log("make diary :" + self.DIARY_SOURCE[position]);
            var diary = self.makeDiary(data);

            self.addDiary(diary);

            position++;
            if(position < self.DIARY_SOURCE.length){
                self.importNext(position, d);
            }else{
                d.resolve();
            }
        });
    }
    this.addDiary = function(diary){
        $("#diary").append(diary);
    }
    this.makeDiary = function(data){
        return this.makeSection(data);
    }
    this.makeSection = function(data){
        var headline = data.diary.headline;
        var s = $('<section></section>');
        // class item
        s.addClass("item");

        // section size
        s.addClass(this.getSectionSize(headline));

        // section category
        s.addClass(this.getSectionCategory(headline));

        // link element
        s.append(this.makeLink(data));

        return s;
    }
    this.makeLink = function(data){
        var headline = data.diary.headline;
        var a = $("<a></a>");

        // href
        a.attr("href", this.getHref(data));

        // image
        a.append(this.makeImage(data));

        // category
        a.append(this.makeCategory(data));

        // description
        a.append(this.makeDescription(data));

        a.append(this.makeDate(data));

        return a;
    }
    this.makeVideoBody = function (data, noBody, content) {
        var div = $("<div></div>");
        
        // class video-container
        div.addClass("video-container");
        
        var iFrame = $("<iframe></iframe>");
        var src = content.videoPath;
        iFrame.attr("src",src);
        iFrame.attr("frameborder","0");
        iFrame.attr("allowfullscreen","");

        div.append(iFrame);

        return div;
        
    }
    this.makeImageBody = function(data, noBody, content){
        var headline = data.diary.headline;
        var img = $("<img>");
        
        // class image
        var diaryPath = data.diary.diaryPath;
        img.addClass("image");

        if(noBody){
            // get src from headline
            var src = this.getIconPath(data);
            // not replace because html is located under kappy directory
            //src = src.replace(diaryPath + "/","");
            img.attr("src",src);
            img.attr("alt",this.getIconAlt(headline));

            return img;
        }else{
            var src = this.getBodyImagePath(data, content);
            // not replace because html is located under kappy directory
            //src = src.replace(diaryPath + "/","");
            img.attr("src",src);
            img.attr("alt",this.getBodyImageAlt(content));

            return img;
        }
    }
    this.getBodyImagePath = function(data, content){
        return data.diary.imagePath + content.image;
    }
    this.getBodyImageAlt = function(content){
        return content.alt || "";
    }
    this.makeImage = function(data){
        var headline = data.diary.headline;
        var div = $("<div></div>");

        // class image
        div.addClass("image");

        // make img tag
        var img = $("<img>");
        img.attr("src", this.getIconPath(data));
        img.attr("alt", this.getIconAlt(headline));

        div.append(img);

        return div;
    }
    this.makeDate = function(data){
        var p = $("<p></p>");

        // class date
        p.addClass("date");
        var date = data.diary.date,
            year = date.substr(0,4),
            month = date.substr(4,2),
            day = date.substr(6,2);
        date = year + "/" + month + "/" + day;
        p.html(date);

        return p;
    }
    this.makeDescriptionBody = function(data, noBody, content){
        if(noBody){
            // make from headline
            return this.makeDescription(data);
        }else{
            var p = $("<p></p>");

            // class description
            p.addClass("description");
            p.html(this.getContentDescription(content));

            return p;
        }
    }
    this.getContentDescription = function(content){
        return content.description || "no description";
    }
    this.makeDescription = function(data){
        var headline = data.diary.headline;
        var p = $("<p></p>");

        // class description
        p.addClass("description");
        p.html(this.getHeadlineDescription(headline));

        return p;
    }
    this.makeCategoryBody = function(data, noBody, content){
        if(noBody){
            // make from headline
            return this.makeCategory(data);
        }else{
            var div = $("<div></div>");

            // class category
            div.addClass("category");
            div.addClass(this.getSectionCategory(content));
            div.html(this.getContentTitle(content));

            return div;
        }
    }
    this.getContentTitle = function(content){
        return content.title || "no title";
    }
    this.makeCategory = function(data){
        var headline = data.diary.headline;
        var div = $("<div></div>");

        // class category
        div.addClass("category");
        // class item color, it is only for diary body
        div.addClass(this.getSectionCategory(headline));
        div.html(this.getHeadlineTitle(headline));

        return div;
    }
    this.getSectionSize = function(headline){
        switch (headline.size){
            case "large" :
                return "item-l";
            case "medium" :
                return "item-m";
            case "small" :
                return "";
            default :
                return "";
        }
    }
    this.getSectionCategory = function(headline){
        switch (headline.category){
            case "type01" :
                return "item-type01";
                break;
            case "type02" :
                return "item-type02";
                break;
            case "type03" :
                return "item-type03";
                break;
            case "type04" :
                return "item-type04";
                break;
        }
    }
    this.getHref = function(data){
        var headline = data.diary.headline;
        var path = data.diary.diaryPath;
        //var href = path + "/" + headline.href,
        var href = headline.href,
            name = data.diary.name || "",
            date = data.diary.date || "",
            id = data.diary.id || "";

        href += "#" + name + "_" + date + (id ? ("_" + id) : "");
        return href || "#";
    }
    this.getIconPath = function(data){
        return data.diary.imagePath + data.diary.headline.iconImage; 
    }
    this.getIconAlt = function(headline){
        return headline.alt || "no alt";
    }
    this.getHeadlineTitle = function(headline){
        return headline.title || "no title";
    }
    this.getHeadlineDescription = function(headline){
        return headline.description || "no description";
    }
})

