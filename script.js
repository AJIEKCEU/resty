jQuery(document).ready(function ($) {
    $('#header').load('/modules/header.html');
    $('#footer').load('/modules/footer.html');
    $('#popular_goods').load('/modules/popular_goods.html');
    $('#change').load('/modules/change_goods.html');
    $('#how_resty_work').load('/modules/how_resty_work.html');
    $('#accessories').load('/modules/accessories.html');
    $('#promo').load('/modules/promo.html');
    $('#benefits').load('/modules/benefits.html');
    $('#reviews').load('/modules/reviews.html');
    // $('#popup').load('/modules/popup.html');
    $('#breadcrumbs').load('/modules/breadcrumbs.html', function () {// После загрузки контента, будет выполнена эта функция
        let titleText = $('title').text();// назначаем переменную в которую помещаем из <title> страницы текст
        $('#breadcrumbs').find('h1').text(titleText);// Находим в #breadcrumbs <h1> и в него вписываем текст из нашей переменной
    });
    
});

