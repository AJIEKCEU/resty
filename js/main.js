
//---Главная--------------------------------------------------------------------------------
var cart_timer = false;

function modal_button()
{
    $(".modal_button").unbind('click');
    $(".modal_button").click(function(e)
    {
        e.preventDefault();
        /*
        if($(window).width()>1900)
        {
            $("body").addClass("no_scroll");
        }
        else
        {
            $("body").addClass("no_scroll_no_padding");
        }

        $tmp = $(this).attr('data-id');
        $("#"+$tmp).css("display","flex");
        $(".modal .modal_content .modal_form_content_window").show();
        $(".modal .modal_content .modal_form_content_window .form_body form").trigger("reset");
        $(".modal .modal_content .modal_form_finish_window").hide();
        $(".modal_video_content").html('<iframe class="yvideo" src="https://www.youtube.com/embed/' + $(this).attr('data-kod_youtube') + '?rel=0&autoplay=1&enablejsapi=1&showinfo=0&controls=1&modestbranding=1&rel=0&playsinline=1" frameborder="0" allow="autoplay" allowfullscreen></iframe>');
        // $(".modal .modal_content .modal_form_finish_window .swiper_card").swiper_card;
        // const swiper_card = document.querySelector('.modal .modal_content .modal_form_content_window .swiper_card').swiper_card;
        */

        $("body").addClass("no_scroll_no_padding");

        $tmp = $(this).attr('data-id');
        $("#"+$tmp).css("display","flex");
        $(".modal .modal_content .modal_form_content_window").show();
        $(".modal .modal_content .modal_form_content_window .form_body form").trigger("reset");
        $(".modal .modal_content .modal_form_finish_window").hide();
        $(".modal_video_content").html('<iframe class="yvideo" src="https://www.youtube.com/embed/' + $(this).attr('data-kod_youtube') + '?rel=0&autoplay=1&enablejsapi=1&showinfo=0&controls=1&modestbranding=1&rel=0&playsinline=1" frameborder="0" allow="autoplay" allowfullscreen></iframe>');

    });
}

function btn_fixed() {
    if ( $(window).width() < 768) {
        var $element = $('.upd_cart_page .cart_main');
        let counter = 0;
        $(window).scroll(function() {
            var scroll = $(window).scrollTop() + $(window).height();
            var offset = $element.offset().top + $element.height()-80;

            if (scroll > offset && counter == 0 && $(window).width() < 768) {
                $('.btn_fixed').hide();
                counter = 1;
            };
            if (scroll < offset && counter == 1 && $(window).width() < 768) {
                $('.btn_fixed').show();
                counter = 0;
            };
        });
    } else {
        $('.btn_fixed').hide();
    };
};

function update_cart_items_init()
{
    clearTimeout(cart_timer);
    cart_timer = setTimeout(function(){update_cart_items();}, 100);
}

function update_cart_items()
{
    var order = '';
    var token = $("#x_token").val();
    $(".cart_item").each(function()
    {
        var id = $(this).data('id');
        var quantity = $('.product_quantity_'+id).html();
        var type = 'full';
        if($(this).find('.buy_with_resty.active').length>0)
        {
            type = $(this).find('.update_cart_items_init_mes.active').data('mes');
        }

        order = order + id + '_' + quantity + '_' + type + '|';
    });

    $.post('/local/ajax.php', {ISB:10, TOKEN: token, ACTION: 'update_cart', order : order}, function(data)
    {
        $(".cart_main").html(data);
        init_cart();
    });

}



//Инициализация корзины
function init_cart()
{
    modal_button();
    btn_fixed();
    $('.upd_cart_page .head_page').show();
    $('.upd_cart_page .cart_main').show();
    $('.upd_cart_page .cart_form').hide();
    // $('.upd_cart_page .wrap_final_screen').hide();
    // $('.upd_cart_page .cart_empty').hide();
    $('.upd_cart_page .cart_ok').css("display","none");
    $('.upd_cart_page .cart_last_block').hide();

    //Minus 1
    $('.counter .minus_1').click(function()
    {
        $counter = parseInt($(this).parent().find('.current').text());
        if ($counter > 1)
        {
            $(this).parent().find('.current').text($counter - 1);
            update_cart_items_init();
        };
    });
    //Plus 1
    $('.counter .plus_1').click(function() {
        $counter = parseInt($(this).parent().find('.current').text());
        $(this).parent().find('.current').text($counter + 1);
        update_cart_items_init();
    });

    $(".update_cart_items_init").on("click", function()
    {
        update_cart_items_init();
    });


    //cart_item
    //$('.cart_item .card_switcher .buy_with_resty, .cart_item .card_switcher .buy_now, .cart_item .switcher_period_pay span, .modal_card .card_switcher .buy_with_resty, .modal_card .card_switcher .buy_now').unbind('click');
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

    //cart_item Рассрочка
    $('.cart_item .switcher_period_pay span').click(function()
    {
        $(this).parent().find("span").removeClass("active");
        $(this).addClass("active");
        $(this).parent().parent().parent().find('.month').text($(this).text());
    });


    //popup_cart_add_item
    $('.modal_card .card_switcher .buy_with_resty').click(function() {
        $(this).addClass("active");
        $(this).parent().find(".buy_now").removeClass("active");
        $(this).parent().parent().parent().find(".switcher_tabs").css('display', 'flex');
    });
    $('.modal_card .card_switcher .buy_now').click(function() {
        $(this).addClass("active");
        $(this).parent().find(".buy_with_resty").removeClass("active");

        $(this).parent().parent().parent().find(".switcher_tabs").css('display', 'none');
    });

    //order_item
    $('.order_item .btn').click(function() {
        $(this).parent().parent().toggleClass("open");
    });


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
    $('.upd_cart_page .cart_final_btn').unbind("click");
    $('.upd_cart_page .cart_final_btn').click(function(e)
    {
        e.preventDefault();
        $(this).attr('disabled', true);
        // --- нужно собрать данные с формы и отправить если всё ок
        var is_error = false;
        $("#send_cart_order input").each(function()
        {
            $(this).removeClass('error');
            if($(this).prop('required') && $(this).val()=='')
            {
                is_error = true;
                $(this).addClass('error');
            }
        });

        if(is_error)
        {
            $('.upd_cart_page .cart_final_btn').attr('disabled', false);
            return false;
        }

        $("#send_cart_order").append('<input type="hidden" name="ISB" value="'+isb+'" />');

        $(".user_info").html('Отправляем заказ...');
        $(".user_info").removeClass('error');

        var x_form = $("#send_cart_order").serialize();
        $.ajax({
            type: 'POST',
            url: "/local/ajax.php",
            data: x_form,
            dataType: 'json',
            success: function (data)
            {
                if(data.MSG!='')
                {
                    $('.upd_cart_page .cart_final_btn').attr('disabled', false);
                    $(".user_info").html(data.MSG);
                    $(".user_info").addClass('error');
                    return false;
                }

                $("#card_order_number").html(data.ID);
                $('.upd_cart_page .cart_form').hide();
                $('.upd_cart_page .cart_ok').css("display","flex");
                $('.upd_cart_page .cart_last_block').css("display","block");
                $(window).scrollTop(0);

                if(data.LINK!='')
                {
                    $(".lizing_url").attr('href', data.LINK);
                    $(".lizing_url").prop('href', data.LINK);
                    $(".lizing_div").show();

                    setInterval(function()
                    {
                        if(lizing_timer>1)
                        {
                            $(".lizing_timer").html(lizing_timer + " сек");
                            lizing_timer--;
                            return;
                        }

                        location.href = $(".lizing_url").attr('href');
                    }, 1000);
                }

            },
            error: function (xhr, str)
            {
                $('.upd_cart_page .cart_final_btn').attr('disabled', false);
                return false;
            }
        });
        return false;
    });


    $('.cart_btn_delete').unbind('click');
    $('.cart_btn_delete').on('click', function()
    {
        var id = $(this).data('id');
        var token = $("#x_token").val();

        $.post('/local/ajax.php', {ISB:10, TOKEN: token, ACTION: 'cart_btn_delete', id : id}, function(data)
        {
            data = data.trim();

            if(data=='')
            {
                location.reload();
                return false;
            }

            $(".cart_main").html(data);
            init_cart();
        });

    });
};







