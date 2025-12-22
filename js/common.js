jQuery(document).ready(function ($) {


    $('.screen_saver').click(function(){
        $(this).hide();
        $(this).parent().find('video').removeClass('hide');
        $(this).parent().find('video').get(0).play(); 
    });


});