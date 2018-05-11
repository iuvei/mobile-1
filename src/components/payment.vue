<template>
<div id="payment_app">
  <div class="payment_daifukuan">
    <div class="payment_daifukuan_box">
      <span><img src="../../static/images/payment/daifukuan.png" alt=""></span><span>待付款</span>
    </div>
  </div>
  <div  v-for="(item,index) in datas" class="payment_main">
    <div class="payment_zhifuxinxi">
      <div class="payment_zhifuxinxi_title"><strong>支付信息：</strong></div>
      <table class="payment_zhifuxinxi_table">
        <tr>
          <td>银行名称：</td>
          <td><img :src="item.logo" :alt="item.bankName" style="font-size: 0.3rem;"></td>
        </tr>
        <tr>
          <td>订单号：</td>
          <td>{{item.orderNo}}</td>
        </tr>
        <tr>
          <td>银行卡号：</td>
          <td>{{item.bankAccount}}</td>
        </tr>
         <tr>
          <td>收款人：</td>
          <td>{{item.receiver}}</td>
        </tr>
        <tr>
          <td>开户人：</td>
          <td>{{item.name}}</td>
        </tr>
       
        <tr>
          <td>充值金额：</td>
          <td>{{item.amount}}元</td>
        </tr>
        <tr v-if="item.bankNo=='ALIPAY'||item.bankNo=='alipay'">
          <td>扫码充值：</td>
          <td>
          	<img style="width: 100px;height: 100px;" :src="item.qrCode" />
          </td>
        </tr>
      </table>
    </div>
    <button @click="pay(index,'1')" class="payment_input_first">已支付完成</button>
    <button @click="pay(index,'5')" class="payment_input_second">取消订单</button>
  </div>
  <mt-popup
    v-model="popupVisible"
    popup-transition="popup-fade" :closeOnClickModal="false"
  >
    <div class="payment_chongzhiwancheng">
      <div><span>✔</span><strong>充值完成</strong></div>
      <fieldset>
        <legend>支付信息</legend>
        <ul>
          <li>支付方式：<b>在线支付</b></li>
          <li>支付金额：<b>￥{{money}}元</b></li>
          <li>1.成功付款后客服审核成功后将自动到账，并弹出到账提示。</li>
          <li>2.长时间无反应，请联系客服。</li>
        </ul>
      </fieldset>
      <div class="payment_change_zh_footer">
        <button @click="continueCharge">继续充值</button>
        <button @click="returnInvestment">返回投注</button>
      </div>
    </div>
  </mt-popup>
