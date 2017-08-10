import state from "@/store/state.js"

let htms = (function () {/*
      <div class="table clear " id="table">
                    <div class="table-left fl">
                        <ul class="table-title h-ex-sm lh-ex-sm">
                            <li class="w-ls fl ">序号</li>
                            <li class="w-ex-sm fl ">销售订单编号</li>
                        </ul>
    
                        <ul class="table-main h-lg lh-lg" @mouseleave="myMouseleave" @mouseenter="myMouseenter(index)" :class="{'table-main-active' : mouseIndex == index ? true : false,'table-main-actived':selectIndex==index?true:false}" v-for="(salesOrder,index) in salesOrderList" @click="getSalesId(salesOrder.id,index)">
                            <li class="w-ls fl h-pct100">{{1+num+index}}</li>
                            <li class="w-ex-sm fl h-pct100 cp" @click="getEditPage(salesOrder.id)">{{salesOrder.code}}</li>
                        </ul>
                    </div>
    
                    <div class="out_box out_box_list sales_order_list">
                        <div class="scroll_box">
                             <div class="vertical">
                                <span class="inner_ver"></span>
                            </div> 
                            <div class="horizontal">
                                <span class="inner_hor"></span>
                            </div>
                            <div class="inner_box">
                                <div class="table-center">
                                    <ul class="table-title h-ex-sm lh-ex-sm">
                                        <li class="w-ex-sm fl">交期</li>
                                        <li class="cusCss w-ex-lg fl cp" @click="sortSalesList(customerVal,'customerVal','customer_id')">
                                            <span :class="{'sequence-item': customerVal==0||customerVal==1,'sequence-item2':customerVal==0||customerVal==2}">客户</span>
                                        </li>
                                        <li class="cusCss w-ex-lg fl ">最终客户</li>
                                        <li class="w-sm fl ">订单类型</li>
                                        <li class="w-ex-sm fl">销售组织</li>
                                        <li class="w-ex-sm fl cp" @click="sortSalesList(trackerVal,'trackerVal','bill_man')">
                                            <span :class="{'sequence-item': trackerVal==0||trackerVal==1,'sequence-item2':trackerVal==0||trackerVal==2}">跟单人</span>
                                        </li>
                                        <li class="w-ex-sm fl">指派</li>
                                        <li class="w-ex-sm fl money-right">数量</li>
                                        <li class="w-ex-md fl money-right">金额</li>
                                    </ul>
    
                                    <ul class="table-main h-lg lh-lg" @mouseleave="myMouseleave" @mouseenter="myMouseenter(index)" :class="{'table-main-active' : mouseIndex == index ? true : false,'table-main-actived':selectIndex==index?true:false}" v-for="(salesOrder,index) in salesOrderList" @click="getSalesId(salesOrder.id,index)">
                                        <li class="w-ex-sm fl h-pct100">{{salesOrder.delivery}}</li>
                                        <li class="cusCss fl pr h-pct100">
                                            <span class="table-main-span center">
                                                {{salesOrder.customer_name}}
                                            </span>
                                        </li>
                                        <li class="cusCss fl pr h-pct100">
                                            <span class="table-main-span center">
                                                {{salesOrder.end_customer_name}}
                                            </span>
                                        </li>
                                        <li class="w-sm fl h-pct100" v-if="salesOrder.type==1">大货</li>
                                        <li class="w-sm fl h-pct100" v-if="salesOrder.type==2">销售版</li>
                                        <li class="w-ex-sm fl h-pct100 pr">
                                            <span class="table-main-span center">{{salesOrder.marketing_organizing}}</span>
                                        </li>
                                        <li class="w-ex-sm fl h-pct100">{{salesOrder.bill_man_name}}</li>
                                        <li class="w-ex-sm fl h-pct100">{{salesOrder.receive_user_name}}</li>
                                        <li class="w-ex-sm fl h-pct100 money-right">{{getSalesQty(salesOrder)}}</li>
                                        <li class="w-ex-md fl h-pct100 money-right">{{getSalesMoney(salesOrder)}}</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
    
                    <div class="table-right fr">
                        <ul class="table-title h-ex-sm lh-ex-sm">
                            <li class="last-th h-pct100 cp" @click="sortSalesList(statusVal,'statusVal','status')">
                                <span :class="{'sequence-item': statusVal==0||statusVal==1,'sequence-item2':statusVal==0||statusVal==2}">状态</span>
                            </li>
                        </ul>
                        <ul class="table-main h-lg lh-lg" @mouseleave="myMouseleave" @mouseenter="myMouseenter(index)" :class="{'table-main-active' : mouseIndex == index ? true : false,'table-main-actived':selectIndex==index?true:false}" v-for="(salesOrder,index) in salesOrderList" @click="getSalesId(salesOrder.id,index)">
                            <li class="last-th h-pct100 pr">
                                <span class="not-audited" v-if="salesOrder.status==1">未审核</span>
                                <span class="audited" v-if="salesOrder.status==2">已审核</span>
                                <span class="finished" v-if="salesOrder.status==4">已完结</span>
                                <span class="del h-sm lh-sm ta-c pa center">删</span>
                            </li>
                        </ul>
                    </div>
                </div>                             
*/}).toString().match(/[^]*\/\*([^]*)\*\/\}$/)[1]

