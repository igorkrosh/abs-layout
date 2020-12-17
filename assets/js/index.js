let hideSidebarResolution = 1200;

$(document).ready(Core);

function Core()
{
    SetMainSlider();
    SetMobileMenu();
    SetCardSwitcher();

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

        $('.card.active').animate({
            opacity: 0
        }, 500, function() {
            $('.card.active').removeClass('active');

            $(`[card-name="${targetCard}"]`).css('opacity', 0);
            $(`[card-name="${targetCard}"]`).addClass('active');
            $(`[card-name="${targetCard}"]`).animate({
                opacity: 1
            }, 500)
        })
        
        
    })
}

