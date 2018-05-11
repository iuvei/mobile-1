<template>
  <div>
    <div style="height: auto;padding-bottom: 1.34rem" class="aplipay_box">
      <div class="ali_cz">
        <div class="ali_cz_s"><span>姓名</span>：<input type="text" v-model="name"></div>
        <div class="ali_cz_f"><span>充值金额</span>：<input type="text" v-model="money"></div>
      </div>
      <div class="ali_cz_beizhu">⚠最低金额{{alipay.gatherMin}}元,最高金额{{alipay.gatherMax}}元</div>
      <ul class="alipay_detail" v-show="alipay.firstDeposit">
        <li><span>首次充值优惠：</span><p>充值至少<i>{{alipay.discountAmount}}</i>元时，可以享受首次充值优惠<i>{{alipay.discountPercent}}%</i>，最高优惠<i>{{alipay.maxDiscountAmount}}</i></p></li>
        <li><span>首存打码倍数：</span><p>当前打码倍数为<i>{{alipay.firstDiscountTimes}}</i></p></li>
        <li><span>是否享受首存优惠：</span><div><label for="yes"><input type='radio' id="yes" :checked="alipay.firstDeposit" name="option">是</label><label for="no"><input type='radio' id="no" name="option">否</label>
          <p style="font-size: 0.3rem">打码大于<i>{{money*Number(alipay.firstDiscountTimes)}}</i>才能提现</p>
        </div></li>
      </ul>
      <div class="ali_cz_erweima">
        <span>请用支付宝扫描下面的二维码(支付宝加好友充值)</span>
        <div class="ali_erweima_box">
          <div class="ali_erweima"><img :src="alipay.qrCode" alt="二维码"></div>
        </div>
      </div>
    </div>
    <button @click="charge" class="ali_tj">提交订单</button>
  </div>
</template>
<script>
//	import Vue from 'vue'
//	import { MessageBox} from 'mint-ui';
//	Vue.component(MessageBox.name, MessageBox);
  export default {
    data(){
      return{
        type:'0',
        money:'',
        name:'',
        alipay:'',
        firstDeposit:''
      }
    },
    methods:{
      charge: _.debounce(function () {
      	
        let self=this;
        if(this.name==''||this.money==''){
        	self.$dialog.alert({mes:'姓名和金额不能为空'})
//        MessageBox.alert('姓名和金额不能为空');
        }else if(this.money<this.alipay.gatherMin||this.money>this.alipay.gatherMax){
        	self.$dialog.alert({mes:'存款失败，请填写正确金额'})
//        MessageBox.alert("存款失败，请填写正确金额");
        }else{
        	window.open(self.bankEntrance);
          if(document.getElementsByName("option")[0].checked){
            this.firstDeposit='1';
          }else {
            this.firstDeposit='0';
          }
          this.$axios({
            method:'post',
            url:'/inter/money/saveMoneyOrder',
            data: {
              'bankAccountId': this.alipay.bankAccount,
              'firstDeposit': this.firstDeposit,
              'incomeType': this.type,
              'memberName': this.name,
              'orderNo': this.alipay.orderNo,
              'saveAmount': this.money+'',
              'way':'3'
            }
          }).then(function (data) {
            if(data.data.code==0&&data.data.msg=="OK"){
              self.$router.replace({name:'payment',query:{id:self.type}});
            }else if(data.data.code==0&&data.data.msg!="OK"){
            	self.$dialog.alert({mes:data.data.msg})
//            MessageBox.alert(data.data.msg);
            }else if(data.data.code==1){
            	self.$dialog.alert({mes:data.data.msg})
//            MessageBox.alert(data.data.msg);
            }else if(data.data.code!=0&&data.data.code!=1){
            	self.$dialog.alert({mes:'出了一点小意外，请稍候重试'})
//            MessageBox.alert('出了一点小意外，请稍候重试');
            }
          }).catch(function () {
          })
        }
      },300)
    },
    created: function () {
    	let that = this;
      if(this.$route.matched[1].path=='/charge/companyIncome'){
        this.type="0";
      }
      
      this.alipay=JSON.parse(this.$route.query.alipay);
      this.bankEntrance = this.alipay.bankEntrance;
      this.money=this.alipay.gatherMax;
    }
  }
</script>
<style scoped>
  .ali_cz{
    width: 100%;
    height: 2.425rem;

  }
  .aplipay_box{
  	width: 100%;
  	position: absolute;
    top: 2.375rem;
    bottom: 0;
  }
  .ali_cz_f,.ali_cz_s{
    width: 9.375rem;
    display: flex;
    margin: auto;
    margin-top: 0.2rem;
    align-items: center;
    font-size: 0.4rem;

  }
  .ali_cz_f>input{
    flex: 3;
    width: 7.4rem;
    height: 1rem;
    border: 1px solid #e5e5e5;
    text-indent: 7px;
  }
  .ali_cz_s>input{
    width: 7.4rem;
    height: 1rem;
    flex: 3;
    border: 1px solid #e5e5e5;
    text-indent: 7px;
  }
  .ali_cz_f span{
    flex: 1;
    line-height: 1rem;
    text-align: justify;
    text-align-last: justify;
  }
  .ali_cz_s span{
    flex: 1;
    line-height: 1rem;
    text-align: justify;
    text-align-last: justify;
  }
  .ali_cz_beizhu{
    width: 100%;
    height: 0.78rem;
    line-height: 0.78rem;
    color: red;
    text-align: center;
    text-indent: 5%;
  }
  .alipay_detail{
    width: 9.375rem;
    margin: auto;
    /*padding-top: 0.7rem;*/
    /*margin-bottom: 1rem;*/
  }
  .alipay_detail p{
    color: black!important;
  }
  .alipay_detail span{
    display: inline-block;
    /*width:4rem ;*/
    flex-shrink:0;
  }
  .alipay_detail i {
    color: red;
  }
  .alipay_detail>li{
    margin-bottom: 0.3rem;
    display: flex;
  }
  .alipay_detail>li label{
    margin-right: 0.3rem;
  }
  .ali_cz_erweima{
    width: 100%;
    height: 4.06rem;
  }
  .ali_cz_erweima span{
    width: 100%;
    height: 0.719rem;
    display: block;
    text-align: center;
    line-height: 0.719rem;
  }
  .ali_erweima_box{
    width: 100%;
    height: 3.28rem;
  }
  .ali_tj{
    width: 100%;
    position: fixed;
    bottom:0;
    height: 1.34rem;
    background-color: #edac0c;
    outline: none;
    border: 0;
    color: white;
    font-size: 0.45rem;
  }
  .ali_erweima{
    width: 3.28rem;
    height: 3.26rem;
    margin: auto;
    background: #e5e5e5;;
  }
  .ali_erweima>img{
    width: 3.28rem;
    height: 3.28rem;
  }
</style>
