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
            code = a.next('#' + id);

        if (code.length == 0) {
            $.get($(this).prop('href'), function (data) {

                a.after('<pre id="' + id + '"><code class="' + lang.text() + '">' + data + '</pre></code>');

                $('#' + id + ' code').each(function (i, block) {
                    hljs.highlightBlock(block);
                });

            }, 'text');
        } else {
            code.toggle(!code.is(':visible'));
        }

    });

    $("a.export-to-word").click(function (e) {
        e.preventDefault();

        var resume = $("#export");

        if (!resume.hasClass('collected')) {
            resume.append($(".header").clone());

            //var body = $(".accordion-wrapper").clone();
            //console.log(body.find('.code-examples, .code-examples ~ div'));
            //body.find('.code-examples, .code-examples ~ div').remove();
            //console.log(body.find('p'));
            //return false;

            var body = $(".accordion-wrapper").clone();
            body.find('.code-examples, .code-examples ~ div').remove();
            resume.append(body);
            resume.addClass('collected');
        }

        resume.wordExport();
    });


});