<template>
    <div>
        <div class="middle h-ex-sm lh-ex-sm pr mb1">
            <div class="middle-left">
                <routerPath></routerPath>
            </div>
            <div class="middle-right h-ex-sm pa">
                <search-btn orderType="sales-order"></search-btn>
            </div>
        </div>
        <!-- ************************************* -->
        <tab-tmpl>
            <div slot="leftUl" class="table-left fl">
                <ul class="table-title h-ex-sm lh-ex-sm">
                    <li class="w-ls fl ">序号</li>
                    <li class="w-ex-sm fl ">销售订单编号</li>
                </ul>
                <ul class="table-main h-lg lh-lg" @mouseleave="myMouseleave" @mouseenter="myMouseenter(index)" :class="{'table-main-active' : mouseIndex == index ? true : false,'table-main-actived':selectIndex==index?true:false}" v-for="(salesOrder,index) in salesOrderList" @click="getSalesId(salesOrder.id,index)">
                    <li class="w-ls fl h-pct100">{{1+num+index}}</li>
                    <li class="w-ex-sm fl h-pct100 cp" @click="getEditPage(salesOrder.id)">{{salesOrder.code}}</li>
                </ul>
            </div>
            <div slot="midUl">
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
            <div slot="rightUl" class="table-right fr">
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
            <ul slot="fixedNavFixed" class="table-title h-ex-sm lh-ex-sm " style="background-color:rgba(60,98,131,.9);">
                <li class="w-ls fl ">序号</li>
                <li class="w-ex-sm fl ">销售订单编号</li>
            </ul>
            <ul slot="fixedNavOhter" class="table-title h-ex-sm lh-ex-sm inner_box fixed-ul" id="nav-fixed" style="position:absolute;background-color: rgba(60,98,131,.9)">
                <li class="w-ex-sm fl ">交期</li>
                <li class="cusCss w-ex-lg fl ">客户</li>
                <li class="cusCss w-ex-lg fl ">最终客户</li>
                <li class="w-sm fl ">订单类型</li>
                <li class="w-ex-sm fl ">销售组织</li>
                <li class="w-ex-sm fl ">跟单人</li>
                <li class="w-ex-sm fl ">指派</li>
                <li class="w-ex-sm fl " style="text-align:right">数量</li>
                <li class="w-ex-md fl " style="text-align:right">金额</li>
            </ul>
            <div slot="poolWrap">
                <div class="pool-wrap pa c-255-8 clear ta-c">
                    <span class="fl">总数:</span>
                    <span class="pool-number fl" v-for="qty in quantityArr">{{getSalesQty(qty)}}</span>
                    <span class="pool fl">总额:</span>
                    <span class="pool-money fl" v-for="money in moneyArr">{{getSalesMoney(money)}}</span>
                </div>
                <div class="content-body-detail bc-0-3"></div>
            </div>

            
        </tab-tmpl>
    
        <!-- ************************************* -->
    
        <!-- <page :url="url" ref="page" @getdata='getsalesOrderList'></page> -->
        <page-after @getCurrentPage="getSalesCurrentPage" :pagesAAA="pageAAA" :pagecountsaaa="page_countaaa" orderType="sales-order" typeVal="1,2" :sortUrl="sortSalesUrl" v-if="showPage"></page-after>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import searchBtn from '@/components/common/searchBtn.vue'
import routerPath from '@/components/common/RouterPath.vue'
import page from '@/components/common/page.vue'
import edit from "@/components/common/edit.vue"
import delPop from "@/components/common/delPop.vue"
import api from '@/api/commonAPI'
import pageAfter from '@/components/common/pageAfter.vue'

// import * as scrollBox from '@/lib/scrollBox.js'
import tabTmpl from '@/views/template/tableTemplate.vue'

//170809 nav栏
// import "@/lib/nav.js"

// import * as scrollBox from "@/lib/mytest.js" 

