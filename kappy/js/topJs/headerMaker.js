kappy.headerMaker= new (function() {

    this.diaryHash = "kappy_20160320";

    this.html = "index";

    this.ITEM = [
        { name: "ほうむ",
          href: "index.html"},
        { name: "ぷろふぃいる",
            href: "index.html"},
        { name: "日記",
            href: "diary.html" + "#" + this.diaryHash},
        { name: "ままの絵",
            href: "index.html"},
        { name: "ままの小説",
            href: "index.html"}
    ]

    this.makeHeader = function(){
        console.log("make header");
        var d = new $.Deferred;
        var header = $("<header></header>");
        header.addClass("header");
        header.addClass("item");
        var h1 = $("<h1></h1>");
        var a = $("<a></a>");
        a.attr("href","index.html");
        var img = $("<img>");
        img.addClass("logo");
        img.attr("src","img/kappy_logo.jpg");
        img.attr("alt","ロゴ");
        a.append(img);
        h1.append(a);
        header.append(h1);

        var nav = $("<nav></nav>");
        nav.addClass("nav");
        var ul = $("<ul></ul>");
        for(var i = 0; i < this.ITEM.length; i++){
            var li = $("<li></li>");
            li.addClass("nav-item");
            var lia = $("<a></a>");
            lia.attr("href", this.ITEM[i].href);
            lia.html(this.ITEM[i].name);
            li.append(lia);
            ul.append(li);
        }
        nav.append(ul);
        header.append(nav);

        $("#header").append(header);

        d.resolve();

        return d.promise();
    }
});
