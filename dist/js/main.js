"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

;(function () {
    var Car = function () {
        function Car() {
            _classCallCheck(this, Car);

            this.url = "../data/shop.json";
            this.load();
            this.addEvent();
        }

        _createClass(Car, [{
            key: "addEvent",
            value: function addEvent() {
                var that = this;
                $('.store').on("click", function (eve) {
                    var e = eve || window.event;
                    var target = e.target || e.srcElement;
                    if (target.className == "del") {
                        that.id = target.parentNode.parentNode.parentNode.getAttribute("index");

                        target.parentNode.parentNode.parentNode.remove();
                        that.removeCookie();
                    }
                });
                $('.store').on("click", function (eve) {
                    var e = eve || window.event;
                    var target = e.target || e.srcElement;
                    if (target.className == "left") {
                        that.id = target.parentNode.parentNode.parentNode.getAttribute("index");
                        // console.log(target.parentNode.children[1])
                        if (target.parentNode.children[1].value > 1) {
                            target.parentNode.children[1].value--;
                        } else {
                            target.parentNode.children[1].value = 1;
                        }
                        that.val = target.parentNode.children[1].value;
                        that.updateCookie();
                    }
                    // this.allPrice($(this));
                });
                $('.store').on("click", function (eve) {
                    var e = eve || window.event;
                    var target = e.target || e.srcElement;
                    if (target.className == "right") {

                        that.id = target.parentNode.parentNode.parentNode.getAttribute("index");
                        // console.log(target.parentNode.children[1])
                        target.parentNode.children[1].value++;
                        that.val = target.parentNode.children[1].value;
                        // console.log(that.val)
                        that.updateCookie();
                    }
                });
            }
        }, {
            key: "updateCookie",
            value: function updateCookie() {
                var _this = this;

                var i = 0;
                var onoff = this.goods.some(function (val, index) {
                    // console.log(this.goods)
                    // console.log(val)
                    // console.log(index)
                    i = index;
                    return val.id == _this.id;
                });
                if (onoff) {
                    this.goods[i].num = this.val;
                }
                setCookie("goods", JSON.stringify(this.goods));
                this.display();
            }
        }, {
            key: "removeCookie",
            value: function removeCookie() {
                var _this2 = this;

                var i = 0;
                var onoff = this.goods.some(function (val, index) {
                    // console.log(val)
                    i = index;
                    return val.id == _this2.id;
                });
                if (onoff) {
                    this.goods.splice(i, 1);
                    // console.log(this.goods)
                }
                setCookie("goods", JSON.stringify(this.goods));
            }
        }, {
            key: "load",
            value: function load() {
                var that = this;
                ajax({
                    url: this.url,
                    success: function success(res) {
                        that.res = JSON.parse(res);
                        that.getCookie();
                    }
                });
            }
        }, {
            key: "getCookie",
            value: function (_getCookie) {
                function getCookie() {
                    return _getCookie.apply(this, arguments);
                }

                getCookie.toString = function () {
                    return _getCookie.toString();
                };

                return getCookie;
            }(function () {

                this.goods = getCookie("goods") ? JSON.parse(getCookie("goods")) : [];
                // console.log(this.goods)
                this.display();
            })
        }, {
            key: "selectAll",
            value: function selectAll() {
                var that = this;
                $("#selectall").on("click", function () {
                    // console.log(this.checked)
                    if (this.checked == true) {
                        $(".selectone").prop("checked", true);
                    } else {
                        $(".selectone").prop("checked", false);
                    }
                });
                this.allPrice($("#selectall"));

                $(".selectone").on("click", function () {
                    // console.log(this.checked)
                    var s = $(".selectone").length;
                    var a = $(".selectone:checked").length;

                    if (s == a) {
                        $("#selectall").prop("checked", true);
                    } else {
                        $("#selectall").prop("checked", false);
                    }
                });
                this.allPrice($(".selectone"));
            }
        }, {
            key: "allPrice",
            value: function allPrice(item) {
                var _this3 = this;

                var so = document.querySelectorAll('.selectone');
                var buy = [];
                item.on('click', function () {
                    _this3.sum = 0;
                    var buy = [];
                    for (var i = 0; i < $('.selectone').length; i++) {
                        if ($('.selectone')[i].checked) {
                            // console.log($('.selectone:checked').parent())
                            var id = $('.selectone').eq(i).parent().parent().attr('index');
                            // console.log($('.selectone').eq(i).parent().parent().attr('index'))
                            var img = so[i].parentNode.parentNode.children[1].children[0].children[0].src;
                            var name = so[i].parentNode.parentNode.children[1].children[1].children[0].innerHTML;
                            var num = so[i].parentNode.parentNode.children[2].children[1].children[1].value;
                            var price = so[i].parentNode.parentNode.children[2].children[0].innerHTML.replace('￥', '');
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
                            });
                            $.cookie('order', JSON.stringify(buy));
                            console.log($('.selectone')[i].checked);

                            _this3.sum += parseInt(so[i].parentNode.nextElementSibling.nextElementSibling.children[2].innerHTML.replace('￥', ''));
                        }
                        // console.log(this.sum)
                    }
                    // console.log($('.selectone:checked').parent().parent())
                    $('.sum p span i').html(_this3.sum);
                });
            }
        }, {
            key: "display",
            value: function display() {
                // console.log(this.res)
                // console.log(this.goods)
                var str = "";
                for (var i = 0; i < this.res.length; i++) {
                    for (var j = 0; j < this.goods.length; j++) {
                        if (this.res[i].id == this.goods[j].id) {
                            var p = this.goods[j].num * this.res[i].price;
                            str += "<div class=\"goods\" index=\"" + this.goods[j].id + "\">\n                                    <span class=\"span-box\">\n                                        <input class=\"selectone\" type=\"checkbox\">\n                                    </span>\n                                    <a class=\"goods-a\" href=\"#\">\n                                        <div class=\"goods-img fl\">\n                                            <img src=\"" + this.res[i].img + "\" alt=\"\">\n                                        </div>\n                                        <div class=\"goods-txt fl\">\n                                            <p>" + this.res[i].name + "</p>\n                                        </div>\n                                    </a>\n                                    <ul class=\"fr\">\n                                        <li>\uFFE5" + this.res[i].price + "</li>\n                                        <li>\n                                            <span class=\"left\">-</span>\n                                            <input type=\"text\" value=\"" + this.goods[j].num + "\" readonly>\n                                            <span class=\"right\">+</span>\n                                        </li>\n                                        <li>\uFFE5" + p + "</li>\n                                        <li><a class=\"del\" href=\"javascript:;\">\u5220\u9664</a></li>\n                                    </ul>\n                                </div>";
                        }
                    }
                }
                // console.log(str)
                $('.store').html(str);
                if (this.goods.length > 0) {
                    $('.car-empty').stop().hide();
                    $('.car-goods').stop().show();
                } else {
                    $('.car-empty').stop().show();
                    $('.car-goods').stop().hide();
                }
                this.selectAll();
            }
        }]);

        return Car;
    }();

    new Car();
    $('.goods-sum .pay').on('click', function () {
        window.location.href = 'order.html';
    });
})();
;(function () {
    //顶部关闭
    $(".close").on('click', function () {
        $('.header-top').stop().slideUp(500);
    });
    //客户服务下拉
    $('.ser').find('a').eq(1).hover(function () {
        $('.slideBox').stop().slideDown(300);
    }, function () {
        $('.slideBox').stop().slideUp(300);
    });
    $('.slideBox').hover(function () {
        $('.slideBox').stop().slideUp(300).stop().show();
    }, function () {
        $('.slideBox').stop().slideUp(300);
    });
    //搜索框下拉
    $('.sb-left input').on('focus', function () {
        $('.slideBox1').stop().show();
    });
    $('.sb-left input').on('blur', function () {
        $('.slideBox1').stop().hide();
    });
    //轮播图
    $('.banner').fade({
        img: $('.banner').find('.image').find('img'),
        prev: $('.banner').find('.btn').find('.prev'),
        next: $('.banner').find('.btn').find('.next'),
        points: $('.banner').find('.points'),
        autoplay: true,
        current: 0,
        delay: 4000,
        duration: 500
    });
    //顶部悬浮
    window.onscroll = function () {
        var t = document.documentElement.scrollTop;
        if (t > 204) {
            $('.index-nav').css({
                position: 'fixed',
                left: '0',
                top: '0',
                zIndex: 99999
            });
            $('.nav .hidden').css('display', 'block');
            $('.nav .list-h').find('span').empty();
            var img = $('<img src="../assets/img/logo-s.jpg">');
            $('.nav .list-h').find('span').append(img);
        } else {
            $('.index-nav').css({
                position: 'relative',
                left: '0',
                top: '0'
            });
            $('.nav .hidden').css('display', 'none');
            $('.nav .list-h').find('span').empty();
            var content = '全部内容';
            $('.nav .list-h').find('span').append(content);
        }
    };
    // main1 图片缩放

    var _loop = function _loop(i) {
        $('.main .main1').find('a').eq(i).hover(function () {
            $('.main .main1').find('a').eq(i).find('img').css({
                transition: '1s',
                transform: 'scale(1.2)'
            });
        }, function () {
            $('.main .main1').find('a').eq(i).find('img').css({
                transition: '1s',
                transform: 'scale(1)'
            });
        });
    };

    for (var i = 0; i < $('.main .main1').find('a').length; i++) {
        _loop(i);
    }
    // main2 图片缩放
    $('.spec1 .show .show-a').hover(function () {
        $('.spec1 .show .show-a').find('img').css({
            transition: '1s',
            transform: 'scale(1.2)'
        });
    }, function () {
        $('.show .show-a').find('img').css({
            transition: '1s',
            transform: 'scale(1)'
        });
    });
    //main2 轮播1
    $('.show-banner').banner({
        img: $('.show-banner').find('ul').find('li'),
        prev: $('.show-banner .btn .prev'),
        next: $('.show-banner .btn .next'),
        autoplay: true,
        current: 0,
        delay: 5000,
        duration: 500
    });
    //main2 轮播2
    $('.discount').fade({
        img: $('.discount').find('a'),
        prev: $('.discount').find('.btn').find('.prev'),
        next: $('.discount').find('.btn').find('.next'),
        points: $('.discount').find('.points'),
        autoplay: true,
        current: 0,
        delay: 4000,
        duration: 500
    });
    //main3 图片缩放
    $('.spec2 .hot-sale .hot-sale-a').hover(function () {
        $('.spec2 .hot-sale .hot-sale-a').find('img').css({
            transition: '1s',
            transform: 'scale(1.2)'
        });
    }, function () {
        $('.hot-sale .hot-sale-a').find('img').css({
            transition: '1s',
            transform: 'scale(1)'
        });
    });
    //main4 轮播图
    $('.main4-banner').banner2({
        img: $('.main4-banner').find('ul').find('li'),
        prev: $('.main4-banner .btn .prev'),
        next: $('.main4-banner .btn .next'),
        current: 0,
        delay: 5000,
        duration: 500
    });

    $('.main4 .show .show-a').hover(function () {
        $('.main4 .show .show-a').find('img').css({
            transition: '1s',
            transform: 'scale(1.2)'
        });
    }, function () {
        $('.show .show-a').find('img').css({
            transition: '1s',
            transform: 'scale(1)'
        });
    });

    $('.main5 .hot-sale .hot-sale-a').hover(function () {
        $('.main5 .hot-sale .hot-sale-a').find('img').css({
            transition: '1s',
            transform: 'scale(1.2)'
        });
    }, function () {
        $('.hot-sale .hot-sale-a').find('img').css({
            transition: '1s',
            transform: 'scale(1)'
        });
    });

    $('.main6 .hot-sale .hot-sale-a').hover(function () {
        $('.main6 .hot-sale .hot-sale-a').find('img').css({
            transition: '1s',
            transform: 'scale(1.2)'
        });
    }, function () {
        $('.hot-sale .hot-sale-a').find('img').css({
            transition: '1s',
            transform: 'scale(1)'
        });
    });
    $('.main7 .hot-sale .hot-sale-a').hover(function () {
        $('.main7 .hot-sale .hot-sale-a').find('img').css({
            transition: '1s',
            transform: 'scale(1.2)'
        });
    }, function () {
        $('.main7 .hot-sale .hot-sale-a').find('img').css({
            transition: '1s',
            transform: 'scale(1)'
        });
    });

    var _loop2 = function _loop2(i) {
        $('.main7 .hot-sale .hot-sale-img li').eq(i).hover(function () {
            $('.main7 .hot-sale .hot-sale-img li').eq(i).find('.li-content').stop().slideDown(300);
        }, function () {
            $('.li-content').stop().slideUp(100);
        });
    };

    for (var i = 0; i < 12; i++) {
        _loop2(i);
    }

    var img = $('.main7').find('.m7-banner').find('.hot-sale');
    var prev = $('.main7 .btn .prev');
    var next = $('.main7 .btn .next');
    var current = 0;
    var len = img.length;
    next.on('click', function () {
        current++;
        if (current === len) {
            current = 0;
        }
        animate(current);
    });

    prev.on('click', function () {
        current--;
        if (current === -1) {
            current = len - 1;
        }
        animate(current);
    });
    $('.main7 .title ul').find('li').on('mouseenter', function () {
        current = $(this).index();
        animate(current);
    });
    function animate(current) {
        img.eq(current).stop().show().siblings().stop().hide();
        $('.main7 .title ul').find('li').eq(current).addClass('active').siblings().removeClass('active');
    }

    var img8 = $('.main8').find('.main8-banner').find('.img');
    var prev8 = $('.main8 .btn .prev');
    var next8 = $('.main8 .btn .next');
    var current8 = 0;
    var len8 = img8.length;
    next8.on('click', function () {
        current8++;
        if (current8 === len8) {
            current8 = 0;
        }
        animate1(current8);
    });

    prev8.on('click', function () {
        current8--;
        if (current8 === -1) {
            current8 = len8 - 1;
        }
        animate1(current8);
    });
    $('.main8 .title ul').find('li').on('mouseenter', function () {
        current8 = $(this).index();
        animate1(current8);
    });
    function animate1(current8) {
        img8.eq(current8).stop().show().siblings().stop().hide();
        $('.main8 .title ul').find('li').eq(current8).addClass('active').siblings().removeClass('active');
    }

    $('.main9 .hot-sale .hot-sale-a').hover(function () {
        $('.main9 .hot-sale .hot-sale-a').find('img').css({
            transition: '1s',
            transform: 'scale(1.2)'
        });
    }, function () {
        $('.hot-sale .hot-sale-a').find('img').css({
            transition: '1s',
            transform: 'scale(1)'
        });
    });

    var _loop3 = function _loop3(i) {
        $('.main10 .hot-sale').find('a').eq(i).hover(function () {
            $('.main10 .hot-sale').find('a').eq(i).find('img').css({
                transition: '1s',
                transform: 'scale(1.1)'
            });
        }, function () {
            $('.main10 .hot-sale').find('a').eq(i).find('img').css({
                transition: '1s',
                transform: 'scale(1)'
            });
        });
    };

    for (var i = 0; i < $('.main10 .hot-sale').find('a').length; i++) {
        _loop3(i);
    }

    var _loop4 = function _loop4(i) {
        $('.main11 .hot-sale').find('a').eq(i).hover(function () {
            $('.main11 .hot-sale').find('a').eq(i).find('img').css({
                transition: '1s',
                transform: 'scale(1.1)'
            });
        }, function () {
            $('.main11 .hot-sale').find('a').eq(i).find('img').css({
                transition: '1s',
                transform: 'scale(1)'
            });
        });
    };

    for (var i = 0; i < $('.main11 .hot-sale').find('a').length; i++) {
        _loop4(i);
    }
    if (getCookie('user') && getCookie('password')) {
        // console.log(getCookie('user'))
        $.cookie('isLogin', true);
        if ($.cookie('isLogin')) {
            $('.sign-ready').html('退出');
            $('.header-bottom .sign-logon').html(getCookie('user'));
        }
        $('.sign-ready').on('click', function () {
            $.cookie('isLogin', false);
            $('.header-bottom .sign-ready').html('请登录');
            $('.header-bottom .sign-logon').html('注册即送3500元大礼包');
        });
    }
})();
;(function () {
    var t1 = false;
    var t2 = false;
    var t3 = false;
    var t4 = false;
    var t5 = false;
    var ot1 = document.getElementById("txt1");
    var ot2 = document.getElementById("txt2");
    var ot3 = document.getElementById("txt3");
    var ot4 = document.getElementById("txt4");
    var ob = document.getElementById("register");
    var oi1 = document.querySelector('.content div:nth-child(1) i');
    var oi2 = document.querySelector('.content div:nth-child(2) i');
    var oi3 = document.querySelector('.content div:nth-child(3) i');
    var oi4 = document.querySelector('.content div:nth-child(4) i');
    var oi5 = document.querySelector('.content div:nth-child(5) i');
    $('#txt1').on('blur', function () {
        var tel = ot1.value;
        var reg = /^1\d{10}$/;
        if (!reg.test(tel)) {
            oi1.style.display = "block";
            t1 = false;
        } else {
            t1 = true;
            oi1.style.display = "none";
        }
    });
    $('#txt1').on('focus', function () {
        oi1.style.display = "none";
    });
    $('#txt2').on('blur', function () {
        var tel = ot2.value;;
        var reg = /^\d{6}$/;
        if (!reg.test(tel)) {
            oi2.style.display = "block";
            t2 = false;
        } else {
            t2 = true;
        }
    });
    $('#txt2').on('focus', function () {
        oi2.style.display = "none";
    });
    $('#txt3').on('blur', function () {
        var opsw = ot3.value;;
        var reg = /^[\w-]{6,20}$/;
        if (!reg.test(opsw)) {
            oi3.style.display = "block";
            t3 = false;
        } else {
            t3 = true;
        }
    });
    $('#txt3').on('focus', function () {
        oi3.style.display = "none";
    });
    $('#txt4').on('blur', function () {
        if (ot4.value !== ot3.value) {
            oi4.style.display = "block";
            t4 = false;
        } else {
            t4 = true;
        }
    });
    $('#txt4').on('focus', function () {
        oi4.style.display = "none";
    });
    $('#register').on('click', function () {
        if (t1 && t2 && t3 && t4) {
            var name = ot1.value;
            var password = ot3.value;;
            $.cookie('user', name);
            $.cookie('password', password);
            window.location.href = 'sign.html';
        } else {
            alert("提交失败");
        }
    });
})();
;(function () {
    var _loop5 = function _loop5(i) {
        $('.detail .s-img li').eq(i).hover(function () {
            $('.detail .img img').eq(i).stop().show().siblings().stop().hide();
            $('.detail .s-img li').eq(i).addClass('active').siblings().removeClass('active');
        });
    };

    // console.log($('.detail .s-img li').length)
    for (var i = 0; i < $('.detail .s-img li').length; i++) {
        _loop5(i);
    }
    $('.button .add').on('click', function () {
        window.location.href = 'car.html';
    });
    function Magnifier() {
        this.box = document.querySelector(".detail .img");
        this.img = document.querySelector(".detail .img img");
        this.init();
    }

    Magnifier.prototype.init = function () {
        var that = this;
        $(".detail .img").on('mouseover', function (eve) {
            that.show();
        });
        $(".detail .img").on('mouseout', function () {
            that.hide();
        });
        $(".detail .img").on('mousemove', function (eve) {
            var e = eve || window.event;
            that.move(e);
        });
    };

    Magnifier.prototype.show = function () {
        $(".detail .img img").css('transform', 'scale(2)');
    };

    Magnifier.prototype.hide = function () {
        $(".detail .img img").css('transform', 'scale(1)');
        $(".detail .img img").css({
            left: 0,
            top: 0
        });
    };

    Magnifier.prototype.move = function (e) {

        var l = e.clientX - this.box.offsetLeft;
        var t = e.clientY - this.box.offsetTop;

        if (l < 0) {
            l = 0;
        }
        if (l > this.box.offsetWidth) {
            l = this.box.offsetWidth;
        }
        if (t < 0) {
            t = 0;
        }
        if (t > this.box.offsetHeight) {
            t = this.box.offsetHeight;
        }
        $(".detail .img img").css({
            left: -e.offsetX + 250 + "px",
            top: -e.offsetY + 250 + "px"
        });

        // this.img.style.left = -e.offsetX + 250 + "px";
        // this.img.style.top = -e.offsetY + 250 + "px";
    };

    new Magnifier();
})();

