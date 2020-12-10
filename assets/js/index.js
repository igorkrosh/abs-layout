let hideSidebarResolution = 1200;

$(document).ready(Core);

function Core()
{
    SetMainSlider();
    SetMobileMenu();

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
    
}