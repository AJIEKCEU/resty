var cookie_time = 30 * 24 * 3600 * 1000;
var isb = 0;

function isb_update()
{
    $(document).on("scroll", function()
    {
        isb++;
    });
    $("input, textarea").on("keyup", function(){isb++;});
}

function set_cookie(name, value, expire) {
    var exp = new Date();
    var cookieexpire = exp.getTime() + expire;
    exp.setTime(cookieexpire);
    document.cookie = name + "=" + value + ";path=/;expires=" + exp.toGMTString()
}

function get_cookie(name) {
    var pattern = "(?:; )?" + name + "=([^;]*);?";
    var regexp = new RegExp(pattern);
    if (regexp.test(document.cookie))
        return decodeURIComponent(RegExp["$1"]);
    return !1
}

function delete_cookie(name, path, domain) {
    set_cookie(name, null, 0);
    return !0
}

function array_unique(inArr) {
    var uniHash = {},
        outArr = [],
        i = inArr.length;
    while (i--) uniHash[inArr[i]] = i;
    for (i in uniHash) outArr.push(i);
    return outArr
}

function x_form_update()
{
    $(".x_form").on("submit", function(e)
    {
        e.preventDefault();
        var contact_form = $(this).hasClass('contact_form');
        $(this).find('input:required').removeClass('error');
        var errors = 0;
        $(this).find('input:required').each(function()
        {
            if($(this).val()=='')
                errors++;
        });

        if(errors>0)
            return false;

        $(this).append('<input type="hidden" name="ISB" value="'+isb+'" />');
        var x_form = $(this).serialize();
        $.ajax({
            type: 'POST',
            url: "/local/ajax.php",
            data: x_form,
            //dataType: 'json',
            success: function (json)
            {
                gtag('event', 'form_submit', {'event_category' : 'form_submit_lead'});

                //$(".modal_form").trigger("click");
                //$("#thanks_btn").trigger("click");
            },
            error: function (xhr, str)
            {
                return false;
            }
        });

        if(!contact_form)
        {
            $(this).parent().parent().hide();
            $(this).parent().parent().parent().find(".modal_form_finish_window").show();
        }
        else
        {
            $("#thanks_btn").trigger("click");
            $(this).find('input:required, textarea:required').val('');
        }

        return false;
    });

}

