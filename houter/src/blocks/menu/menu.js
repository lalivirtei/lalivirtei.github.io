import $ from 'jquery';

$(document).ready(function () {
    const $body = $('.body');
    const $menu = $('.menu');
    const $menuButton = $('.menu__button');
    const $select = $('.menu__select');

    $select.select2({
        placeholder: 'Property',
        minimumResultsForSearch: Infinity,
        width: '200px'
    });

    $select.on('select2:select', function (e) {
        let data = e.params.data;
        toggleMenu();

        $('html, body').animate({
            scrollTop: $('#featured').offset().top
        }, 1000);
        $(`.featured__btn[data-type=${data.id}]`).click();
    });

    $menuButton.on('click', function () {
        toggleMenu();
    });

    $('.menu__btn-link').each(function () {
        $(this).click(function() {
            toggleMenu();

            $('html, body').animate({
                scrollTop: $($(this).attr('href')).offset().top
            }, 1000);
        })
    });

    $('.btn--signup').click(function() {

    });

    function toggleMenu() {
        $menu.toggleClass('menu--open');
        $body.toggleClass('no-scroll');
    }

})