function mama(){
    window.setTimeout(function(){
        var d = document.getElementById("mama")
        var e = document.createElement("div")
        var condition = Math.floor( Math.random() * 3 );
        var text ="";
        switch (condition){
            case 0 :
                text = "まま〜、まま〜";
                break;
            case 1 :
                text = "ぱぱ〜、ぱぱ〜";
                break;
            case 2 :
                text = "ままは臭い";
                break;
        }
        e.innerHTML = text + "<br>";
        d.appendChild(e);
        mama();
    },2*1000)
}
mama();