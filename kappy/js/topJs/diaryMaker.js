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
        a.attr("href", this.getHref(headline));

        // image
        a.append(this.makeImage(data));

        // category
        a.append(this.makeCategory(data));

        // description
        a.append(this.makeDescription(data));

        a.append(this.makeDate(data));

        return a;
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
    this.makeDescription = function(data){
        var headline = data.diary.headline;
        var p = $("<p></p>");

        // class description
        p.addClass("description");
        p.html(this.getHeadlineDescription(headline));

        return p;
    }
    this.makeCategory = function(data){
        var headline = data.diary.headline;
        var div = $("<div></div>");

        // class category
        div.addClass("category");
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
    this.getHref = function(headline){
        return headline.href || "#";
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