export default {
    mounted() {
        // 原本的
        // var _this = this
        // setTimeout(function () {
        //     scrollBox.init('table', _this.$store)
        // }, 800);

        //**********************
        // this.out_box_w = document.getElementsByClassName("out_box_list")[0].offsetWidth + 15
        // this.out_box_w = this.$refs.tempul.offsetWidth+15  (先不要这个)
        // window.addEventListener('resize', this.onResize)
    },
    data() {
        return {
            //**********************
            // out_box_w: 0,
            // navflag:true,


            mouseIndex: -1,
            selectId: -1,
            selectIndex: -1,
            customerVal: 0,
            trackerVal: 0,
            quantityVal: 0,
            moneyVal: 0,
            statusVal: 0,
            sortSalesUrl: ""
        }
    },
    created() {
        var _this = this;
        var obj = {
            orderType: 'sales-order',
            pagenum: _this.pageAAA,
            pagecounts: _this.page_countaaa,
            type: '1,2'
        };
        this.$store.dispatch('getListData', obj);
    },

    computed: {
        ...mapState({
            headers: state => state.headers,
            pageAAA: state => state.pageAAA,
            page_countaaa: state => state.page_countaaa,
            salesOrderList: state => state.page.dataList,
            quantityArr: state => state.page.quantitySum,
            moneyArr: state => state.page.moneySum,
            num: state => state.page.num,
            showPage: state => state.page.showPage,
            //170809
            //**********************
            // scrollLeft: state => state.scrollLeft,
        }),
        Status() {
            return this.salesOrderList[this.selectIndex];
        }
    },
    watch: {
        'salesOrderList': function () {
            this.selectId = -1;
            this.selectIndex = -1;
        },


        //**********************
        // "scrollLeft": (newVal, oldVal) => {
        //     document.getElementById("nav-fixed").style.left = newVal + "px";
        // },
        // "out_box_w":(val) => {
        //     this.out_box_w = val
        //     console.log("&&&&&&&&&&&&&")
        //     console.log(val)
        // }

    },
    methods: {

        //**********************
        // onResize(event) {
        //     var _this = this
        //     if(_this.navflag){
        //         _this.navflag = ! _this.navflag
        //         setTimeout(()=>{
        //         // this.out_box_w = _this.$refs.tempul.offsetWidth+15
        //         this.out_box_w = document.getElementsByClassName("out_box_list")[0].offsetWidth + 15
        //         console.log("***********")
        //         console.log(_this.out_box_w)
        //         _this.navflag = ! _this.navflag
        //         },500)
        //     }  
        // },
        myMouseenter(index) {
            this.mouseIndex = index;
        },
        myMouseleave() {
            this.mouseIndex = -1;
        },
        getSalesCurrentPage(currentPage, page_count) {
            var url = '/sys/sales-order/index?page=' + currentPage + '&page_count=' + page_count;
            this.$router.push({ path: url });
        },
        // getsalesOrderList(val,num,quantitysum,moneysum){
        //     this.salesOrderList = val;
        //     this.num = num;
        //     this.quantityArr = quantitysum;
        //     this.moneyArr = moneysum;
        //     // let url = '/sys/sales-order/index?page=' + currentPage;
        //     // this.$router.push({path:url});
        // },
        getSalesId(id, index) {
            this.selectId = id;
            this.selectIndex = index;
        },
        getEditPage(id) {
            let url = '/sys/sales-order/show/' + id;
            this.$router.push({ path: url });
        },
        sortSalesList(value, typeVal, type) {
            if (value == 0) {
                this.sortSalesUrl = '/api/sales-order?type=1,2&field=' + type + '&rank=asc&lang=cn';
                this[typeVal] = 1;
            } else if (value == 1) {
                this.sortSalesUrl = '/api/sales-order?type=1,2&field=' + type + '&rank=desc&lang=cn';
                this[typeVal] = 2;
            } else {
                this.sortSalesUrl = '/api/sales-order?type=1,2&lang=cn';
                this[typeVal] = 0;
            }
        },
        createSalesOrder() {
            let url = '/sys/sales-order/create';
            this.$router.push({ path: url });
        },
        getSalesQty(detail) {
            if (detail.quantity) {
                var formatQty = this.toFormatData(detail.quantity);
            } else {
                var formatQty = '';
            }
            return formatQty;
        },
        getSalesMoney(detail) {
            var code = detail.currency_code || detail.cur_code;
            if (detail.money) {
                var formatPrice = code + ' ' + this.toFormatData(detail.money);
            } else {
                var formatPrice = '';
            }
            return formatPrice;
        },
        createYarnDetails() {
            if (this.selectId == -1) {
                var obj = {
                    title: '请选择销售订单',
                    type: 3,
                    flag: true
                }
                this.$store.commit('popup', obj);
                return false;
            }
            if (this.salesOrderList[this.selectIndex].status != 2) {
                var obj = {
                    title: '请先审核该订单！',
                    type: 3,
                    flag: true
                }
                this.$store.commit('popup', obj);
                return false;
            }
            this.$http.get(api.order_one('exist-yarn-detail', this.selectId), { headers: this.headers }).then(function (response) {
                if (response.data.status == 0) {
                    let url = '/sys/yarn-details/create?sales_id=' + this.selectId;
                    this.$router.push({ path: url });
                } else {
                    var obj = {
                        title: '此订单已生成购纱清单，请勿重复生成',
                        type: 2,
                        flag: true
                    }
                    this.$store.commit('popup', obj);
                }
            })
        },
        createKnitOrder() {
            if (this.selectId == -1) {
                var obj = {
                    title: '请选择销售订单',
                    type: 3,
                    flag: true
                }
                this.$store.commit('popup', obj);
                return false;
            }
            if (this.salesOrderList[this.selectIndex].status != 2) {
                var obj = {
                    title: '请先审核该订单！',
                    type: 3,
                    flag: true
                }
                this.$store.commit('popup', obj);
                return false;
            }
            let url = '/sys/knit-order/create?sales_order_id=' + this.selectId;
            this.$router.push({ path: url });
        },
        createDyeOrder() {
            if (this.selectId == -1) {
                var obj = {
                    title: '请选择销售订单',
                    type: 3,
                    flag: true
                }
                this.$store.commit('popup', obj);
                return false;
            }
            if (this.salesOrderList[this.selectIndex].status != 2) {
                var obj = {
                    title: '请先审核该订单！',
                    type: 3,
                    flag: true
                }
                this.$store.commit('popup', obj);
                return false;
            }
            let url = '/sys/dye-order/create?sales_order_id=' + this.selectId;
            this.$router.push({ path: url });
        },
        createDyeingOrder() {
            if (this.selectId == -1) {
                var obj = {
                    title: '请选择销售订单',
                    type: 3,
                    flag: true
                }
                this.$store.commit('popup', obj);
                return false;
            }
            if (this.salesOrderList[this.selectIndex].status != 2) {
                var obj = {
                    title: '请先审核该订单！',
                    type: 3,
                    flag: true
                }
                this.$store.commit('popup', obj);
                return false;
            }
            let url = '/sys/dyeing-order/create?sales_order_id=' + this.selectId;
            this.$router.push({ path: url });
        },
        createPrintOrder() {
            if (this.selectId == -1) {
                var obj = {
                    title: '请选择销售订单',
                    type: 3,
                    flag: true
                }
                this.$store.commit('popup', obj);
                return false;
            }
            if (this.salesOrderList[this.selectIndex].status != 2) {
                var obj = {
                    title: '请先审核该订单！',
                    type: 3,
                    flag: true
                }
                this.$store.commit('popup', obj);
                return false;
            }
            let url = '/sys/printing-order/create?sales_order_id=' + this.selectId;
            this.$router.push({ path: url });
        },
        createYarnOrder() {
            if (this.selectId == -1) {
                var obj = {
                    title: '请选择销售订单',
                    type: 3,
                    flag: true
                }
                this.$store.commit('popup', obj);
                return false;
            }
            if (this.salesOrderList[this.selectIndex].status != 2) {
                var obj = {
                    title: '请先审核该订单！',
                    type: 3,
                    flag: true
                }
                this.$store.commit('popup', obj);
                return false;
            }
            let url = '/sys/purchase-order/create?sales_order_id=' + this.selectId;
            this.$router.push({ path: url });
        },
        toFormatData(num) {
            if (num == '' || num == undefined) {
                return '';
            }
            var data = parseFloat(num.toString().replace(/\,/g, ""));
            if (!isNaN(data)) {
                var temp = data.toFixed(2).toString().split(".");
                temp[0] = temp[0].replace(new RegExp('(\\d)(?=(\\d{3})+$)', 'ig'), "$1,");
                return temp.join(".");
            } else {
                return '';
            }
        }
    },
    components: {
        delPop: delPop,
        edit: edit,
        searchBtn: searchBtn,
        routerPath: routerPath,
        //page: page,
        pageAfter: pageAfter,
        tabTmpl
    }
}
</script>

<style scoped>
.fixed-div {
    width: 100%;
    background: transparent;
}



/* .fixed-ul {
    background-color: rgb(69, 95, 109);
} */

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