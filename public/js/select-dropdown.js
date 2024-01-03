$(document).ready(() => {

    $(".genre-filter").click(function () {
        if ($(".genre").hasClass("active")) {
            $(".genre").removeClass("active");
        } else {
            $(".genre").addClass("active");
        }

    })

    $(".sortby-current-option").click(function () {
        if ($(".sortby-options").hasClass("active")) {
            $(".sortby-options").removeClass("active");
        } else {
            $(".sortby-options").addClass("active");
        }
    })
})