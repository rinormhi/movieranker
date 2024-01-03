$(document).ready(() => {
    $(".read-more").on("click", () => {
        $(".bio").addClass("show-more");
        $(".read-more").css("display", "none")
    })
})