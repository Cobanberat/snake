$(document).ready(function () {
    var hareketYonu = null;
    var skor = 0;
    var hiz = 80;
    var function_hiz = 100;
    var hareketEdiyor = false;
    $(".game_over").hide();
    $(".refresh_button").hide();
    $(".skor").show();

    function rastgeleKonumBelirle(element) {
        const gameBoard = $(".game_board")[0].getBoundingClientRect();
        const maxX = Math.floor((gameBoard.width - element.width()) / 15);
        const maxY = Math.floor((gameBoard.height - element.height()) / 15);
        const x = Math.floor(Math.random() * (maxX + 1)) * 15;
        const y = Math.floor(Math.random() * (maxY + 1)) * 15;
        element.css({ left: x + 'px', top: y + 'px' });
    }

    function segmentEkle() {
        const yeniSegment = $("<div class='snake'></div>");
        $(".game_board").append(yeniSegment);
    }

    function hareketiBaslat() {
        if (hareketEdiyor) return;
        hareketEdiyor = true;

        function hareket() {
            if (!hareketYonu) {
                hareketEdiyor = false;
                return;
            }

            const yilanSegmentleri = $(".snake");
            const gameBoard = $(".game_board")[0].getBoundingClientRect();
            const yem = $(".yem");
            const yemKonumu = yem[0].getBoundingClientRect();

            const solDuvar = gameBoard.x;
            const sagDuvar = gameBoard.x + gameBoard.width;
            const ustDuvar = gameBoard.y;
            const altDuvar = gameBoard.y + gameBoard.height;

            const basSegment = $(yilanSegmentleri[0]);
            const basKonumu = basSegment[0].getBoundingClientRect();

            if (
                basKonumu.x <= solDuvar ||
                basKonumu.y <= ustDuvar ||
                basKonumu.x + basKonumu.width >= sagDuvar ||
                basKonumu.y + basKonumu.height >= altDuvar
            ) {
                $(".game_over").show();
                $(".refresh_button").show();
                $(".yem").hide();
                $(".start").hide();
                hareketEdiyor = false;
                return;
            }

            for (let i = yilanSegmentleri.length - 1; i > 0; i--) {
                $(yilanSegmentleri[i]).css({
                    left: $(yilanSegmentleri[i - 1]).css('left'),
                    top: $(yilanSegmentleri[i - 1]).css('top')
                });
            }

            if (hareketYonu === 37) { // Sol
                basSegment.css({ left: "-=15px" });
            } else if (hareketYonu === 38) { // Yukarı
                basSegment.css({ top: "-=15px" });
            } else if (hareketYonu === 39) { // Sağ
                basSegment.css({ left: "+=15px" });
            } else if (hareketYonu === 40) { // Aşağı
                basSegment.css({ top: "+=15px" });
            }

            if (
                basKonumu.x < yemKonumu.x + yemKonumu.width &&
                basKonumu.x + basKonumu.width > yemKonumu.x &&
                basKonumu.y < yemKonumu.y + yemKonumu.height &&
                basKonumu.y + basKonumu.height > yemKonumu.y
            ) {
                rastgeleKonumBelirle(yem);
                skor++;
                $(".skor").text(skor);
                segmentEkle();

            }

            setTimeout(function() {
                requestAnimationFrame(hareket);
            }, function_hiz);
        }

        $(".start").hide();
        hareket();
    }

    document.addEventListener("keydown", function (e) {
        const tersYonuKontrol = {
            37: 39, // Sol -> Sağ
            38: 40, // Yukarı -> Aşağı
            39: 37, // Sağ -> Sol
            40: 38  // Aşağı -> Yukarı
        };
        if ([37, 38, 39, 40].includes(e.keyCode) && tersYonuKontrol[hareketYonu] !== e.keyCode) {
            hareketYonu = e.keyCode;
            hareketiBaslat();
        }
    });

    rastgeleKonumBelirle($(".yem")); 
    $(".skor").text(skor); 
});

function refresh() {
    window.location.reload();
}
