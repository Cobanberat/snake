$(document).ready(function () {
    var hareketYonu = null;
    var skor = 0;
    var hiz = 50;
    var hareketEdiyor = false;
    var requestId;

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
        $(".yem").show();
        
        
        function hareket() {
            var game_over_yilan = false;
            if (!hareketYonu) {
                hareketEdiyor = false;
                return;
            }

            const yilanSegmentleri = $(".snake");
            const { left, right, top, bottom, width, height } = $(".game_board")[0].getBoundingClientRect();
            const yem = $(".yem");
            const yemKonumu = yem[0].getBoundingClientRect();

            const basSegment = $(yilanSegmentleri[0]);
            const basKonumu = basSegment[0].getBoundingClientRect();

            
            const [yilanBas, ...yilanDiger] = yilanSegmentleri;
            
            yilanDiger.forEach(deger => {
                const {x:yilanBasX,y:yilanBasY} = yilanBas.getBoundingClientRect();
                const {x:yilanDigerX,y:yilanDigerY}=deger.getBoundingClientRect();
                if (yilanBasX === yilanDigerX && yilanBasY === yilanDigerY) {
                    while (--requestId) {
                        window.cancelAnimationFrame(requestId)
                    }
                    game_over_yilan = true;
                    requestId = undefined;
                    $(".game_over").show();
                    $(".snake").hide();
                    $(".yem").hide();
                    return;
                }
            });

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


            if (basKonumu.left < left) {
                basSegment.css({ left: width - basKonumu.width - 1  });
            } else if (basKonumu.right > right) {
                basSegment.css({ left : 0 });
            } else if (basKonumu.top < top) {
                basSegment.css({ top: height - basKonumu.height - 1  });
            } else if (basKonumu.bottom > bottom) {
                basSegment.css({ top: 0 });
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
                $(".start").hide();

                segmentEkle();
            }

            $(".snake").removeClass("head");
            $(yilanSegmentleri[0]).addClass("head");

            if (!game_over_yilan) {
                setTimeout(function() {
                    requestId = window.requestAnimationFrame(hareket);
                }, hiz);
            }
        }

        $(".start").hide();
        $("#select_renk").hide();
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
    
    $('#select_renk').on('change', function () {
        $t = $(this);
        var deger = $t.val();
        console.log(deger);
        if(deger == "1"){
            $(".snake").css({background : "#0f0"});
        }
        if(deger == "2"){
            $(".snake").css({background : "red"});
        }
        if(deger == "3"){
            $(".snake").css({background : "yellow"});
        }
        if(deger == "4"){
            $(".snake").css({background : "black"});
        }
        
    });

});

function refresh() {
    window.location.reload();
}