function go_next_catalog_page(url)
{
    $.get(url, {}, function(data)
    {
        var html_ = $(data).find('#products_div').html();
        $('#products_div').html(html_);
        update_product_more_items();

        var destination = $("#products_div").offset().top-90;
        $('html, body').animate({ scrollTop: destination }, 800);
    });
}
$(document).ready(function()
{
    isb_update();
    x_form_update();
    $("input[type='tel']").each(function(){$(this).mask("+375 (99)-999-99-99")});

    function modal_repair()
    {
        $(".modal_repair").on("click", function()
        {
            var id = $(this).data('productid');
            var model = $(this).data('model');
            var usluga = $(this).data('usluga');
            var gar = $(this).data('gar');

            var name = $(".model_radio:checked").data('device');
            var price = $("#repair_product_price_"+id).html();


            $('.modal_repair_model').html(name);
            $('.modal_repair_price').html(price);
            $('.modal_repair_work').html(usluga);
            $('.modal_repair_gar').html(gar);




            var model_radio_id = $(".model_radio:checked").val();
            var img_url = $("#model_radio_img_"+model_radio_id).attr("src");
            $("#REPAIR_INFO_IMG").attr("src", img_url);
            $("#REPAIR_INFO_P").html("Модель: " + model + "<br />Услуга:" + name + "<br />Стоимость: "+price);
            $("#REPAIR_INFO").val("Модель: " + model + "\nУслуга:" + name + "\nСтоимость: "+price);
        });
    }

    function update_radio()
    {
        $(".class_radio").unbind("change");
        $(".class_radio").on("change", function()
        {
            var CLASS_VALUE = $(this).val();
            var TOKEN = $("#service_token").val();
            $.post('/local/ajax.php', {ACTION: 'x_get_service_years', ISB:'100', TOKEN:TOKEN, CLASS_VALUE:CLASS_VALUE}, function(data)
            {
                $(".device_year").html("");
                $(".carousel_items_service").html("");
                $(".repair_price").html("");
                $(".option_device").html("");

                $(".device_year").html(data);
                update_radio();

                $(".year_radio").first().trigger('click');

            });
        });


        $(".year_radio").unbind("change");
        $(".year_radio").on("change", function()
        {
            var YEAR_VALUE = $(this).val();
            var TOKEN = $("#service_token").val();
            $.post('/local/ajax.php', {ACTION: 'x_get_service_models', ISB:'100', TOKEN:TOKEN, YEAR_VALUE:YEAR_VALUE}, function(data)
            {
                $(".carousel_items_service").html("");
                $(".option_device").html("");
                $(".repair_price").html("");

                $(".carousel_items_service").html(data);
                update_radio();
            });
        });

        $(".model_radio").unbind("change");
        $(".model_radio").on("change", function()
        {
            $(".option_device").html("");
            $(".repair_price").html("");
            var MODEL_VALUE = $(this).val();
            var TOKEN = $("#service_token").val();
            $.post('/local/ajax.php', {ACTION: 'x_get_service_price', ISB:'100', TOKEN:TOKEN, MODEL_VALUE:MODEL_VALUE}, function(data)
            {
                $(".device_problem_repair_price").html(data);
                update_radio();
                update_modals();
                var destination = $(".device_problem").offset().top-30;
                $('html, body').animate({ scrollTop: destination }, 800);
                modal_repair();
            });
        });


        $(".problem_radio").unbind("change");
        $(".problem_radio").on("change", function()
        {
            var id = $(this).val();
            var destination = $("#repair_price").offset().top-30;
            $('html, body').animate({ scrollTop: destination }, 800);

            if(id=='0')
            {
                $('.carousel_item_repair_price_block').show();
                return;
            }

            $('.carousel_item_repair_price_block').hide();
            $('.carousel_item_repair_price_block.group_'+id).show();
        });







    }

    update_radio();
    if($(".class_radio").length>0)
    {
        $(".class_radio").first().trigger("click");
    }

    // ----------------------------- MODAL
    //update_modals();
    function update_modals()
    {
        // All page modals
        var modals = document.querySelectorAll('.modal_form');

        // Get the <span> element that closes the modal
        var spans = document.getElementsByClassName("modal_close");

        $(".modal_button").click(function(e) {
            // e.preventDefault();
            $("body").addClass("no_scroll");
            $tmp = $(this).attr('data-id');
            $("#"+$tmp).css("display","flex");
            $(".modal .modal_content .modal_form_content_window").show();
            $(".modal .modal_content .modal_form_content_window .form_body form").trigger("reset");
            $(".modal .modal_content .modal_form_finish_window").hide();
            $(".modal_video_content").html('<iframe class="yvideo" src="https://www.youtube.com/embed/' + $(this).attr('data-kod_youtube') + '?rel=0&autoplay=1&enablejsapi=1&showinfo=0&controls=1&modestbranding=1&rel=0&playsinline=1" frameborder="0" allow="autoplay" allowfullscreen></iframe>');
        });

        // When the user clicks on <span> (x), close the modal
        for (var i = 0; i < spans.length; i++) {
            spans[i].onclick = function() {
                for (var index in modals) {
                    if (typeof modals[index].style !== 'undefined') {
                        modals[index].style.display = "none";
                        document.body.classList.remove("no_scroll");
                        $(".modal_video_content").empty();
                    }
                }
            }
        };

        // When the user clicks anywhere outside of the modal, close it
        window.onclick = function(event) {
            if (event.target.classList.contains('modal_form')) {
                for (var index in modals) {
                    if (typeof modals[index].style !== 'undefined') {
                        modals[index].style.display = "none";
                        document.body.classList.remove("no_scroll");
                        $(".modal_video_content").empty();
                    }
                }
            }
        };

        //Отправка формы и показ финишного окна
        //$(".modal .modal_content .modal_form_content_window .form_body form .btn button").click(function(e) {
        //    e.preventDefault();
        //    $(this).parent().parent().parent().parent().hide();
        //    $(this).parent().parent().parent().parent().parent().find(".modal_form_finish_window").show();
        //});
    }
    // ----------------------------- END MODAL
    setInterval(function()
    {
        $(".no-ajax").each(function()
        {
            $(this).attr('onclick', '');
        });
    }, 300);




    $('.screen_saver').click(function(){
        $(this).hide();
        $(this).parent().find('video').removeClass('hide');
        $(this).parent().find('video').get(0).play();
    });
});