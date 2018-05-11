<template>
  <div>
    <div class="companyIncome_main">
      <div class="sec_bottom">选择支付模式:</div>
      <div class="list">
        <router-link to="/charge/companyIncome/bankPay" replace tag="div" active-class="border"><div class="list_first">银行卡转账</div></router-link>
        <router-link :to="{name:'alipayTransfer',query:{alipay}}" replace tag="div" active-class="border"><div class="list_third">支付宝转账</div></router-link>
        <p ><div class="list_second" style="color: #CCCCCC;"  @click="err">微信转账</div></p>
        <p ><div class="list_forth" style="color: #CCCCCC;"  @click="err">QQ钱包</div></p>
        <!--<router-link :to="{name:'wxTransfer',query:{wx}}" replace tag="div" active-class="border"><div class="list_second">微信转账</div></router-link>
        <router-link :to="{name:'alipayTransfer',query:{alipay}}" replace tag="div" active-class="border"><div class="list_third">支付宝转账</div></router-link>
        <router-link :to="{name:'qqTransfer',query:{qq}}" replace tag="div" active-class="border"><div class="list_forth">QQ钱包</div></router-link>-->
      </div>
      <router-view style="width: 100%;"></router-view>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return{
      dataBase:[],
      wx:'',
      alipay:'',
      qq:''
    }
  },
  methods:{
  	err(){
  		this.$dialog.alert({mes:"功能暂未开放"})
  	}
  },
  mounted: function () {
    let self=this;
    this.$axios({
      method: "post",
      url: '/inter/money/queryBank',
      data: {'type': '0', 'pcOrPhone': '1'}
    }).then(function (data) {
      for(var i=0,a=[];i<data.data.data.length;i++){
        if(data.data.data[i].bankNo==self.GLOBAL.BankNo[3]){
          self.wx=JSON.stringify(data.data.data[i]);
        }else if(data.data.data[i].bankNo==self.GLOBAL.BankNo[2]){
          self.alipay=JSON.stringify(data.data.data[i]);
        }else if(data.data.data[i].bankNo==self.GLOBAL.BankNo[1]){
          self.qq=JSON.stringify(data.data.data[i]);
        }
      }
      if(data.data.code==1){
        self.$router.replace({name:'payment',query:{id:self.type}})
      }
      }
    ).catch(function () {
    })
  }
}
</script>
<style scoped>
  .border{
    border-color:#f2af09!important;
    color: #f2af09;
  }
  .sec_bottom{
    width: 100%;
    font-size: 0.4rem;
    height: 1.03rem;
    /*position: fixed;*/
    /*z-index: 100;*/
    /*top: 2.465rem;*/
    background-color: #ffffff;
    line-height: 1.03rem;
    text-indent: 3%;
  }
  .list{
    display: flex;
    width: 100%;
    /*position: fixed;*/
    /*top: 3.765rem;*/
   /*z-index: 100;*/
   background: #fff;
    height: 0.88rem;
    line-height: 0.88rem;
    text-align: center;
    font-size: 0.4rem;
  }
  .list>div{
    flex: 1;
    text-align: center;
    border: 1px solid #e5e5e5;
    border-collapse: collapse;
  }
  .companyIncome_main{
  	width: 100%;
    color: black;
    position: absolute;
    top: 2.465rem;
    bottom:0;
    /*height: 14rem;*/
  }
</style>
