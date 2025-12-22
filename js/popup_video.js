jQuery(document).ready(function ($) {
    // // Get the button that opens the modal
    // var btn = document.querySelectorAll(".modal_video_button");

    // // All page modals
    // var modals = document.querySelectorAll('.modal_video_form');

    // // Get the <span> element that closes the modal
    // var spans = document.getElementsByClassName("modal_video_close");

    // // When the user clicks the button, open the modal
    // for (var i = 0; i < btn.length; i++) {
    // btn[i].onclick = function(e) {
    //     e.preventDefault();
    //     document.body.classList.add("no_scroll");
    //     modal = document.querySelector("#popup_video");
    //     modal.style.display = "flex";
    //     $(".modal_video_content").html('<iframe class="yvideo" src="https://www.youtube.com/embed/' + e.target.getAttribute("data-kod_youtube") + '?rel=0&autoplay=1&enablejsapi=1&showinfo=0&controls=1&modestbranding=1&rel=0&playsinline=1" frameborder="0" allow="autoplay" allowfullscreen></iframe>');
        
    // }
    // }

    // // When the user clicks on <span> (x), close the modal
    // for (var i = 0; i < spans.length; i++) {
    //     spans[i].onclick = function() {
    //         for (var index in modals) {
    //             if (typeof modals[index].style !== 'undefined') {
    //                 $(".modal_video_content").empty();
    //                 modals[index].style.display = "none";
    //                 document.body.classList.remove("no_scroll"); 
    //             }  
    //         }
    //     }
    // }

    // // When the user clicks anywhere outside of the modal, close it
    // window.onclick = function(event) {
    //     if (event.target.classList.contains('modal_video_form')) {
    //         for (var index in modals) {
    //             if (typeof modals[index].style !== 'undefined') {
    //                 $(".modal_video_content").empty();
    //                 modals[index].style.display = "none";
    //                 document.body.classList.remove("no_scroll"); 
    //             }   
    //         }
    //     }
    // }
});