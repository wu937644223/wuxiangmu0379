;(function(){
    //顶部关闭
    $(".close").on('click', () => {
        $('.header-top').stop().slideUp(500);
    })
    //客户服务下拉
    $('.ser').find('a').eq(1).hover(function() {
        $('.slideBox').stop().slideDown(300);
    },function() {
        $('.slideBox').stop().slideUp(300);
    })
    $('.slideBox').hover(() => {
        $('.slideBox').stop().slideUp(300).stop().show();
    }, () => {
        $('.slideBox').stop().slideUp(300);
    })
    //搜索框下拉
    $('.sb-left input').on('focus', () => {
        $('.slideBox1').stop().show();
    })
    $('.sb-left input').on('blur', () => {
        $('.slideBox1').stop().hide();
    })
    //轮播图
    $('.banner').fade({
        img:$('.banner').find('.image').find('img'),
        prev:$('.banner').find('.btn').find('.prev'),
        next:$('.banner').find('.btn').find('.next'),
        points:$('.banner').find('.points'),
        autoplay:true,
        current:0,
        delay:4000,
        duration:500
    })
    //顶部悬浮
    window.onscroll = function(){
        var t = document.documentElement.scrollTop;
        if(t > 204){
            $('.index-nav').css({
                position: 'fixed',
                left: '0',
                top: '0',
                zIndex: 99999
            });
            $('.nav .hidden').css('display','block');
            $('.nav .list-h').find('span').empty();
            var img = $('<img src="../assets/img/logo-s.jpg">')
            $('.nav .list-h').find('span').append(img);
        }else {
            $('.index-nav').css({
                position: 'relative',
                left: '0',
                top: '0'
            })
            $('.nav .hidden').css('display','none');
            $('.nav .list-h').find('span').empty();
            var content = '全部内容'
            $('.nav .list-h').find('span').append(content);
        }  
    }
    // main1 图片缩放
    for(let i=0; i<$('.main .main1').find('a').length;i++){
        $('.main .main1').find('a').eq(i).hover(function(){
            $('.main .main1').find('a').eq(i).find('img').css({
                transition: '1s',
                transform:'scale(1.2)'
            });
        },function(){
            $('.main .main1').find('a').eq(i).find('img').css({
                transition: '1s',
                transform:'scale(1)'
            });
        })
    } 
    // main2 图片缩放
    $('.spec1 .show .show-a').hover(() => {
        $('.spec1 .show .show-a').find('img').css({
            transition: '1s',
            transform:'scale(1.2)'
        });
    },() => {
        $('.show .show-a').find('img').css({
            transition: '1s',
            transform:'scale(1)'
        });
    })
    //main2 轮播1
    $('.show-banner').banner({
        img:$('.show-banner').find('ul').find('li'),
        prev:$('.show-banner .btn .prev'),
        next:$('.show-banner .btn .next'),
        autoplay:true,
        current:0,
        delay:5000,
        duration:500
    })
    //main2 轮播2
    $('.discount').fade({
        img:$('.discount').find('a'),
        prev:$('.discount').find('.btn').find('.prev'),
        next:$('.discount').find('.btn').find('.next'),
        points:$('.discount').find('.points'),
        autoplay:true,
        current:0,
        delay:4000,
        duration:500
    })
    //main3 图片缩放
    $('.spec2 .hot-sale .hot-sale-a').hover(() => {
        $('.spec2 .hot-sale .hot-sale-a').find('img').css({
            transition: '1s',
            transform:'scale(1.2)'
        });
    },() => {
        $('.hot-sale .hot-sale-a').find('img').css({
            transition: '1s',
            transform:'scale(1)'
        });
    })
    //main4 轮播图
    $('.main4-banner').banner2({
        img:$('.main4-banner').find('ul').find('li'),
        prev:$('.main4-banner .btn .prev'),
        next:$('.main4-banner .btn .next'),
        current:0,
        delay:5000,
        duration:500
    })

    $('.main4 .show .show-a').hover(() => {
        $('.main4 .show .show-a').find('img').css({
            transition: '1s',
            transform:'scale(1.2)'
        });
    },() => {
        $('.show .show-a').find('img').css({
            transition: '1s',
            transform:'scale(1)'
        });
    })

    $('.main5 .hot-sale .hot-sale-a').hover(() => {
        $('.main5 .hot-sale .hot-sale-a').find('img').css({
            transition: '1s',
            transform:'scale(1.2)'
        });
    },() => {
        $('.hot-sale .hot-sale-a').find('img').css({
            transition: '1s',
            transform:'scale(1)'
        });
    })

    $('.main6 .hot-sale .hot-sale-a').hover(() => {
        $('.main6 .hot-sale .hot-sale-a').find('img').css({
            transition: '1s',
            transform:'scale(1.2)'
        });
    },() => {
        $('.hot-sale .hot-sale-a').find('img').css({
            transition: '1s',
            transform:'scale(1)'
        });
    })
    $('.main7 .hot-sale .hot-sale-a').hover(() => {
        $('.main7 .hot-sale .hot-sale-a').find('img').css({
            transition: '1s',
            transform:'scale(1.2)'
        });
    },() => {
        $('.main7 .hot-sale .hot-sale-a').find('img').css({
            transition: '1s',
            transform:'scale(1)'
        });
    })

    for(let i=0;i<12;i++){
        $('.main7 .hot-sale .hot-sale-img li').eq(i).hover(() => {
            $('.main7 .hot-sale .hot-sale-img li').eq(i).find('.li-content').stop().slideDown(300);
        },() => {
            $('.li-content').stop().slideUp(100);
        })
    }

    var img = $('.main7').find('.m7-banner').find('.hot-sale');
    var prev = $('.main7 .btn .prev');
    var next = $('.main7 .btn .next');
    var current = 0;
    var len = img.length;
    next.on('click' , function(){
        current++;
        if(current === len){
            current = 0;
        }
        animate(current);
    })

    prev.on('click' , function(){
        current--;
        if(current === -1){
            current = len - 1;
        }
        animate(current);
    })
    $('.main7 .title ul').find('li').on('mouseenter', function(){
        current = $(this).index();
        animate(current);
    })
    function animate(current){
        img.eq(current).stop().show().siblings().stop().hide();
        $('.main7 .title ul').find('li').eq(current).addClass('active').siblings().removeClass('active')
    }

    var img8 = $('.main8').find('.main8-banner').find('.img');
    var prev8 = $('.main8 .btn .prev');
    var next8 = $('.main8 .btn .next');
    var current8 = 0;
    var len8 = img8.length;
    next8.on('click' , function(){
        current8++;
        if(current8 === len8){
            current8 = 0;
        }
        animate1(current8);
    })

    prev8.on('click' , function(){
        current8--;
        if(current8 === -1){
            current8 = len8 - 1;
        }
        animate1(current8);
    })
    $('.main8 .title ul').find('li').on('mouseenter', function(){
        current8 = $(this).index();
        animate1(current8);
    })
    function animate1(current8){
        img8.eq(current8).stop().show().siblings().stop().hide();
        $('.main8 .title ul').find('li').eq(current8).addClass('active').siblings().removeClass('active')
    }

    $('.main9 .hot-sale .hot-sale-a').hover(() => {
        $('.main9 .hot-sale .hot-sale-a').find('img').css({
            transition: '1s',
            transform:'scale(1.2)'
        });
    },() => {
        $('.hot-sale .hot-sale-a').find('img').css({
            transition: '1s',
            transform:'scale(1)'
        });
    })

    for(let i=0; i<$('.main10 .hot-sale').find('a').length;i++){
        $('.main10 .hot-sale').find('a').eq(i).hover(function(){
            $('.main10 .hot-sale').find('a').eq(i).find('img').css({
                transition: '1s',
                transform:'scale(1.1)'
            });
        },function(){
            $('.main10 .hot-sale').find('a').eq(i).find('img').css({
                transition: '1s',
                transform:'scale(1)'
            });
        })
    } 

    for(let i=0; i<$('.main11 .hot-sale').find('a').length;i++){
        $('.main11 .hot-sale').find('a').eq(i).hover(function(){
            $('.main11 .hot-sale').find('a').eq(i).find('img').css({
                transition: '1s',
                transform:'scale(1.1)'
            });
        },function(){
            $('.main11 .hot-sale').find('a').eq(i).find('img').css({
                transition: '1s',
                transform:'scale(1)'
            });
        })
    } 
    if(getCookie('user') && getCookie('password')){
        // console.log(getCookie('user'))
        $.cookie('isLogin', true);
        if($.cookie('isLogin')) {
            $('.sign-ready').html('退出');
            $('.header-bottom .sign-logon').html(getCookie('user'));
        }
        $('.sign-ready').on('click', function(){
            $.cookie('isLogin',false);
            $('.header-bottom .sign-ready').html('请登录');
            $('.header-bottom .sign-logon').html('注册即送3500元大礼包');
        })
    }
})();