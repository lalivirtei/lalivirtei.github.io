import $ from 'jquery';

$(document).ready(function () {
    const $signup = $('.signup');
    const $btnClose = $('.signup__button--close');
    let $body = $('.body');

    $('.btn--signup').click(function () {
        $signup.addClass('signup--open');
        $body.addClass('body--no-scroll');
    });

    $btnClose.click(function (e) {
        e.preventDefault();
        hideModal();
    });

    $signup.click(function (e) {
        if (!$(e.target).closest('.signup__container').length) {
            hideModal();
        }
    });

    function hideModal() {
        $signup.removeClass('signup--open');
        $body.removeClass('body--no-scroll');
    }

    $signup.submit(function (e) {
        e.preventDefault();
        $.post(
            'https://formbold.com/s/oJprW',
            $('.signup').serialize(),
            function (msg) {
                $('.signup__container').text(msg.message);
                setTimeout(function() {
                    hideModal();
                }, 1000)
            },
            'json'
        )
    })
})