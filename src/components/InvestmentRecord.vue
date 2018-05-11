<template>
  <div id="_InvestmenRecord_InvestmentRecord" class="_InvestmenRecord_main-body" :style="{'-webkit-overflow-scrolling': scrollMode}" style="background-color: #f1f1f0;height: 14.2rem">
    <div class="_InvestmenRecord_aaa">
      <ul class="_InvestmenRecord_headNav">
        <li :class="changeIndex==1?'_InvestmenRecord_active':''" @click="changeIdx(1)">注单查询</li>
        <li :class="changeIndex==2?'_InvestmenRecord_active':''" @click="changeIdx(2)">追号查询</li>
        <li :class="changeIndex==3?'_InvestmenRecord_active':''" @click="changeIdx(3)">撤单查询</li>
        <li :class="changeIndex==4?'_InvestmenRecord_active':''" >
          <select name="cars" v-model="kindId" >
            <option value="" selected="true"  @click="changeIdx(4)">全部</option>
            <option  v-for="(item,index) in ssczl[0]"  :value="sscKindId[0][index]" :name="Id[index]" >{{item}}</option>
          </select>
        </li>
      </ul>
      <div class="_InvestmenRecord_main_k" v-show="nothing">
        <div class="_InvestmenRecord_kong"></div>
        <p>投注竟然是空的</p>
        <p>"在忙，也要记得投几注"</p>
        <router-link tag="button"  :to="{name:'bettingHall',
        query:{ kindId:this.kindId==''?'cqssc':this.kindId,
                classId:this.classId ==''?'3' :this.classId
        }}" class="_InvestmenRecord_but">去下注</router-link>
      </div>
        <v-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false" ref="loadmore" style="z-index:-100">
        <div v-if="changeIndex==changeIndex" v-show="main_top" class="_InvestmenRecord_main">
          <div class="_InvestmenRecord_main_top"  v-show="kill_but" >
            <div class="_InvestmenRecord_qx_but" >
              <input type="checkbox" id="_InvestmenRecord_qx_but" @click="checkAll">全选
            </div>
            <div class="_InvestmenRecord_cd_but" @click="del(changeIndex)">撤单</div>
          </div>
            <div>
              <div class="_InvestmenRecord_main_div list" v-for="(item,index) in lotteryOrder">
                <div class="_InvestmenRecord_main_dd">
                  <input type="checkbox" class="_InvestmenRecord_dx _InvestmenRecord_check" :ind="ind" v-show="xs_show"   >
                </div>
                <div class="_InvestmenRecord_main_left">
                  <img src="../../static/images/img/cqssc.png">
                  <div class="_InvestmenRecord_main_left_div">
                    <span>{{item.baseLotteryName}}</span>
                    <span>{{item.gameName}}</span>
                  </div>
                </div>
                <div class="_InvestmenRecord_main_right">
                  <div class="_InvestmenRecord_main_right_l">
                    <span>第{{item.periodNo}}期</span>
                    <span>投注总额：{{item.allAmount}}</span>
                  </div>
                  <div class="_InvestmenRecord_main_right_r">
                    <button @click="cancel" :idx="index">详情</button>
                  </div>
                </div>
              </div>
            </div>
          <div style="height: 2rem;width: 100%"></div>  
        </div>
        </v-loadmore>  
      <div class="_InvestmenRecord_modal" v-if="hide">
        <div class="_InvestmenRecord_node_details">
          <h3>注单明细</h3>
          <div class="_InvestmenRecord_cha" @click="can(changeIndex)"></div>
          <ul class="_InvestmenRecord_zdmxList">
            <li> <span>注单号</span>: {{details.orderNo}}</li>
            <li> <span>下注时间</span>:{{details.payTime.substring(0,19)}}</li>
            <li> <span>注数</span>:{{details.payTimes}}</li>
            <li> <span>单注金额</span>:{{details.singleAmount}}</li>
            <li> <span>彩种</span>:{{details.lotteryName}}</li>
            <li> <span>玩法</span>:{{details.gameName}}</li>
            <li> <span>开奖号码</span>:{{details.winNumbers}}</li>
            <li> <span>销售返点</span>:{{details. rebateAmount}}</li>
            <li> <span>中奖金额</span>:{{details.winAmount}}</li>
            <li> <span>实际输赢</span>:{{details.realAmount}}</li>
            <li> <span>状态</span>:{{details.statusView}}</li>
            <li> <span>下注号码</span>:{{details.lotteryNumbers}}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
	import Vue from 'vue'
  import {Loadmore,MessageBox} from 'mint-ui';
