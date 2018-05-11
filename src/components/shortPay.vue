<template>
<div class="shortPay_container">
  <div class="shortPay_sec_bottom">选择支付模式:</div>
  <div class="shortPay_xuanze">
    <ul>
      <router-link to="/charge/shortPay/qqPay" replace active-class="border" tag="li"><li>QQ扫码</li></router-link>
       <p><li style="color: #CCCCCC;" @click="err">微信扫码</li></p>
      <p><li style="color: #CCCCCC;" @click="err">支付宝扫码</li></p>
      <!--<router-link to="/charge/shortPay/wxPay" replace active-class="border" tag="li"><li>微信扫码</li></router-link>
      <router-link to="/charge/shortPay/alipay" replace active-class="border" tag="li"><li>支付宝扫码</li></router-link>-->
    </ul>
  </div>
<router-view></router-view>
</div>
</template>
<script>
	export default{
methods:{
  	err(){
  		this.$dialog.alert({mes:"功能暂未开放"})
  	}
  },
 }
</script>
<style scoped>
  .shortPay_container{
  	width: 100%;
  	position: absolute;
  	top: 2.465rem;
  	bottom: 0;
    color: black;
  }
  .shortPay_sec_bottom{
    width: 100%;
    height: 1.03rem;
    font-size: 0.4rem;
    background-color: #ffffff;
    line-height: 1.03rem;
    text-indent: 3%;
    border-bottom: solid 1px gainsboro;
  }
  .shortPay_xuanze{
    width: 100%;
    height: 0.88rem;
  }
  .shortPay_xuanze ul{
    width: 7.5rem;
    height: 0.88rem;
    display: flex;
  }
  .shortPay_xuanze ul li{
    flex: 1;
    text-align: center;
    font-size: 0.4rem;
    line-height: 0.88rem;
  }
  .border{
    border-color:#f2af09!important;
    color: #f2af09;
    box-sizing: border-box;
  }
</style>
