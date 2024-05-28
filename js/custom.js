$(document).ready(function () {
    var hareketYonu = null;
    hareketEdiyor = false;  
    yon = null;

    function hareket() {
        if (hareketYonu === 37) { // Sol
            $(".snake").css({ left: "-=15px" });
        } else if (hareketYonu === 38) { // Yukarı
            $(".snake").css({ top: "-=15px" });
        } else if (hareketYonu === 39) { // Sağ
            $(".snake").css({ left: "+=15px" });
        } else if (hareketYonu === 40) { // Aşağı
            $(".snake").css({ top: "+=15px" });
        }
            setTimeout(function() {
                requestAnimationFrame(hareket);
            }, 50);
    }

    function hareketiBaslat() {
        if (hareketEdiyor) return;
        hareketEdiyor = true;  
        hareket();      
    }


    document.addEventListener("keydown", function (e) {

        if ([37, 38, 39, 40].includes(e.keyCode)) {
            hareketYonu = e.keyCode;
            hareketiBaslat();
        }
    });
});