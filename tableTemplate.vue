<template>
        <div class="content">
            <!-- 插槽0 导航,有就写,没有就放着 -->
            <slot name="content-title"></slot>
            <div class="content-body pr clear">
                <div class="table clear " id="table">
                    <!-- 插槽1 一个DIV包裹2个UL -->
                    <slot name="leftUl"></slot>

                    <div class="out_box out_box_list sales_order_list" ref="tempul">
                        <div class="scroll_box">
                            <div class="vertical">
                                <span class="inner_ver"></span>
                            </div>
                            <div class="horizontal">
                                <span class="inner_hor"></span>
                            </div>
                            <div class="inner_box">
                                <div class="table-center">
                                     <!-- 插槽2 2个UL -->
                                    <slot name="midUl"></slot>

                                </div>
                            </div>
                        </div>
                    </div>
    
                    <!-- <div class="table-right fr"> -->
                        <!-- 插槽3 右边状态栏-->
                        <slot name="rightUl"></slot>
                    <!-- </div> -->
                </div>
                
    
                <!--170809 -->
                <!--表头固定s-->
                <div class="table clear oh fixed-div">
                    <div class="table-detail-left fl" style="width:145px;position: relative;z-index: 99;">
                        <!-- 插槽4 -->
                        <slot name="fixedNavFixed"></slot>
                    </div>
                    <div class="table-center fl yarn_order oh out_box_detials" :style="{ 'width': out_box_w + 'px'}">
                        <!-- 插槽5 -->
                        <slot name="fixedNavOhter"></slot>
                    </div>
                </div>
                <!--表头固定e-->


                 <!-- 插槽6 --> 
                 <slot name="poolWrap"></slot> 
            </div>
        </div>
</template>




<script>
import { mapState, mapActions } from 'vuex';
import api from '@/api/commonAPI'
import * as scrollBox from '@/lib/scrollBox.js'

//170809 nav栏
import "@/lib/nav.js"

export default {
    mounted() {
        var _this = this
        setTimeout(function () {
            scrollBox.init('table', _this.$store)
        }, 800);
        //**********************
        // this.out_box_w = document.getElementsByClassName("out_box_list")[0].offsetWidth + 15
        this.out_box_w = this.$refs.tempul.offsetWidth+15
        window.addEventListener('resize', this.onResize)
    },
    data() {
        return {
            //**********************
            out_box_w: 0,
            navflag:true,

            mouseIndex: -1,
            selectId: -1,
            selectIndex: -1,
        }
    },
    created() {

    },

    computed: {
        ...mapState({
            //170809
            //**********************
            scrollLeft: state => state.scrollLeft,
        })
    },
    watch: {

        //**********************
        "scrollLeft": (newVal, oldVal) => {
            document.getElementById("nav-fixed").style.left = newVal + "px";
        },
        "out_box_w":(val) => {
            this.out_box_w = val
            console.log("&&&&&&&&&&&&&")
            console.log(val)
        }
        
    },
    methods: {

        //**********************
        onResize(event) {
            var _this = this
            if(_this.navflag){
                _this.navflag = ! _this.navflag
                setTimeout(()=>{
                this.out_box_w = _this.$refs.tempul.offsetWidth+15
                // this.out_box_w = document.getElementsByClassName("out_box_list")[0].offsetWidth + 15
                console.log("***********")
                console.log(_this.out_box_w)
                _this.navflag = ! _this.navflag
                },500)
            }  
        }
    }
}
</script>



<style scoped>
.fixed-div {
    width: 100%;
    background: transparent;
}




.out_box_detials {
    position: absolute;
    top: 0;
    bottom: 0px;
    right: 0;
    left: 132px;
}

.out_box_list {
    position: absolute;
    top: 0px;
    bottom: 0px;
    left: 145px;
    right: 61px;
}

.content-title-sales-build-icon {
    width: 14px;
    height: 14px;
    vertical-align: sub;
    display: inline-block;
    margin-right: 16px;
}

.inner_box {
    width: 1368.2px;
}

.cusCss {
    width: 324px;
}

.order-btn {
    display: block;
    text-indent: 15px;
    width: 106px;
    padding: 0 10px;
    height: 34px;
    line-height: 34px;
    font-size: 14px;
    color: rgba(255, 255, 255, .8);
    background: url("../../assets/img/select.png") no-repeat 95px center;
    border: 1px solid rgba(255, 255, 255, .2);
    cursor: pointer;
}

.order-item {
    position: absolute;
    text-align: center;
    z-index: 99;
    border: 1px solid rgba(255, 255, 255, .2);
    background: rgba(42, 56, 69, 1);
    border-top: 0;
    display: none;
}

.order-btn:hover {
    border: 1px solid rgb(255, 255, 255);
}

.order-wrap:hover .order-item {
    display: block;
}

.order-item li {
    width: 106px;
    padding: 0 10px;
    height: 34px;
    line-height: 34px;
    color: rgba(255, 255, 255, .8);
}

.order-item li:hover {
    background: rgba(255, 255, 255, .2);
}

.order-icon {
    width: 14px;
    height: 14px;
    display: inline-block;
    margin-right: 5px;
}

.order-line {
    width: 124px;
    height: 1px;
    background: rgba(255, 255, 255, .1);
    position: absolute;
    top: 102px;
    left: 1px;
}

@media (max-width:1270px) {
    .out_box_list {
        right: 46px;
    }
}
</style>