</div>
</template>
<script>
//	import Vue from 'vue'
//	import { MessageBox} from 'mint-ui';
//	Vue.component(MessageBox.name, MessageBox);
export default{
  data(){
    return{
      datas:{},
      money:'',
      popupVisible:false,
      code:'',
      charged:false,
      bankEntrance:"",
    }
  },
  created:function () {
    this.queryBank();
  },
  methods:{
    pay:function (num,status) {
    	let self=this;
      this.money=this.datas[num].amount;
      this.$axios({
        method:'post',
        url:'/inter/money/updateMoneyOrder',
        data:{
          'orderNo':self.datas[num].orderNo,
          'orderStatus':status
        }
      }).then(function (data) {
//        console.log(data);
        if(data.data.code==0&&status=='1'){
          self.code=0;
          self.popupVisible=true;
//          self.$router.push({path:'/charge/companyIncome/bankPay'})
        }if(data.data.code==0&&status=='5'){
          self.code=0;
          self.$router.replace({path:'/charge/companyIncome/bankPay'})
        }if(data.data.code!=0){
        	 self.$dialog.alert({mes:data.data.msg})
//        MessageBox.alert(data.data.msg);
        }
      }).catch(function () {
      })
    },
    queryBank:function () {
      let self=this;
      this.$axios({
        method:"post",
        url:'/inter/money/queryBank',
        data:{'type':'0','pcOrPhone':'1'}
      }).then(function (data) {
//    	console.log(data)
        self.code=data.data.code;
        self.bankEntrance =data.data.data[0].bankEntrance
        if(self.code==1){
          self.datas=data.data.data;
//        console.log(self.datas)
        }else{
        	 self.$dialog.alert({mes:data.data.msg,callback:function(){
        	 	 self.$router.replace({path:'/charge/companyIncome/bankPay'});
        	 }})
//        MessageBox.alert(data.data.msg).then(function () {
//          self.$router.replace({path:'/charge/companyIncome/bankPay'});
//        })
        }
      })
    },
    continueCharge:function () {
      this.charged=true;
      this.$router.replace({path:'/charge/companyIncome/bankPay'});
//    console.log(this.bankEntrance)
     
    },
    returnInvestment:function () {
      this.$router.replace({name:'bettingHall',query:{'kindId':"fc3d",'classId':"1"}})
    }
  },
  beforeRouteLeave (to, from, next) {
    if(to.path=='/charge/companyIncome/bankPay'&&this.code==1&&this.charged==false){
      next(false)
    }else {
      next()
    }
  }

}
</script>
<style scoped>
  #payment_app{
  	width: 100%;
  
  		position: absolute;
    top: 2.375rem;
    bottom: 0;
    color: black;
    padding-top: 2.465rem;
  }
  .payment_daifukuan{
    display: flex;
    width: 100%;
    height: 1.2rem;
    margin: auto;
  }
  .payment_daifukuan img{
    width: 0.6rem;
    height: 0.6rem;
    float: right;
    margin-right: 0.2rem;
  }
  .payment_daifukuan_box{
    width: 9.2rem;
    margin: auto;
    display: flex;
    height: 1.2rem;
    float: left;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    border-bottom: 1px dashed #cecece;
  }
  .payment_daifukuan_box>span:nth-child(2){
    font-size: 0.4rem;
  }
  .payment_main{
    /*padding-bottom: 0.5rem;*/
  }
  .payment_zhifuxinxi{
    width: 100%;
   /* height: 5.31rem;*/
    font-size: 0.4rem;
  }
  .payment_zhifuxinxi_title{
    width: 100%;
    height: 1.1rem;
    text-indent: 0.72rem;
    line-height: 1.1rem;
  }
  .payment_zhifuxinxi_table tr td{
    text-indent: 0.72rem;
    line-height: 0.74rem;
  }
  .payment_zhifuxinxi_table td:nth-child(2n-1){
    color: red;
  }
  .payment_input_first{
    width: 100%;
    height: 1.23rem;
    font-size: 0.45rem;
    background-color: #edac0c;
    color: white;
    text-align: center;
    line-height: 1.23rem;
    border: 0;
    outline: none;
    margin-top: 0.19rem;
  }
  .payment_input_second{
    width: 100%;
    height: 1.23rem;
    font-size: 0.45rem;
    color: white;
    text-align: center;
    line-height: 1.23rem;
    border: 0;
    outline: none;
    margin-top: 0.19rem;
    background: #cecece;
  }
  .payment_chongzhiwancheng{
    width: 8.7rem;
    height: 6.8rem;
    background-color: white;
    margin: auto;
  }
  .payment_chongzhiwancheng>div{
    font-size: 0.43rem;
  }
  span{
    color: green;
    margin-right: 0.2rem;
  }
  .payment_chongzhiwancheng div{
    height:1.156rem ;
    line-height: 1.156rem;
    text-align: center;
    color: black;
  }
  ul{
    width: 6.6rem;
    height: 3.125rem;
    margin: auto;
    color: black;
    margin-top: 0.25rem;
  }
  ul li{
    line-height:0.6rem ;
  }
  .xz{
    width: 6.9rem;
    height: 1.75rem;
    margin: auto;
  }
  .payment_change_zh_footer button{
    width: 2.5rem;
    height: 0.8rem;
    margin-top: 0.5rem;
    border: 0;
    outline: none;
  }
  fieldset{
    width: 5.5rem;
    margin: auto;
    padding: 0 0.5rem 0 0.5rem;
    color: black;
    border-color: #edac0c;
    border-width: 1px;
  }
  fieldset b{
    color: #C81623;
  }
  .payment_change_zh_footer{
    width: 7.8rem;
    height: 1rem;
    margin: auto;
  }
  .payment_change_zh_footer button{
    width: 3.6rem;
    height: 1rem;
    border: 0;
    outline: none;
    color: white;
    font-size: 0.4rem;;
  }
  .payment_change_zh_footer button:nth-child(2){
    background-color: #edac0c;
    float: right;
  }
  .payment_change_zh_footer button:nth-child(1){
    background-color: green;
    float: left;
  }

</style>
