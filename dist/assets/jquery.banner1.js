;(function(){
    'use strict'
    $.fn.extend({
        banner(options){
            var {img,prev,next,points,current,delay,duration,autoplay} = options;
            autoplay = autoplay === false ? false : true;
            current = current || 0;
            delay = delay || 3000;
            duration = duration || 300;
            var len = img.length;
            var t = null;
            var index = 0;
            var index2 = img.length - 1;

            next.on('click',function(){
                if(index === len-1){
                    index = 0;
                    index2 = len-1;
                }else{
                    index++;
                    index2 = index - 1;
                }
                img.eq(index).css('left',598)
                img.eq(index2).stop().animate({
                    left:-598
                },duration).animate({left:598},0);
                img.eq(index).stop().animate({
                    left:0
                },duration);
            })
            prev.on('click',function(){
                if(index === 0){
                    index = len-1;
                    index2 = 0;
                }else{
                    index--;
                    index2 = index + 1;
                }
                img.eq(index).css('left',-598);
                img.eq(index2).stop().animate({
                    left: 598
                },duration).animate({left:-598},0);
                img.eq(index).stop().animate({
                    left:0
                },duration);
            })

            if(autoplay){
                t = setInterval(() => {
                    next.click();
                }, delay);
                this.hover(function(){
                    clearInterval(t)
                },function(){
                    t = setInterval(() => {
                        next.click();
                    }, delay);
                })
            }
        }
    })
})();