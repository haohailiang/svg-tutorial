$(function() {
    $('svg[data-src]').each(function(index, svg) {
        var src = $(svg).data('src');
        $.ajax({
            url: src,
            dataType: 'xml',
            success: function(content) {
                // 直接把svg的内容加载近来
                var doc = content.documentElement;
                $(doc).attr({
                    width: $(svg).attr('width'),
                    height: $(svg).attr('height')
                });
                $(svg).after(doc).remove();
            }
        })
    });
});