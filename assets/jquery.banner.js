;
(function () {
    'use strict';
    $.fn.extend({
        fade(options) {
            var {img,prev,next,points,autoplay,delay,current,duration} = options;
            autoplay = autoplay === false ? false : true;
            delay = delay || 3000;
            current = current || 0;
            duration = duration || 300;
            var len = img.length;
            var t = null;
            // console.log(len)

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

            if(autoplay){
                t = setInterval(() => {
                    next.click();
                }, delay);
            }

            for (var i=0;i<len;i++){
                points.append('<li></li>')
            }
            points.find('li').eq(current).addClass('active').siblings().removeClass('active');
            
            points.find('li').on('click',function(){
                current = $(this).index();
                animate(current);
            })

            function animate(current){
                img.eq(current).stop().fadeIn(duration).siblings().stop().fadeOut();
                points.find('li').eq(current).addClass('active').siblings().removeClass('active');
            }
        }
    })

})();