jQuery(document).ready(function ($)
{



    // Горизонтальный скролл слайдера на Главной
    // if( $(".swiper_main_card").length ) {
    //     const slider = document.querySelector('.swiper_main_card');
    //     let isDown = false;
    //     let startX;
    //     let scrollLeft;

    //     slider.addEventListener('mousedown', (e) => {
    //     isDown = true;
    //     slider.classList.add('active');
    //     startX = e.pageX - slider.offsetLeft;
    //     scrollLeft = slider.scrollLeft;
    //     });
    //     slider.addEventListener('mouseleave', () => {
    //     isDown = false;
    //     slider.classList.remove('active');
    //     });
    //     slider.addEventListener('mouseup', () => {
    //     isDown = false;
    //     slider.classList.remove('active');
    //     });
    //     slider.addEventListener('mousemove', (e) => {
    //     if(!isDown) return;
    //     e.preventDefault();
    //     const x = e.pageX - slider.offsetLeft;
    //     const walk = (x - startX) * 1;
    //     slider.scrollLeft = scrollLeft - walk;
    //     });
    // };
    // Конец Горизонтальный скролл слайдера на Главной


    // Работа стрелочек слайдера на Главной
    if( $(".hero_swiper").length ) {
        const reviews_inline_swiper = new Swiper('.hero_swiper', {
            slidesPerView: 1,
            speed: 700,
            loop: true,
            autoplay: {
                delay: 3000
            },
            pagination: {
                el:'.swiper-pagination',
                clickable: true
            }
        });
        reviews_inline_swiper.on('sliderMove', function () {
            reviews_inline_swiper.autoplay.stop();
        });
        $(".hero_swiper .swiper-pagination-bullet").on('click', function () {
            reviews_inline_swiper.autoplay.stop();
        });
    };

    // Конец Работа стрелочек слайдера на Главной
});
//---Главная end--------------------------------------------------------------------------------

    

