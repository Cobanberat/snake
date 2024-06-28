$(document).ready(function () {
    var hareketYonu = null;
    var hareketEdiyor = false;
    var snake = $(".snake");
    var yem = $(".yem");
    var yon = null;
    var skor = 1;
    var ctrlBasili = false;
    $(".tuslar").hide();
    $(".touchPad").hide();

    $(".left").on("click", function () {
        yon = 37;
    });
    $(".right").on("click", function () {
        yon = 39;
    });
    $(".up").on("click", function () {
        yon = 38;
    });
    $(".down").on("click", function () {
        yon = 40;
    });

    function rastgeleYem(element) {
        const game_board_konum = $(".game_board")[0].getBoundingClientRect();
        const board = game_board_konum;
        const x = Math.floor((board.width - element.width()) / 15);
        const y = Math.floor((board.height - element.height()) / 15);
        const rondomX = Math.floor((Math.random() * (x + 1))) * 15;
        const rondomY = Math.floor((Math.random() * (y + 1))) * 15;
        element.css({ left: rondomX + 'px', top: rondomY + 'px' });
    }

    function snakeEkle() {
        var oncSnakeSegment = $(".snake").last();
        var snakeEkle = $("<div class='snake' id='snake_'></div>");

        var oncLeft = parseInt(oncSnakeSegment.css('left'));
        var oncTop = parseInt(oncSnakeSegment.css('top'));

        if (hareketYonu === 37) { // Sol
            snakeEkle.css({ left: oncLeft + 15 + 'px', top: oncTop + 'px' });
        } else if (hareketYonu === 38) { // Yukarı
            snakeEkle.css({ left: oncLeft + 'px', top: oncTop + 15 + 'px' });
        } else if (hareketYonu === 39) { // Sağ
            snakeEkle.css({ left: oncLeft - 15 + 'px', top: oncTop + 'px' });
        } else if (hareketYonu === 40) { // Aşağı
            snakeEkle.css({ left: oncLeft + 'px', top: oncTop - 15 + 'px' });
        }

        $(".game_board").append(snakeEkle);
    }

    function snakeYem(element) {
        const snakeKonum = snake[0].getBoundingClientRect();
        const yemKonum = element[0].getBoundingClientRect();
        if (
            snakeKonum.x < yemKonum.x + yemKonum.width &&
            snakeKonum.x + snakeKonum.width > yemKonum.x &&
            snakeKonum.y < yemKonum.y + yemKonum.height &&
            snakeKonum.y + snakeKonum.height > yemKonum.y
        ) {
            rastgeleYem(element);
            skor++;
            $(".skor").text(skor);
            snakeEkle();
        }
    }

    function eksilme() {
        if (ctrlBasili) return; 
        var yilanlar1 = $(".snake");
        const bas = yilanlar1[0].getBoundingClientRect();
        yilanlar1.each(function (yilan, segment) {
            const diger = segment.getBoundingClientRect();
            if (yilan !== 0 && bas.x === diger.x && bas.y === diger.y) {
                var eksi = yilanlar1.length - yilan +1;
                skor = skor - eksi;
                $(".skor").text(skor);
                for (var i = 0; i < eksi; i++) {
                    $("#snake_").last().remove();
                }
            }
        });
    }

    function hareket() {
        var yilan = $(".snake");

        for (let i = yilan.length - 1; i > 0; i--) {
            $(yilan[i]).css({
                left: $(yilan[i - 1]).css('left'),
                top: $(yilan[i - 1]).css('top'),
            });
        }

        if (hareketYonu === 37) { // Sol
            $(yilan[0]).css({ left: "-=15px" });
        } else if (hareketYonu === 38) { // Yukarı
            $(yilan[0]).css({ top: "-=15px" });
        } else if (hareketYonu === 39) { // Sağ
            $(yilan[0]).css({ left: "+=15px" });
        } else if (hareketYonu === 40) { // Aşağı
            $(yilan[0]).css({ top: "+=15px" });
        }

        setTimeout(function () {
            requestAnimationFrame(hareket);
        }, 50);

        snakeYem(yem);
        eksilme();
        const { left, right, top, bottom, width, height } = $(".game_board")[0].getBoundingClientRect();
        const snake_s = $(yilan[0]);
        const snake_s_konum = snake_s[0].getBoundingClientRect();

        if (snake_s_konum.left < left) {
            snake_s.css({ left: width - snake_s_konum.width - 1 });
        } else if (snake_s_konum.right > right) {
            snake_s.css({ left: 0 });
        } else if (snake_s_konum.top < top) {
            snake_s.css({ top: height - snake_s_konum.height - 1 });
        } else if (snake_s_konum.bottom > bottom) {
            snake_s.css({ top: 0 });
        }
    }

    function hareketiBaslat() {
        if (hareketEdiyor) return;
        hareketEdiyor = true;
        hareket();
        yem.show();
        $(".text").hide();
        $("#gamePlaySelect").hide();
        $(".start").hide();
    }   
        
    document.addEventListener("keydown", function (e) {
        if (e.keyCode === 17) {
            ctrlBasili = true;
        }
        const tersYon = {
            37: 39,
            38: 40,
            39: 37,
            40: 38
        };

        if ([37, 38, 39, 40, 17].includes(e.keyCode)) {
            if (e.keyCode === 17) {
                hareketYonu = tersYon[hareketYonu];
            } else if (hareketYonu !== tersYon[e.keyCode]) {
                hareketYonu = e.keyCode;
                hareketiBaslat();
            }
        }
    });
    const touchPad = document.querySelector('.touch');

    let startX, startY;

    touchPad.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
        console.log(startX)
    });

    touchPad.addEventListener('touchend', (e) => {
        const endX = e.changedTouches[0].clientX;
        const endY = e.changedTouches[0].clientY;
        handleSwipe(startX, startY, endX, endY);
    });

    function handleSwipe(startX, startY, endX, endY) {
        const diffX = endX - startX;
        const diffY = endY - startY;

        if (Math.abs(diffX) > Math.abs(diffY)) {
            if (diffX > 0) {
                console.log('Right Swipe');
            } else {
                console.log('Left Swipe');
            }
        } else {
            if (diffY > 0) {
                console.log('Down Swipe');
            } else {
                console.log('Up Swipe');
            }
        }
    }
    document.addEventListener("keyup", function (e) {
        if (e.keyCode === 17) {
            ctrlBasili = false;
        }
    });

    $(".tuslar").click(function () {
        const tersYon = {
            37: 39,
            38: 40,
            39: 37,
            40: 38
        };
        if ([37, 38, 39, 40].includes(yon)) {
            if (hareketYonu !== tersYon[yon]) {
                hareketYonu = yon;
                hareketiBaslat();
            }
        }
    });
    $("#gamePlaySelect").on("change", function () {
    var t = $(this).val();
        if(t == 1){
            $(".tuslar").show();
            $(".text").text("Yön Tuşlarını Kullanarak Oynayabilirsiniz");
            $(".touchPad").hide();
        }else if(t == 2){
            $(".tuslar").hide();
            $(".touchPad").hide();
            $(".text").text("");
        }else if(t == 3){
            $(".tuslar").hide();
            $(".touchPad").show();
            $(".text").text("");
            $(".text").text("Altaki daireyi sağa, sola, yukarı ve aşağı hareket ettirerek oynayabilirsiniz, Mobil için daha uygundur.");
        }else if(t == 10){
            $(".tuslar").hide();
            $(".touchPad").hide();
            $(".text").text("");
        }
    })

    rastgeleYem(yem);
    $(".skor").text(skor);
});

function refresh() {
    window.location.reload();
}
