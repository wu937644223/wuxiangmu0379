;(function(){
    class Shop{
        constructor(){
            this.url = "../data/shop.json";
            this.lb = document.querySelector('.list-box');
            
            this.load();
        }
        load(){
            ajax({
                url:this.url,
                success:res=>{
                    this.res = JSON.parse(res);
                    // console.log(this.res)
                    this.display();
                    this.sortPrice();
                    this.addEvent();
                }
            })
        }
        sortPrice(){
            var onoff = 0;
            var that = this;
            $('.right-top li .sort').on('click', function(){
                if(onoff === 0){
                        that.res.sort( function(a,b) {
                            return b.price - a.price;
                        })
                        // $('.right-top li .sort').html('价格由高到低')
                        // console.log(that.res)
                        that.display();
                        onoff = 1;
                }else{
                    that.res.sort( function(a,b) {
                        return a.price - b.price;
                    })
                    // $('.right-top li .sort').html('价格由低到高')
                    // console.log(that.res)
                    that.display();
                    onoff = 0;
                }
            })
        }
         
        display(){
            var str = "";
            for(var i=0;i<this.res.length;i++){
                str += `<li index="${this.res[i].id}">
                            <a href="#"><img src="${this.res[i].img}" alt=""></a>
                            <div class="content">
                                <p>
                                    <em>月付</em>
                                    <span>${this.res[i].price1} </span>
                                    <span>|￥<i>${this.res[i].price}</i></span>
                                </p>
                                <a href="#">${this.res[i].name}</a>
                                <span class="sale">${this.res[i].sale}</span>
                                <p>免息分期</p>
                                <p><a class="add" href="#">加入购物车</a></p>
                            </div>
                        </li>`
            }
            $('.list-box').html(str);
        }
    
        addEvent(){
            var that = this;
            $('.list-box').on("click",function(eve){
                // console.log(1)
                var e = eve || window.event;
                var target = e.target || e.srcElement;
                // console.log(target)
                if(target.className == "add"){
                    that.id = target.parentNode.parentNode.parentNode.getAttribute("index");
                    console.log(that.id)
                    that.setCookie();
                }
            })
            $('.list-box').on("click",'img',function(){
                window.location.href = 'shop-content.html'
            })
        }
        setCookie(){
            console.log(1)
            this.goods = getCookie("goods") ? JSON.parse(getCookie("goods")) : [];
            // console.log(this.goods)
            if(this.goods.length<1){
                this.goods.push({
                    id:this.id,
                    num:1
                })
            }else{
                var onoff = 1;
                for(var i=0;i<this.goods.length;i++){
                    if(this.goods[i].id === this.id){
                        this.goods[i].num++;
                        onoff = 0;
                    }
                }
                if(onoff == 1){
                    this.goods.push({
                        id:this.id,
                        num:1
                    })
                }
            }
            setCookie("goods",JSON.stringify(this.goods))
        }
    }
    new Shop();
})();