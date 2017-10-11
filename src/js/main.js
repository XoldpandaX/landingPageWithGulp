$(document).ready(function() { // переключение и плавный переход ко вкладкам
    var
        linkBtn     = $('.link-btn'),
        fullMode    = $('#fullFeatureMode'),
        easyMode    = $('#easyMode'),
        splitBtnOne = $('.split-btn__part-one'),
        splitBtnTwo = $('.split-btn__part-two');

    linkBtn.on('click', function(e) {
        e.preventDefault();

        if (splitBtnOne.hasClass('split-btn_active') ) {
            changeBlockVisibility(fullMode, easyMode);

            splitBtnOne.removeClass('split-btn_active');
            splitBtnOne.addClass('split-btn_passive');

            splitBtnTwo.removeClass('split-btn_passive');
            splitBtnTwo.addClass('split-btn_active');
            smoothScroll(this);
        } else {
            changeBlockVisibility(easyMode, fullMode);

            splitBtnTwo.removeClass('split-btn_active');
            splitBtnTwo.addClass('split-btn_passive');

            splitBtnOne.removeClass('split-btn_passive');
            splitBtnOne.addClass('split-btn_active');
            smoothScroll(this);
        }
    });

    function changeBlockVisibility(visibleBl, invisibleBl) {
        $(visibleBl).css({'display' : 'block'});
        $(invisibleBl).css({'display' : 'none'});
        return true;
    }

    function smoothScroll(link) {
        var id  = $(link).attr('href'),
            top = $(id).offset().top - 150;

        $("html,body").animate({
            scrollTop: top
        }, 300);
        return false;
    }

});
