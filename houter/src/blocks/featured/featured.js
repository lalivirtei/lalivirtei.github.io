import $ from 'jquery';
import Swiper, {Navigation} from "swiper";

$(document).ready(function() {
    new Swiper('.featured__list', {
        modules: [Navigation],
        navigation: {
            nextEl: '.featured__arrow--right',
            prevEl: '.featured__arrow--left'
        },
        spaceBetween: 30,
        slidesPerView: 'auto',
        centeredSlides: true,
        grabCursor: true,
        clickable: true
    })
})
