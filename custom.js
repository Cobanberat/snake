$(document).ready(function () {
    var hareketYonu = null;
    hareketEdiyor = false;
    const snake = $(".snake");
    var yem = $(".yem");
    var yon = null;
    game_over_duvar = null;
    skor = 0;

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
        var snakeAdd = "<div class='snake' id='snake_'></div>"
        $(".game_board").append(snakeAdd);
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

    function hareket() {
      
   

        if (hareketYonu === 37) { // Sol
            snake.css({ left: "-=15px" });
        } else if (hareketYonu === 38) { // Yukarı
            snake.css({ top: "-=15px" });
        } else if (hareketYonu === 39) { // Sağ
            snake.css({ left: "+=15px" });
        } else if (hareketYonu === 40) { // Aşağı
            snake.css({ top: "+=15px" });
        }

        setTimeout(function () {
            requestAnimationFrame(hareket);
        }, 50);

        snakeYem(yem);
        const { left, right, top, bottom, width, height } = $(".game_board")[0].getBoundingClientRect();
        const yilanlar = $(".snake");
        const snake_s = $(yilanlar[0]);
        const snake_s_konum = snake_s[0].getBoundingClientRect();


        document.addEventListener("keydown", function(ve){
      
            if (ve.keyCode === 17) {
                switch (hareketYonu) {
                    case 37: 
                        hareketYonu = 39; 
                        break;
                    case 38: 
                        hareketYonu = 40;
                        break;
                    case 39: 
                        hareketYonu = 37; 
                        break;
                    case 40:
                        hareketYonu = 38; 
                        break;
                }
            }else{

            
            const yilanlar1 = $(".snake");
            const [yilanBas, ...yilanDiger] = yilanlar1;
            const bas = yilanBas.getBoundingClientRect();

            yilanDiger.forEach((yilanDiger, carpılan_yer) => {
                const diger = yilanDiger.getBoundingClientRect();
                if (bas.x === diger.x && bas.y === diger.y) {
                   var eksi = yilanlar1.length - carpılan_yer-1;
                   for(i=0; i <= eksi; i++){
                    $(`#snake_`).remove();
                   }
                    
                }
            });
        }


    });
 
        if (snake_s_konum.left < left) {
            snake_s.css({ left: width - snake_s_konum.width - 1 });
        } else if (snake_s_konum.right > right) {
            snake_s.css({ left: 0 });
        } else if (snake_s_konum.top < top) {
            snake_s.css({ top: height - snake_s_konum.height - 1 });
        } else if (snake_s_konum.bottom > bottom) {
            snake_s.css({ top: 0 });
        }

        for (let i = yilanlar.length - 1; i > 0; i--) {
            $(yilanlar[i]).css({
                left: $(yilanlar[i - 1]).css('left'),
                top: $(yilanlar[i - 1]).css('top'),
                bottom: $(yilanlar[i - 1]).css('bottom'),
                right: $(yilanlar[i - 1]).css('right')
            });
        }


    }

    function hareketiBaslat() {
        if (hareketEdiyor) return;
        hareketEdiyor = true;
        hareket();
        yem.show();
    }


    document.addEventListener("keydown", function (e) {
        const tersYon = {
            37: 39,
            38: 40,
            39: 37,
            40: 38
        };

        if ([37, 38, 39, 40].includes(e.keyCode)) {
            if (hareketYonu !== tersYon[e.keyCode]) {
                hareketYonu = e.keyCode;
                hareketiBaslat();
                

            }
        }
    });

    $(".tuslar").click(function(){
        const tersYon = {
            37: 39,
            38: 40,
            39: 37,
            40: 38
        };
        console.log(yon);
        if ([37, 38, 39, 40].includes(yon)) {
            if (hareketYonu !== tersYon[yon]) {
                hareketYonu = yon;
                hareketiBaslat();

            }
        }
    })


});

function refresh() {
    window.location.reload();
}

