;(function(){
    class Car{
        constructor(){
            this.url = "../data/shop.json";
            this.load();
            this.addEvent();
        }
        addEvent(){
            var that = this;
            $('.store').on("click",function(eve){
                var e = eve || window.event;
                var target = e.target || e.srcElement;
                if(target.className == "del"){
                    that.id = target.parentNode.parentNode.parentNode.getAttribute("index");

                    target.parentNode.parentNode.parentNode.remove();
                    that.removeCookie();
                }
            })
            $('.store').on("click",function(eve){
                var e = eve || window.event;
                var target = e.target || e.srcElement;
                if(target.className == "left"){
                    that.id = target.parentNode.parentNode.parentNode.getAttribute("index");
                    // console.log(target.parentNode.children[1])
                    if(target.parentNode.children[1].value > 1){
                        target.parentNode.children[1].value--;
                    }else {
                        target.parentNode.children[1].value = 1;
                    }
                    that.val = target.parentNode.children[1].value;
                    that.updateCookie();
                }
                // this.allPrice($(this));
            })
            $('.store').on("click",function(eve){
                var e = eve || window.event;
                var target = e.target || e.srcElement;
                if(target.className == "right"){
                    
                    that.id = target.parentNode.parentNode.parentNode.getAttribute("index"); 
                    // console.log(target.parentNode.children[1])
                    target.parentNode.children[1].value++;
                    that.val = target.parentNode.children[1].value;
                    // console.log(that.val)
                    that.updateCookie();
                }
            })
        }
        updateCookie(){
            var i=0;
            var onoff = this.goods.some((val,index)=>{
                // console.log(this.goods)
                // console.log(val)
                // console.log(index)
                i=index;
                return val.id == this.id;
            });
            if(onoff){
                this.goods[i].num = this.val;
            }
            setCookie("goods",JSON.stringify(this.goods))
            this.display();
        }
        removeCookie(){
            var i=0;
            var onoff = this.goods.some((val,index)=>{
                // console.log(val)
                i=index;
                return val.id == this.id;
            });
            if(onoff){
                this.goods.splice(i,1);
                // console.log(this.goods)
            }
            setCookie("goods",JSON.stringify(this.goods))
        }
        
        load(){
            var that = this;
            ajax({
                url:this.url,
                success:function(res){
                    that.res = JSON.parse(res);
                    that.getCookie();
                }
            })
        }
        getCookie(){
            
            this.goods = getCookie("goods") ? JSON.parse(getCookie("goods")) : [];
            // console.log(this.goods)
            this.display();

        }
        selectAll () {
            var that = this;
            $("#selectall").on("click", function () {
                // console.log(this.checked)
                if(this.checked == true) {
                    $(".selectone").prop("checked", true);
                }else{
                    $(".selectone").prop("checked", false);
                }
            }) 
            this.allPrice($("#selectall"));
            
            $(".selectone").on("click", function () {
                // console.log(this.checked)
                var s = $(".selectone").length;
                var a = $(".selectone:checked").length;
    
                if(s == a) {
                    $("#selectall").prop("checked", true);

                } else {
                    $("#selectall").prop("checked", false);
                }
                
            })
            this.allPrice($(".selectone"));
        }
        allPrice(item){
            var so = document.querySelectorAll('.selectone');
            var buy = [];
            item.on('click',() => {
                this.sum = 0;
                var buy = [];
                for(var i=0;i<$('.selectone').length;i++) {
                    if($('.selectone')[i].checked){
                        // console.log($('.selectone:checked').parent())
                        var id = $('.selectone').eq(i).parent().parent().attr('index');
                        // console.log($('.selectone').eq(i).parent().parent().attr('index'))
                        var img = so[i].parentNode.parentNode.children[1].children[0].children[0].src;
                        var name = so[i].parentNode.parentNode.children[1].children[1].children[0].innerHTML;
                        var num = so[i].parentNode.parentNode.children[2].children[1].children[1].value;
                        var price = so[i].parentNode.parentNode.children[2].children[0].innerHTML.replace('￥','');
                        // console.log(img)
                    
                        // var name = $('.goods-txt p').html();
                        // var price = $('.goods ul li:nth-child(1)').html().replace('￥','');
                        // var num = $('.goods ul li:nth-child(2) input').val();
                        buy.push({
                            id: id,
                            img: img,
                            name: name,
                            price: price,
                            num: num
                        })
                        $.cookie('order',JSON.stringify(buy))
                         console.log($('.selectone')[i].checked)

                        this.sum += parseInt(so[i].parentNode.nextElementSibling.nextElementSibling.children[2].innerHTML.replace('￥',''))
                    }
                    // console.log(this.sum)
                }
                // console.log($('.selectone:checked').parent().parent())
                $('.sum p span i').html(this.sum);
               
            })
        }
        display(){
            // console.log(this.res)
            // console.log(this.goods)
            var str = "";
            for(var i=0;i<this.res.length;i++){
                for(var j=0;j<this.goods.length;j++){
                    if(this.res[i].id == this.goods[j].id){
                        var p = this.goods[j].num * this.res[i].price;
                        str += `<div class="goods" index="${this.goods[j].id}">
                                    <span class="span-box">
                                        <input class="selectone" type="checkbox">
                                    </span>
                                    <a class="goods-a" href="#">
                                        <div class="goods-img fl">
                                            <img src="${this.res[i].img}" alt="">
                                        </div>
                                        <div class="goods-txt fl">
                                            <p>${this.res[i].name}</p>
                                        </div>
                                    </a>
                                    <ul class="fr">
                                        <li>￥${this.res[i].price}</li>
                                        <li>
                                            <span class="left">-</span>
                                            <input type="text" value="${this.goods[j].num}" readonly>
                                            <span class="right">+</span>
                                        </li>
                                        <li>￥${p}</li>
                                        <li><a class="del" href="javascript:;">删除</a></li>
                                    </ul>
                                </div>`
                    }
                }
            }
            // console.log(str)
            $('.store').html(str);
            if(this.goods.length > 0){
                $('.car-empty').stop().hide();
                $('.car-goods').stop().show();
            }else{
                $('.car-empty').stop().show();
                $('.car-goods').stop().hide();
            }
            this.selectAll();
            
        }
    }
    new Car();
    $('.goods-sum .pay').on('click', function(){
        window.location.href = 'order.html'
    })


})();