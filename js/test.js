function init_popup_buttons()
{
    //popup_cart_add_item
    $('.modal_card .card_switcher .buy_with_resty').click(function()
    {
        $(this).addClass("active");
        $(".buy_now").removeClass("active");
        $(".switcher_tabs").css('display', 'flex');
        $(".select_with_resty").css('display', 'flex');
        $(".select_buy_now").css('display', 'none');
    });

    $('.modal_card .card_switcher .buy_now').click(function() {
        $(this).addClass("active");
        $(".buy_with_resty").removeClass("active");
        $(".switcher_tabs").css('display', 'none');
        $(".select_with_resty").css('display', 'none');
        $(".select_buy_now").css('display', 'flex');
    });

    $('.modal_card .switcher_tabs label').click(function()
    {
        $(".modal_card .card_price .month").text($(this).find("span").text());
        var price = $(this).data('price');
        var resty = $(this).data('resty');
        $("#price_mes").html(price);
        $("#price_resty").html(resty);
    });

    $(".modal_access_item").unbind("click");
    $(".modal_access_item").on("click", function(e)
    {
        e.preventDefault();
        var id = $(this).data('acc');
        var prod_id = $(this).data('product');
        var token = $(this).data('token');

        var variant_pay = 'full';
        if($(".buy_with_resty.active").length>0)
            variant_pay = 'resty_'+$(".variant_pay_resty:checked").val();

        $.post('/local/ajax.php', {ACTION:'modal_access', ISB:100, TOKEN:token, ID:id, PROD_ID:prod_id, PAY:variant_pay}, function(data)
        {
            $("#modal_access_block").html(data);
            init_popup_buttons();
        });
        return false;
    });

    $(".modal_add_acc_to_cart").unbind("click");
    $(".modal_add_acc_to_cart").on("click", function(e)
    {
        e.preventDefault();
        var id = $(this).data('id');
        var variant_pay = 'full';
        var token = $(this).data('token');
        if($(".buy_with_resty.active").length>0)
            variant_pay = 'resty_'+$(".variant_pay_resty:checked").val();


        $.post('/local/ajax.php', {ACTION: 'add_to_cart', TOKEN: token, ID:id, TYPE: variant_pay, ISB: 100}, function(data)
        {
            var json = JSON.parse(data);
            $(".cart_items").html(json.PRODUCTS);
            console.log(json);
        });

        $(this).addClass('in_cart');
        $(this).addClass('no-ajax');
        $(this).html('В корзине');
        $(this).attr('href', '/cart/');
        $(this).on('click', function(){location.href='/cart/';});

        return false;
    });
}

$(".modal_button_access").on("click", function(e)
{
    e.preventDefault();
    var id = $(this).data('acc');
    var prod_id = $(this).data('product');
    var token = $(this).data('token');

    $.post('/local/ajax.php', {ACTION:'modal_access', ISB:100, TOKEN:token, ID:id, PROD_ID:prod_id}, function(data)
    {
        $("#modal_access_block").html(data);
        $("#popup_cart").css("display","flex");
        $(".modal .modal_content .modal_form_content_window").show();
        $(".modal .modal_content .modal_form_content_window .form_body form").trigger("reset");
        $(".modal .modal_content .modal_form_finish_window").hide();
        init_popup_buttons();
    });
    return false;
});

jQuery(document).ready(function ($) {
    init_popup_buttons()
});