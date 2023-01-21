import $ from 'jquery';

$(document).ready(function () {
    const $signModal = $('.signup');

    $('.btn--signup').click(function() {
        $signModal.addClass('signup--open');

        $('.signup__button--close').click(function () {
            $signModal.removeClass('signup--open');
        })
    })
})