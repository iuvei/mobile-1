<template>
  <div class="bank_main">
    <div style="height: auto;padding-bottom: 1.64rem;overflow: auto;" class="scorll">
      <div class="yhkzz">
        <div class="yhkzz_jine"><span>姓名</span>：<input type="text" v-model="name"></div>
        <div class="yhkzz_liuyan"><span>充值金额</span>：<input type="number" v-model="number"></div>
      </div>
      <div class="wx_cz_beizhu">⚠最低金{{warn[0]}}元,最高金额{{warn[1]}}元</div>

      <div class="yh_zl">
        <span class="leile" style="font-size: 0.4rem;">银行种类:</span>
        <ul class="banks">
          <li v-for="(item,index) in banks"><input v-model="warn"  :value="[item.gatherMin,item.gatherMax,item.bankName]"   type="radio" :id="index" name="bank"><label  :for="index"><img style="display: block;font-size: 0.3rem;" :src="item.bankLogo" :alt="item.bankName"></label></li>
        </ul>
      </div>
      <ul class="bank_detail" v-show="bankType.firstDeposit">
        <li><span>首次充值优惠：</span><p>充值至少<i>{{bankType.discountAmount}}</i>元时，可以享受首次充值优惠<i>{{bankType.discountPercent}}%</i>，最高优惠<i>{{bankType.maxDiscountAmount}}</i></p></li>
        <li><span>首存打码倍数：</span><p>当前打码倍数为<i>{{bankType.firstDiscountTimes}}</i></p></li>
        <li><span>是否享受首存优惠：</span><div><label for="yes"><input type='radio' id="yes" :checked="bankType.firstDeposit" name="option">是</label><label for="no"><input type='radio' id="no" name="option">否</label>
          <p style="font-size: 0.3rem">打码大于<i>{{(Math.round((number*Number(bankType.firstDiscountTimes))*100)/100)}}</i>才能提现</p>
        </div></li>
      </ul>
      <div class="yh_bz" v-html="title">

      </div>
    </div>
    <div @click="charge" class="button">开始充值</div>
  </div>
