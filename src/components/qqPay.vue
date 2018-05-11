<template>
  <div>
    <div style="height: auto" class="qqPay_scroll">
      <div class="qqPay_qq">
        <div class="qqPay_chongzhi_qq"><span>充值金额：</span> <input  v-model="money" type="number" ></div>
      </div>
      <div class="qqPay_jinggao_qq" v-if="qqScan[0]">最低金额{{warn[0]}}元，最高金额{{warn[1]}}元</div>
      <div class="qqPay_saoyisao_qq">
        <div>
          <p style="color: black">充值类型：</p>
          <ul>
            <li v-for="(item,index) in qqScan"><input v-model="warn" :value="[item.gatherMin,item.gatherMax,item.bankId]" type="radio" :id="index" name="qq"><label  :for="index"><img align="middle" :src="item.bankLogo" :alt="item.serviceType"></label></li>
          </ul>
        </div>
        <div class="qq_title" v-html="title">

        </div>
      </div>
    </div>
    <button @click="showCode"  class="qqPay_tidd_qq">提交订单</button>
    <mt-popup v-model="popupVisible" popup-transition="popup-fade" >
      <div class="qqPay_scan_qq">
        <p style="width:6rem ">请用QQ扫描下面的二维码进行支付，支付完成后请关闭此页面</p>
        <div id="qqPay_qrcode"></div>
        <p><span>订单金额：</span>{{datas.orderAmount}}元</p>
        <p><span>订单日期：</span>{{datas.orderTime}}</p>
        <p><span>订单号：</span>{{datas.orderNo}}</p>
        <button @click="close" style="background: white">关闭</button>
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
        qqScan:[],
        money:'',
        qqType:'',
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
    			var rom =  (Math.floor((Math.random()*9.8+0.1)*100)/100)*0.1 //随机数0.1-0.99
    			e.target.value = e.target.value*1 +rom  //输入的值和随机数相加
    		e.target.value = Math.floor(e.target.value*100)/100 ;
    		//再保留两位小数
    		this.money = e.target.value
    		}else{
    				e.target.value = Math.floor(e.target.value*100)/100;
    				this.money = e.target.value
    		}},
      close:function () {
        this.popupVisible=false;
      },
      showCode:  _.debounce(function () {
        let self=this;
        for(var i=0,a=0;i<document.getElementsByName("qq").length;i++){
          if(document.getElementsByName("qq")[i].checked==true){
            this.qqType=this.qqScan[i];
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
              orderNo:this.qqType.orderNo,
              serviceType:this.qqType.serviceType,
              baseThreeBusinessId:this.qqType.bankAccountId,
              'way':'3'
            }
          }).then(function (data) {
            if(data.data.code=='0'){
              Indicator.open('加载中...');
              self.$axios({
                method:'post',
                url:'/inter/money/updateThreeOrder',
                data:{
                  orderNo:self.qqType.orderNo,
                  payType:self.qqType.serviceType
                }
              }).then(function (data) {
                console.log(data);
                self.datas=data.data.data;
                if(data.data.data.respCode=='SUCCESS'&&data.data.data.qrCode!=''){
                  Indicator.close();
                  self.popupVisible=true;
                  var qrcode = new QRCode(document.getElementById("qqPay_qrcode"), {
                    width: 96,
                    height:96,
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
            }else{
            	 self.$dialog.alert({mes:data.data.msg})
//            MessageBox.alert(data.data.msg)
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
          for(var i=0,qqscan=[];i<data.data.data.length;i++){
            if(data.data.data[i].serviceType=='qq_scan'){
              qqscan.push(data.data.data[i]);
            }
          }

          self.qqScan=qqscan;
          console.log(self.qqScan)
          self.warn=[self.qqScan[0].gatherMin,self.qqScan[0].gatherMax,self.qqScan[0].bankId]
//          console.log(self.qqScan);
        }).catch(function (error) {
          console.log(error);
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
	.qqPay_scroll{
		width: 100%;
		/*position: absolute;*/
		/*top: 2.375rem;*/
		overflow: auto;
		/*bottom: 1.34rem;*/
	}
  .qqPay_qq{
    width: 100%;
    height: 1.2rem;
  }
  .qqPay_chongzhi_qq{
    display: flex;
    width: 9.375rem;
    font-size: 0.4rem;
    margin: auto;
    line-height: 1rem;
  }
  .qqPay_chongzhi_qq>input{
    flex: 4;
    height: 1rem;
    border: 1px solid #e5e5e5;
    text-indent: 7px;
  }
  .qqPay_jinggao_qq{
    width: 100%;
    height: 1rem;
    text-align: center;
    line-height: 1rem;
    color: red;
    text-indent: 5%;
  }
  .qqPay_saoyisao_qq{
    width: 100%;
    /*height: 7rem;*/
  }
  .qqPay_saoyisao_qq span{
    width: 100%;
    height: 1rem;
    display: block;
    text-align: center;
    line-height: 1rem;
  }
  .qqPay_saoyisao_qq>div{
    width: 9.375rem;
    height: 3.13rem;
    margin: auto;
  }
  .qqPay_saoyisao_qq>div>p{
    margin-top:0.05rem;
    float: left;
  }
  .qqPay_saoyisao_qq>div>ul{
    float: left;
  }
  .qqPay_saoyisao_qq>div>ul>li{
    width: 2.47rem;
    height: 0.69rem;
    float: left;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .qqPay_saoyisao_qq input{
    margin-right: 0.14rem;
  }
  .qqPay_saoyisao_qq img{
    display: block;
    width: 1.5rem
  }
  .qqPay_tidd_qq{
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
  .qqPay_scan_qq{
    width: 6.72rem;
    height: 7.7rem;
    display: flex;
    flex-direction: column;
    justify-content:flex-start;
    align-items: center;
  }
  .qqPay_scan_qq p{
    margin-bottom: 0.3rem;
    color: black!important;
  }
  .qqPay_scan_qq span{
    color: red;
  }
#qqPay_qrcode{
  margin-bottom: 0.3rem;
}

</style>