//---Menu--------------------------------------------------------------------------------
jQuery(document).ready(function ($) {
    //Добавляет стрелочку в пункты меню если есть второй уровень
    let arrow=document.querySelectorAll('.sub-menu');
    /*for(let j=0; j<arrow.length; j++){
        let thisLink1=arrow[j].previousElementSibling;
        let thisArrow1=arrow[j];
        thisArrow1.insertAdjacentHTML('beforebegin', '<span class="menu__arrow arrow"></span>');
        arrow[j].addEventListener('click', function(){
            // subMenu.classList.toggle('open');
            // thisArrow.classList.toggle('active');
        });
    };*/

    //Закрывает мобильное меню при клике вне его на затемнённой области
    $(document).mouseup(function (e) {
        var container = $("header .wrap_h_all");
        if (container.has(e.target).length === 0){
            $('header .wrap_h_all').removeClass('open');
            setTimeout(
                function()
                {
                    $('body').removeClass('no_scroll_no_padding');
                    $('header').removeClass('open'); 
                }, 600);
        }
    });

    let isMobile = {
        Android: function() {return navigator.userAgent.match(/Android/i);},
        BlackBerry: function() {return navigator.userAgent.match(/BlackBerry/i);},
        iOS: function() {return navigator.userAgent.match(/iPhone|iPad|iPod/i);},
        Opera: function() {return navigator.userAgent.match(/Opera Mini/i);},
        Windows: function() {return navigator.userAgent.match(/IEMobile/i);},
        any: function() {return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());}
    };

    if (document.documentElement.scrollWidth<1200) {
        let link_arrow2=document.querySelectorAll('.menu-item-has-children');
       /* for(let k=0; k<link_arrow2.length; k++){
                let next_arrow2=link_arrow2[k].querySelector('.arrow');
                // let this_Arrow2=link_arrow2[k].querySelector('.menu__link');
                let next_submenu2=link_arrow2[k].querySelector('ul');
            link_arrow2[k].addEventListener('click', function(){
                next_arrow2.classList.toggle('active');
                next_submenu2.classList.toggle('open');
                // this_Arrow2.classList.toggle('active');
            });
        };*/

        $('body').on('click', '.menu-link-wrp', function (e) {
            if (e.target.tagName !== "A") {
                e.preventDefault();
                $(this).toggleClass('menu-link-wrp--is-active').stop(true).next('.sub-menu').slideToggle();
                $("body").removeClass("black_bg");
            }
        });
    };

    //Работа бургера
    $('header .burger').click(function(e) {
        e.preventDefault();
        if ($('header').hasClass('open')) {
            
            $('header .wrap_h_all').removeClass('open');
            setTimeout(
                function()
                {
                    $('body').removeClass('no_scroll_no_padding');
                   $('header').removeClass('open'); 
                }, 600);
            
        } else {
            $('body').addClass('no_scroll_no_padding');
            $('header').addClass('open');
            $('header .wrap_h_all').addClass('open');
            setTimeout(
                function()
                {
                    
                }, 2000);
        };
        // $('body').toggleClass('no_scroll_no_padding');
        //     $('header').toggleClass('open');
    });

    //При hover в меню нет прокрутки в десктопе
    $("header .wrap .h_body nav ul.menu_ul > li ").hover(function() {
        $('body').toggleClass('no_scroll');
    });

});

//Обновление работы меню при ресайзе
$(window).on('resize', function(){
    /*if (document.documentElement.scrollWidth<1200) {
        let link_arrow2=document.querySelectorAll('.menu-item-has-children');
        for(let k=0; k<link_arrow2.length; k++){
                let next_arrow2=link_arrow2[k].querySelector('.arrow');
                // let this_Arrow2=link_arrow2[k].querySelector('.menu__link');
                let next_submenu2=link_arrow2[k].querySelector('ul');
            link_arrow2[k].addEventListener('click', function(){
                next_arrow2.classList.toggle('active');
                next_submenu2.classList.toggle('open');
                // this_Arrow2.classList.toggle('active');
            });
        };
    };*/

    if (document.documentElement.scrollWidth>=1200) {
        $('body').removeClass('no_scroll_no_padding black_bg');
        $('header').removeClass('open');
        $('.sub-menu').removeAttr('style');
        $('.menu-link-wrp').off('click');
    }
});


$(window).scroll(function() {
    if ($(window).scrollTop() > 64) {
      $('header .wrap_h_all').addClass('fixed');
    } else {
      $('header .wrap_h_all').removeClass('fixed');
    }
});

$(".menu-item-has-children").on({
    mouseenter: function () {
        $("body").addClass("black_bg");
    },
    mouseleave: function () {
        $("body").removeClass("black_bg");
    }
});
//---Menu end--------------------------------------------------------------------------------





//---popup--------------------------------------------------------------------------------
jQuery(document).ready(function ($) {

    modal_button();
    // All page modals
    var modals = document.querySelectorAll('.modal_form');

    // Get the <span> element that closes the modal
    var spans = document.getElementsByClassName("modal_close");



    // When the user clicks on <span> (x), close the modal
    for (var i = 0; i < spans.length; i++) {
        spans[i].onclick = function() {
            for (var index in modals) {
                if (typeof modals[index].style !== 'undefined') {
                    modals[index].style.display = "none";
                    document.body.classList.remove("no_scroll");
                    document.body.classList.remove("no_scroll_apple");
                    document.body.classList.remove("no_scroll_no_padding");
                    $(".modal_video_content").empty();

                    $(".modal.about_resty .about_resty_video .iframe").empty().hide();
                    $('.about_resty .about_resty_video .video').css("display", "flex");
                }
            }
        }
    };

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target.classList.contains('modal_form') || event.target.classList.contains('modal_close')) {
            for (var index in modals) {
                if (typeof modals[index].style !== 'undefined') {
                    modals[index].style.display = "none";
                    document.body.classList.remove("no_scroll");
                    document.body.classList.remove("no_scroll_apple");
                    document.body.classList.remove("no_scroll_no_padding");
                    $(".modal_video_content").empty();

                    $(".modal.about_resty .about_resty_video .iframe").empty().hide();
                    $('.about_resty .about_resty_video .video').css("display", "flex");
                }
            }
        }
    };

    //Отправка формы и показ финишного окна
    //$(".modal .modal_content .modal_form_content_window .form_body form .btn button").click(function(e) {
        //e.preventDefault();
        //$(this).parent().parent().parent().parent().hide();
        //$(this).parent().parent().parent().parent().parent().find(".modal_form_finish_window").show();
    //});

});
//---popup end--------------------------------------------------------------------------------





//---common--------------------------------------------------------------------------------
jQuery(document).ready(function ($) {
    // $('.screen_saver').click(function(){
    //     $(this).hide();
    //     $(this).parent().find('video').removeClass('hide');
    //     $(this).parent().find('video').get(0).play();
    // });

    $('.about .video').click(function(){
        $(this).find('.screen_saver').hide();
        $(this).html('<iframe class="yvideo" src="https://www.youtube.com/embed/' + $(this).attr('data-kod_youtube') + '?rel=0&autoplay=1&enablejsapi=1&showinfo=0&controls=1&modestbranding=1&rel=0&playsinline=1" frameborder="0" allow="autoplay" allowfullscreen></iframe>');
    });
    $('.about_resty_video').click(function(){
        $(this).find('.video').hide();
        $(this).find(".iframe").css("display", "block").html('<iframe class="yvideo" src="https://www.youtube.com/embed/' + $(this).attr('data-kod_youtube') + '?rel=0&autoplay=1&enablejsapi=1&showinfo=0&controls=1&modestbranding=1&rel=0&playsinline=1" frameborder="0" allow="autoplay" allowfullscreen></iframe>');
    });
});
//---common end--------------------------------------------------------------------------------





