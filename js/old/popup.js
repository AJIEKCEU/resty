
jQuery(document).ready(function ($) {
    return;
    // All page modals
    var modals = document.querySelectorAll('.modal_form');

    // Get the <span> element that closes the modal
    var spans = document.getElementsByClassName("modal_close");

    $(".modal_button").click(function(e) {
        e.preventDefault();
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

});