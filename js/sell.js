jQuery(document).ready(function ($) {

    //Кнопка выбора устройства
    $('.device .btn_select').click(function() {
        if ($('.device .type_select').css('display') == "none") {
            $('.device .type_select').css('display','flex');
            $('.device').addClass('open');
        } else {
            $('.device .type_select').css('display','none');
            $('.device').removeClass('open');
        };
    });
    //Выбирает название
    $(".device .type_select label").click(function() {
        $('.device .btn_select').text($(this).text());
        $(".device .type_select input").prop('checked', false);
        $('.device .type_select').css('display','none');

        $('.device').removeClass('open');
        $('.model').removeClass('inactive');


            


    });
    //Закрытие выбора при клике вне его
    $(document).mouseup( function(e){ // событие клика по веб-документу
        var div = $( ".device" ); // тут указываем ID элемента
        if ( !div.is(e.target) // если клик был не по нашему блоку
            && div.has(e.target).length === 0 ) { // и не по его дочерним элементам
            $('.device .type_select').css('display','none');
        }
    });



    //Кнопка выбора модели
    $('.model .btn_select').click(function() {
        if ($('.model .type_select').css('display') == "none") {
            $('.model .type_select').css('display','flex');
            $('.model').addClass('open');
        } else {
            $('.model .type_select').css('display','none');
            $('.model').removeClass('open');
        };
    });
    //Выбирает название
    $(".model .type_select label").click(function() {
        $('.model .btn_select').text($(this).text());
        $(".model .type_select input").prop('checked', false);
        $('.model .type_select').css('display','none');
    });
    //Закрытие выбора при клике вне его
    $(document).mouseup( function(e){ // событие клика по веб-документу
        var div = $( ".model" ); // тут указываем ID элемента
        if ( !div.is(e.target) // если клик был не по нашему блоку
            && div.has(e.target).length === 0 ) { // и не по его дочерним элементам
            $('.model .type_select').css('display','none');
        }
    });


    //Выбор устройства
    $('.sell_device_tab .item').click(function() {
        $(this).parent().find('.item').removeClass('active');
        $(this).addClass('active');
    });







    //Инициализация steps
    $model = "iPhone 16 Pro Max"; //сюда вставляется название модели с предыдущей страницы
    init_steps($model);

    //Кнопка Назад
    $('.prev_step').click(function() {
        $current_step = $current_step - 1;
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
    function update_steps() {
        if ($current_step == $all_steps) {
            $('.show_in_last_step').show();
            $('.wrap_steps .steps_summary').css('display','flex');
        } else {
            $('.show_in_last_step').hide();
            if ( $(window).width() < 768) {
                $('.wrap_steps .steps_summary').css('display','none');
            } else {
                $('.wrap_steps .steps_summary').css('display','flex');
            }; 
        };
        $(window).scrollTop(0);
    };

    //Ресайз
    $(window).resize(function(){
        update_steps();
        update_progresbar($current_step);
    });

    //Клик на radio добавляет/обновляет инфу в summary
    $('.step_item .radio input').change(function() {
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
    $('.sell_steps .final_btn').click(function(e) {
        e.preventDefault();

        //Сюда вставить обработку формы

        $('#form_steps').hide();
        $('.sell_steps .wrap_final_screen').show();
        $('.sell_steps .wrap_accessory_inline').show();
        $(window).scrollTop(0);
    });

});

