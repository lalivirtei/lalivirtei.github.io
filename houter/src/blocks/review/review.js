import $ from 'jquery';
import Swiper, {Pagination} from "swiper";

$(document).ready(function () {
    new Swiper('.review__slider', {
        modules: [Pagination],
        pagination: {
            el: '.review__pagination',
            clickable: true,
            type: 'bullets'
        },
        spaceBetween: 15,
        centeredSlides: true,
        slidesPerView: "auto",
        initialSlide: 2
    })
});