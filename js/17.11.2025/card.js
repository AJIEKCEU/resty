var swiper;
var swiper_card;
var swiper_card_preview;


function init_product()
{
    modal_button();
    swiper = new Swiper('.swiper', {
        // slidesPerView: 1,
        // speed: 0,
        navigation: {
            nextEl: '.swiper-btn-next3',
            prevEl: '.swiper-btn-prev3',
        },
    });

    Fancybox.bind("[data-fancybox]");

    const swiper_card = new Swiper('.swiper_card', {
        pagination: {
            el: '.swiper-card-pagination',
            clickable: true
        }
    });

    //Смена слайдов
    swiper_card.on('slideChange', function () {
        swiper_card_preview.slideTo(swiper_card.activeIndex);
        $('.gallery_img .swiper-slide').removeClass("active");
        $('.gallery_img .swiper-slide:nth-child(' + (swiper_card.activeIndex + 1) + ')').addClass("active");
    });

    //Работа галереи preview
    const swiper_card_preview = new Swiper('.swiper_card_preview', {
        slidesPerView: 6,
        spaceBetween: 10,
        breakpoints: {
            0: {
                slidesPerView: 3,
            },
            500: {
                slidesPerView: 4,
            },
            600: {
                slidesPerView: 5,
            },
            700: {
                slidesPerView: 3,
            },
            960: {
                slidesPerView: 4,
            },
            1200: {
                slidesPerView: 5,
            },
            1400: {
                slidesPerView: 6,
            }
        }
    });

    //Обводка активной иконки в галерее
    $('.gallery_img .swiper-slide').click(function() {
        $('.gallery_img .swiper-slide').removeClass("active");
        $(this).addClass("active");
        swiper_card.slideTo($(this).index());
    });


    //Переключение Купить с Рести или сейчас
    $('.switcher .buy_with_resty').click(function() {
        if (!$(this).hasClass("active")) {
            $('.switcher .buy_now').removeClass("active");
            $(this).addClass("active");
            $('.select_with_resty').show();
            $('.select_buy_now').hide();
        }
    });
    $('.switcher .buy_now').click(function() {
        if (!$(this).hasClass("active")) {
            $('.switcher .buy_with_resty').removeClass("active");
            $(this).addClass("active");
            $('.select_with_resty').hide();
            $('.select_buy_now').show();
        }
    });

    //Попап видео
    $('.btn_play_video').click(function() {
        $('.gallery_img .item').removeClass("active");
        $(this).addClass("active");
    });


    $('.card .switcher .buy_with_resty').click(function() {
        $(".product_switcher_tabs").css('display','flex');
        if (!$(this).hasClass("active")) {
            $(this).parent().parent().find('.buy_now').removeClass("active");
            $(this).addClass("active");
            // $('.card .select_with_resty').show();
            // $('.card .select_buy_now').hide();
            $(this).parent().parent().parent().find('.select_with_resty').show();
            $(this).parent().parent().parent().find('.select_buy_now').hide();

            $(this).parent().parent().parent().find('.switcher_tabs').css('display','flex');
        }
    });
    $('.card .switcher .buy_now').click(function() {
        $(".product_switcher_tabs").css('display','none');
        if (!$(this).hasClass("active")) {

            $(this).parent().parent().find('.buy_with_resty').removeClass("active");
            $(this).addClass("active");
            $(this).parent().parent().parent().find('.select_with_resty').hide();
            $(this).parent().parent().parent().find('.select_buy_now').show();

            $(this).parent().parent().parent().find('.switcher_tabs').css('display','none');
        }
    });
    //В карточке товара переключение срока рассрочки
    $('.card .switcher_tabs label').click(function()
    {
        var mes = $(this).data('mes');
        $("#mes_number").html(mes);
        var vykup = $(this).data('vykup');
        $("#summ_vykup").html(vykup);

        $(".card .card_price .month").text($(this).find("span").text());
        var price = $(this).data('price');
        var summ =  $(this).data('summ');
        $('.formular_mes_price').html(price + ' руб. в месяц');
        $('.formular_all_price').html(summ + ' руб.');
    });

    $('.modal_card .switcher .buy_with_resty').click(function() {
        if (!$(this).hasClass("active")) {
            $(this).parent().parent().find('.buy_now').removeClass("active");
            $(this).addClass("active");
            // $('.card .select_with_resty').show();
            // $('.card .select_buy_now').hide();
            $(this).parent().parent().parent().find('.select_with_resty').show();
            $(this).parent().parent().parent().find('.select_buy_now').hide();

            $(this).parent().parent().parent().find('.switcher_tabs').css('display','flex');
        }
    });
    $('.modal_card .switcher .buy_now').click(function() {
        if (!$(this).hasClass("active")) {
            $(this).parent().parent().find('.buy_with_resty').removeClass("active");
            $(this).addClass("active");
            $(this).parent().parent().parent().find('.select_with_resty').hide();
            $(this).parent().parent().parent().find('.select_buy_now').show();

            $(this).parent().parent().parent().find('.switcher_tabs').css('display','none');
        }
    });








}



jQuery(document).ready(function ($)
{
    init_product();
});

