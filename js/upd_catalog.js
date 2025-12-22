function update_product_more_items()
{
    if($(".product_more_items").length>0)
    {
        $(".product_more_items").unbind("click");
        $(".product_more_items").on("click", function()
        {
            console.log('product_more_items php');
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



function upd_catalog()
{
    // modal_button();

    //Показ фильтра
    $(window).resize(function()
    {
        $tmp_width = $(window).width();
    });

    //Состояния input
    $( ".type_price_item input" ).focus(function(){
        $(this).parent().addClass("on");
    });
    $( ".type_price_item input" ).blur(function(){
        if (!$(this).val()) {
            $(this).parent().removeClass("on");
        };
    });

    //Очистка значения input
    $( ".type_price_item input" ).focus(function(){
        $(this).parent().addClass('cross');
    });
    $( ".type_price_item input" ).blur(function(){
        if (!$(this).val()) {
            $(this).parent().removeClass('cross');
        }
    });
    $( ".type_price_item span" ).click(function(){
        $(this).next('input').val('');
        $(this).parent().removeClass('cross');
    });

    $('.screen_saver').unbind('click');
    $('.screen_saver').click(function(){
        $(this).hide();
        $(this).parent().find('video').removeClass('hide');
        $(this).parent().find('video').get(0).play();
    });
}

jQuery(document).ready(function ($)
{
    upd_catalog();

    let upCatalog = $('.upd_catalog');

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
    upCatalog.on('click','.selected_param .wrap_items span', function()
    {
        $(this).remove();
        $tmp_this = $(this).text();
        $count1 = 0;
        $(".filter_item .filter_item_body .item label").each(function() {
            if ($(this).text() == $tmp_this) {
                $count1++;
                console.log($count1);
            };
        });
    });

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
    let filter = $('.js-smart-filter'),
        shadowFilter = $('.js-smart-filter-shadow');
    function showHideFilter (){
        $('.js-smart-filter').toggleClass('js-smart-filter--is-show');
        $('.js-smart-filter-shadow').toggleClass('js-smart-filter-shadow--is-active');
        /*if(filter.hasClass('smart-filter_show')){
            scrollLock.disablePageScroll(vaObj.filterScrollable);
        }
        else {
            scrollLock.enablePageScroll(vaObj.filterScrollable);
        }*/
    }
    upCatalog.on('click', '.js-smart-filter-button', function(){
        showHideFilter();
    });
    upCatalog.on('click', '.js-smart-filter-close', function(){
        showHideFilter();
    });
    upCatalog.on('click', '.js-smart-filter-shadow', function(e){
        showHideFilter();
    });
    /***************************************************/
});

