import $ from 'jquery';
import Swiper, {Pagination} from 'swiper';
import {Fancybox} from "@fancyapps/ui";

$(document).ready(function () {
    if (window.matchMedia('(max-width: 575px)').matches) {
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
    }


    const $videoParent = $('.tour__video-wrapper');

    if (window.matchMedia('(max-width: 1024px)').matches) {
        let $iframe = $videoParent.find('.tour__iframe');
        const src = $iframe.data('src');
        $videoParent.addClass('tour__video-wrapper--active');
        $iframe.attr('src', src);
    }

    if (window.matchMedia('(min-width: 576px)').matches) {

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

    Fancybox.bind("[data-fancybox]", {
        // Your options go here
    });

    $('.tour__fancy-video').click(function() {
        Fancybox.show([
            {
                src: "https://www.youtube.com/embed/IZpTNq-mfNE?autoplay=1&mute=1&modestbranding=1&rel=0&hl=ru&showinfo=0&color=white",
                type: "video",
                ratio: 16 / 10,
            },
        ]);
    })


})
