jQuery(document).ready(function ($) {
    
    //Шаги корзины
    init_cart_steps();

    $('.cart_prev_step').click(function() {
        if ($(".cart_step_1").hasClass("active")) {
            window.location.href = "#";
        } else {
            $('.upd_cart h1').text("Защитите ваше устройство");
            $('.cart_steps_head .step_1_label').addClass("active");
            $('.cart_steps_head .step_2_label').removeClass("active");
            $('.cart_step_1').addClass("active");
            $('.cart_step_2').removeClass("active");
        };
        $(window).scrollTop(0);
    });
    $('.cart_next_btn').click(function() {
        if ($(".cart_step_1").hasClass("active")) {
            $('.upd_cart h1').text("Добавьте аксессуары к вашему устройству");
            $('.cart_steps_head .step_1_label').removeClass("active");
            $('.cart_steps_head .step_2_label').addClass("active");
            $('.cart_step_1').removeClass("active");
            $('.cart_step_2').addClass("active");
        } else {
            window.location.href = "#";
        };
        $(window).scrollTop(0);
    });
    //Инициализация steps
    function init_cart_steps() {
        $('.upd_cart h1').text("Защитите ваше устройство");
        $('.cart_steps_head .step_1_label').addClass("active");
        $('.cart_steps_head .step_2_label').removeClass("active");
        $('.cart_step_1').addClass("active");
        $('.cart_step_2').removeClass("active");
    };
    //Конец Шаги корзины



    //Корзина
    init_cart();
    //Инициализация steps
    function init_cart() {
        $('.upd_cart_page .head_page').show();
        $('.upd_cart_page .cart_main').show();
        $('.upd_cart_page .cart_form').hide();
        $('.upd_cart_page .wrap_final_screen').hide();
        $('.upd_cart_page .cart_empty').hide();
        $('.upd_cart_page .cart_last_block').hide();
    };
    //Go step 2 (form)
    $('.upd_cart_page .cart_btn').click(function() {
        $('.cart_main').hide();
        $('.accessory_inline.short').hide();
        $('.upd_cart_page .head_page').hide();
        $('.upd_cart_page .cart_form').css("padding","48px 0");
        $('.upd_cart_page .cart_form').css("display","flex");
        $(window).scrollTop(0);
    });
    //Go_back to step 1 (first screen)
    $('.upd_cart_page .cart_back').click(function() {
        init_cart();
        $('.upd_cart_page .accessory_inline.short').show();
        $(window).scrollTop(0);
    });
    //Go step 3 (finish label)
    $('.upd_cart_page .cart_final_btn').click(function() {
        $('.upd_cart_page .cart_form').hide();
        $('.upd_cart_page .cart_ok').css("display","flex");
        $('.upd_cart_page .cart_last_block').css("display","block");
        $(window).scrollTop(0);
    });

    //cart_item
    $('.cart_item .card_switcher .buy_with_resty').click(function() {
        $(this).addClass("active");
        $(this).parent().find(".buy_now").removeClass("active");
        $(this).parent().parent().parent().find(".result .select_with_resty").addClass("active");
        $(this).parent().parent().parent().find(".result .select_now").removeClass("active");
    });
    $('.cart_item .card_switcher .buy_now').click(function() {
        $(this).addClass("active");
        $(this).parent().find(".buy_with_resty").removeClass("active");
        
        $(this).parent().parent().parent().find(".result .select_with_resty").removeClass("active");
        $(this).parent().parent().parent().find(".result .select_now").addClass("active");
    });
    //order_item
    $('.order_item .btn').click(function() {
        $(this).parent().parent().toggleClass("open");
    });
    //Конец Корзина


    //Работа галереи slider & fancybox
    const swiper_card = new Swiper('.swiper_cart', {

    });
});