//---swiper--------------------------------------------------------------------------------
jQuery(document).ready(function ($) {

    if(typeof $.fancybox == 'function') {
        Fancybox.bind("[data-fancybox]");
    };

    //Работа inline отзывов
    if( $(".reviews_inline_swiper").length ) {
        const reviews_inline_swiper = new Swiper('.reviews_inline_swiper', {
            slidesPerView: "auto",
            spaceBetween: 20,
            scrollbar: {
                el: '.reviews_inline_swiper__scrollbar',
                draggable: true,
                hide: true,
            },
            navigation: {
                nextEl:'.swiper_arrow_right',
                prevEl:'.swiper_arrow_left',
            },
            breakpoints: {
                1200: {
                    slidesPerView: 3,
                },
            }
        });
    };

    //Карусель товаров главная
    if( $(".wrap_main_card").length ) {
        const wrapMainCard = new Swiper('.wrap_main_card', {
            slidesPerView: 'auto',
            spaceBetween: 20,
            navigation: {
                nextEl:'.swiper_main_card_arrow_right',
                prevEl:'.swiper_main_card_arrow_left',
            },
            scrollbar: {
                el: '.wrap_main_card_scrollbar',
                draggable: true,
                hide: true,
            },
            breakpoints: {
                1200: {
                    slidesPerView: 6,
                },
                1360: {
                    slidesPerView: 8,
                },
                1440: {
                    slidesPerView: 9,
                }
            }
        });
    };
    
});
//---swiper end--------------------------------------------------------------------------------

