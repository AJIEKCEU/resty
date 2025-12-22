"use strict"

//Добавляет стрелочку в пункты меню если есть второй уровень
let arrow=document.querySelectorAll('.sub-menu');
for(let j=0; j<arrow.length; j++){
    let thisLink1=arrow[j].previousElementSibling;
    let thisArrow1=arrow[j];
    thisArrow1.insertAdjacentHTML('beforebegin', '<span class="menu__arrow arrow"></span>');
    arrow[j].addEventListener('click', function(){
        // subMenu.classList.toggle('open');
        // thisArrow.classList.toggle('active');
    });
};

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


jQuery(document).ready(function ($) {

    if (document.documentElement.scrollWidth<1200) {
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
    if (document.documentElement.scrollWidth<1200) {
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
    };

    if (document.documentElement.scrollWidth>=1200) {
        $('body').removeClass('no_scroll_no_padding');
        $('header').removeClass('open');
    }
});


$(window).scroll(function() {
    if ($(window).scrollTop() > 64) {
      $('header .wrap_h_all').addClass('fixed');
    } else {
      $('header .wrap_h_all').removeClass('fixed');
    }
  });

//Затемнение фона при раскрытии подменю
$("header .wrap_h_all .wrap_h_body .h_body .wrap_menu nav .menu_ul li.menu-item-has-children").hover(function() {
    $("body").toggleClass("black_bg");
});