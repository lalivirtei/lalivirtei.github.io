import $ from 'jquery';
import Swiper, {Navigation} from "swiper";

$(document).ready(function() {
    new Swiper('.featured__list', {
        modules: [Navigation],
        navigation: {
            nextEl: '.featured__arrow--right',
            prevEl: '.featured__arrow--left'
        },
        spaceBetween: 15,
        slidesPerView: 'auto',
        centeredSlides: true,
        grabCursor: true
    })

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
        })
    })
})