;(function () {
    var Shop = function () {
        function Shop() {
            _classCallCheck(this, Shop);

            this.url = "../data/shop.json";
            this.lb = document.querySelector('.list-box');

            this.load();
        }

        _createClass(Shop, [{
            key: "load",
            value: function load() {
                var _this4 = this;

                ajax({
                    url: this.url,
                    success: function success(res) {
                        _this4.res = JSON.parse(res);
                        // console.log(this.res)
                        _this4.display();
                        _this4.sortPrice();
                        _this4.addEvent();
                    }
                });
            }
        }, {
            key: "sortPrice",
            value: function sortPrice() {
                var onoff = 0;
                var that = this;
                $('.right-top li .sort').on('click', function () {
                    if (onoff === 0) {
                        that.res.sort(function (a, b) {
                            return b.price - a.price;
                        });
                        // $('.right-top li .sort').html('价格由高到低')
                        // console.log(that.res)
                        that.display();
                        onoff = 1;
                    } else {
                        that.res.sort(function (a, b) {
                            return a.price - b.price;
                        });
                        // $('.right-top li .sort').html('价格由低到高')
                        // console.log(that.res)
                        that.display();
                        onoff = 0;
                    }
                });
            }
        }, {
            key: "display",
            value: function display() {
                var str = "";
                for (var i = 0; i < this.res.length; i++) {
                    str += "<li index=\"" + this.res[i].id + "\">\n                            <a href=\"#\"><img src=\"" + this.res[i].img + "\" alt=\"\"></a>\n                            <div class=\"content\">\n                                <p>\n                                    <em>\u6708\u4ED8</em>\n                                    <span>" + this.res[i].price1 + " </span>\n                                    <span>|\uFFE5<i>" + this.res[i].price + "</i></span>\n                                </p>\n                                <a href=\"#\">" + this.res[i].name + "</a>\n                                <span class=\"sale\">" + this.res[i].sale + "</span>\n                                <p>\u514D\u606F\u5206\u671F</p>\n                                <p><a class=\"add\" href=\"#\">\u52A0\u5165\u8D2D\u7269\u8F66</a></p>\n                            </div>\n                        </li>";
                }
                $('.list-box').html(str);
            }
        }, {
            key: "addEvent",
            value: function addEvent() {
                var that = this;
                $('.list-box').on("click", function (eve) {
                    // console.log(1)
                    var e = eve || window.event;
                    var target = e.target || e.srcElement;
                    // console.log(target)
                    if (target.className == "add") {
                        that.id = target.parentNode.parentNode.parentNode.getAttribute("index");
                        console.log(that.id);
                        that.setCookie();
                    }
                });
                $('.list-box').on("click", 'img', function () {
                    window.location.href = 'shop-content.html';
                });
            }
        }, {
            key: "setCookie",
            value: function (_setCookie) {
                function setCookie() {
                    return _setCookie.apply(this, arguments);
                }

                setCookie.toString = function () {
                    return _setCookie.toString();
                };

                return setCookie;
            }(function () {
                console.log(1);
                this.goods = getCookie("goods") ? JSON.parse(getCookie("goods")) : [];
                // console.log(this.goods)
                if (this.goods.length < 1) {
                    this.goods.push({
                        id: this.id,
                        num: 1
                    });
                } else {
                    var onoff = 1;
                    for (var i = 0; i < this.goods.length; i++) {
                        if (this.goods[i].id === this.id) {
                            this.goods[i].num++;
                            onoff = 0;
                        }
                    }
                    if (onoff == 1) {
                        this.goods.push({
                            id: this.id,
                            num: 1
                        });
                    }
                }
                setCookie("goods", JSON.stringify(this.goods));
            })
        }]);

        return Shop;
    }();

    new Shop();
})();
;(function () {
    $('.way .span1').on('click', function () {
        $('.sign-user').stop().show();
        $('.sign-ma').stop().hide();
        $('.way .span1').addClass('active1').siblings().removeClass('active1');
    });
    $('.way .span2').on('click', function () {
        $('.sign-user').stop().hide().removeClass('active1');
        $('.sign-ma').stop().show().addClass('active1');
        $('.way .span2').addClass('active1').siblings().removeClass('active1');
    });
    var ot1 = document.querySelector('.sign-user .txt1');
    var ot2 = document.querySelector('.sign-user .txt2');
    $('#sub').on('click', function () {
        var username = ot1.value;
        var password = ot2.value;
        if (username === getCookie('user') && password === getCookie('password')) {
            window.location.href = 'index.html';
        } else {
            alert('登录失败，请重新登录');
        }
    });

    // var t1 = false;
    // var t2 = false;
    // var i1 = document.querySelector('.sign-user p:nth-child(1) i')
    // $('#sub').on('click', function(){
    //     var tel =  $('.sign-user #txt1').html();
    //     var reg = /^1\d{10}$/
    //     if(!reg.test(tel)){
    //         i1.style.display = "block";
    // t1 = false;
    // }else{
    // t1 = true;
    // }
    // })
})();