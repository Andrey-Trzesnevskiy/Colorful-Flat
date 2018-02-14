$(document).ready(function(){
    //sticky header
    $(window).scroll(function() {
        scrollPage()
      });
    let header = $('header');
    let headerHeight = header.outerHeight();
    let startScroll = 0;
    
    function scrollPage () {
    let scrolled = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrolled < headerHeight) {
            header.removeClass('fixed');
           }
        else if (scrolled < startScroll) {
            header.addClass('fixed');
            }
        else {
            header.removeClass('fixed');
            }
        startScroll = scrolled;
      }

    // hmbg menu
    $('.hmbg-menu').click(hmbgMenuHandler);
    function hmbgMenuHandler (event) {
        event.preventDefault();
        event.stopPropagation();
        $('.menu').toggleClass('is-vis');
    }
    //drop down
    $('#dropdown').click(dropDownHandler);
    function dropDownHandler (event) {
        event.preventDefault();
        event.stopPropagation();
        $('.dropdown-content').toggleClass('non-vis');
    }  
    $(document).click(hideMenu);   
    function hideMenu (event) {
        $('.dropdown-content').addClass('non-vis');
        $('.menu').removeClass('is-vis');
    }
    
    //slider    
    let slides = $(".slider");
    let width = $(".slshow .slContainer").width(); 
    let i = slides.length;
    let offset = i * width;
    let numberOfSlides = slides.length;
    $('.slContainer').css('overflow', 'hidden');
   
    slides.wrapAll('<div class="slideInner"></div>')
    
    .css({
        'float' : 'left',
        'width' : width
    });
    $('.slideInner').css('width', width * numberOfSlides);
    $('.slideInner').addClass('clearfix');
    for (let j=0; j < slides.length; j++) {
        if (j==0) {
        $(".slshow .nav").append("<div class='dots act'></div>");
        }
        else {
        $(".slshow .nav").append("<div class='dots'></div>");
        }
    }
    let dots = $('.slshow .nav').children('.dots');
    offset = 0;
    i = 0;


        $('.slshow .nav .dots').click(function(){
            $('.slshow .nav .act').removeClass("act");
            $(this).addClass("act");
            i = $(this).index();
            offset = i * width;
            $('.slideInner').animate({
            'marginLeft': -offset
        });
        });
    
    // Smooth scroll to anchor
    let scrollHome = $('header').offset().top;
    let scrollServices = $('.services').offset().top;
    let scrollPortfolio = $('.portfolio').offset().top;
    
    function anchor (scrollHeight, scrollTime) {
        $('html, body').animate({
            scrollTop: scrollHeight
        }, scrollTime);
    };

    $('#services').click(servicesScroll);
    function servicesScroll (event) {
        event.preventDefault();
        anchor(scrollServices, 1000);
    }

    $('#portfolio').click(portfolioScroll);
    function portfolioScroll (event) {
        event.preventDefault();
        anchor(scrollPortfolio, 1000);
    }

    $('#home').click(homeScroll);
    function homeScroll (event) {
        event.preventDefault();
        anchor(scrollHome, 1000)
    }


        //pop-up
        $('.read-more button').each(function(){
            $(this).click(openPopUp)
        });
        function openPopUp () {
            $('.popup').removeClass('non-vis');
        }
        $('.close-button').click(closePopUp)
        function closePopUp() {
            $('.popup').addClass('non-vis');
        }

        //tabs
        let tabsNav = $('.tabs-nav li');
        let tabs = $('.tabs');
        let currTab = tabsNav[0];
        $('.tabs-nav li a').click(function(event){
            event.preventDefault();
            $('.slides-wrap > *').remove();
            $('.column-wrap > *').remove();
            let id = $(this).attr('href');
	        $('.tab').removeClass('is-vis');
	        $('.tabs-nav li').removeClass('is-active');
	        $(this).parent('li').addClass('is-active');
            $(id).addClass('is-vis');
            rerender ();
        })
       
    //accordion
    $('.show-button button').click(showAll);

    function showAll() {
        $('.tab.is-vis').removeClass('tab-fix-height');
        $('.tab.is-vis').addClass('tab-all-height');
        $('.show-button').addClass('non-vis');
        $('.hide-button').removeClass('non-vis');
    }

    $('.hide-button button').click(hide);

    function hide () {
        $('.tab.is-vis').removeClass('tab-all-height');
        $('.tab.is-vis').addClass('tab-fix-height');
        $('.show-button').removeClass('non-vis');
        $('.hide-button').addClass('non-vis');
    }

    //lightbox
    function rerender () {
        renderSlides ();
        $('.tab.is-vis img').each(function(index, item){
            $(item).click(function(){
                openModal();
                currentSlide(index+1);
                
            })
        });
    }
        function renderSlides () {
            let arr = new Array();
            
            $('.tab.is-vis img').each(function(index, item){
                $('.slides-wrap').append('<div class='+'slides><div class='+'numbertext>'+(+index+1)+'/'+$('.tab.is-vis img').length+'</div><img alt='+'portfolio-foto></div>');
                arr[arr.length]=$(item).attr('src');
                    //$('.slides img').attr('src', $(item).attr('src'));
                $('.column-wrap').append('<div class="column"><img class="demo cursor" alt="portfolio-foto"></div>')
            })
            let attrArr =  $('.slides img');
            let columnImageArr = $('.column img');    
            for (let i=0; i < arr.length; i++) {
                $(attrArr[i]).attr('src', arr[i]);
                $(columnImageArr[i]).attr('src', arr[i]);
            }
            
            $('.column img').each(function(index, item){
                $(item).click(function(){
                    currentSlide(index+1);
                    
                })
            });
        }
    
    rerender ();
    
    
    
   
    $('.prev').click(function(){
        plusSlides(-1);
    })     
    $('.next').click(function(){
        plusSlides(1)
    })
    $('.close').click(function(){
        closeModal ()
    })   
    function openModal() {
        $('#modal').removeClass('non-vis');
    }
    function closeModal () {
        $('#modal').addClass('non-vis');
    }
    let slideIndex = 1;
    showSlides(slideIndex);

    function plusSlides(n) {
        showSlides(slideIndex += n);
    }

    function currentSlide(n) {
        showSlides(slideIndex = n);
    }
    function showSlides(n) {
        let i;
        let slides = $('.slides');
        let dots = $('.demo');
        
        if (n > slides.length) {
            slideIndex = 1
        }
        if (n < 1) {
            slideIndex = slides.length
        }
        for (let i = 0; i < slides.length; i++) {
            $(slides[i]).css({
                'display': 'none'
            });
        }
        for (let i = 0; i < dots.length; i++) {
            $(dots[i]).removeClass('active');
        }
        $(slides[slideIndex-1]).css({
            'display': 'block'
        });
        $(dots[slideIndex-1]).addClass('active');
    }
    
});