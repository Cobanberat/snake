$(document).ready(function () {
    var hareketYonu = null;
    hareketEdiyor = false;  
    var snake = $(".snake");
    var yem = $(".yem");
    skor = 0;

    function rastgeleYem(element) {
        const game_board_konum = $(".game_board")[0].getBoundingClientRect();
        const board = game_board_konum;
        const x = Math.floor( (board.width - element.width()) / 15);
        const y = Math.floor( ( board.height - element.height()) /15);
        const rondomX = Math.floor((Math.random() * (x + 1) )) * 15;
        const rondomY = Math.floor((Math.random() * (y + 1) )) * 15;
        element.css({ left: rondomX + 'px', top: rondomY + 'px' });

    }
    function snakeYem(element) {
        const snakeKonum = snake[0].getBoundingClientRect();
        const yemKonum = element[0].getBoundingClientRect();
        if(
            snakeKonum.x == yemKonum.x &&
             snakeKonum.y == yemKonum.y &&
            snakeKonum.width == yemKonum.width &&
             snakeKonum.height == yemKonum.height
        ){
            rastgeleYem(element);
            skor++;
            $(".skor").text(skor);
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
            setTimeout(function() {
                requestAnimationFrame(hareket);
            }, 50);

            snakeYem(yem);

    }  

    function hareketiBaslat() {
        if (hareketEdiyor) return;
        hareketEdiyor = true;  
        hareket();
        yem.show();  
        rastgeleYem(yem);          
    }


    document.addEventListener("keydown", function (e) {

        if ([37, 38, 39, 40].includes(e.keyCode)) {
            hareketYonu = e.keyCode;
            hareketiBaslat();
        }
    });
});