</template>
<script>
//	import Vue from 'vue'
//	import { MessageBox} from 'mint-ui';
//	Vue.component(MessageBox.name, MessageBox);
export default {
  data(){
    return{
      type:'',
      banks:[],
      bankType:'',
      number:'',
      name:'',
      warn:[],
      firstDeposit:'',
      checked:'',
      title:"",
      bankEntrance:""
    }
  },
  methods:{
    //点击
    charge: _.debounce(function () {
    
      var self=this;
      for(var i=0,a=0;i<document.getElementsByName("bank").length;i++){
        if(document.getElementsByName("bank")[i].checked==true){
          this.bankType=this.banks[i];
        }else if(!document.getElementsByName("bank")[i].checked){
          a+=1;
        }
      }
      //判断是否首存优惠
      if(document.getElementsByName("option")[0].checked){
        this.firstDeposit='1';
      }else {
        this.firstDeposit='0';
      }
      if(this.name==''||this.number==''){
      	this.$dialog.alert({mes:'姓名和金额不能为空'})
//      MessageBox.alert("姓名和金额不能为空");
      }else if(a==document.getElementsByName("bank").length){
      	this.$dialog.alert({mes:'请选择银行种类'})
//      MessageBox.alert("请选择银行种类");
      }else if(this.number<this.warn[0]||this.number>this.warn[1]){
      	this.$dialog.alert({mes:'存款失败，请填写正确金额'})
//      MessageBox.alert("存款失败，请填写正确金额");
      }else{
      	window.open(self.bankEntrance);
        this.$axios({
          method:'post',
          url:'/inter/money/saveMoneyOrder',
          data:{
            'bankAccountId':this.bankType.bankAccount,
            'firstDeposit':this.firstDeposit,
            'incomeType':this.type,
            'memberName':this.name,
            'orderNo':this.bankType.orderNo,
            'saveAmount':this.number+'',
            'way':'3'
          }
        }).then(function (data) {
//        console.log(data);
          if((data.data.code)==0&&(data.data.msg=='OK')){
            self.$router.replace({name:'payment',query:{id:self.type}});
          }else if(data.data.code==0&&data.data.msg!="OK"){
          	self.$dialog.alert({mes:data.data.msg})
//          MessageBox.alert(data.data.msg);
          }else if(data.data.code==1){
          	self.$dialog.alert({mes:data.data.msg})
//          MessageBox.alert(data.data.msg);
          }else if((data.data.code)!=0&&(data.data.code)!=1){
          	self.$dialog.alert({mes:'出了一点小意外，请稍候重试'})
//          MessageBox.alert('出了一点小意外，请稍候重试');
          }
        }).catch(function (error) {

        })
      }
    },300)
  },
mounted:function () {
  let self=this;
  if(this.$route.matched[1].path=='/charge/companyIncome'){
    this.type="0";
  }

   this.$axios({
    method:"get",
    url:'/inter/money/queryIncome',
  }).then(function (data){
   self.title = data.data.data[0].remark
// console.log(self.title)
  }).catch(function (error) {
  })
  this.$axios({
    method:"post",
    url:'/inter/money/queryBank',
    data:{'type':'0','pcOrPhone':'1'}
  }).then(function (data){
    for(var i=0,a=[];i<data.data.data.length;i++){
      if(data.data.data[i].bankNo!=self.GLOBAL.BankNo[1]&&data.data.data[i].bankNo!=self.GLOBAL.BankNo[2]&&data.data.data[i].bankNo!=self.GLOBAL.BankNo[3]){
        a.push(data.data.data[i]);
        self.banks=a;
      }
    }
    self.bankType=self.banks[0];
    self.warn = [self.banks[0].gatherMin,self.banks[0].gatherMax,self.banks[0].bankName];
   if(data.data.code==1){
      self.$router.replace({name:'payment',query:{id:self.type}});
   }
  }).catch(function (error) {
  })
},
  watch:{
    warn(newValue){
      this.number=newValue[1];
      	this.banks.forEach((item)=>{
      		if(item.bankName == newValue[2]){
        			  this.bankEntrance = item.bankEntrance
      		}
      	})
      
     
    }
  }
}
</script>
<style scope>
  .banks{
    width:7.4rem ;
    height:auto;
    float: left;
  }
  .banks>li{
    width: 2.3rem;
    height: 0.69rem;
    float: left;
    display: flex;
    align-items: center;
    margin-right:0.098rem;
  }
  .banks img{
    width: 2rem;
  }
  .yhkzz{
    width: 100%;
    height: 2.425rem;
    font-size: 0.4rem;
  }
  .yhkzz input{
    flex: 3;
    width: 7.4rem;
    height: 1rem;
    border: 1px solid #e5e5e5;
    text-indent: 7px;
  }
  .yhkzz_jine,.yhkzz_liuyan{
    width: 9.375rem;
    display: flex;
    margin: auto;
    margin-top: 0.2rem;
    align-items: center;
  }
  .yhkzz_jine span{
    flex: 1;
    line-height: 1rem;
    text-align: justify;
    text-align-last: justify;
  }
  .yhkzz_liuyan span{
    flex: 1;
    line-height: 1rem;
    text-align: justify;
    text-align-last: justify;
  }
  .wx_cz_beizhu{
    width:7.1rem;
    line-height: 0.78rem;
    float: right;
    color: red;
  }
  .bank_detail{
    width: 9.375rem;
    margin: auto;
    padding-top: 0.7rem;
    margin-bottom: 1rem;
  }
  .bank_detail p{
    color: black!important;
  }
  .bank_detail span{
    display: inline-block;
    color: black!important;
    flex-shrink:0;
  }
  .bank_detail i {
    color: red;
  }
  .bank_detail>li{
  	width: 100%;
    margin-bottom: 0.3rem;
    display: flex;
  }
  .bank_detail>li label{
    margin-right: 0.3rem;
  }
  /*.scorll{*/
  	/*position: absolute;*/
  	/*top:2.375rem ;*/
  	/*bottom: 0;*/
  /*}*/
  .yh_zl{
    width: 100%;
    height:1rem;
    padding-top: 1.5rem;
  }
  .leile{
    width: 2rem;
    /*height: 2.97rem;*/
    font-size: 0.4rem;
    margin-top: 0.05rem;
    margin-left: 0.3rem;
    float: left;
  }
  .yh_bz{
    width: 100%;
    height: auto;
    height: 2.97rem;
    margin-top:0.1rem ;
  }
  .yh_bz p{
  	display: inline-block;
     width: 9.375rem;
    padding-right: 0.23rem;
    box-sizing: border-box;
    float: right;
    font-size: 0.37rem;
    color: black!important;

  }
  .button{
    width: 100%;
    height: 1.34rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #edac0c;
    color: white;
    margin-top: 0.2rem;
    position:fixed;
    bottom: 0;
    z-index: 1000;
  }
</style>
