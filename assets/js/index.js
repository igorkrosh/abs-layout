$(document).ready(Core);

function Core()
{
    SetMainSlider();
}

function SetMainSlider()
{
    $('.main-slider').owlCarousel({
        items: 1
    });
}