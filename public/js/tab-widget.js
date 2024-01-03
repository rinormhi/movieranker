$(document).ready(function () {

    $(".crew-tab").on("click", () => {
        $(".cast-tab-content").removeClass("visible").addClass("hidden");
        $(".genres-tab-content").removeClass("visible").addClass("hidden");
        $(".details-tab-content").removeClass("visible").addClass("hidden");

        $(".crew-tab-content").addClass("visible").removeClass("hidden");

        $(".cast-tab").removeClass("active");
        $(".genres-tab").removeClass("active");
        $(".details-tab").removeClass("active");

        $(".crew-tab").addClass("active");

    })

    $(".cast-tab").on("click", () => {
        $(".crew-tab-content").removeClass("visible").addClass("hidden");
        $(".genres-tab-content").removeClass("visible").addClass("hidden");
        $(".details-tab-content").removeClass("visible").addClass("hidden");
        $(".reviews-tab-content").removeClass("visible").addClass("hidden");

        $(".cast-tab-content").addClass("visible").removeClass("hidden");

        $(".crew-tab").removeClass("active");
        $(".genres-tab").removeClass("active");
        $(".details-tab").removeClass("active");
        $(".reviews-tab").removeClass("active");

        $(".cast-tab").addClass("active");

    })

    $(".details-tab").on("click", () => {
        $(".cast-tab-content").removeClass("visible").addClass("hidden");
        $(".genres-tab-content").removeClass("visible").addClass("hidden");
        $(".crew-tab-content").removeClass("visible").addClass("hidden");
        $(".reviews-tab-content").removeClass("visible").addClass("hidden");

        $(".details-tab-content").addClass("visible").removeClass("hidden");

        $(".cast-tab").removeClass("active");
        $(".genres-tab").removeClass("active");
        $(".crew-tab").removeClass("active");
        $(".reviews-tab").removeClass("active");

        $(".details-tab").addClass("active");

    })

    $(".genres-tab").on("click", () => {
        $(".cast-tab-content").removeClass("visible").addClass("hidden");
        $(".crew-tab-content").removeClass("visible").addClass("hidden");
        $(".details-tab-content").removeClass("visible").addClass("hidden");
        $(".reviews-tab-content").removeClass("visible").addClass("hidden");

        $(".genres-tab-content").addClass("visible").removeClass("hidden");

        $(".cast-tab").removeClass("active");
        $(".crew-tab").removeClass("active");
        $(".details-tab").removeClass("active");
        $(".reviews-tab").removeClass("active");

        $(".genres-tab").addClass("active");
    })

    $(".reviews-tab").on("click", () => {
        $(".cast-tab-content").removeClass("visible").addClass("hidden");
        $(".genres-tab-content").removeClass("visible").addClass("hidden");
        $(".details-tab-content").removeClass("visible").addClass("hidden");
        $(".crew-tab-content").removeClass("visible").addClass("hidden");

        $(".reviews-tab-content").addClass("visible").removeClass("hidden");

        $(".cast-tab").removeClass("active");
        $(".genres-tab").removeClass("active");
        $(".details-tab").removeClass("active");
        $(".crew-tab").removeClass("active");

        $(".reviews-tab").addClass("active");

    })
})