$(document).ready(function () {
    var hareketAraligi = null;
    var hareketYonu = null;
    $(".game_over").hide();
    $(".refresh_button").hide();

    function hareketiBaslat(yon) {
        if (hareketAraligi) {
            clearInterval(hareketAraligi);
        }
        hareketAraligi = setInterval(function () {
            const snakeLocation = $(".snake")?.[0]?.getBoundingClientRect();
            const boxLocation = $(".game_board")?.[0]?.getBoundingClientRect();
            const solDuvar = boxLocation?.x;
            const sagDuvar = boxLocation?.x + boxLocation?.width;
            const ustDuvar = boxLocation?.y;
            const altDuvar = boxLocation?.y + boxLocation?.height;
            if (
                snakeLocation?.x <= solDuvar ||
                snakeLocation?.y <= ustDuvar ||
                snakeLocation?.x + snakeLocation?.width >= sagDuvar ||
                snakeLocation?.y + snakeLocation?.height >= altDuvar
            ) {
                $(".game_over").show();
                $(".refresh_button").show();
                clearInterval(hareketAraligi);
            } else {
                if (yon === 37) { // Sol
                    $(".snake").animate({ left: "-=30px" }, 100);
                } else if (yon === 38) { // Yukarı
                    $(".snake").animate({ top: "-=30px" }, 100);
                } else if (yon === 39) { // Sağ
                    $(".snake").animate({ left: "+=30px" }, 100);
                } else if (yon === 40) { // Aşağı
                    $(".snake").animate({ top: "+=30px" }, 100);
                }
            }
            hareketYonu = yon;
        }, 140);
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
});

function refresh() {
    window.location.reload();
}
