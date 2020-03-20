$(function() {

    $(".mobile-cta").click( function () {
        //cache le bouton qui permet d'ouvrir
        $('.mobile-cta').css("display", "none");
        if ($(".left--transition")) {
            $(".left").removeClass("left--transition");
        }
        //Ouvre le menu avec son animation
        $(".left").addClass("left--mobile--open");
        //Affiche le bouton qui permet de fermer le menu
        $(".mobile").addClass("mobile--open");
        $(".bg-menu-mobile").addClass("bg-menu-mobile--open");
    });

    $(".mobile").on('click', function () {
        $(".left").removeClass("left--mobile--open");
        $(".left").addClass("left--transition");
        $(".mobile").removeClass("mobile--open");
        $('.mobile-cta').delay(1500).css("display", "block");
        $(".bg-menu-mobile").removeClass("bg-menu-mobile--open");
    })




});
