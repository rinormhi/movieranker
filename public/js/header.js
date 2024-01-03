$(document).ready(function () {
    $(window).scroll(function () {
        // Überprüfe, ob der Scroll-Wert größer als 100 Pixel ist
        if ($(this).scrollTop() >= 100) {
            // Füge die Klasse "shrink" hinzu, wenn Bedingung erfüllt ist
            $('header').addClass('shrink');
        } else if ($(this).scrollTop() <= 100) {
            // Entferne die Klasse "shrink", wenn Bedingung nicht erfüllt ist
            $('header').removeClass('shrink');
        }
    });
});