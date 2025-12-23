function update_product_more_items()
{
    if($(".product_more_items").length>0)
    {
        $(".product_more_items").unbind("click");
        $(".product_more_items").on("click", function()
        {
            var next_page = $(this).data('page');
            $("#product_page_"+next_page).show();
            $(".more_items_"+next_page).show();
            $(this).hide();
        });
    }
}

setInterval(function()
{
    update_product_more_items();
}, 1000);

const upCatalog = $('.upd_catalog');

jQuery(document).ready(function ($)
{

    //Состояния input
    upCatalog.on('focus.inputState', '.type_price_item input', function() {
        $(this).parent().addClass("on");
    });

    upCatalog.on('blur.inputState', '.type_price_item input', function() {
        if (!$(this).val()) {
            $(this).parent().removeClass("on");
        }
    });

    //Очистка значения input
    upCatalog.on('focus.inputCross', '.type_price_item input', function() {
        $(this).parent().addClass('cross');
    });

    upCatalog.on('blur.inputCross', '.type_price_item input', function() {
        if (!$(this).val()) {
            $(this).parent().removeClass('cross');
        }
    });

    upCatalog.on('click.inputClear', '.type_price_item span', function() {
        $(this).next('input').val('');
        $(this).parent().removeClass('cross');
    });


    upCatalog.on('click.screenSaverToggle', '.screen_saver', function() {
        const $this = $(this); // Кэшируем $(this) для лучшей производительности
        const $parent = $this.parent(); // Кэшируем родителя

        $this.hide(); // Скрыть сам заглушку
        const $video = $parent.find('video');
        $video.removeClass('hide'); // Показать видео
        $video.get(0).play(); // Запустить видео (получаем нативный DOM элемент)
    });

   /* //Добавить параметр фильтра
    upCatalog.on('click','.filter_item .filter_item_body .item label', function()
    {
        $tmp_param = $(this).attr( "title" );

        $count = 0;
        $(".selected_param .wrap_items span").each(function() {
            if ($(this).text() == $tmp_param) {
                $count++;
            };
        });
        if ($count < 1) {
            $('.selected_param .wrap_items').append('<span class="h6">'+$tmp_param+'</span>');
            $('.selected_param .wrap_items span').click(function() {
                $(this).remove();
            });
        } else {

            $(".selected_param .wrap_items span").each(function() {
                if ($(this).text() == $tmp_param) {
                    $(this).remove();
                };
            });
        };
    });*/

    //Удалить параметр фильтра
   /* upCatalog.on('click','.selected_param .wrap_items span', function()
    {
        $(this).remove();
        $tmp_this = $(this).text();
        $count1 = 0;
        $(".filter_item .filter_item_body .item label").each(function() {
            if ($(this).text() == $tmp_this) {
                $count1++;
            };
        });
    });*/

    //Кнопка сортировки
    upCatalog.on('click','.btn_sort', function()
    {
        if ($('.sort_btn .type_sort').css('display') == "none") {
            $('.sort_btn .type_sort').css('display','flex');
        } else {
            $('.sort_btn .type_sort').css('display','none');
        };
    });

    //Сброс сортировки
    upCatalog.on('click', ".sort_btn .type_sort label", function()
    {
        $('.btn_sort').text($(this).text());
        $(".sort_btn .type_sort input").prop('checked', false);
        $('.sort_btn .type_sort').css('display','none');

        var sort = $(this).data('sort');
        location.href = location.pathname + '?SORT=' + sort;

    });

    $(document).on('click', function (e) {
        if ($(e.target).closest('.sort_btn').length)
            return;
        $('.sort_btn .type_sort').css('display','none');
        e.stopPropagation();
    });


    /*Показать скрыть смартфильтр*/
    function handleFilterState(event) {
        const isMobile = event.matches; // true, если '(max-width: 999px)' соответствует

        upCatalog.off('click.filterToggle', '.btn_filter');

        if (isMobile) {
            $('.filter_body').css('display', 'none');
            $('.filter_head').removeClass('show');

            upCatalog.on('click.filterToggle', '.btn_filter', function() {
                if ($('.filter_body').css('display') === 'none') {
                    $('.filter_body').css('display', 'block');
                    $('.filter_head').addClass('show');
                } else {
                    $('.filter_body').css('display', 'none');
                    $('.filter_head').removeClass('show');
                }
            });
        } else {
            $('.filter_body').css('display', 'block');
            $('.filter_head').addClass('show');
        }
    }

    const mobileMediaQuery = window.matchMedia('(max-width: 999px)');
    handleFilterState(mobileMediaQuery);
    mobileMediaQuery.addEventListener('change', handleFilterState);
    /*function showHideFilter (){
        $('.js-smart-filter').toggleClass('js-smart-filter--is-show');
        $('.js-smart-filter-shadow').toggleClass('js-smart-filter-shadow--is-active');
    }
    upCatalog.on('click', '.js-smart-filter-button', function(){
        showHideFilter();
    });
    upCatalog.on('click', '.js-smart-filter-close', function(){
        showHideFilter();
    });*/
    /***************************************************/
});

