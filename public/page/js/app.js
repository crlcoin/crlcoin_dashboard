/* Template Name: Ubold - Bootstrap 4 Landing Page Tamplat
   Author: CoderThemes
   File Description: Main JS file of the template
*/


! function($) {
    "use strict";

    var Ubold = function() {};

    Ubold.prototype.initStickyMenu = function() {
        $(window).scroll(function() {
            var scroll = $(window).scrollTop();
        
            if (scroll >= 50) {
                $(".sticky").addClass("nav-sticky");
            } else {
                $(".sticky").removeClass("nav-sticky");
            }
        });
    },

    Ubold.prototype.initSmoothLink = function() {
        $('.navbar-nav a').on('click', function(event) {
            var $anchor = $(this);
            $('html, body').stop().animate({
                scrollTop: $($anchor.attr('href')).offset().top - 50
            }, 1500, 'easeInOutExpo');
            event.preventDefault();
        });
    },

    Ubold.prototype.initScrollspy = function() {
        $("#navbarCollapse").scrollspy({
            offset: 50
        });
    },

    Ubold.prototype.initBacktoTop = function() {
        $(window).scroll(function(){
            if ($(this).scrollTop() > 100) {
                $('.back-to-top').fadeIn();
            } else {
                $('.back-to-top').fadeOut();
            }
        });
        $('.back-to-top').click(function(){
            $("html, body").animate({ scrollTop: 0 }, 1000);
            return false;
        });
    },

    Ubold.prototype.initLoginButton = function() {
        $('.login-button').click(function(){
            if (!!location) {
                location.href = `https://${location.host}/login`
            }
        })
    },

    Ubold.prototype.init = function() {
        this.initStickyMenu();
        this.initSmoothLink();
        this.initScrollspy();
        this.initBacktoTop();
        this.initLoginButton();
    },
    //init
    $.Ubold = new Ubold, $.Ubold.Constructor = Ubold
}(window.jQuery),

//initializing
function($) {
    "use strict";
    $.Ubold.init();
}(window.jQuery);