//Vue.component(Loadmore.name, Loadmore);
  export default {
    data () {
      return {
        img:[],
        changeIndex: 1,
        flag: true,
        index:0,
        ind:0,
        hide:false,
        lotteryOrder:[],
        orderNo:'',
        details:'',
        status:'',
        countAll:"",
        qishu:"",
        idxList:[],
        ssczl:[],
        sscKindId:[],
        Id:[],
        kindId:'',
        pages:1,
        page:1,
        nothing:false,
        xs_show:true,
        main_top:true,
        kill_but:false,
        //  上拉加载数据
        searchCondition:{  //分页属性  
          pageNo:1,
          pageSize:"10"
        },
        allLoaded: false, //是否可以上拉属性，false可以上拉，true为禁止上拉，就是不让往上划加载数据了  
        scrollMode:"auto", //移动端弹性滚动效果，touch为弹性滚动，auto是非弹性滚动  
        classId:''
      }
    },
    //获取投注记录
    created(){
      let ir = this;
      this.$axios({
        method:'get',
        url:'/inter/ticket/kind'
      }).then(function (data) {
//        console.log(data);
        ir.data = data.data.data;
        for(let i=0,ass=[],ssckid=[];i<ir.data.length;i++){
          let cId = ir.data[i].classId;
//          console.log(cId);
          for(let j=0;j<ir.data[i].kindList.length;j++){
            ass.push(ir.data[i].kindList[j].kindName);
            ssckid.push(ir.data[i].kindList[j].kindId);
            ir.ssczl.push(ass);
//            console.log(ir.ssczl);
            ir.sscKindId.push(ssckid);
//            console.log(ir.sscKindId);
            ir.Id.push(cId);
//            console.log(ir.Id);
            let kId =ir.data[i].kindList[j].kindId;
//            console.log(kId);
          }
          ir.kindList = data.data.data[i].kindList;
//          console.log(ir.kindList);
        }
      }).catch(function (error) {
        console.log(error)
      });
      this.changeIdx(1);
    },
    components: {
      'v-loadmore':Loadmore  // 为组件起别名，vue转换template标签时不会区分大小写，例如：loadMore这种标签转换完就会变成loadmore，容易出现一些匹配问题  
      // 推荐应用组件时用a-b形式起名  
    },
//    mounted(){
//      this.loadPageList();  //初次访问查询列表  
//    },
    methods:{
      //获取投注查询
      changeIdx(num ){
        this.changeIndex = num;
//        this.status = this.changeIndex;
//        console.log(this.status);
        let that = this;
        that.nothing = false;
        that.page = 1;
        this.$axios({
          method:'post',
          url:'/inter/user/queryLotteryOrderOwn',
          data:{
            baseLotteryId:that.kindId,
            page:this.page,
            status:this.changeIndex+""
          }
        }).then(function (data) {
//          console.log(data);
          that.lotteryOrder = data.data.data.lotteryOrder;
//          console.log(that.lotteryOrder);
          if( that.lotteryOrder.length == 0 ) {
            that.nothing = true;
            that.main_top = false;
          }
          if ( that.changeIndex == 3 ){
            that.xs_show = false;
            that.kill_but = false;
          }else {
            that.xs_show = true;
            that.kill_but = true;
          }
          that.countAll = data.data.data.countAll; //投注记录总数
          that.pages =Math.ceil(that.countAll/10);
          //如果在撤单查询的时候就不显示单端按钮
        }).catch(function (error) {
          console.log(error);
        })
      },
      //获取转换数据类型，把classId 转化成kindId 的classId
      list(){
        this.data.forEach((item,index)=>{
          for(let i=0;i<item.kindList.length;i++){
            if(item.kindList[i].kindId == this.kindId){
              this.classId = item.classId;
            }
          }
        })
      },

      zl_cx(i){
        let that = this;
      },
      can(zz){
        this.hide= false;
//        this.move();
        this.changeIdx(zz);
      },
      //获取投注详情
      cancel(e){
        let thiss = this;
        this.hide= true;
//        this.stop();
        //获取动态下标
        let index =  e.target.getAttribute("idx");
        thiss.orderNo = thiss.lotteryOrder[index].orderNo;
        //获取注单明细
        this.$axios({
          method:"post",
          url:"/inter/user/queryMemberReportOne",
          data:{
            orderNo:this.orderNo
          }
        }).then(function (data) {
//          console.log(data);
          thiss.details = data.data.data;
//          console.log(thiss.details)
        }).catch(function (error) {
          console.log(error)
        })
      },
      //撤单
      del(cc){
        let thiss = this;
//        console.log(cc);
        //筛选选中状态的投注
        let che = document.getElementsByClassName("_InvestmenRecord_dx");
        for(var i=0,listId = [];i<che.length;i++){
          if(che[i].checked == true){
            thiss.orderNo = thiss.lotteryOrder[i].orderNo;
            listId.push(thiss.orderNo)
          }
        }
        this.$axios({
          method:'post',
          url:'/inter/ticket/cancelOrder',
          data:listId
        }).then(function (data) {
//          console.log(data);
          if(listId.length == 0){
            MessageBox.alert("最少选择一次投注撤单");
          }else if(data.data.code != 0){
            MessageBox.alert(data.data.msg);
          }else if(data.data.code == 0 && data.data.data.failNum == 0 ) {
            MessageBox.alert("撤单成功");
          }else {
            MessageBox.alert("操作成功，但是有"+data.data.data.failNum+"条撤单失败");
          }
          document.getElementById("_InvestmenRecord_qx_but").checked = false;
          thiss.checkAll();
          thiss.changeIdx(cc);
        }).catch(function (error) {
          console.log(error);
        })
      },
      // 上拉加载  
      loadBottom:function() {
//        _.debounce(this.more(),100);// 上拉触发的分页查询 
        this.more();
        this.$refs.loadmore.onBottomLoaded();// 固定方法，查询完要调用一次，用于重新定位  
      },
      more:function (){
        // 分页查询 
        let that = this;
        that.page = that.page + 1;
        this.$axios({
          method:'post',
          url:'/inter/user/queryLotteryOrderOwn',
          data: {
            baseLotteryId: that.kindId,
            page: that.page,
            status: that.changeIndex + ""
          }
        }).then(data=>{
          that.lotteryOrder = that.lotteryOrder.concat(data.data.data.lotteryOrder);
          if(that.page > that.pages){

            MessageBox.alert("已经加载到最后一页了哦");
            that.$refs.loadmore.onBottomLoaded();

          }
        });
      },
      //全选 不选
      checkAll(){
        let checkAll = document.getElementById("_InvestmenRecord_qx_but");
        let che = document.getElementsByClassName("_InvestmenRecord_dx");
        for(let i=0;i<che.length;i++){
          if(checkAll.checked == true) {
            che[i].checked = true;
          }else if(che[i].checked == false){
            checkAll.checked == false
          }else {
            che[i].checked = false;
          }
        }
      },
      /***滑动限制***/
//      stop(){
//        var mo=function(e){e.preventDefault();};
//        document.body.style.overflow='hidden';
//        document.addEventListener("touchmove",mo,false);//禁止页面滑动
//      },
//      /***取消滑动限制***/
//      move(){
//        var mo=function(e){e.preventDefault();};
//        document.body.style.overflow='';//出现滚动条
//        document.removeEventListener("touchmove",mo,false);
//      }
    },
    watch: {
      //监听select下拉框点击事件
      kindId() {
        this.list();
//        console.log(this.classId)
        let that = this;
        that.page = 1;
        this.$axios({
          method: 'post',
          url: '/inter/user/queryLotteryOrderOwn',
          data: {
            baseLotteryId: this.kindId,
            page: this.page,
            status: this.changeIndex + ""
          }
        }).then(function (data) {
//          console.log(data);
          that.lotteryOrder = data.data.data.lotteryOrder;
          if (that.lotteryOrder.length == 0) {
            that.nothing = true;
          } else {
            that.nothing = false;
          }
          that.countAll = data.data.data.countAll; //投注记录总数
          that.pages = Math.ceil(that.countAll / 10);
//          console.log(that.countAll);
          //如果在撤单查询的时候就不显示单端按钮
          if (that.changeIndex == 3) {
            that.xs_show = false;
          } else {
            that.xs_show = true;
          }
        }).catch(function (error) {
          console.log(error)
        })
      },
      //监听 当查询发生改变的时候
      changeIndex() {
        let checkAll = document.getElementById("_InvestmenRecord_qx_but");
        checkAll.checked = false;
        let che = document.getElementsByClassName("_InvestmenRecord_dx");
        for (let i = 0; i < che.length; i++) {
          che[i].checked = false;
        }
        this.main_top = true;
      },
      //监听，当查询数据为空的时候 显示的界面
      lotteryOrder(i) {
        if (this.lotteryOrder.length == 0) {
          this.kill_but = false;
          this.main_top = true;
        } else {
          this.nothing = false;
        }
      },
      checkAll() {
        this.checkAll()
      },
    }
  }
