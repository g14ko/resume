var accordion = {
    initialized: false,
    init: function () {
        if (arguments.length > 0) {
            var
                params = Array.prototype.slice.call(arguments),
                value = params.shift();

            if (typeof value != 'boolean') {
                console.error('wrong type of passed param');
            } else {
                this.initialized = value;
            }
        }

        return this.initialized;
    },
    headers: ["H1", "H2", "H3", "H4", "H5", "H6"],
    handlers: {
        click: function () {
            $(this).on('click', '.accordion', function (e) {
                var target = e.target,
                    name = target.nodeName.toUpperCase();

                if ($.inArray(name, accordion.headers) > -1) {
                    var
                        subItem = $(target).next(),
                        depth = $(subItem).parents().length,
                        allAtDepth = $(".accordion p, .accordion div").filter(function () {
                            if ($(this).parents().length >= depth && this !== subItem.get(0)) {
                                return true;
                            }
                        });

                    $(allAtDepth).slideUp('fast');
                    subItem.slideToggle('fast');
                    $(target).toggleClass('collapsed');
                }
            });

            return accordion.initialized = true;
        }
    }
}

$.fn.accordion = function () {
    if (accordion.init()) {
        console.error('already initialized');
        return false;
    }

    return accordion.handlers['click'].apply(this, arguments);
}