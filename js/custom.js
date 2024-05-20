$(document).ready(function () {
    var hareketAraligi = null;
    var hareketYonu = null;
  
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
  
        console.log(hareketYonu, yon);
          
        
         if (
          snakeLocation?.x <= solDuvar ||
          snakeLocation?.y <= ustDuvar ||
          snakeLocation?.x + snakeLocation?.width >= sagDuvar ||
          snakeLocation?.y + snakeLocation?.height >= altDuvar
        ) {
          clearInterval(hareketAraligi);
        } else if (yon === "ArrowLeft") {
          $(".snake").animate({ left: "-=50px" }, 200);
        } else if (yon === "ArrowUp") {
          $(".snake").animate({ top: "-=50px" }, 200);
        } else if (yon === "ArrowRight") {
          $(".snake").animate({ left: "+=50px" }, 200);
        } else if (yon === "ArrowDown") {
          $(".snake").animate({ top: "+=50px" }, 200);
        }
        hareketYonu = yon;
      }, 300);
    }
  
    document.addEventListener("keydown", function (e) {
      if (["ArrowLeft", "ArrowUp", "ArrowRight", "ArrowDown"].includes(e.key) && hareketYonu !== e.key) {
        hareketiBaslat(e.key);
      }
    });
  });
  