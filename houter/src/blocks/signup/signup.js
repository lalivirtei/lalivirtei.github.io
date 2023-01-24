import $ from 'jquery';

$(document).ready(function () {
    const $signup = $('.signup');
    const $btnClose = $('.signup__button--close');
    let $body = $('.body');

    $('.btn--signup').click(function() {
        $signup.addClass('signup--open');
        $body.addClass('body--no-scroll');
    });

    $btnClose.click(function () {
        hideModal();
    });

    $signup.click(function(e) {
       if (!$(e.target).closest('.signup__container').length) {
           hideModal();
       }
    });

    function hideModal() {
        $signup.removeClass('signup--open');
        $body.removeClass('body--no-scroll');
    }
})