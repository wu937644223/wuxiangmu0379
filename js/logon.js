;(function(){
    var t1 = false;
    var t2 = false;
    var t3 = false;
    var t4 = false;
    var t5 = false;
    var ot1 = document.getElementById("txt1")
    var ot2 = document.getElementById("txt2")
    var ot3 = document.getElementById("txt3")
    var ot4 = document.getElementById("txt4")
    var ob = document.getElementById("register")
    var oi1 = document.querySelector('.content div:nth-child(1) i')
    var oi2 = document.querySelector('.content div:nth-child(2) i')
    var oi3 = document.querySelector('.content div:nth-child(3) i')
    var oi4 = document.querySelector('.content div:nth-child(4) i')
    var oi5 = document.querySelector('.content div:nth-child(5) i')
    $('#txt1').on('blur', function(){
        var tel = ot1.value;
        var reg = /^1\d{10}$/
        if(!reg.test(tel)){
            oi1.style.display = "block"
            t1 = false;
        }else{
            t1 = true;
            oi1.style.display = "none"
        }
    })
    $('#txt1').on('focus', function(){
        oi1.style.display = "none";
    })
    $('#txt2').on('blur', function(){
        var tel = ot2.value;;
        var reg = /^\d{6}$/
        if(!reg.test(tel)){
            oi2.style.display = "block"
            t2 = false;
        }else{
            t2 = true;
        }
    })
    $('#txt2').on('focus', function(){
        oi2.style.display = "none"
    })
    $('#txt3').on('blur', function(){
        var opsw = ot3.value;;
        var reg = /^[\w-]{6,20}$/
        if(!reg.test(opsw)){
            oi3.style.display = "block"
            t3 = false;
        }else{
            t3 = true;
        }
    })
    $('#txt3').on('focus', function(){
        oi3.style.display = "none"
    })
    $('#txt4').on('blur', function(){
        if(ot4.value !== ot3.value){
            oi4.style.display = "block"
            t4 = false;
        }else{
            t4 = true;
        }
    })
    $('#txt4').on('focus', function(){
        oi4.style.display = "none"
    })
    $('#register').on('click', function(){
        if(t1 && t2 && t3 && t4){
            var name = ot1.value;
            var password = ot3.value;;
            $.cookie('user',name);
            $.cookie('password',password);
            window.location.href = 'sign.html'
        }else{
            alert("提交失败")
        }
    })
})();