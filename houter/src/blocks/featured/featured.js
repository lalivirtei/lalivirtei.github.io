import $ from 'jquery';
import Swiper, {Navigation} from "swiper";

$(document).ready(function() {

    const featureSlider = new Swiper('.featured__list', {
        modules: [Navigation],
        navigation: {
            nextEl: '.featured__arrow--right',
            prevEl: '.featured__arrow--left'
        },
        spaceBetween: 40,
        slidesPerView: 'auto',
        centeredSlides: true,
        grabCursor: true,
        initialSlide: getInitialSlide()
    });

    let $allButtons = $('.featured__btn');

    $allButtons.each(function() {
        $(this).on('click', function() {
            console.log('click')
            $allButtons.each(function () {
                $(this).removeClass('featured__btn--active');
            })
            $(this).addClass('featured__btn--active');

            let buttonType = $(this).data('type');

            $('.featured__item').each(function() {
                $(this).css('display', 'block');

                if ($(this).data('type') !== buttonType) {
                    $(this).css('display', 'none');
                }
            })

            featureSlider.update();
        })
    })
})

function getInitialSlide() {
    let num = 0;

    if  (window.matchMedia('(min-width: 768px) and (max-width: 1199px)').matches) {
        num = 1;
    }

    return num;
}