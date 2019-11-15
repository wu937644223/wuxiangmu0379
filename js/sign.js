;(function(){
    $('.way .span1').on('click', function(){
        $('.sign-user').stop().show();
        $('.sign-ma').stop().hide();
        $('.way .span1').addClass('active1').siblings().removeClass('active1');
    })
    $('.way .span2').on('click', function(){
        $('.sign-user').stop().hide().removeClass('active1');
        $('.sign-ma').stop().show().addClass('active1');
        $('.way .span2').addClass('active1').siblings().removeClass('active1');
    })
    var ot1 = document.querySelector('.sign-user .txt1')
    var ot2 = document.querySelector('.sign-user .txt2')
    $('#sub').on('click',function(){
        var username = ot1.value;
        var password = ot2.value;
        if(username === getCookie('user') && password === getCookie('password')){
            window.location.href = 'index.html'
        }else {
            alert('登录失败，请重新登录')
        }
    })
})();