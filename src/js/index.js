$(document).ready(Core);

function Core()
{
    SetTabSwitcher();
    SetModal();
    InitOwlCarousel();
    ShowMenu();
    CloseMenu();
}

function InitOwlCarousel()
{
    var main_carousel = $(".main-carousel").owlCarousel(
        {
            items: 1,
            loop: true,
            dots: true,
            autoplay: true,
            smartSpeed: 1000
        }
    );

    var our_works_carousel = $(".our-works-carousel").owlCarousel(
        {
            items: 1,
            loop: true,
            dots: true,
            autoplay: true,
            smartSpeed: 1000
        }
    );

    $('.btn-next.btn-our-works-carousel').click(function() {
        our_works_carousel.trigger('next.owl.carousel');
    });
    $('.btn-prev.btn-our-works-carousel').click(function() {
        our_works_carousel.trigger('prev.owl.carousel', [1000]);
    });
}

function SetTabSwitcher()
{
    $('.btn__tab__switch').on('click', function(e) {
        e.preventDefault();
        if ($(this).hasClass('active'))
        {
            return;
        }

        $('.btn__tab__switch').removeClass('active');
        $(this).addClass('active');

        let targetTab = $(this).attr('target');

        SwitchTab(targetTab)
    })
}

function SwitchTab(target)
{
    
    $('.tab.active').animate({
        opacity: 0
    }, 500, function() {
        $('.tab.active').removeClass('active');

        $(`[tab-name="${target}"]`).css('opacity', 0);
        $(`[tab-name="${target}"]`).addClass('active');
        
        let tabHeight = $(`[tab-name="${target}"]`)[0].clientHeight;
        $(`[tab-name="${target}"]`).closest('.tab__viewer').css('height', `${tabHeight}px`)

        $(`[tab-name="${target}"]`).animate({
            opacity: 1
        }, 500)
    })
}

function SetModal()
{
    $('[modal]').on('click', function()
    {
        let modalId = $(this).attr('modal');
        ShowModal(`#${modalId}`);
    });

    $('.modal__dialog').on('click', function(e) {
        e.stopPropagation();
    });

    $('.modal').on('click', function() {
        HideModal(`#${$(this).attr('id')}`);
    });

    $('.btn__modal__close').on('click', function ()
    {
        let modalId = $(this).closest('.modal').attr('id');
        HideModal(`#${modalId}`);
    });
}

function ShowModal(modalId)
{
    $(modalId + ' .modal__dialog').off('animationend');
    $(modalId).addClass('active');
    $('body').addClass('lock');
    $(modalId + ' .modal__dialog').addClass('fadeInDownBig')
    
    $('body').append('<div class="modal__backdrop"></div>');
    setTimeout(function() {
        $('.modal__backdrop').addClass('active');
    }, 50)
}

function HideModal(modalId)
{
    $(modalId + ' .modal__dialog').removeClass('fadeInDownBig');
    $(modalId + ' .modal__dialog').addClass('fadeOutDownBig');
    $('.modal__backdrop').removeClass('active');
    $('body').removeClass('lock');
    $(modalId + ' .modal__dialog').on('animationend', function() {
        if (!$(modalId).hasClass('active'))
        {
            return;
        }
        $(modalId).removeClass('active');
        $(modalId + ' .modal__dialog').removeClass('fadeOutDownBig');
        $('.modal__backdrop').remove();
    });
}

function ShowMenu()
{
    $('.btn-menu-mobile').on('click', function(e) {
        e.preventDefault();
        if ($('.navbar').hasClass('active'))
        {
            return;
        }
        $('.navbar').addClass('active');
    })
}

function CloseMenu()
{
    $('.btn-close-menu').on('click', function(e) {
        e.preventDefault();
        if ($('.navbar').hasClass('active'))
        {
            $('.navbar').removeClass('active');
        }
    })
}