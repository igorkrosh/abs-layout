let hideSidebarResolution = 1200;

$(document).ready(Core);

function Core()
{
    SetMainSlider();
    SetMobileMenu();
    SetCardSwitcher();
    SetSimpleSlider();
    SetGallery();

    $(window).on('scroll', SticlySidebar);
    $(window).on('resize', SticlySidebarResize);
}

function SetMainSlider()
{
    $('.main-slider').owlCarousel({
        items: 1,
        loop: true,
        nav: true,
        navContainer: '.sect-slider .slider-nav',
        dots: false,
        //autoplay: true,
    });
}

function SticlySidebar()
{
    if ($(window).width() < hideSidebarResolution)
    {
        return;
    }

    let windowPos = this.scrollY + window.innerHeight;
    let sidebar = $('.sidebar');

    if ((windowPos >= $('body').innerHeight() - $('footer').innerHeight()))
    {
        if (sidebar.hasClass('sticky'))
        {
            sidebar.css('position', 'absolute');
            sidebar.css('top', $('body').innerHeight() - $('footer').innerHeight() - window.innerHeight);
            
            sidebar.removeClass('sticky');
            sidebar.addClass('not-sticky');
        }
    }
    else
    {
        if (sidebar.hasClass('not-sticky'))
        {
            sidebar.removeClass('not-sticky');
            sidebar.addClass('sticky');
            sidebar.css('position', 'fixed');
            sidebar.css('top', '0px');
        } 
    }
}

function SticlySidebarResize()
{
    if ($(window).width() < hideSidebarResolution)
    {
        return;
    }

    let sidebar = $('.sidebar');

    if (sidebar.hasClass('not-sticky'))
    {
        sidebar.css('position', 'absolute');
        sidebar.css('top', $('body').innerHeight() - $('footer').innerHeight() - window.innerHeight);
    }
}

function SetMobileMenu() 
{
    $('.btn-menu').on('click', function() {
        if ($(this).hasClass('active'))
        {
            $(this).removeClass('active');
            $('.sidebar').removeClass('active');
        }
        else
        {
            $(this).addClass('active');
            $('.sidebar').addClass('active');
        }
    })

    $('.btn-sidebar-close').on('click', function() {
        $('.btn-menu').removeClass('active');
        $('.sidebar').removeClass('active');
    })
    
}

function SetCardSwitcher()
{
    $('.btn-card-switch').on('click', function() {
        if ($(this).hasClass('active'))
        {
            return;
        }

        $('.btn-card-switch').removeClass('active');
        $(this).addClass('active');

        let targetCard = $(this).attr('target');

        SwitchCard(targetCard)
    })
}

function SwitchCard(target)
{
    $('.card.active').animate({
        opacity: 0
    }, 500, function() {
        $('.card.active').removeClass('active');

        $(`[card-name="${target}"]`).css('opacity', 0);
        $(`[card-name="${target}"]`).addClass('active');
        $(`[card-name="${target}"]`).animate({
            opacity: 1
        }, 500)
    })
}

function SetSimpleSlider()
{
    $('.simple-slider').owlCarousel({
        items: 1,
        loop: true,
        nav: true,
        navContainer: '.slider-nav.simple',
        dots: false,
        //autoplay: true,
    });

    $('.simple-slider a').simpleLightbox();
}

function SetGallery()
{
    $('#gallery-switcher').change(function() {
        let targetCard = $(this).val();
        SwitchCard(targetCard);
    });

    let galleryArray = $('.gallery-wrapper');

    for (gallery of galleryArray)
    {
        $(gallery).find('a').simpleLightbox();
    }
}

