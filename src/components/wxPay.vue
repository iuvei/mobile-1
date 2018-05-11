<template>
  <div>
    <div  style="height: auto;padding-bottom: 1.34rem">
      <div class="wxPay_jine">
        <div class="wxPay_chongzhi"><span>充值金额：</span> <input v-model="money"  type="number" ></div>
      </div>
      <div class="wxPay_jinggao" v-if="wxScan[0]">最低金额{{warn[0]}}元，最高金额{{warn[1]}}元</div>
      <div class="wxPay_saoyisao">
        <div>
          <p style="color: black">充值类型：</p>
          <ul>
            <li v-for="(item,index) in wxScan"><input v-model="warn" :value="[item.gatherMin,item.gatherMax,item.bankId]" type="radio" :id="index" name="wx"><label  :for="index"><img align="middle" :src="item.bankLogo" :alt="item.serviceType"></label></li>
          </ul>
        </div>
        <div class="title" v-html="title">

        </div>
      </div>
    </div>

    <button @click="showCode"  class="wxPay_tidd">提交订单</button>
    <mt-popup v-model="popupVisible" popup-transition="popup-fade">
      <div class="wxPay_scan">
        <p>请用微信扫描下面的二维码进行支付，支付完成后请关闭此页面</p>
        <div id="wxPay_qrcode"></div>
        <p><span>订单金额：</span>{{datas.orderAmount}}元</p>
        <p><span>订单号：</span>{{datas.orderNo}}</p>
        <p><span>订单日期：</span>{{datas.orderTime}}</p>
        <button @click="close">关闭</button>
      </div>
    </mt-popup>
  </div>
</template>
<script>
  import { Indicator } from 'mint-ui';
//import Vue from 'vue'
//Vue.component(MessageBox.name, MessageBox);
  export default {
    data(){
      return{
        type:'',
        wxScan:[],
        money:'',
        wxType:'',
        popupVisible:false,
        //订单详情
        datas:'',
        warn:'',
        title:""
      }
    },
    methods:{
    		isPositiveInteger(s){//判断是否为正整数
     var re = /^[0-9]+$/ ;
     return re.test(s)
    }   ,
    	changeMoney(e){
    		if(this.isPositiveInteger(e.target.value)){
    			var rom =  (Math.floor((Math.random()*9.8+0.1)*100)/100)*0.1
//  			console.log(rom)
    			e.target.value = e.target.value*1 +rom
    		e.target.value = Math.floor(e.target.value*100)/100;
    		this.money = e.target.value
    		}else{
    				e.target.value = Math.floor(e.target.value*100)/100;
    				this.money = e.target.value
    		}


    		    	},
      close:function () {
        this.popupVisible=false;
      },
      showCode: _.debounce(function () {
        let self=this;
        for(var i=0,a=0;i<document.getElementsByName("wx").length;i++){
          if(document.getElementsByName("wx")[i].checked==true){
            this.wxType=this.wxScan[i];
            a+=1;
          }
        }
        if(a==0){
        		self.$dialog.alert({mes:'请选择充值类型'})
//        MessageBox.alert('请选择充值类型',"");
        }else if(this.money==""){
        	self.$dialog.alert({mes:'充值金额不能为空'})
//        MessageBox.alert('充值金额不能为空',"");
        }else{
          this.$axios({
            method:'post',
            url:'/inter/money/saveThreeOrder',
            data:{
              saveAmount:this.money,
              orderNo:this.wxType.orderNo,
              serviceType:this.wxType.serviceType,
              baseThreeBusinessId:this.wxType.bankAccountId,
              'way':'3'
            }
          }).then(function (data) {
            if(data.data.code=='0'){
              Indicator.open('加载中...');
              self.$axios({
                method:'post',
                url:'/inter/money/updateThreeOrder',
                data:{
                  orderNo:self.wxType.orderNo,
                  payType:self.wxType.serviceType
                }
              }).then(function (data) {
                self.datas=data.data.data;
                if(data.data.data.respCode=='SUCCESS'&&data.data.data.qrCode!=''){
                  self.popupVisible=true;
                  var qrcode = new QRCode(document.getElementById("wxPay_qrcode"), {
                    width: 96,
                    height: 96,
                  });
                  qrcode.makeCode(self.datas.qrCode,);
                }else {
                  Indicator.close();
                  	self.$dialog.alert({mes:'支付失败，请重新选择支付方式',callback:function(){
							  self.Axios();
							}})
//                MessageBox.alert('支付失败，请重新选择支付方式').then(function () {
//                  self.Axios();
//                })
                }
              }).catch(function () {
              })
            }else {
            		self.$dialog.alert({mes:data.data.msg})
//            MessageBox.alert(data.data.msg)
            }
          }).catch(function () {
          });
        }
      },300),
      Axios:function () {
        let self=this;
        this.$axios({
          method:'post',
          url:'/inter/money/queryBank',
          data:{'type':this.type,'pcOrPhone':'1'}
        }).then(function (data) {
        	console.log(data)
          for(var i=0,wxscan=[];i<data.data.data.length;i++){
            if(data.data.data[i].serviceType=='weixin_scan'){
              wxscan.push(data.data.data[i]);
            }
          }
          self.wxScan=wxscan;
          self.warn=[self.wxScan[0].gatherMin,self.wxScan[0].gatherMax,self.wxScan[0].bankId]
        }).catch(function (error) {
          console.log(error);
        })
      }
    },
    created:function () {
    	let self = this
      if(this.$route.matched[1].path=='/charge/shortPay'){
        this.type="2";
      }
        this.$axios({
    method:"get",
    url:'/inter/money/queryIncome',
  }).then(function (data){
   self.title = data.data.data[2].remark
// console.log(self.title)
  }).catch(function (error) {
  })
     this.Axios();
    },
    watch:{
      popupVisible(newValue, oldValue){
        if(newValue==false){
          this.$router.replace({path:'/charge/companyIncome/bankPay'});
        }
      }
    }
  }
