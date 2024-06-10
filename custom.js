$(document).ready(function () {
    var hareketYonu = null;
    var hareketEdiyor = false;
    var snake = $(".snake");
    var yem = $(".yem");
    var yon = null;
    var skor = 0;
    var ctrlBasili = false;

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
                var eksi = yilanlar1.length - yilan;
                for (var i = 0; i < eksi; i++) {
                    $(".snake").last().remove();
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

    rastgeleYem(yem);
    $(".skor").text(skor);
});

function refresh() {
    window.location.reload();
}