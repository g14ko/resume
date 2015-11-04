$(function () {

    $("header.header").load("html/header.html");
    $("main.content").load("html/content.html");
    $("aside.right-sidebar").load("html/aside.html");
    $("footer.footer").load("html/footer.html");

    var responsibilities = $('.responsibilities');

    responsibilities.on('click', 'ul > li', function (e) {
        e.preventDefault();

        var jobs = $(this).find('ol');

        $(this).toggleClass('expanded');
        jobs.toggle(!jobs.is(':visible'));

    });

    $(".wrapper").accordion();

    $('.wrapper').on('click', '.file', function (e) {
        e.preventDefault();

        var
            a = $(this),
            lang = a.parent('p').prev('h4'),
            company = lang.parent('div').prevAll('.company:first'),
            id = company.text() + '-' + a.text().substring(0, a.text().indexOf('.')),
            code = a.next('#'+id);

        if(code.length == 0)
        {
            $.get($(this).prop('href'), function (data) {

                a.after('<pre id="' + id + '"><code class="' + lang.text() + '">' + data + '</pre></code>');

                $('#'+id+' code').each(function(i, block) {
                    hljs.highlightBlock(block);
                });

            }, 'text');
        } else {
            code.toggle(!code.is(':visible'));
        }

    });


});