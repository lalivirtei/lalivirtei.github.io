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

    const $videoParent = $('.tour__video-wrapper');

    if(window.matchMedia('(max-width: 1024px)').matches) {
        let $iframe = $videoParent.find('.tour__iframe');
        const src = $iframe.data('src');
        $videoParent.addClass('tour__video-wrapper--active');
        $iframe.attr('src', src);
    }
    // $('.tour__video-button-poster').on('click', function(e) {
    //     e.preventDefault();
    //     var poster = $(this);
    //     var wrapper = poster.closest('.tour__video-wrapper');
    //     videoPlay(wrapper);
    // });
    //
    // function videoPlay(wrapper) {
    //     var iframe = wrapper.find('.tour__iframe');
    //     var src = iframe.data('src');
    //     wrapper.addClass('tour__video-wrapper--active');
    //     iframe.attr('src',src);
    // }

})
