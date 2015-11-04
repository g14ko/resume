$(function ($) {

    var
        wrapper = $('#diagram-wrapper'),
        form = wrapper.find('#diagram-form'),
        onSubmit = function (e) {
            e.preventDefault();

            $.post(null, $(this).serialize(), function (res) {
                if(res.hasOwnProperty('success') && res['success']){
                    location.href = res['redirect'];
                }
                wrapper.find('div.form').replaceWith($(res));
                //$('#parent-diagram').select2({placeholder: 'select parent diagram'});
                $('#diagram-parent').select2();
            }, 'json');

        }

    wrapper.on('submit', '#diagram-form', onSubmit);

    $.fn.refresh = function () {
        return $(this.selector);
    };

});
