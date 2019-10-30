/*

	Template Name:
	Author:
	Author URI:
	Version: 1.0
   =====================
   table of content 
   ====================

   1.   menu toogle
   5.   slider
   10.  wow animated
   11.  back to top
*/


jQuery(function ($) {
    /**-------------------------------------------------
     *Fixed HEader
     *----------------------------------------------------**/
    $(window).on('scroll', function () {

        /**Fixed header**/
        if ($(window).scrollTop() > 250) {
            $('.header-top, .sticky-header').addClass('sticky fade_down_effect');
        } else {
            $('.header-top, .sticky-header').removeClass('sticky fade_down_effect');
        }
    });

    /* ---------------------------------------------
                      Menu Toggle
    ------------------------------------------------ */

    if ($(window).width() < 991) {
        $(".navbar-nav li a").on("click", function () {
            $(this).parent("li").find(".dropdown-menu").slideToggle();
            $(this).find("i").toggleClass("fa-angle-up fa-angle-down");
        });
    }
    /*==========================================================
             btn loadmore
     =========================================================*/

    $(".loadmore-show").slice(0, 6).show();
    $("#loadMore").on('click', function (e) {
        e.preventDefault();
        $(".loadmore-show:hidden").slice(0, 6).slideDown();
        if ($(".loadmore-show:hidden").length == 0) {
            $("#load").fadeOut('slow');
        }
    });


    /*==========================================================
           wow animated
     =========================================================*/
    var wow = new WOW({
        animateClass: 'animated',
        mobile: false
    });
    wow.init();


    /*==========================================================
          Client Sponcer Slider
   ============================================================*/

    $('#client-sliders').owlCarousel({
        items: 5,
        mouseDrag: true,
        touchDrag: true,
        dots: false,
        autoplayTimeout: 2000,
        animateOut: 'fadeOut',
        autoplayHoverPause: true,
        smartSpeed: 800,
        loop: true,
        margin: 15,
        nav: true,
        navText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 3
            },
            1000: {
                items: 4
            },
            1200: {
                items: 5
            }
        }
    });


    var sync1 = $("#sync1");
    var sync2 = $("#sync2");
    var slidesPerPage = 4; //globaly define number of elements per page
    var syncedSecondary = true;

    sync1.owlCarousel({
        items: 1,
        slideSpeed: 2000,
        nav: true,
        autoplay: false,
        dots: true,
        loop: true,
        responsiveRefreshRate: 200,
        navText: ['<i class="fa fa-angle-left" aria-hidden="true"></i>', '<i class="fa fa-angle-right" aria-hidden="true"></i>'],
    }).on('changed.owl.carousel', syncPosition);

    sync2
        .on('initialized.owl.carousel', function () {
            sync2.find(".owl-item").eq(0).addClass("current");
        })
        .owlCarousel({
            items: slidesPerPage,
            autoplay: false,
            dots: true,
            nav: false,
            smartSpeed: 200,
            slideSpeed: 500,
            margin: 10,
            slideBy: slidesPerPage,
            responsiveRefreshRate: 100
        }).on('changed.owl.carousel', syncPosition2);

    function syncPosition(el) {
        var count = el.item.count - 1;
        var current = Math.round(el.item.index - (el.item.count / 2) - .5);

        if (current < 0) {
            current = count;
        }
        if (current > count) {
            current = 0;
        }

        //end block

        sync2
            .find(".owl-item")
            .removeClass("current")
            .eq(current)
            .addClass("current");
        var onscreen = sync2.find('.owl-item.active').length - 1;
        var start = sync2.find('.owl-item.active').first().index();
        var end = sync2.find('.owl-item.active').last().index();

        if (current > end) {
            sync2.data('owl.carousel').to(current, 100, true);
        }
        if (current < start) {
            sync2.data('owl.carousel').to(current - onscreen, 100, true);
        }
    }

    function syncPosition2(el) {
        if (syncedSecondary) {
            var number = el.item.index;
            sync1.data('owl.carousel').to(number, 100, true);
        }
    }

    sync2.on("click", ".owl-item", function (e) {
        e.preventDefault();
        var number = $(this).index();
        sync1.data('owl.carousel').to(number, 300, true);
    });

    /* ----------------------------------------------------------- */
    /*  Back to top
    /* ----------------------------------------------------------- */
    $("body, html").on("click", ".BackTo", function (e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: 0
        }, 800);
    });


});



