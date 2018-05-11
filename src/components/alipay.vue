<template>
  <div>
    <div style="height: auto;padding-bottom: 1.34rem">
      <div class="ali_pay">
        <div class="ali_chongzhi_pay"><span>充值金额：</span> <input  v-model="money" type="number" ></div>
      </div>
      <div class="ali_jinggao_pay" v-if="aliScan[0]">最低金额{{warn[0]}}元，最高金额{{warn[1]}}元</div>
      <div class="ali_saoyisao_pay">
        <div>
          <p style="color: black">充值类型：</p>
          <ul>
            <li v-for="(item,index) in aliScan"><input v-model="warn" :value="[item.gatherMin,item.gatherMax,item.bankId]" type="radio" :id="index" name="ali"><label  :for="index"><img align="middle" :src="item.bankLogo" :alt="item.serviceType"></label></li>
          </ul>
        </div>
        <div class="title" v-html="title">

        </div>
      </div>
    </div>

    <button @click="showCode"  class="ali_tidd_pay">提交订单</button>
    <mt-popup v-model="popupVisible" popup-transition="popup-fade" >
      <div class="ali_scan_pay">
        <p>请用支付宝扫描下面的二维码进行支付，支付完成后请关闭此页面</p>
        <div id="aliPay_qrcode"></div>
        <p><span>订单金额：</span>{{datas.orderAmount}}元</p>
        <p><span>订单号：</span>{{datas.orderNo}}</p>
        <p><span>订单日期：</span>{{datas.orderTime}}</p>
        <button @click="close">关闭</button>
      </div>
    </mt-popup>
  </div>
</template>
<script>
//	import Vue from 'vue'
  import { Indicator} from 'mint-ui';
//Vue.component(MessageBox.name, MessageBox);
  export default {
    data(){
      return{
        type:'',
        aliScan:[],
        money:'',
        aliType:'',
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
        for(var i=0,a=0;i<document.getElementsByName("ali").length;i++){
          if(document.getElementsByName("ali")[i].checked==true){
            this.aliType=this.aliScan[i];
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
              orderNo:this.aliType.orderNo,
              serviceType:this.aliType.serviceType,
              baseThreeBusinessId:this.aliType.bankAccountId,
              'way':'3'
            }
          }).then(function (data) {
//            console.log(data);
            if(data.data.code=='0'){
              Indicator.open('加载中...');
              self.$axios({
                method:'post',
                url:'/inter/money/updateThreeOrder',
                data:{
                  orderNo:self.aliType.orderNo,
                  payType:self.aliType.serviceType
                }
              }).then(function (data) {
//                console.log(data);
                self.datas=data.data.data;
                if(data.data.data.respCode=='SUCCESS'&&data.data.data.qrCode!=''){
                  Indicator.close();
                  self.popupVisible=true;
                  var qrcode = new QRCode(document.getElementById("aliPay_qrcode"), {
                    width: 96,
                    height:96,
                  });
                  qrcode.makeCode(self.datas.qrCode,)
                }else{
                  Indicator.close();
                  self.$dialog.alert({mes:data.data.data.respDesc,callback:function(){
          		    self.Axios();
          	}})
//                MessageBox.alert(data.data.data.respDesc).then(function () {
//                  self.Axios();
//                })
                }
              }).catch(function () {
              })
            }else{
            	self.$dialog.alert({mes:data.data.msg})
//            MessageBox.alert(data.data.msg);
            }
          }).catch(function () {
          });
        }

      },300),
      //请求；
      Axios:function () {
        let self=this;
        this.$axios({
          method:'post',
          url:'/inter/money/queryBank',
          data:{'type':this.type,'pcOrPhone':'1'}
        }).then(function (data) {
//          console.log(data);
          for(var i=0,aliscan=[];i<data.data.data.length;i++){
            if(data.data.data[i].serviceType=='alipay_scan'){
              aliscan.push(data.data.data[i])
            }
          }
          self.aliScan=aliscan;
          self.warn=[self.aliScan[0].gatherMin,self.aliScan[0].gatherMax,self.aliScan[0].bankId]
//          console.log(self.aliScan);
        }).catch(function (error) {
          console.log(error)
        })
      }
    },
    mounted:function () {
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
  .ali_pay{
    width: 100%;
    height: 1.2rem;
  }
  .ali_chongzhi_pay{
    display: flex;
    width: 9.375rem;
    font-size: 0.4rem;
    margin: auto;
    line-height: 1rem;
  }
  .ali_chongzhi_pay>input{
    flex: 4;
    height: 1rem;
    border: 1px solid #e5e5e5;
    text-indent: 7px;
  }
  .ali_jinggao_pay{
    width: 100%;
    height: 1rem;
    text-align: center;
    line-height: 1rem;
    color: red;
    text-indent: 5%;
  }
  .ali_saoyisao_pay{
    width: 100%;
    /*height: 7rem;*/
  }
  .ali_saoyisao_pay span{
    width: 100%;
    height: 1rem;
    display: block;
    text-align: center;
    line-height: 1rem;
  }
  .ali_saoyisao_pay>div{
    width: 9.375rem;
    height: 3.13rem;
    margin: auto;
  }
  .ali_saoyisao_pay>div>p{
    margin-top:0.05rem;
    float: left;
  }
  .ali_saoyisao_pay>div>ul{
    float: left;
  }
  .ali_saoyisao_pay>div>ul>li{
    width: 2.47rem;
    height: 0.69rem;
    float: left;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .ali_saoyisao_pay input{
    margin-right: 0.14rem;
  }
  .ali_saoyisao_pay img{
    display: block;
    width: 1.5rem
  }
  .ali_tidd_pay{
    width: 100%;
    height: 1.34rem;
    font-size: 0.45rem;
    background-color: #edac0c;
    color: white;
    position: fixed;
    bottom:0;
    border: 0;
    outline: none;
  }
  .ali_scan_pay{
    width: 6.72rem;
    height: 7.19rem;
    display: flex;
    flex-direction: column;
    justify-content:flex-start;
    align-items: center;
  }
  .ali_scan_pay p{
    margin-bottom: 0.3rem;
    color: black!important;
  }
  .ali_scan_pay span{
    color: red;
  }
</style>
