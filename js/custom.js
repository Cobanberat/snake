$(document).ready(function() {
    var hareketAraligi = null;
    var hareketYonu = null; 

    function hareketiBaslat(yon) {
        if (hareketAraligi) {
            clearInterval(hareketAraligi); 
        }
        hareketYonu = yon; 
        hareketAraligi = setInterval(function() {
            if (hareketYonu === "ArrowLeft") {
                $(".snake").animate({ "left": "-=50px" }, 300);
            } else if (hareketYonu === "ArrowUp") {
                $(".snake").animate({ "top": "-=50px" }, 300);
            } else if (hareketYonu === "ArrowRight") {
                $(".snake").animate({ "left": "+=50px" }, 300);
            } else if (hareketYonu === "ArrowDown") {
                $(".snake").animate({ "top": "+=50px" }, 300);
            }
        }, 300);
    }

  
    document.addEventListener("keydown", function(e) {
        if (["ArrowLeft", "ArrowUp", "ArrowRight", "ArrowDown"].includes(e.key)) {
            hareketiBaslat(e.key);
        }
    });
});
