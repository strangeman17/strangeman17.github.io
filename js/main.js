function explode(){
    $(".top-video-info").addClass('in');
}
setTimeout(explode, 400);



var player;

// this function gets called when API is ready to use
function onYouTubePlayerAPIReady() {
    // create the global player from the specific iframe (#video)
    player = new YT.Player('video', {
        events: {
            // call this function when player is ready to use
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

onPlayerStateChange = function (event) {
    if (event.data == YT.PlayerState.ENDED) {
        $('.top-video-mask').removeClass('off');
        $('.top-video-info').removeClass('out').addClass('in');
    }
    if(event.data == YT.PlayerState.unstarted){
        $('.top-video-mask').addClass('off');
        $('.top-video-info').removeClass('in').addClass('out');
    }
    if (event.data == YT.PlayerState.PLAYING) {
        $('.top-video-mask').addClass('off');
        $('.top-video-info').removeClass('in').addClass('out');
    }
};

function onPlayerReady(event) {

    // bind events
    var playButton = document.getElementById("play-button");
    playButton.addEventListener("click", function() {
        $('.top-video-mask').addClass('off');
        $('.top-video-info').removeClass('in').addClass('out');
        player.playVideo();
    });
    function changeBg() {
        var bg = $(".ytp-cued-thumbnail-overlay");
        bg.css('background-size', 'auto 100%!important;')
    }
    changeBg();

}

// Inject YouTube API script
var tag = document.createElement('script');
tag.src = "//www.youtube.com/player_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);


$(document).ready(function(){
    $("#nav-menu").on("click","a", function (event) {
        event.preventDefault();
        //забираем идентификатор бока с атрибута href
        var id  = $(this).attr('href'),
        //узнаем высоту от начала страницы до блока на который ссылается якорь
            top = $(id).offset().top;
        //анимируем переход на расстояние - top за 1500 мс
        $('body,html').animate({scrollTop: top}, 1500);
    });
});
$(document).ready(function(){
    $("#logo").on("click","a", function (event) {
        event.preventDefault();
        //забираем идентификатор бока с атрибута href
        var id  = $(this).attr('href'),
        //узнаем высоту от начала страницы до блока на который ссылается якорь
            top = $(id).offset().top;
        //анимируем переход на расстояние - top за 1500 мс
        $('body,html').animate({scrollTop: top}, 1500);
    });
});





$(function () {

    $('button:not(#questionSend, .book .button)').click(function() {
        // Для исправления ошибки верстки с вложенным a внутрь button, которое не работает в Firefox
        var link = $(this).find('a');
        window.location.href = $(link).attr('href');
    });

$('.messages-wrapper').slick({
   arrows: false,
    slidesToShow: 3,
    infinite: false,
    dots: false,
    slidesToScroll: 1,
    responsive: [
        {
            breakpoint: 1200,
            settings: {
                dots: false,
                infinite: true,
                speed: 300,
                slidesToShow: 1,
                centerMode: true,
                variableWidth: true
            }
        }
        ]
});


    $('.video-for').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        fade: true,
        infinite: false,
        asNavFor: '.video-nav'
    });
    var videoNav = $('.video-nav');

    videoNav.on('init', function(){
        var videoTitle = videoNav.find('.slick-current').data('video-title');
        var videoDesc = videoNav.find('.slick-current').data('video-desc');
        $('.title-full-video').html(videoTitle);
        $('.text-full-video').html(videoDesc);
    });
    videoNav.slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        asNavFor: '.video-for',
        dots: false,
        arrows: true,
        focusOnSelect: true,
        infinite: false,
        nextArrow: '<i class="prod-ic-angle-right" aria-hidden="true"></i>',
        prevArrow: '<i class="prod-ic-angle-left" aria-hidden="true"></i>',
        responsive: [
            {
                breakpoint: 1000,
                settings: {
                    centerMode: false,
                    variableWidth: false
                }
            },
            {
                breakpoint: 420,
                settings: {
                    dots: false,
                    infinite: true,
                    speed: 300,
                    slidesToShow: 1,
                    centerMode: true,
                    variableWidth: true
                }
            }
        ]
    }).on('beforeChange', function(event, slick, currentSlide, nextSlide){
        var videoTitle = slick.$slides.eq(nextSlide).data('video-title');
        var videoDesc = slick.$slides.eq(nextSlide).data('video-desc');
        $('.title-full-video').html(videoTitle);
        $('.text-full-video').html(videoDesc);
    });





    $('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
        disableOn: 700,
        type: 'iframe',
        mainClass: 'mfp-fade',
        removalDelay: 160,
        preloader: false,
        fixedContentPos: false
    });
});

