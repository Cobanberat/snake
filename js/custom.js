$(document).ready(function() {
    var beforeClick = null;
    var sol = null; // Sol ok tuşu değeri için bir değişken tanımlıyoruz

    document.addEventListener("keydown", function(e) {
        if (e.key === "ArrowLeft") { 
            $( ".snake" ).animate({ "left": "-=50px" }, "slow" );
        }
        if (e.key === "ArrowUp") { 
            $( ".snake" ).animate({ "top": "-=50px" }, "slow" );
        }
        if (e.key === "ArrowRight") { 
            $( ".snake" ).animate({ "left": "+=50px" }, "slow" );
        }
        if (e.key === "ArrowDown") { 
            $( ".snake" ).animate({ "top": "+=50px" }, "slow" );
        }
    });
});