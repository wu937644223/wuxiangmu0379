;(function(){
    // console.log($('.detail .s-img li').length)
    for(let i=0;i<$('.detail .s-img li').length;i++){
        $('.detail .s-img li').eq(i).hover(function(){
            $('.detail .img img').eq(i).stop().show().siblings().stop().hide();
            $('.detail .s-img li').eq(i).addClass('active').siblings().removeClass('active');
        })
    }
    $('.button .add').on('click',function(){
        window.location.href = 'car.html'
    })
    function Magnifier(){
        this.box = document.querySelector(".detail .img");
        this.img = document.querySelector(".detail .img img");
        this.init()
    }

    Magnifier.prototype.init = function(){
        var that = this;
        $(".detail .img").on('mouseover', function(eve){
            that.show()
        })
        $(".detail .img").on('mouseout', function(){
            that.hide()
        })
        $(".detail .img").on('mousemove', function(eve){
            var e= eve || window.event;
            that.move(e)
        })
    }

    Magnifier.prototype.show = function(){
        $(".detail .img img").css('transform','scale(2)')
    }

    Magnifier.prototype.hide = function(){
        $(".detail .img img").css('transform','scale(1)');
        $(".detail .img img").css({
            left: 0,
            top: 0
        })
    }

    Magnifier.prototype.move = function(e){
        
        
        var l = e.clientX - this.box.offsetLeft;
        var t = e.clientY - this.box.offsetTop;

        if(l<0){
            l = 0;
        }
        if(l>this.box.offsetWidth){
            l = this.box.offsetWidth;
        }
        if(t<0){
            t = 0;
        }
        if(t>this.box.offsetHeight){
            t = this.box.offsetHeight;
        }
        $(".detail .img img").css({
            left: -e.offsetX + 250 + "px",
            top: -e.offsetY + 250 + "px"
        })

        
        // this.img.style.left = -e.offsetX + 250 + "px";
        // this.img.style.top = -e.offsetY + 250 + "px";
    }

    new Magnifier()
})();
