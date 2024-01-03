document.addEventListener('DOMContentLoaded', function () {
    const providerFilter = document.querySelector('.provider-filter');
    const arrowLeft = document.querySelector('.arrow-left');
    const arrowRight = document.querySelector('.arrow-right');
    const scrollAmount = 975;
    const scrollDuration = 600; // milliseconds

    arrowLeft.addEventListener('click', function () {
        smoothScroll(providerFilter, -scrollAmount, scrollDuration);
    });

    arrowRight.addEventListener('click', function () {
        smoothScroll(providerFilter, scrollAmount, scrollDuration);
    });

    function smoothScroll(element, amount, duration) {
        const start = element.scrollLeft;
        const startTime = performance.now();

        function step(time) {
            const progress = (time - startTime) / duration;
            element.scrollLeft = start + amount * easeInOutCubic(progress);

            if (progress < 1) {
                requestAnimationFrame(step);
            }
        }

        function easeInOutCubic(t) {
            return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
        }

        requestAnimationFrame(step);
    }
});

$(document).ready(() => {

    $(function () {
        $(document).tooltip();
    });

    $.notify.addStyle('foo', {
        html: "<div>" +
            "<div class='clearfix'>" +
            "<div class='title' data-notify-html='title'/>" +
            "<div class='buttons'>" +
            "<button class='no'>Cancel</button>" +
            "<button class='yes' data-notify-text='button'></button>" +
            "</div>" +
            "</div>" +
            "</div>"
    });
    $(".like-btn").on("click", () => {
        $.notify('Added to likes', {
            showDuration: 400,
            position: "bottom center",
            className: "foo"
        });
    })
})