//---card--------------------------------------------------------------------------------
jQuery(document).ready(function ($) {

    if($(".swiper").length) {
        const swiper = new Swiper('.swiper', {
            // slidesPerView: 1,
            // speed: 0,
            navigation: {
                nextEl: '.swiper-btn-next3',
                prevEl: '.swiper-btn-prev3',
            },
        });
    };
    if($("[data-fancybox]").length) {
        Fancybox.bind("[data-fancybox]");
    };

    
    //Работа галереи slider & fancybox
    if($(".swiper_card").length) {
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
    };

    if($(".swiper_cart").length) {
        const swiper_cart = new Swiper('.swiper_cart', {

        });

        swiper_cart.on('slideChange', function () {
            swiper_cart_preview.slideTo(swiper_cart.activeIndex);
            $('.gallery_img .swiper-slide').removeClass("active");
            $('.gallery_img .swiper-slide:nth-child(' + (swiper_cart.activeIndex + 1) + ')').addClass("active");
        });
    };


    
    

    $('.card .switcher .buy_with_resty').click(function()
    {
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
    $('.card .switcher .buy_now').click(function()
    {
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
    //В модалке переключение срока рассрочки
    $('.modal_card .switcher_tabs label').click(function() {
        $(".modal_card .card_price .month").text($(this).find("span").text());
    });

    //Попап видео
    $('.btn_play_video').click(function() {
        $('.gallery_img .item').removeClass("active");
        $(this).addClass("active");
    });
});
//---card end--------------------------------------------------------------------------------





//---sell--------------------------------------------------------------------------------
jQuery(document).ready(function ($)
{
    //Кнопка выбора устройства
    $('.device .btn_select').click(function()
    {
        if ($('.device .type_select').css('display') == "none")
        {
            $('.device .type_select').css('display','flex');
            $('.device').addClass('open');
        } else {
            $('.device .type_select').css('display','none');
            $('.device').removeClass('open');
        };
    });
    //Выбирает название
    $(".device .type_select label").click(function()
    {
        $('.device .btn_select').text($(this).text());
        $(".device .type_select input").prop('checked', false);
        $('.device .type_select').css('display','none');

        $('.device').removeClass('open');
        $('.model').removeClass('inactive');

        var xml_id = $(this).data('xml');
        $('.model .type_select .item').hide();
        $('.model .type_select .item.model_type_xml_'+xml_id).show();

        $('.sell_device_result .card_type_sell').hide();
        $('.sell_device_result .card_type_sell.card_type_sell_'+xml_id).show();

        $('.item.item_xls.item_'+xml_id).trigger('click');


    });
    //Закрытие выбора при клике вне его
    $(document).mouseup( function(e){ // событие клика по веб-документу
        var div = $( ".device" ); // тут указываем ID элемента
        if ( !div.is(e.target) // если клик был не по нашему блоку
            && div.has(e.target).length === 0 ) { // и не по его дочерним элементам
            $('.device .type_select').css('display','none');
            $('.device').removeClass('open');
        }
    });



    //Кнопка выбора модели
    $('.model .btn_select').click(function()
    {
        if ($('.model .type_select').css('display') == "none")
        {
            $('.model .type_select').css('display','flex');
            $('.model').addClass('open');
        }
        else
        {
            $('.model .type_select').css('display','none');
            $('.model').removeClass('open');
        }
    });
    //Выбирает название
    $(".model .type_select label").click(function()
    {
        $('.model .btn_select').text($(this).text());
        $(".model .type_select input").prop('checked', false);
        $('.model .type_select').css('display','none');
        var id = $(this).data('id');
        var xml = $(this).data('xml');
        $('#sell_steps_btn').attr('href', '/sell/steps/?id='+id+'&xml='+xml);
    });
    //Закрытие выбора при клике вне его
    $(document).mouseup( function(e){ // событие клика по веб-документу
        var div = $( ".model" ); // тут указываем ID элемента
        if ( !div.is(e.target) // если клик был не по нашему блоку
            && div.has(e.target).length === 0 ) { // и не по его дочерним элементам
            $('.model .type_select').css('display','none');
            $('.model').removeClass('open');
        }
    });


    //Выбор устройства
    $('.sell_device_tab .item').click(function()
    {
        $(this).parent().find('.item').removeClass('active');
        $(this).addClass('active');

        var xml_id = $(this).data('xml');
        $('.sell_device_result .card_type_sell').hide();
        $('.sell_device_result .card_type_sell.card_type_sell_'+xml_id).show();

    });



    //Инициализация steps
    // $model = "iPhone 16 Pro Max"; //сюда вставляется название модели с предыдущей страницы
    if(typeof $model !== "undefined" )
        init_steps($model);

    //Кнопка Назад
    $('.prev_step').click(function()
    {
        $current_step = $current_step - 1;
        if($current_step<=0)
        {
            // $current_step=1;
            location.href = '/sell/';
            return false;
        }

        update_progresbar($current_step);
        $('.current_step').text($current_step);
        $('.step_items_body .step_item').hide();
        $('.step_items_body .step_item:nth-child(' + $current_step + ')').show();
        update_steps();
    });
    
    //Кнопка Продолжить
    $('.next_step').click(function() {
        if (!$(this).hasClass('inactive')) {
            $current_step = $current_step + 1;
            update_progresbar($current_step);
            $('.current_step').text($current_step);
            $('.step_items_body .step_item').hide();
            $('.step_items_body .step_item:nth-child(' + $current_step + ')').show();
            update_steps();  
        };
    });

    //Инициализация steps
    function init_steps($init_param) {
        $current_step = 1;
        $all_steps = $('.step_items_body .step_item').length;
        $('.summary_model').text($init_param);
        $('.step_item .btn .next_step').addClass('inactive');
        update_progresbar($current_step);
        update_steps();

        $('.all_steps').text($all_steps);
        $('.step_items_body .step_item').hide();
        $('.step_items_body .step_item:first-child').show();

        $init_add = '<div class="row"><span class="param h5">Модель</span><span class="value h6">'+$model+'</span></div>';
        $('.summary_result_details').append($init_add);
        $('.sell_steps .wrap_final_screen').hide();
        $('.sell_steps .wrap_accessory_inline').hide();
    };

    //Обновление progressbar
    function update_progresbar($param) {
        $width_all_bar = $('.progresbar').width();
        if ( $(window).width() < 768) {
            $width_all_bar = $width_all_bar - 120+6;
        } else {
            $width_all_bar = $width_all_bar - 152+6;
        }; 
        $width_current_bar = $width_all_bar / $all_steps * $param;
        $('.steps_indicator .all_bar .current_bar').css('width',$width_current_bar+'px');
    };

    //На последнем шаге показ доп полей
    function update_steps()
    {
        if ($current_step == $all_steps)
        {
            var price = $('#summary_price_value').data('price');
            price = price.toFixed(0);
            $('.step_item .radio .row_radio input:checked, .step_item .checkbox input:checked').each(function()
            {
                var procent = $(this).data('procent');
                procent = procent.toFixed(0);
                price = price*(100-procent)/100;
            });
            price = Math.round(price, 0);
            $('#summary_price_value').html(price);


            $('.show_in_last_step').show();
            $('.wrap_steps .steps_summary').css('display','flex');
            $(window).scrollTop(0);
        }
        else
        {
            $('.show_in_last_step').hide();
            if ( $(window).width() < 768) {
                $('.wrap_steps .steps_summary').css('display','none');
            } else {
                $('.wrap_steps .steps_summary').css('display','flex');
            }; 
            $(window).scrollTop(0);
        };
        
    };

    //Ресайз
    $(window).resize(function(){
        if ($(".sell_steps").length) {
            update_steps();
            update_progresbar($current_step);
        };
    });

    //Клик на radio добавляет/обновляет инфу в summary
    $('.step_item .radio input').change(function()
    {
        $radio_name = $(this).attr("name");
        $radio_capt = $(this).next().find('span').text();
        $radio_add = '<div class="row '+ $radio_name + '"><span class="param h5">'+$(this).parent().parent().parent().parent().find('.head .capt').text()+'</span><span class="value h6">'+$radio_capt+'</span></div>';
        $radio_change = '<span class="param h5">'+$(this).parent().parent().parent().parent().find('.head .capt').text()+'</span><span class="value h6">'+$radio_capt+'</span>';
        if ($('.summary_result_details .row').hasClass($radio_name)) {
            $('.summary_result_details .row.'+$radio_name).empty();
            $('.summary_result_details .row.'+$radio_name).append($radio_change);
        } else {
            $('.summary_result_details').append($radio_add);
        };
        
        if ($radio_name == 'memory') {
            $('.summary_memory').text($radio_capt);
        };

        $(this).parent().parent().parent().parent().find('.btn .next_step').removeClass('inactive');
    });


    //Клик на checkbox добавляет/обновляет инфу в summary
    $('.step_item .checkbox .checkbox_item input').click(function() {
        $checkbox_true = 0;
        $checkbox_array = [];
        $(this).parent().parent().find('.checkbox_item').each(function() {
            
            if($(this).find('input').is(':checked')) {
                $checkbox_true = 1;
                $checkbox_array.push($(this).find('label').text());
            };
        });
        $checkbox_string = $checkbox_array.join(', ');
        $checkbox_name = $(this).parent().parent().data('type');
        $checkbox_add = '<div class="row '+ $checkbox_name + '"><span class="param h5">'+$(this).parent().parent().parent().parent().find('.head .capt').text()+'</span><span class="value h6">'+$checkbox_string+'</span></div>';
        $checkbox_change = '<span class="param h5">'+$(this).parent().parent().parent().parent().find('.head .capt').text()+'</span><span class="value h6">'+$checkbox_string+'</span>';

        if($checkbox_true == 1) {
            if ($('.summary_result_details .row').hasClass($checkbox_name)) {
                $('.summary_result_details .row.'+$checkbox_name).empty();
                $('.summary_result_details .row.'+$checkbox_name).append($checkbox_change);
            } else {
                $('.summary_result_details').append($checkbox_add);
            };
            $(this).parent().parent().parent().find('.btn span').removeClass('inactive');
        } else {
            $('.summary_result_details .row.'+$checkbox_name).remove();
            $(this).parent().parent().parent().find('.btn span').addClass('inactive');
        };

        $(this).parent().parent().find('.checkbox_result input').prop('checked', false);
    });

    $('.step_item .checkbox .checkbox_result input').click(function() {

        $checkbox_name = $(this).parent().parent().data('type');
        $checkbox_capt = $(this).next('label').text();
        $checkbox_add = '<div class="row '+ $checkbox_name + '"><span class="param h5">'+$(this).parent().parent().parent().parent().find('.head .capt').text()+'</span><span class="value h6">'+$checkbox_capt+'</span></div>';
        $checkbox_change = '<span class="param h5">'+$(this).parent().parent().parent().parent().find('.head .capt').text()+'</span><span class="value h6">'+$checkbox_capt+'</span>';

        if($(this).is(':checked')) {
            if ($('.summary_result_details .row').hasClass($checkbox_name)) {
                $('.summary_result_details .row.'+$checkbox_name).empty();
                $('.summary_result_details .row.'+$checkbox_name).append($checkbox_change);
            } else {
                $('.summary_result_details').append($checkbox_add);
            };
            $(this).parent().parent().parent().find('.btn span').removeClass('inactive');
        } else {
            $('.summary_result_details .row.'+$checkbox_name).remove();
            $(this).parent().parent().parent().find('.btn span').addClass('inactive');
        };
        $(this).parent().parent().find('.checkbox_item input').prop('checked', false);
        
    });


    //Кнопка Начать заново в финальном экране
    $('.sell_steps .btn_clear_steps').click(function() {
        $current_step = 1;
        $('.current_step').text($current_step);
        document.getElementById('form_steps').reset();
        $('.summary_result_details .row').remove();
        init_steps($model);
    });

    //Кнопка Оформить продажу
    $('.sell_steps .final_btn').click(function(e)
    {
        e.preventDefault();

        var errors = 0;
        $('#form_steps input').removeClass('error');
        $('#form_steps input:required').each(function()
        {
            if($(this).val()=='')
            {
                $(this).addClass('error');
                errors++;
            }
        });

        if(errors>0)
            return false;


        $("#SELL_PRICE").val($('#summary_price_value').html());
        var info = '';
        $('.summary_result_details .row').each(function()
        {
            info = info + $(this).find('.h5').html() + ' : ' + $(this).find('.h6').html() + " | \n";
        });

        $('#SELL_INFO').val(info);
        $('#SELL_ISB').val(100);
        var x_form = $('#form_steps').serialize();
        $.ajax({
            type: 'POST',
            url: "/local/ajax.php",
            data: x_form,
            //dataType: 'json',
            success: function (data)
            {
                $('#form_steps').hide();
                $('.sell_steps .wrap_final_screen').show();
                $('.sell_steps .wrap_accessory_inline').show();
                $(window).scrollTop(0);
            },
            error: function (xhr, str)
            {
                alert('Ошибка отправки');
                return false;
            }
        });
        return false;
    });

});


//---sell end--------------------------------------------------------------------------------



//---cart--------------------------------------------------------------------------------
jQuery(document).ready(function ($) {
    
    //Шаги корзины
    init_cart_steps();

    $('.cart_prev_step').click(function()
    {
        if ($(".cart_step_1").hasClass("active"))
        {
            var url = $(".cart_step_1").data('url');
            location.href = url;
            return false;
        } else
        {
            $('.upd_cart h1').text("Защитите ваше устройство");
            $('.cart_steps_head .step_1_label').addClass("active");
            $('.cart_steps_head .step_2_label').removeClass("active");
            $('.cart_step_1').addClass("active");
            $('.cart_step_2').removeClass("active");
        };
        $(window).scrollTop(0);
    });

    $('.cart_next_btn').click(function()
    {
        if ($(".cart_step_1").hasClass("active"))
        {
            $('.upd_cart h1').text("Добавьте аксессуары к вашему устройству");
            $('.cart_steps_head .step_1_label').removeClass("active");
            $('.cart_steps_head .step_2_label').addClass("active");
            $('.cart_step_1').removeClass("active");
            $('.cart_step_2').addClass("active");
        } else
        {
            //var url = $(".cart_step_1").data('url');
            //location.href = url;
            location.href = '/cart/';
            return false;
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

        //Шаг 1 - кнопку Развернуть показать/скрыть если элементов больше чем задано
        $step1_max_items = 6;
        if ($('.cart_step_1 .wrap_items .card_type_1').length > $step1_max_items) {
            $('.cart_step_1 .wrap_items .card_type_1').hide();
            for ( let i = 0; i <= $step1_max_items; i++) {
                $('.cart_step_1 .wrap_items .card_type_1:nth-child(' + i + ')').show();
            };
            $('.cart_step_1 .more_items').show();
        } else {
            $('.cart_step_1 .more_items').hide();
        };

        $('.cart_step_1 .more_items').click(function(e) {
            e.preventDefault();
            $(this).parent().find('.card_type_1').show();
            $('.cart_step_1 .more_items').hide();
        });

        //Шаг 2 - кнопку Развернуть показать/скрыть если элементов больше чем задано
        $step2_max_items = 6;
        if ($('.cart_step_2 .wrap_items .card_type_1').length > $step2_max_items) {
            $('.cart_step_2 .wrap_items .card_type_1').hide();
            for ( let i = 0; i <= $step2_max_items; i++) {
                $('.cart_step_2 .wrap_items .card_type_1:nth-child(' + i + ')').show();
            };
            $('.cart_step_2 .more_items').show();
        } else {
            $('.cart_step_2 .more_items').hide();
        };

        $('.cart_step_2 .more_items').click(function(e) {
            e.preventDefault();
            $(this).parent().find('.card_type_1').show();
            $('.cart_step_2 .more_items').hide();
        });
    };
    //Конец Шаги корзины

    //Добавить аксессуары в корзине
    init_cart_add();

    // $('.cart_prev_step').click(function() {
    //     if ($(".cart_step_1").hasClass("active")) {
    //         window.location.href = "#";
    //     } else {
    //         $('.upd_cart h1').text("Защитите ваше устройство");
    //         $('.cart_steps_head .step_1_label').addClass("active");
    //         $('.cart_steps_head .step_2_label').removeClass("active");
    //         $('.cart_step_1').addClass("active");
    //         $('.cart_step_2').removeClass("active");
    //     };
    //     $(window).scrollTop(0);
    // });
    // $('.cart_next_btn').click(function() {
    //     if ($(".cart_step_1").hasClass("active")) {
    //         $('.upd_cart h1').text("Добавьте аксессуары к вашему устройству");
    //         $('.cart_steps_head .step_1_label').removeClass("active");
    //         $('.cart_steps_head .step_2_label').addClass("active");
    //         $('.cart_step_1').removeClass("active");
    //         $('.cart_step_2').addClass("active");
    //     } else {
    //         window.location.href = "#";
    //     };
    //     $(window).scrollTop(0);
    // });
    //Инициализация steps
    function init_cart_add() {
        //Шаг 1 - кнопку Развернуть показать/скрыть если элементов больше чем задано
        $step1_max_items = 6;
        if ($('.upd_cart_add .wrap_items .card_type_1').length > $step1_max_items) {
            $('.upd_cart_add .wrap_items .card_type_1').hide();
            for ( let i = 0; i <= $step1_max_items; i++) {
                $('.upd_cart_add .wrap_items .card_type_1:nth-child(' + i + ')').show();
            };
            $('.upd_cart_add .more_items').show();
        } else {
            $('.upd_cart_add .more_items').hide();
        };

        $('.upd_cart_add .more_items').click(function(e) {
            e.preventDefault();
            $(this).parent().find('.card_type_1').show();
            $('.upd_cart_add .more_items').hide();
        });

    };
    //Конец Добавить аксессуары в корзине





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
    //cart_item Рассрочка
    /*
    $('.cart_item .switcher_period_pay span').click(function()
    {        $(this).parent().find("span").removeClass("active");
        $(this).addClass("active");
        $(this).parent().parent().parent().find('.month').text($(this).text());
    });
    */

    //popup_cart_add_item
    $('.modal_card .card_switcher .buy_with_resty').click(function() {
        $(this).addClass("active");
        $(this).parent().find(".buy_now").removeClass("active");
        $(this).parent().parent().parent().find(".switcher_tabs").css('display', 'flex');
    });
    $('.modal_card .card_switcher .buy_now').click(function() {
        $(this).addClass("active");
        $(this).parent().find(".buy_with_resty").removeClass("active");
        
        $(this).parent().parent().parent().find(".switcher_tabs").css('display', 'none');
    });


    //Плавающая кнопка
    if($(".btn_fixed").length) {
        btn_fixed();
    };
    

    $(window).on('resize', function(){
        if($(".btn_fixed").length) {
            if ( $(window).width() < 768) {
                $('.btn_fixed').show();
                btn_fixed();
            } else {
                $('.btn_fixed').hide();
            };
        };
    });
    //Конец Корзина

});


//---cart end--------------------------------------------------------------------------------



//---Добавить отзыв--------------------------------------------------------------------------------
var dt = new DataTransfer();
 
$('.input-file input[type=file]').on('change', function(){
	let $files_list = $(this).closest('.input-file').next();
	$files_list.empty();
 
	for(var i = 0; i < this.files.length; i++){
		let new_file_input = '<div class="input-file-list-item">' +
			'<span class="input-file-list-name">' + this.files.item(i).name + '</span>' +
			'<a href="#" onclick="removeFilesItem(this); return false;" class="input-file-list-remove">x</a>' +
			'</div>';
		$files_list.append(new_file_input);
		dt.items.add(this.files.item(i));
	};
	this.files = dt.files;
});
 
function removeFilesItem(target){
	let name = $(target).prev().text();
	let input = $(target).closest('.input-file-row').find('input[type=file]');	
	$(target).closest('.input-file-list-item').remove();	
	for(let i = 0; i < dt.items.length; i++){
		if(name === dt.items[i].getAsFile().name){
			dt.items.remove(i);
		}
	}
	input[0].files = dt.files;  
}
//---Добавить отзыв end--------------------------------------------------------------------------------


//---Service--------------------------------------------------------------------------------
jQuery(document).ready(function ($) {
    if ( $(window).width() < 768) {
        
        $(".device_problem .carousel_item_device_problem label").click(function() {
            function scrollToAnchor(aid){
                var aTag = $('#repair_price');
                $('html,body').animate({scrollTop: aTag.offset().top - 68},'slow');
            }
            scrollToAnchor('#repair_price');
        });
    };
});
//---Service end--------------------------------------------------------------------------------



//---Map--------------------------------------------------------------------------------
if($("#map").length) {
    let center = [53.93905707061807,27.446559499999992];
    function init() {
        let map = new ymaps.Map('map',{
            center: center,
            zoom: 14
        });

        let placemark = new ymaps.Placemark(center,{},{
            iconLayout: 'default#image',
            iconImageHref: '/local/templates/resty/icons/pin.svg',
            iconImageSize: [48,48]
        });

        map.controls.remove('geolocationControl');
        map.controls.remove('searchControl');
        map.controls.remove('trafficControl');
        map.controls.remove('typeSelector');
        map.controls.remove('rulerControl');
        map.controls.remove('fullscreenControl');
        map.controls.remove('zoomControl');
        map.controls.remove('scrollControl');

        map.geoObjects.add(placemark);
    };

    ymaps.ready(init);
};
//---Map end--------------------------------------------------------------------------------


jQuery(document).ready(function ($)
{

    let type_list_open_arr = {};
    function type_list_open()
    {
        $('.type_list .item').each(function()
        {
            let f_count = $(this).parent().data('filter_count');
            if ($(this).parent().find(".item").length > f_count)
            {
                if ($(this).index() >= f_count)
                {
                    $(this).hide();
                }
            }
            else
            {
                $(this).parent().find(".item_btn").hide();
            }
        });

        filter_more_click();
    }

    function filter_more_click()
    {
        $(".upd_catalog").on('click', ".filter_more", function(){
            let id = $(this).data('id');
            if ($(this).hasClass("open"))
            {
                type_list_open_arr[id] = 0;
                $(this).parent().parent().find(".item").each(function() {
                    if ($(this).index() >= $(this).parent().data('filter_count')) {
                        $(this).hide();
                    }
                });
            }
            else
            {
                $(this).parent().parent().find(".item").show();
                type_list_open_arr[id] = 1;
            }
            $(this).toggleClass("open");

            set_cookie('type_list_open_arr', JSON.stringify(type_list_open_arr));
        });
    }
    type_list_open();
});



jQuery(document).ready(function ($) {
    $(window).scroll(function(){
        if($(window).scrollTop() > 100) {
            $('.go_to_top').show();
        } else {
            $('.go_to_top').hide();
        }
    });
    $('.go_to_top').click(function() {
        $('html, body').animate({scrollTop: 0}, 600);
    });
});


const mq = window.matchMedia('(max-width: 1200px)');
function serviceCatalogSliderOptions(scrollbar) {
    return {
        spaceBetween: 20,
        slidesPerView: 'auto',
        scrollbar: {
            el: scrollbar,
            hide: true,
            draggable: true,
        },
    };
}
let serviceCatalogSlider, serviceCatalogModelSlider;
function initServiceSwiper(e) {
    if($('.service-catalog').length) {
        if (e.matches) {
            serviceCatalogSlider = new Swiper(".service-catalog", serviceCatalogSliderOptions(document.querySelector('.service-catalog__scrollbar')));

        } else {
            if (serviceCatalogSlider) {
                serviceCatalogSlider.destroy();
                serviceCatalogSlider = null; // Обнуляем
            }
        }
    }
}

function initServiceModelSwiper(e) {
    if($('.service-catalog-model').length) {
        if (e.matches) {
            serviceCatalogModelSlider = new Swiper(".service-catalog-model", serviceCatalogSliderOptions(document.querySelector('.service-catalog-model__scrollbar')));

        } else {
            if (serviceCatalogModelSlider) {
                serviceCatalogModelSlider.destroy();
                serviceCatalogModelSlider = null; // Обнуляем
            }
        }
    }
}

mq.addListener(initServiceSwiper);
initServiceSwiper(mq);

jQuery(document).ready(function ($)
{
    let body = $('body');

    $('.about .video').click(function(){
        $(this).find('.screen_saver').hide();
        $(this).html('<iframe class="yvideo" src="https://www.youtube.com/embed/' + $(this).attr('data-kod_youtube') + '?rel=0&autoplay=1&enablejsapi=1&showinfo=0&controls=1&modestbranding=1&rel=0&playsinline=1" frameborder="0" allow="autoplay" allowfullscreen></iframe>');
    });

    body.on('click', '.js-schedule', function (e) {
        $(this).toggleClass('js-schedule--is-active');
        $('.js-schedule-content').stop(true).slideToggle();
    });

    body.on('click', '.js-card-price-info-button', function (e) {
        $(this).toggleClass('js-card-price-info-button--is-active');
        $('.js-card-price-info').stop(true).slideToggle();
    });

    // Карусель каталога
    const catalogSlider = document.querySelectorAll(".catalog-slider");
    let catalogSliderStart;

    catalogSlider.forEach((e) => {
        let catalogSliderBody = e.querySelector('.catalog-slider__body'),
            next = e.querySelector('.catalog-slider__arrow--right'),
            prev = e.querySelector('.catalog-slider__arrow--left'),
            scrollbar = e.querySelector('.swiper-scrollbar');

        catalogSliderStart = new Swiper(catalogSliderBody, {
            spaceBetween: 8,
            slidesPerView: 'auto',
            scrollbar: {
                el: scrollbar,
                hide: true,
                draggable: true,
            },
            navigation: {
                nextEl: next,
                prevEl: prev,
            },
            breakpoints: {
                768: {
                    slidesPerView: 'auto',
                    spaceBetween: 20,
                }
            },
            on: {
                init: function () {
                    $(this.el).find('.catalog-slider-shadow').addClass('catalog-slider-shadow--first');
                },
                realIndexChange: function () {
                    let sliderShadow = $(this.el).find('.catalog-slider-shadow');
                    if (this.isEnd) {
                        sliderShadow.addClass('catalog-slider-shadow--last');
                        sliderShadow.removeClass('catalog-slider-shadow--first');
                    } else {
                        sliderShadow.removeClass('catalog-slider-shadow--last');
                        sliderShadow.addClass('catalog-slider-shadow--first');
                    }
                },
                reachEnd: function (swiper) {
                    let sliderShadow = $(this.el).find('.catalog-carousel-shadow');
                    sliderShadow.addClass('catalog-slider-shadow--last');
                    sliderShadow.removeClass('catalog-slider-shadow--first');
                }
            }
        });
    });
});

document.addEventListener('click', function (event) {
    // Проверяем, что клик был именно по нашей кнопке
    if (event.target && event.target.classList.contains('js-show-more')) {
        // Находим ближайшую форму к этой кнопке
        var form = event.target.closest('.carousel_form');

        if (form) {
            form.classList.add('is-expanded');
            form.classList.remove('js-collapsed');
        }
    }
});