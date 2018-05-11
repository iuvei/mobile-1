<template>
  <div class="container">
    <mt-header :title="subtitle[this.$route.query.id]" style="z-index:1;background-image: linear-gradient(to bottom,#494c56,#1e2027 );position: fixed;top: 0;left:0 ;width: 100%;height: 1.125rem;">
      <mt-button icon="back" slot="left" @click="goback">返回</mt-button>
    </mt-header>
    <ul class="section">
      <li v-for="item in list.lotteryOrder">
        <ul>
          <li>彩种：{{item.baseLotteryName}}</li>
          <li>玩法：{{item.gameName}}</li>
          <li>金额：{{item.orderAmount}}</li>
          <li >输赢：<span :class="{color1:item.realAmount<0,color2:item.realAmount>0}">{{item.realAmount}}</span></li>
        </ul>
        <div>
          <button @click="detail(item.orderNo)">详情</button>
        </div>
      </li>
    </ul>
    <mt-popup
      v-model="popupVisible"
      popup-transition="popup-fade"
    >
      <div id="main">
        <div>
          <h3 style="font-size: 0.45rem;">注单明细<span @click="cancel">×</span></h3>
          <ul class="ulul">
            <li><span style="width: 1.7rem;display: block;font-size: 0.38rem;">订单号：</span><label for="" style="font-size: 0.3rem;">{{details.orderNo}}</label></li>
            <li><span style="width: 2rem;display: block;">下注时间：</span> <label for="" style="font-size: 0.3rem;">{{details.payTime}}</label></li>
            <li><span>注数：</span><label for="" style="font-size: 0.3rem;">{{details.payTimes}}注</label></li>
            <li><span>单注金额：</span><label for="" style="font-size: 0.3rem;">{{details.singleAmount}}</label></li>
            <li><span>彩种：</span><label for="" style="font-size: 0.3rem;">{{details.lotteryName}}</label></li>
            <li><span>期号：</span><label for="" style="font-size: 0.3rem;">{{details.periodNo}}</label></li>
            <li><span>奖金：</span><label for="" style="font-size: 0.3rem;">{{details.odds}}</label></li>
            <li><span>返点：</span><label for="" style="font-size: 0.3rem;">{{details.rebatePercent}}</label></li>
            <li><span>玩法：</span><label for="">{{details.gameName}}</label></li>
            <li><span>销售返点：</span><label for="" style="font-size: 0.3rem;">{{details.rebateAmount}}</label></li>
            <li><span>开奖状态：</span><label for="">{{details.statusView}}</label></li>
            <li><span>开奖号码：</span><label for="" style="font-size: 0.3rem;">{{details.winNumbers}}</label></li>
            <li><span>中奖金额：</span><label for="" style="font-size: 0.3rem;">{{details.winAmount}}元</label></li>
            <li>…………</li>
          </ul>
        </div>
      </div>
    </mt-popup>
<footer>
  <Pagination @index="changeindex" :countAll="list.countAll" :pages="allPages"></Pagination>
</footer>

  </div>
</template>
<script>
  import Pagination from '@/common/pagination.vue';
export default {

  data(){
    return{
      list:'',
      popupVisible:false,
      details:'',
      allPages:1,
      page:1,
      param:'',
      subtitle:['全部','中奖','退码','有效','未颁奖']
    }
  },
  components:{
    Pagination
  },
  created:function () {
    this.list=JSON.parse(this.$route.query.list);
    this.param=JSON.parse(this.$route.query.information);
//    console.log(this.$route.query.id);
    this.allPages=this.list.countAll/2==0?1:this.list.countAll%10!=0?parseInt(this.list.countAll/10)+1:this.list.countAll/10;
  },
  methods:{
    goback(){
      sessionStorageSet('routeIndx', -1);
      this.$router.back()
    },
    //详情
    detail:function (order) {
      let self=this;
      this.popupVisible=true;
      this.$axios({
        method:'post',
        url:'/inter/user/queryMemberReportOne',
        data:{
          'orderNo':order,
          'dayTime':this.param.dayTime,
        }
      }).then(function (data) {
//        console.log(data.data.data);
        self.details=data.data.data;
      }).catch(function (error) {

      })
    },
    //取消
    cancel:function () {
      this.popupVisible=false;
    },
    changeindex:function (page) {
//      console.log(page);
      this.page = page;
    }
  },
  watch:{
    page(newValue, oldValue) {
      let that = this;
      this.$axios({
        method: 'post',
        url: '/inter/user/queryMemberReportAll',
        data: {
          'account':this.param.account,
          'baseLotteryId':this.param.baseLotteryId,
          'dayTime':this.param.dayTime,
          'statusWin':this.param.statusWin,
          'page': newValue
        }
      }).then(function(data) {
        that.list = data.data.data;
//        console.log(that.list);
        that.allPages=Math.ceil(that.list.countAll/10)
      }).catch(function(error) {
        console.log(error)
      })
    }
  }

}
</script>
<style scoped>
  .ulul li span{
    width: 2rem;
    display: block;
    font-size: 0.38rem;
  }
  .ulul li label{
    font-size: 0.38rem;
  }
  .color1{
    color: #249c09;
  }
  .color2{
    color: red;
  }
.container{
  color: black;
  padding-top: 1.125rem;
}
.section{
  width: 100%;
  background: #f1f1f0;
  position: absolute;
  top:1.125rem;
  bottom: 1.2rem;
  overflow: auto;
  padding-bottom: 1rem;
}
.section>li{
  height: 3.67rem;
  background: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.14rem;
}
.section>li>ul{
  height: 2.8rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding-left: 0.61rem;
}
  button{
    width: 1.61rem;
    line-height: 0.64rem;
    text-align: center;
    border: 1px solid #a0a0a0;
    border-radius: 4px;
    background: white;
    margin-right: 0.41rem;
  }
  #main{
    width: 8.4rem;
    display: flex;
    justify-content: center;
  }
  #main>div{
    width: 7.8rem;
  }
  #main>div>h3{
    height: 1.3rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  h3>span{
    /*font-size: 20px*/
  }
  #main>div>ul>li{
    margin-bottom: 0.1rem;
    display: flex;
    align-items: center;
  }
  #main>div>ul li:nth-child(12){
    margin-bottom: 0;
  }
  #main>div>ul li:nth-child(13){
    margin-bottom: 0;
  }
  footer{
    width: 100%;
    background: white;
    display: flex;
    justify-content: center;
    position: fixed;
    bottom: 0;
  }
  footer>div{
    width: 100%;
  }
</style>