// /* */要跟在})后面

function parseDom(str) {
    let tempDom = document.createElement("div");
    tempDom.innerHTML = str;　
    return tempDom.childNodes;
};

let htmlDom = parseDom(htmls)

/**
 * box_name                         传 table , 最外层表格盒子类名
 * store                            _this.$store
 * parentbox_name                   传 content-body , 表格将插入到该盒子中
 * parentbox_last_childNode         传 pool-wrap ,该类名为显示总数和总额的盒子,将表格DOM插入到它之前
 * 举个栗子         myTable.init('content-body','pool-wrap','table', _this.$store) 
 */

export const init = function (parentbox_name,parentbox_last_childNode,box_name,store,) {
    let parentbox = document.getElementsByClassName(parentbox_name)[0]
    let refDom = document.getElementsByClassName(parentbox_last_childNode)[0]
    parentbox.insertBefore(htmlDom,refDom)
    setTimeout(() => {
        var scrollBoxHeight = 0;
        var scrollBoxWidth = 0;
        var innerBoxHeight = 0;
        var innerBoxWidth = 0;
        var innerVerTop = 0;
        var innerVerHeight = 0;
        var innerBoxTop = 0;
        var innerHorLeft = 0;
        var innerHorWidth = 0;
        var innerBoxLeft = 0;
        var timer = '';
        var hiddenVertical = false;
        var hiddenHorizontal = false;
        var showScroll = false;

        var parentDiv = document.getElementsByClassName(box_name)[0]
        var scrollBox = parentDiv.getElementsByClassName("scroll_box")[0];
        var innerBox = parentDiv.getElementsByClassName("inner_box")[0];
        var horizontalBtn = parentDiv.getElementsByClassName("horizontal")[0];
        var innerhorSpan = parentDiv.getElementsByClassName("inner_hor")[0];
        var innerverSpan = parentDiv.getElementsByClassName("inner_ver")[0];
        var verticalBtn = parentDiv.getElementsByClassName("vertical")[0];
        var colorFlag = true;
        var initFun = function () {
            scrollBoxHeight = scrollBox.offsetHeight;
            scrollBoxWidth = scrollBox.offsetWidth;
            innerBoxHeight = innerBox.offsetHeight;
            innerBoxWidth = innerBox.offsetWidth;
            innerHorWidth = scrollBoxWidth * scrollBoxWidth / innerBoxWidth;
            innerVerHeight = scrollBoxHeight * scrollBoxHeight / innerBoxHeight;
            if (innerVerHeight >= scrollBoxHeight) {
                hiddenVertical = true;
            }

            if (innerHorWidth >= scrollBoxWidth) {
                hiddenHorizontal = true;
            }
            verticalBtn.style.display = 'none';
            horizontalBtn.style.display = 'none';

            if (document.addEventListener) {
                parentDiv.addEventListener('mouseenter', function (e) {
                    if (hiddenVertical) {
                        verticalBtn.style.display = 'none';
                    } else {
                        verticalBtn.style.display = 'block';
                        setVertical();
                        mouseEnter(e);
                    }

                    if (hiddenHorizontal) {
                        horizontalBtn.style.display = 'none';
                    } else {
                        horizontalBtn.style.display = 'block';
                        setHorizontal();
                    }

                    var winHeight = document.documentElement.clientHeight;
                    var winWidth = document.documentElement.clientWidth;

                    if (getTop(horizontalBtn) > winHeight) {
                        window.addEventListener('scroll', function () {
                            var scrollTop = 0;
                            var scrollHeight = 0;
                            if (document.documentElement && document.documentElement.scrollTop) {
                                scrollTop = document.documentElement.scrollTop;
                                scrollHeight = document.documentElement.scrollHeight;
                            } else if (document.body) {
                                scrollTop = document.body.scrollTop;
                                scrollHeight = document.documentElement.scrollHeight;
                            }
                            if (scrollTop > scrollHeight - winHeight - 100) {
                                horizontalBtn.style.position = '';
                                horizontalBtn.style.width = '100%'
                                horizontalBtn.style.left = 0;
                                horizontalBtn.style.background = 'rgba(255,255,255,0.05)'
                            } else {
                                horizontalBtn.style.position = 'fixed'
                                horizontalBtn.style.width = scrollBoxWidth + 'px'
                                horizontalBtn.style.left = getLeft(scrollBox) + 'px'
                                horizontalBtn.style.background = 'rgba(255,255,255,0.05)'
                            }

                        }, false)
                    }
                }, false);

                parentDiv.addEventListener('mouseleave', function (e) {
                    verticalBtn.style.display = 'none';
                    horizontalBtn.style.display = 'none';
                }, false);

                innerhorSpan.addEventListener('mousedown', function (e) {
                    mouseDown(e, 'inner_hor');
                    e.target.style.background = "#787878";
                    colorFlag = false;
                }, false);

                innerverSpan.addEventListener('mousedown', function (e) {
                    mouseDown(e, 'inner_ver');
                }, false);

                innerhorSpan.addEventListener('mousemove', function (e) {
                    if (colorFlag) {
                        e.target.style.background = "#a8a8a8";
                    }
                }, false);

                innerhorSpan.addEventListener('mouseleave', function (e) {
                    if (colorFlag) {
                        e.target.style.background = "#c1c1c1";
                    }
                }, false);

                document.addEventListener('mouseup', function (e) {
                    innerhorSpan.style.background = "#c1c1c1";
                }, false);
            } else {

                parentDiv.onmouseenter = function (e) {
                    if (hiddenVertical) {
                        verticalBtn.style.display = 'none';
                    } else {
                        verticalBtn.style.display = 'block';
                        setVertical();
                        mouseEnter(e);
                    }
                    if (hiddenHorizontal) {
                        horizontalBtn.style.display = 'none';
                    } else {
                        horizontalBtn.style.display = 'block';
                        setHorizontal();
                    }
                };
                parentDiv.onmouseleave = function (e) {
                    verticalBtn.style.display = 'none';
                    horizontalBtn.style.display = 'none';
                };
                innerverSpan.onmousedown = function (e) {
                    mouseDown(e, 'inner_ver')
                };
                innerhorSpan.onmousedown = function (e) {
                    mouseDown(e, 'inner_hor')
                }
            }
        }

        initFun();
        var getTop = function (e) {
            var offset = e.offsetTop;
            if (e.offsetParent != null) offset += getTop(e.offsetParent);
            return offset;
        }
        var getLeft = function (e) {
            var offset = e.offsetLeft;
            if (e.offsetParent != null) offset += getLeft(e.offsetParent);
            return offset;
        }

        var setVertical = function () {
            verticalBtn.getElementsByTagName('span')[0].style.top = innerVerTop + 'px';
            verticalBtn.getElementsByTagName('span')[0].style.height = innerVerHeight + 'px';
        }

        var setHorizontal = function () {
            horizontalBtn.getElementsByTagName('span')[0].style.left = innerHorLeft + 'px';
            horizontalBtn.getElementsByTagName('span')[0].style.width = innerHorWidth + 'px';
        }

        var mouseEnter = function (e) {
            var scrollBox = document.getElementsByClassName("scroll_box")[0];
            if (document.addEventListener) {
                scrollBox.addEventListener('DOMMouseScroll', scrollFunc, false);
            }
            scrollBox.onmousewheel = scrollFunc;
        }

        var scrollFunc = function (e) {
            e.preventDefault && e.preventDefault();
            if (e.wheelDelta) { //判断浏览器IE，谷歌滑轮事件             
                if (e.wheelDelta > 0) { //当滑轮向上滚动时
                    mouseScroll('up');

                }
                if (e.wheelDelta < 0) { //当滑轮向下滚动时
                    mouseScroll('down');

                }
            } else if (e.detail) { //Firefox滑轮事件
                if (e.detail > 0) {
                    mouseScroll('down');

                }
                if (e.detail < 0) {
                    mouseScroll('up');

                }
            }
        }

        var mouseScroll = function (type) {

            if (type == 'up') {
                innerVerTop -= 10;
                mouseScrollUp();
            }
            if (type == 'down') {
                innerVerTop += 10;
                mouseScrollDown();
            }
            clearTimeout(timer)
            timer = setTimeout(function () {
                var a = 10;
                for (var i = 0; i < 10; i++) {
                    if (type == 'up') {
                        innerVerTop -= a;
                        mouseScrollUp();
                    }
                    if (type == 'down') {
                        innerVerTop += a;
                        mouseScrollDown();
                    }
                    a -= 1;
                }
            }, 30)
        }


        var mouseScrollUp = function () {
            innerBoxTop = -(innerVerTop / (scrollBoxHeight - innerVerHeight) * (innerBoxHeight - scrollBoxHeight))
            if (innerVerTop <= 0) {
                innerVerTop = 0;
                innerBoxTop = -(innerVerTop / (scrollBoxHeight - innerVerHeight) * (innerBoxHeight - scrollBoxHeight))
            }
            innerBox.style.top = innerBoxTop + 'px';
            setVertical();
            setHorizontal();
        }

        var mouseScrollDown = function () {
            innerBoxTop = -(innerVerTop / (scrollBoxHeight - innerVerHeight) * (innerBoxHeight - scrollBoxHeight))
            if (innerVerTop >= scrollBoxHeight - innerVerHeight) {
                innerVerTop = scrollBoxHeight - innerVerHeight;
                innerBoxTop = -(innerVerTop / (scrollBoxHeight - innerVerHeight) * (innerBoxHeight - scrollBoxHeight))
            }
            innerBox.style.top = innerBoxTop + 'px';
            setVertical();
            setHorizontal();
        }
        var mouseDown = function (e, type) {
            e.preventDefault && e.preventDefault();
            var startX = e.clientX;
            var startY = e.clientY;
            if (type == 'inner_hor') {
                var tempVal = innerHorLeft;
                document.onmousemove = function (e) {
                    var endX = e.clientX;
                    if (tempVal == 0) {
                        innerHorLeft = endX - startX;
                        mouseHorizontalMove();
                    } else {
                        innerHorLeft = tempVal + endX - startX;
                        mouseHorizontalMove();
                    }
                }
            }

            if (type == 'inner_ver') {
                var tempVal = innerVerTop;
                document.onmousemove = function (e) {
                    var endX = e.clientX;
                    var endY = e.clientY;
                    if (tempVal == 0) {
                        innerVerTop = endY - startY;
                        mouseVerticalMove();
                    } else {
                        innerVerTop = tempVal + endY - startY;
                        mouseVerticalMove();
                    }

                }
            }

            document.onmouseup = function (e) {
                document.onmousemove = null;
                colorFlag = true;
            }
        }

        var mouseHorizontalMove = function () {
            innerBoxLeft = -(innerHorLeft / (scrollBoxWidth - innerHorWidth) * (innerBoxWidth - scrollBoxWidth))
            if (innerHorLeft >= scrollBoxWidth - innerHorWidth) {
                innerHorLeft = scrollBoxWidth - innerHorWidth;
                innerBoxLeft = -(innerHorLeft / (scrollBoxWidth - innerHorWidth) * (innerBoxWidth - scrollBoxWidth))
            }
            if (innerHorLeft <= 0) {
                innerHorLeft = 0;
                innerBoxLeft = -(innerHorLeft / (scrollBoxWidth - innerHorWidth) * (innerBoxWidth - scrollBoxWidth))
            }

            innerBox.style.left = innerBoxLeft + 'px';

            // 让固定栏表头也能移动
            if (store) {
                store.commit("changeScrollLeft", innerBoxLeft);
            }
            setHorizontal();
            setVertical();
        }

        var mouseVerticalMove = function () {
            innerBoxTop = -(innerVerTop / (scrollBoxHeight - innerVerHeight) * (innerBoxHeight - scrollBoxHeight))
            if (innerVerTop >= scrollBoxHeight - innerVerHeight) {
                innerVerTop = scrollBoxHeight - innerVerHeight;
                innerBoxTop = -(innerVerTop / (scrollBoxHeight - innerVerHeight) * (innerBoxHeight - scrollBoxHeight))
            }
            if (innerVerTop <= 0) {
                innerVerTop = 0;
                innerBoxTop = -(innerVerTop / (scrollBoxHeight - innerVerHeight) * (innerBoxHeight - scrollBoxHeight))
            }
            innerBox.style.top = innerBoxTop + 'px';
            setVertical();
            setHorizontal();
        }

        window.onresize = function () {
            scrollBoxHeight = 0;
            scrollBoxWidth = 0;
            innerBoxHeight = 0;
            innerBoxWidth = 0;
            innerVerTop = 0;
            innerVerHeight = 0;
            innerBoxTop = 0;
            innerHorLeft = 0;
            innerHorWidth = 0;
            innerBoxLeft = 0;
            timer = '';
            hiddenVertical = false;
            hiddenHorizontal = false;
            showScroll = false;
            initFun();
            verticalBtn.getElementsByTagName('span')[0].style.top = 0;
            horizontalBtn.getElementsByTagName('span')[0].style.left = 0;
            innerBox.style.top = 0;
            innerBox.style.left = 0;
        }
    }, 1000);
}