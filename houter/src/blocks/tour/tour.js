import $ from 'jquery';
import Swiper, {Pagination} from 'swiper';

$(document).ready(function () {
    new Swiper('.tour__images', {
        modules: [Pagination],
        pagination: {
            el: '.tour__pagination',
            clickable: true
        },
        spaceBetween: 30,
        slidesPerView: "auto",
        centeredSlides: true
    })

})
