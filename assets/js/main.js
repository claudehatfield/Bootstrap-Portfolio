/*-----------------------------------------------------------------------

  * Factor Template v1.0 
  * Copyright 2019 The Factor Author (https://themeforest.net/user/gianfar)

  =======================================================================*/

"use strict";
$(document).ready(function() {
    /*preloader*/
    $('.preload').delay(1000).fadeOut('slow');

/* background change*/
    var atrBg = $('body').attr('data-bg');
    switch (atrBg) {
        case "cartografer":
            $("body").addClass("cartografer");
            break;
        case "dark-wood":
            $("body").addClass("dark-wood");
            break;
        case "swirl-pt":
            $("body").addClass("swirl-pt");
            break;
        case "table-wood":
            $("body").addClass("table-wood");
            break;
        case "vintage-concrete":
            $("body").addClass("vintage-concrete");
            break;
        case "white-waves":
            $("body").addClass("white-waves");
            break;
    }

    /*mobile menu*/
    $('#icon-burger-menu').on('click', function() {
        $(this).toggleClass('open');
        $('.nav-bar').toggleClass('show-menu');

    });
    $('.navbar-button').on('click', function() {
        $('#icon-burger-menu').removeClass('open');
        $('.nav-bar').removeClass('show-menu');
    });

    $(window).on("scroll", function() {
        $('#icon-burger-menu').removeClass('open');
        $('.nav-bar').removeClass('show-menu');

    });

    var width = $(window).width();
    $('.wrap-menu').css({ "width": width, "position": "fixed" });
    $('html').css("width", width);

    $(window).on("resize", function() {
        var width = $(window).width();
        $('.wrap-menu').css({ "width": width, "position": "fixed" });
        $('html').css("width", width);
    });

   

    //skillbar
    function skillBar() {
        $('.skillbar').each(function() {
            $(this).find('.skillbar-bar').animate({
                width: $(this).attr('data-percent')
            }, 2000);
        });
    }


    function skiillBar() {
        $("#skills").waypoint(function() {
            skillBar();
        }, { offset: '100%' });
    }
    setTimeout(skiillBar, 1000);


    /* ==== Parallax Background ======*/
    $('.parallax-window').parallax({
        imageSrc: "assets/img/header-img/1.png",

    });
    /* -------------------------------- */

    // works page
    var $imageLink = $('.image-link-works');
    $imageLink.magnificPopup({
        type: 'image',
        // fixedContentPos: false,
        // Delay in milliseconds before popup is removed
        removalDelay: 300,

        // Class that is added to popup wrapper and background
        // make it unique to apply your CSS animations just to this exact popup
        mainClass: 'mfp-fade',
        gallery: {
            enabled: true, // set to true to enable gallery

            preload: [0, 2], // read about this option in next Lazy-loading section

            navigateByImgClick: true,

            arrowMarkup: '<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>', // markup of an arrow button

            tPrev: 'Previous (Left arrow key)', // title for left button
            tNext: 'Next (Right arrow key)', // title for right button
            tCounter: '<span class="mfp-counter">%curr% of %total%</span>' // markup of counter
        },
        callbacks: {
            open: function() {
                $('body').css('overflow', 'visible');
                // Will fire when this exact popup is opened
                // this - is Magnific Popup object
            },
            close: function() {
                $('body').css('overflow-x', 'hidden');
                // Will fire when popup is closed
            }
            // e.t.c.
        }

    });
    // --- initialize shuffle plugin ------
    var $grid = $('#grid'),
        filter = $('#filter a');

    // reshuffle when user clicks a filter item 
    filter.on('click', function(e) {

        e.preventDefault();
        // set active class
        filter.removeClass('active-filter');
        $(this).addClass('active-filter');
        // get group name from clicked item
        var groupName = $(this).attr('data-group');
        // reshuffle grid
        $grid.shuffle('shuffle', groupName);

    });

    $grid.imagesLoaded(function() {
        // images have loaded
        $grid.shuffle({
            itemSelector: '.item'
        });
    });
    // * owlCarousel *
    function owlCarousel() {
        $(".clients-slide").owlCarousel({
            center: true,
            loop: true,
            autoplay: true,
            autoWidth: true,
            responsiveClass: true,
            margin: 30,
        });
    }
    owlCarousel();

    // random function
    var pageLink = window.location.hash;
    var $navbarButton = $('.navbar-button');
    var $firstEl = $('.navbar-button:first-child');
    var menuActive = 'menu-active';
    var _page = ' page';

    $(pageLink).addClass('page');

    var arrEffect = ["rotateInUpRight", "fadeInRight", "fadeInUp", "rotateInUpLeft"];

    function animeEl() {
        $('.page-sctn').removeClass('rotateInUpRight fadeInRight fadeInUp rotateInUpLeft page');
    }

    function trPage() {
        var randEffect = Math.floor(Math.random() * arrEffect.length);
        var effect = arrEffect[randEffect];
        return effect;
    }
    trPage();

    // trasition page
    $navbarButton.on('click', function(event) {
        scrollTop();
        event.preventDefault();
        animeEl();
        var pageName = $(this).attr('href');
        $(pageName).addClass(trPage() + _page);
        window.history.pushState({}, pageName, pageName);
        $navbarButton.removeClass(menuActive);
        $(this).addClass(menuActive);
        if (pageName == '#portfolio') {
            $('a[data-group="all"]').trigger('click');
            $grid.shuffle('update');
        }

    });


    // Popstate Event
    addEventListener("popstate", function(e) {
        scrollTop();
        var section = window.location.hash;
        if (section == section) {
            animeEl();
            $(section).addClass(trPage() + _page);
        }
        if (section == "") {
            $('#about').addClass(trPage() + _page);
        }
        if (section) {
            $navbarButton.removeClass(menuActive);
            $('a[href="' + section + '"]').addClass(menuActive);
        }
        if (section == "") {
            $navbarButton.removeClass(menuActive);
            $firstEl.addClass(menuActive);
        }
        if (section == '#portfolio') {
            $('a[data-group="all"]').trigger('click');
            $grid.shuffle('update');
        }
    });



    //initial page load function(adding animations)
    function activeElement() {
        var location = window.location;
        var activePage = window.location.hash;
        if (activePage) {
            $navbarButton.removeClass(menuActive);
            $('a[href="' + activePage + '"]').addClass(menuActive);
        }
        if (window.location.hash == "") {
            $("#about").addClass('page');
            $('a[href="#about"]').addClass(menuActive);
            window.history.pushState({}, "#about", "#about");
        }
    }
    activeElement();
    // scroll top function
    function scrollTop() {
        $(window).scrollTop(0);

    }
    scrollTop();
    //scrolling to the top when loading the page
    $(window).on('load', function() {
        scrollTop();
    });

});