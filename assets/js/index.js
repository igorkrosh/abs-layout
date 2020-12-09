$(document).ready(Core);

function Core()
{
    SetMainSlider();
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