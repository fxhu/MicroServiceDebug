var QuickNav = function () {

    return {
        init: function () {
            if ($('.quick-nav').length > 0) {
                var stretchyNavs = $('.quick-nav');
                stretchyNavs.each(function () {
                    var stretchyNav = $(this),
                        stretchyNavTrigger = stretchyNav.find('.ng-scope');

                    stretchyNavTrigger.on('click', function (event) {
                        event.preventDefault();
                        stretchyNav.toggleClass('nav-is-visible');
                    });
                });

                $(".quick-nav-trigger").on("click", function (event) {
                    event.preventDefault();
                    stretchyNavs.toggleClass('nav-is-visible');
                });
                
            }
        },
        show: function () {
            var stretchyNavs = $('.quick-nav');
            stretchyNavs.addClass('nav-is-visible');
        }
    };
}();

QuickNav.init(); // init metronic core componets
QuickNav.show();