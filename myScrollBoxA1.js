import state from "@/store/state.js"

let html = (function () {
    /*
                                   
    */
}).toString().match(/[^]*\/\*([^]*)\*\/\}$/)[1]


function parseDom(str) {
    let tempDom = document.createElement("div");
    tempDom.innerHTML = str;　
    return tempDom.childNodes;
};

let htmlDom = parseDom(html)

/**
 * parentbox_name  传 content-body , 表格将 append 到该盒子中
 * box_name        传 table , 最外层表格盒子类名
 * store           _this.$store
 * 
 * 举个栗子         myTable.init('content-body','table', _this.$store)
 */

export const init = function (parentbox_name, box_name, store) {
    let parentbox = document.getElementsByClassName(parentbox_name)[0]
    parentbox.appendChild(htmlDom)
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