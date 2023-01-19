import $ from 'jquery';
import Swiper, {Navigation} from "swiper";

$(document).ready(function () {
    $('.header__select').select2();

    new Swiper('.featured__list', {
        modules: [Navigation],
        navigation: {
            nextEl: '.featured__arrow--right',
            prevEl: '.featured__arrow--left'
        }
    })
})