$(function(){
    var loading = false;
    var validateEmail = function(email){
        var regExp = /^[-._a-z0-9]+@(?:[a-z0-9][-a-z0-9]+\.)+[a-z]{2,6}$/i;
        console.log(email, regExp.test(email));
        return regExp.test(email);
    };
    $('#help .need-pastor .button').click(function (e) {
        $('#pastor-question-modal #question').val("");
        $('#pastor-question-modal input, #pastor-question-modal textarea').removeClass('error');
        $('#pastor-question-modal span.error').removeClass('visible');
        $('#pastor-question-modal .modal-content').show();
        $('#pastor-question-modal .loader').hide();
        $('#pastor-question-modal .result').hide();
        $('#pastor-question-modal').fadeIn(function () {
            $(this).focus();
        });
    });
    $(document).mouseup(function (e) {
        var container = $(".modal-container");
        console.log($(e.target).is('.modal-container'));
        console.log($(e.target).closest('.modal-container').length);
        if (!$(e.target).is('.modal-container') && $(e.target).closest('.modal-container').length == 0 && !loading) {
            $('#pastor-question-modal').fadeOut();
        };
    });

    $('#pastor-question-modal .popupCloser').on('click', function(e){
        e.preventDefault();
        $('#pastor-question-modal').fadeOut();
    });

    $('#questionSend a').on('click', function(e){
        e.preventDefault();
        var bError = false;
        var email_input = $('#pastor-question-modal #email');
        var name_input = $('#pastor-question-modal #name');
        var text_input = $('#pastor-question-modal #question');
        console.log(email, name, text);
        $('#pastor-question-modal span.error').removeClass('visible');
        $('#pastor-question-modal input, #pastor-question-modal textarea').removeClass('error');
        var email = email_input.val();
        if (!email) {
            $('#pastor-question-modal span.error.empty').addClass('visible');
            email_input.addClass('error');
            bError = true;
        } else if (!validateEmail(email)) {
            $('#pastor-question-modal span.error.incorrect').addClass('visible');
            email_input.addClass('error');
            bError = true;
        }
        var name = name_input.val();
        if (!name) {
            $('#pastor-question-modal span.error.name').addClass('visible');
            name_input.addClass('error');
            bError = true;
        }
        var text = text_input.val();
        if (!text) {
            text_input.addClass('error');
            $('#pastor-question-modal span.error.text').addClass('visible');
            bError = true;
        }
        if (!bError)
        {
            //ajaxUrlPastorQuestion = "/bitrix/templates/main_adaptive/components/blagayavest/contact.ajax.form/help/ajax.php";
            $.ajax(
                ajaxUrlPastorQuestion, {
                    method : "post",
                    dataType : "json",
                    data : {
                        NAME: name,
                        EMAIL: email,
                        TEXT: text
                    },
                    beforeSend : function(){
                        console.log('Before send');
                        $('#pastor-question-modal .modal-content').hide();
                        $('#pastor-question-modal .loader').show();
                        loading = true;
                    },
                    success : function(result){
                        $('#pastor-question-modal .loader').hide();
                        $('#pastor-question-modal .result').show();
                        console.log(result);
                        loading = false;
                        //$('#pastor-question-modal .loader').hide();
                    }
                });
        }
    });
    $('#otherQuestion').on('click', function(e){
        e.preventDefault();
        $('#pastor-question-modal #question').val("");
        $('#pastor-question-modal .modal-content').show();
        $('#pastor-question-modal .loader').hide();
        $('#pastor-question-modal .result').hide();
    });
});


function changeTEXT() {
    if($(window).width() < 441){
        $('.need-pray .button-black a').html('НУЖНА МОЛИТВА')
    }
    else{
        $('.need-pray .button-black a').html('Написать молитвенную нужду')
    }
}
changeTEXT();
$( window ).resize(function() {
    changeTEXT();
});

var scroll_start = 0;
var startchange = $('#startchange');
var offset = startchange.offset();
$(document).scroll(function() { 
  scroll_start = $(this).scrollTop();
  if(scroll_start > offset.top) {
      $('.menu-fixed').css('background-color', 'rgba(0, 139, 139, .5)');
      $('.menu-fixed').css('padding-top', '8px');
   } else {
      $('.menu-fixed').css('background-color', 'transparent');
      $('.menu-fixed').css('padding-top', '30px');    
   }
});