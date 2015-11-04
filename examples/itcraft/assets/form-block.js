$(function ($) {

    var
        wrapper = $('#diagram-block-edit'),
        toggleCheckBoxes = function () {
            $.each(['up', 'right', 'down', 'left'], function (i, direction) {
                var id = 'DiagramBlockForm_a_' + direction,
                    checkbox = wrapper.find('#' + id),
                    input = $(wrapper.find('#' + id + '_text'));

                checkbox.is(':checked') ? input.show() : input.hide();
            });
        },
        onSubmit = function (e) {
            e.preventDefault();

            $.post(null, $(this).serialize(), function (response) {
                if (response.hasOwnProperty('success') && response['success']) {
                    location.href = response['redirect'];
                }
            }, 'json');
        }

    toggleCheckBoxes();

    wrapper.on('click', '[id^=DiagramBlockForm_a_]', function (e) {
        toggleCheckBoxes();
    });

    wrapper.on('submit', '#diagram-block-form', onSubmit);

});