</script>
<style scoped>
  html,body{
    width: 100%;
    height: 100%;
  }
  ul,li{
    list-style: none;
  }
  ._InvestmenRecord_headNav{
    height: 1.125rem;
    width: 100%;
    background-color:#2B2C30;
    color:#A6A7A8;
    position:fixed;
    top:1.125rem;
    left: 0;
    /*padding-top: 1.125rem;*/
    z-index: 1;
  }
  ._InvestmenRecord_headNav>li{
    float: left;
    width: 25%;
    background-color:#2B2C30;
    text-align: center;
    line-height: 1.1rem;
    border-top: 0.02rem solid white;
    border-right: 0.02rem solid white;
    box-sizing: border-box;
  }
  select{
    width: 85%;
    height: 0.7rem;
    margin-bottom: 0.13rem;
    border-radius: 5px;
    appearance: none;/*清除select下拉框默认样式*/
    -moz-appearance: none;
    -webkit-appearance: none;
    padding-right: 0.6rem;
    padding-left: 0.2rem;
    color: #A6A7A8;
    background: url("../../static/images/img/xiala.png") no-repeat scroll right center transparent;
    background-size: 0.5rem 0.5rem;
    outline: none;
  }
  select option{
    color: #000;
  }
  /*下注为空css样式*/
  ._InvestmenRecord_main_k{
    position: fixed;
    top:2.3rem;
    left: 0;
    width: 100%;
    height: 14.2rem;
    box-sizing: border-box;
    padding-bottom: 100%;
    background-color: #f1f1f0;
    padding-top: 3rem;
  }
  ._InvestmenRecord_main_k>p,div{
    text-align: center;
    color: #969695;
  }
  ._InvestmenRecord_but{
    margin: auto;
    width: 30%;
    height: 0.875rem;
    color: white;
    border-radius: 0.875rem;
    outline:none;
    border: 0;
    background-color: #EDAC0C;
  }
  ._InvestmenRecord_kong{
    height: 2.66rem;
    width: 2.66rem;
    border-radius: 2.66rem;
    margin: auto;
    background: url("../../static/images/img/xzwk.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }
  /*下注为空css样式*/
  ._InvestmenRecord_active{
    color: #edac0c !important;
    background-color: darkgray;
    border-bottom: 0.05rem solid #edac0c;
  }
  /*注单查询样式*/
  ._InvestmenRecord_aaa{
    z-index: -100;
    overflow: auto;
    width:100%;
    background-color: #f1f1f0;
    height: 100%;
    padding: 1.125rem 0 1.3rem 0;
  }
  ._InvestmenRecord_main{
    width: 100%;
    margin-top: 1.125rem;
    background-color: #F1F1F0;
    box-sizing: border-box;
    z-index: -100;
    overflow: auto;
  }
  ._InvestmenRecord_main_top{
    width: 100%;
    height:1rem ;
    background-color: #f1f1f0;
    padding: 0.3125rem 0.1875rem;
    box-sizing: border-box;
  }
  ._InvestmenRecord_qx_but{
    float: left;
    width: 1.437rem;
  }
  ._InvestmenRecord_cd_but{
    float: right;
    width: 1.437rem;
    height: 0.5625rem;
    border: 0.0125rem solid #7d7d7d;
    border-radius: 0.1rem;
    text-align: center;
    line-height: 0.5625rem;
  }
  ._InvestmenRecord_main_div{
    width: 100%;
    height: 2.3475rem;
    background-color: white;
    margin: 0.2rem 0.2rem 0 0;
    padding: 0.5625rem 0.2rem 0 0.2rem ;
    box-sizing: border-box;
  }
  ._InvestmenRecord_main_left,._InvestmenRecord_main_right{
    height: 1.34375rem;
    float: left;
  }
  ._InvestmenRecord_main_left{
    width: 4.3125rem;
  }
  ._InvestmenRecord_main_right{
    width: 4.68625rem;
  }
  ._InvestmenRecord_main_left>img{
    float: left;
    height: 1.31125rem;
    width: 1.31125rem;
    border-radius: 1.31125rem;
    /*background:url("../../static/images/img/cqssc.png");*/
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }
  ._InvestmenRecord_main_left_div{
    float: left;
    width: 2.8125rem;
    height: 1.34375rem;
  }
  ._InvestmenRecord_main_left_div>span{
    float: left;
    width: 2.8125rem;
    height: 0.6718rem;
    line-height: 0.6718rem;
    box-sizing: border-box;
    font-size: 0.25rem !important;
  }
  ._InvestmenRecord_main_right_l{
    width: 3.4375rem;
    height: 1.34375rem;
    float: left;
  }
  ._InvestmenRecord_main_right_l>span{
    width: 3.4375rem;
    height: 0.6718rem;
    float: left;
    line-height: 0.6718rem;;
    box-sizing: border-box;
    font-size: 0.28rem !important;
  }
  ._InvestmenRecord_main_dd{
    width: 0.4375rem;
    height: 1.34375rem;
    float: left;
    padding-top: 0.45rem;
    box-sizing: border-box;
  }
  ._InvestmenRecord_main_right_r{
    width: 25%;
    height: 1.34375rem;
    float: left;
  }
  ._InvestmenRecord_main_right_r>button{
    float: left;
    width: 1.03125rem;
    height: 0.625rem;
    outline: none;
    color: white;
    border-radius: 0.04rem;
    border: 0;
    margin-top: 0.45rem;
    background-color:#EDAC0C ;
  }
  ._InvestmenRecord_modal{
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(70,70,70,0.5);
    z-index:10;
  }
  ._InvestmenRecord_node_details{
    width: 8.4rem;
    height: 9.6rem;
    overflow-y: auto;
    background: white;
    position: absolute;
    left: 50%;margin-left: -4.2rem;
    top: 50%;margin-top: -4.8rem;
    padding:0.3rem ;
    box-sizing: border-box;
    text-align: left;
  }
  ._InvestmenRecord_cha {
    position: absolute;
    right: 0.3rem;
    top: 0.3rem;
    display: inline-block;
    width: 0.6rem;
    height: 0.6rem;
    background: url("../../static/images/cha.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }
  ._InvestmenRecord_node_ma{
    text-align: left;
  }
  h3{
    font-size: 0.3rem;
    font-weight: 700;
    color: #000000;
    height: 1rem;
  }
  ._InvestmenRecord_zdmxList>li{
    font-size: 0.3125rem;
    width: 100%;
    word-wrap:break-word;
    /*overflow: auto;*/
    /*text-overflow:ellipsis;*/
    /*white-space: nowrap;*/
  }
  ._InvestmenRecord_zdmxList>li>span{
    display: inline-block;
    text-align: justify;
    text-justify: distribute-all-lines;
    text-align-last: justify;
    color: #000;
    font-size: 0.3125rem;
    width: 1.525rem;
    white-space:nowrap;
    overflow:hidden;
    text-overflow:ellipsis;
  }
  /*注单查询样式*/
</style>
