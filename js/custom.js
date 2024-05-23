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

    function hareketiBaslat() {
        if (hareketEdiyor) return;
        hareketEdiyor = true;

        function hareket() {
            if (!hareketYonu) {
                hareketEdiyor = false;
                return;
            }

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
                hareketEdiyor = false;
                return;
            } else {
                if (hareketYonu === 37) { // Sol
                    snake.animate({ left: "-=15px" }, hiz);
                } else if (hareketYonu === 38) { // Yukarı
                    snake.animate({ top: "-=15px" }, hiz);
                } else if (hareketYonu === 39) { // Sağ
                    snake.animate({ left: "+=15px" }, hiz);
                } else if (hareketYonu === 40) { // Aşağı
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
                skor++;
                $(".skor").text(skor);  
                if ([2, 7, 10, 20, 30].includes(skor)) {
                    hiz = Math.max(10, hiz - 15);
                    function_hiz = Math.max(10, function_hiz - 15);
                }
            }

            setTimeout(function() {
                requestAnimationFrame(hareket);
            }, function_hiz);
        }

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
