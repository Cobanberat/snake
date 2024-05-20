$(document).ready(function() {
    var beforeClick = null;
    (document).addEventListener("keydown", function (e) {
        if (e.key === "ArrowUp" && e.key !== beforeClick) {
            console.log("yukarı");
        } else if (e.key === "ArrowDown" && e.key !== beforeClick) {
            console.log("aşağı");
        } else if (e.key === "ArrowLeft" && e.key !== beforeClick) {
            console.log("sol");
        } else if (e.key === "ArrowRight" && e.key !== beforeClick) {
            console.log("sağ");
        }
    });
    

})