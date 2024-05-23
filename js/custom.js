$(document).ready(function () {
    var hareketAraligi = null;
    var hareketYonu = null;
    var skor = 0;
    var hiz = 80;
    var function_hiz = 100;
    $(".game_over").hide();
    $(".refresh_button").hide();

    function rastgeleKonumBelirle(element) {
        const gameBoard = $(".game_board")[0].getBoundingClientRect();

        const maxX = Math.floor((gameBoard.width - element.width()) / 15);
        const maxY = Math.floor((gameBoard.height - element.height()) / 15);
        const x = Math.floor(Math.random() * (maxX + 1)) * 15;
        const y = Math.floor(Math.random() * (maxY + 1)) * 15;
        element.css({ left: x + 'px', top: y + 'px' });
    }

    function hareketiBaslat(yon) {
        if (hareketAraligi) {
            clearInterval(hareketAraligi);
        }
        hareketAraligi = setInterval(function () {
            $(".start").hide();
            const snake = $(".snake");
            const snakeLocation = snake[0].getBoundingClientRect();
            const gameBoard = $(".game_board")[0].getBoundingClientRect();

            const yem = $(".yem");
            const yemLocation = yem[0].getBoundingClientRect();

            const solDuvar = gameBoard.x;
            const sagDuvar = gameBoard.x + gameBoard.width;
            const ustDuvar = gameBoard.y;
            const altDuvar = gameBoard.y + gameBoard.height;

            if (
                snakeLocation.x <= solDuvar ||
                snakeLocation.y <= ustDuvar ||
                snakeLocation.x + snakeLocation.width >= sagDuvar ||
                snakeLocation.y + snakeLocation.height >= altDuvar
            ) {
                $(".game_over").show();
                $(".refresh_button").show();
                $(".yem").hide();
                $(".start").hide();
                clearInterval(hareketAraligi);
            } else {
                if (yon === 37) { // Sol
                    snake.animate({ left: "-=15px" }, hiz);
                } else if (yon === 38) { // Yukarı
                    snake.animate({ top: "-=15px" }, hiz);
                } else if (yon === 39) { // Sağ
                    snake.animate({ left: "+=15px" }, hiz);
                } else if (yon === 40) { // Aşağı
                    snake.animate({ top: "+=15px" }, hiz);
                }
            }

            if (
                snakeLocation.x < yemLocation.x + yemLocation.width &&
                snakeLocation.x + snakeLocation.width > yemLocation.x &&
                snakeLocation.y < yemLocation.y + yemLocation.height &&
                snakeLocation.y + snakeLocation.height > yemLocation.y
            ) {
                rastgeleKonumBelirle(yem);
                skor = skor + 1;
                $(".skor").text(skor);  
                if(skor == 2 || skor == 7 || skor == 10 || skor == 20 || skor == 30){
                    hiz = hiz - 15;
                    function_hiz = function_hiz - 15;
                }
            }

            hareketYonu = yon;
        }, function_hiz);
    }

    document.addEventListener("keydown", function (e) {
        const tersYonuKontrol = {
            37: 39, // Sol -> Sağ
            38: 40, // Yukarı -> Aşağı
            39: 37, // Sağ -> Sol
            40: 38  // Aşağı -> Yukarı
        };
        if ([37, 38, 39, 40].includes(e.keyCode) && tersYonuKontrol[hareketYonu] !== e.keyCode) {
            hareketiBaslat(e.keyCode);
        }
    });

    rastgeleKonumBelirle($(".yem")); 
    $(".skor").text(skor); 



});

function refresh() {
    window.location.reload();
}
    