</script>
<style scoped>
  .wxPay_jine{
    width: 100%;
    height: 1.2rem;
  }
  .wxPay_chongzhi{
    display: flex;
    width: 9.375rem;
    font-size: 0.4rem;
    margin: auto;
    line-height: 1rem;
  }
  .wxPay_chongzhi>input{
    flex: 4;
    height: 1rem;
    border: 1px solid #e5e5e5;
    text-indent: 7px;
  }
  .wxPay_jinggao{
    width: 100%;
    height: 1rem;
    text-align: center;
    line-height: 1rem;
    color: red;
    text-indent: 5%;
  }
  .wxPay_saoyisao{
    width: 100%;
    /*height: 7rem;*/
  }
  .wxPay_saoyisao input{
    margin-right: 0.14rem;
  }
  .wxPay_saoyisao img{
    display: block;
    width: 1.9rem;
  }
  .wxPay_saoyisao span{
    width: 100%;
    height: 1rem;
    display: block;
    text-align: center;
    line-height: 1rem;
  }
  .wxPay_saoyisao>div{
    width: 9.375rem;
    height: 3.13rem;
    margin: auto;
  }
  .wxPay_saoyisao>div>p{
    margin-top:0.05rem;
    float: left;
  }
  .wxPay_saoyisao>div>ul{
    float: left;
  }
  .wxPay_saoyisao>div>ul>li{
    width: 2.47rem;
    height: 0.69rem;
    float: left;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .wxPay_saoyisao_bz div{
    width: 7.78rem;
    color: red;
    line-height: 0.7rem;
    margin: auto;
    text-align: center;
  }
  .wxPay_tidd{
    width: 100%;
    height: 1.34rem;
    font-size: 0.45rem;
    background-color: #edac0c;
    color: white;
    position:fixed;
    bottom:0;
    border: 0;
    outline: none;
  }
  .wxPay_scan{
    width: 6.72rem;
    height: 7.19rem;
    display: flex;
    flex-direction: column;
    justify-content:flex-start;
    align-items: center;
  }
  .wxPay_scan p{
    margin-bottom: 0.3rem;
    color: black!important;
  }
  .wxPay_scan span{
    color: red;
  }
</style>
