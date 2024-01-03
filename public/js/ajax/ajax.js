$(document).ready(() => {

    let providers = [];
    let genres = [];
    let pages = [1, 2, 3]
    let year;
    let sortby;

    let minYear = 1990;
    let maxYear = 2023


    let comb;
    let everyProviderActive = areAllProvidersActive();
    let isOnlyOneProviderActive = onlyOneProviderActive();

    let isEveryGenreActive = areAllGenresActive();
    let isOnlyOneGenreActive = onlyOneGenreActive();


    comb = "Providers: " + providers + "<br>Genres: " + genres + "<br>Sort by: " + sortby + "<br>Year: " + minYear + " - " + maxYear;
    $(".current-values").html(comb);

    // Year 

    $("#min-year").change(function () {
        console.log("############ MIN YEAR CHANGED ############");
        minYear = $(this).val();
        ajaxYear(minYear, maxYear)
        comb = "Providers: " + providers + "<br>Genres: " + genres + "<br>Sort by: " + sortby + "<br>Year: " + minYear + " - " + maxYear;
        $(".current-values").html(comb);
    })

    $("#max-year").change(function () {
        console.log("############ MAX YEAR CHANGED ############");
        maxYear = $(this).val();
        ajaxYear(minYear, maxYear)
        comb = "Providers: " + providers + "<br>Genres: " + genres + "<br>Sort by: " + sortby + "<br>Year: " + minYear + " - " + maxYear;
        $(".current-values").html(comb);
    })


    // Genre Selection

    $(".genre-option").click(function () {

        console.log("############ KLICK ############");

        let isActive = $(this).hasClass('active');

        let genre = $(this).data('genreid'); // Works!

        if (isActive) {
            if (isEveryGenreActive && !isOnlyOneGenreActive) {
                $(this).removeClass('active');
                $(this).addClass('active');

                genres.push(genre);
                ajaxGenres(genres)

            } else if (!isEveryGenreActive && !isOnlyOneGenreActive) {
                $(this).removeClass('active');

                let index = genres.indexOf(genre);
                if (index > -1) {
                    genres.splice(index, 1)
                }

                ajaxGenres(genres)

            } else if (!isEveryGenreActive && isOnlyOneGenreActive) {
                $(this).removeClass('active');

                let index = genres.indexOf(genre);
                if (index > -1) {
                    genres.splice(index, 1)
                }

                ajaxGenres(genres)

            }
        }

        if (!isActive) {
            if (!isEveryGenreActive && !isOnlyOneGenreActive) {
                $(this).addClass('active');
                console.log("FFF works");

                genres.push(genre);
                ajaxGenres(genres)


            } else if (!isEveryGenreActive && isOnlyOneGenreActive) {
                $(this).addClass('active');
                console.log("FFT works");

                genres.push(genre);
                ajaxGenres(genres)

            }
        }
        isOnlyOneGenreActive = onlyOneGenreActive();
        isEveryGenreActive = areAllGenresActive();
        isActive = $(this).hasClass('active');


        comb = "Providers: " + providers + "<br>Genres: " + genres + "<br>Sort by: " + sortby + "<br>Year: " + minYear + " - " + maxYear;
        $(".current-values").html(comb)

        console.log("isActive: ", isActive);
        console.log("isEveryGenreActive: ", isEveryGenreActive);
        console.log("isOnlyOneGenreActive: ", isOnlyOneGenreActive);
        console.log("Genres: ", genres);
    })

    $('.sortby-option').click(function () {
        sortby = $(this).data("sortby");

        $(".sortby-current-option").html(sortby)

        $.ajax({
            type: "GET",
            url: "/filter-movies",
            data: {
                currentUrl: window.location.href,
                providers: providers,
                sortby: sortby,
                genres: genres
            },
            success: (response) => {
                $(".movie-grid").html(response);
            },
            error: (error) => {
                console.error("Error: " + error);
            }
        })
        comb = "Providers: " + providers + "<br>Genres: " + genres + "<br>Sort by: " + sortby + "<br>Year: " + minYear + " - " + maxYear;
        $(".current-values").html(comb)
    });

    $('.providerBtn').click(function () {

        console.log("############ KLICK ############");

        let provider = $(this).data('providerid'); //
        let isActive = $(this).hasClass('active');

        if (isActive) {
            if (everyProviderActive && !isOnlyOneProviderActive) {
                $('.provider-img').removeClass('active');
                $(this).addClass('active');
                providers.push(provider);
                ajaxProviders(providers)

            } else if (!everyProviderActive && !isOnlyOneProviderActive) {
                $(this).removeClass('active');
                let index = providers.indexOf(provider);
                if (index > -1) {
                    providers.splice(index, 1)
                }
                ajaxProviders(providers)

            } else if (!everyProviderActive && isOnlyOneProviderActive) {
                $('.provider-img').addClass('active');
                let index = providers.indexOf(provider);
                if (index > -1) {
                    providers.splice(index, 1)
                }
                ajaxProviders(providers)
            }
        }

        if (!isActive) {
            if (!everyProviderActive && !isOnlyOneProviderActive) {
                $(this).addClass('active');
                providers.push(provider);
                ajaxProviders(providers)
            } else if (!everyProviderActive && isOnlyOneProviderActive) {
                $(this).addClass('active');
                providers.push(provider);
                ajaxProviders(providers)
            }
        }

        isOnlyOneProviderActive = onlyOneProviderActive();
        everyProviderActive = areAllProvidersActive();
        isActive = $(this).hasClass('active');

        comb = "Providers: " + providers + "<br>Genres: " + genres + "<br>Sort by: " + sortby + "<br>Year: " + minYear + " - " + maxYear;
        $(".current-values").html(comb)
    });

    // ############################ FUNCTIONS ###############################

    function ajaxProviders(providers) {
        $.ajax({
            type: "GET",
            url: "/filter-movies",
            data: {
                currentUrl: window.location.href,
                providers: providers,
                genres: genres,
                minYear: minYear,
                maxYear: maxYear
            },
            success: (response) => {
                $(".movie-grid").html(response);
            },
            error: (error) => {
                console.error("Error: " + error);
            }
        })
    }

    function ajaxGenres(genres) {
        $.ajax({
            type: "GET",
            url: "/filter-movies",
            data: {
                currentUrl: window.location.href,
                providers: providers,
                genres: genres,
                minYear: minYear,
                maxYear: maxYear
            },
            success: (response) => {
                $(".movie-grid").html(response);
            },
            error: (error) => {
                console.error("Error: " + error);
            }
        })
    }

    function ajaxYear(minYear, maxYear) {
        $.ajax({
            type: "GET",
            url: "/filter-movies",
            data: {
                currentUrl: window.location.href,
                providers: providers,
                genres: genres,
                minYear: minYear,
                maxYear: maxYear
            },
            success: (response) => {
                $(".movie-grid").html(response);
            },
            error: (error) => {
                console.error("Error: " + error);
            }
        })
    }

    function onlyOneProviderActive() {
        let providerFilter = document.querySelector('.provider-filter');
        let children = providerFilter.querySelectorAll('.provider-img');
        let count = 0;

        for (let i = 0; i < children.length; i++) {
            if (children[i].classList.contains("active")) {
                count++;
            }
        }
        if (count == 1) {
            return true;
        } else {

            return false;
        }
    }

    function onlyOneGenreActive() {
        let genreFilter = document.querySelector('.genre-options');
        let children = genreFilter.querySelectorAll('.genre-option');
        let count = 0;

        for (let i = 0; i < children.length; i++) {
            if (children[i].classList.contains("active")) {
                count++;
            }
        }
        if (count == 1) {
            return true;
        } else {
            return false;
        }
    }

    function areAllProvidersActive() {
        let providerFilter = document.querySelector('.provider-filter');
        let children = providerFilter.querySelectorAll('.provider-img');
        let count = 0;

        for (let i = 0; i < children.length; i++) {
            if (children[i].classList.contains("active")) {
                count++;
            }
        }
        if (children.length == count) {
            return true;
        } else {
            return false;
        }
    }

    function areAllGenresActive() {
        let genreFilter = document.querySelector('.genre-options');
        let children = genreFilter.querySelectorAll('.genre-option');
        let count = 0;

        for (let i = 0; i < children.length; i++) {
            if (children[i].classList.contains("active")) {
                count++;
            }
        }
        if (children.length == count) {
            return true;
        } else {
            return false;
        }
    }

    $("#load-more").click(function () {

        // sortby = $(".sortby-current-option").data("sortby");
        sortby = "popularity.asc"
        for (let i = 0; i < pages.length; i++) {
            pages[i] += 3;
            console.log(pages[i]);
        }
        $.ajax({
            type: "GET",
            url: "/load-more-movies",
            data: {
                sortby: sortby,
                providers: providers,
                pages: pages,
                currentUrl: window.location.href,
                providers: providers,
                genres: genres,
                minYear: minYear,
                maxYear: maxYear
            },
            success: (response) => {
                $(".movie-grid").append(response);
            },
            error: (error) => {
                console.error("error", error);
            }
        })
    })

})