$(document).ready(() => {
    $(".hamburger-icon").click(() => {
        if (!$(".mobile-nav").hasClass("visible")) {
            $(".mobile-nav").addClass("visible");
        } else {
            $(".mobile-nav").removeClass("visible");
        }
    })
})