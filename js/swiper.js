jQuery(document).ready(function ($) {

    //Работа inline отзывов
    const reviews_inline_swiper = new Swiper('.reviews_inline_swiper', {
        slidesPerView: 1,
        spaceBetween: 20,
        navigation: {
            nextEl:'.swiper_arrow_right',
            prevEl:'.swiper_arrow_left',
        },
        breakpoints: {
            0: {
                slidesPerView: 1,
                autoHeight: true,
            },
            768: {
                slidesPerView: 2,
                autoHeight: false,
            },
            960: {
                slidesPerView: 3,
            }
        }
    });


});