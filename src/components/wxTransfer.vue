<template>
<div>
  <div  style="height: auto;padding-bottom: 1.34rem" class="box_wx">
    <div class="wx_cz">
      <div class="wx_cz_s"><span>姓名</span>：<input type="text" v-model="name"></div>
      <div class="wx_cz_f"><span>充值金额</span>：<input type="number" v-model="money"></div>
    </div>
    <div class="wx_cz_beizhu">⚠最低金额{{wx.gatherMin}}元,最高金额{{wx.gatherMax}}元</div>
    <ul class="wx_detail" v-show="wx.firstDeposit">
      <li><span>首次充值优惠：</span><p>充值至少<i>{{wx.discountAmount}}</i>元时，可以享受首次充值优惠<i>{{wx.discountPercent}}%</i>，最高优惠<i>{{wx.maxDiscountAmount}}</i></p></li>
      <li><span>首存打码倍数：</span><p>当前打码倍数为<i>{{wx.firstDiscountTimes}}</i></p></li>
      <li><span>是否享受首存优惠：</span><div><label for="yes"><input type='radio' id="yes" :checked="wx.firstDeposit" name="option" >是</label><label for="no"><input type='radio' id="no" name="option" >否</label>
        <p style="font-size: 0.3rem">打码大于<i>{{money*Number(wx.firstDiscountTimes)}}</i>才能提现</p>
      </div></li>
    </ul>
    <div class="wx_cz_erweima">
      <span>请用微信扫描下面的二维码(微信加好友充值)</span>
      <div class="erweima_box">
        <div class="erweima"><img :src="wx.qrCode" alt="二维码"></div>
      </div>
    </div>
    <dl class="wx_cz_dl">
      <dt>充值注意事项：</dt>
      <dd>1.微信版本必须为6.5.4以上(查看当前版本：打开微信-我的-设置-关于微信)版本不达标
        请先更新微信，否则没有第3步的留言宫功能。</dd>
      <dd>
        2.转账金额10元起，低于10元不受理也不退回。
      </dd>
      <dd>3.必须添加留言。留言请填上您的会员账号，并核对会员账号是否正确（如未留言会员账号，无法及时为您充值
        ，请联系在线客服）</dd>
    </dl>
  </div>
  <button @click="charge"  class="wx_tj" >提交订单</button>
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
      wx:'',
      firstDeposit:''
    }
  },
  methods:{
    charge: _.debounce(function () {
      let self=this;
      if(this.name==''||this.money==''){
      	self.$dialog.alert({mes:'姓名和金额不能为空'})
//      MessageBox.alert('姓名和金额不能为空');
      }else if(this.money<this.wx.gatherMin||this.money>this.wx.gatherMax){
      		self.$dialog.alert({mes:'存款失败，请填写正确金额'})
//      MessageBox.alert("存款失败，请填写正确金额");
      }else {
        if(document.getElementsByName("option")[0].checked){
          this.firstDeposit='1';
        }else {
          this.firstDeposit='0';
        }
        this.$axios({
          method:'post',
          url:'/inter/money/saveMoneyOrder',
          data: {
            'bankAccountId': this.wx.bankAccount,
            'firstDeposit': this.firstDeposit,
            'incomeType': this.type,
            'memberName': this.name,
            'orderNo': this.wx.orderNo,
            'saveAmount': this.money+'',
            'way':'3'
          }
        }).then(function (data) {
          console.log(data)
          if(data.data.code==0&&data.data.msg=="OK"){
            self.$router.replace({name:'payment',query:{id:self.type}});
          }else if(data.data.code==0&&data.data.msg!="OK"){
          	self.$dialog.alert({mes:data.data.msg})
//          MessageBox.alert(data.data.msg);
          }else if(data.data.code==1){
          	self.$dialog.alert({mes:data.data.msg})
//          MessageBox.alert(data.data.msg);
          }else if(data.data.code!=0&&data.data.code!=1){
          	self.$dialog.alert({mes:'出了一点小意外，请稍候重试'})
//          MessageBox.alert('出了一点小意外，请稍候重试');
          }
        }).catch(function () {
        })
      }
    },300)
 },
  created: function () {
    if(this.$route.matched[1].path=='/charge/companyIncome'){
      this.type="0";
    }
    this.wx=JSON.parse(this.$route.query.wx);
    this.money=this.wx.gatherMax;
  },

}
</script>
<style scoped>
	.box_wx{
		position: absolute;
    top: 2.375rem;
    bottom: 0;
	}
  .wx_cz{
    width: 100%;
    height: 2.425rem;
  }
  .wx_cz_f,.wx_cz_s{
    width: 9.375rem;
    font-size: 0.4rem;
    display: flex;
    margin: auto;
    text-align: left;
    margin-top: 0.2rem;
    align-items: center;
  }
  .wx_cz_f>input{
    flex: 3;
    width: 7.4rem;
    height: 1rem;
    border: 1px solid #e5e5e5;
    text-indent: 7px;
  }
  .wx_cz_s>input{
    width: 7.4rem;
    height: 1rem;
    flex: 3;
    border: 1px solid #e5e5e5;
    text-indent: 7px;
  }
  .wx_cz_f span{
    width:100%;
    text-justify: distribute-all-lines;
    word-wrap: break-word;
    word-break: break-all;
    flex: 1;
    line-height: 1rem;
    text-align: justify;
    text-align-last: justify;
  }
  .wx_cz_s span{
    width:100%;
    flex: 1;
    text-align: justify;
    text-align-last: justify;
    line-height: 1rem;
    display:inline-block;
    text-justify: distribute-all-lines;
    word-wrap: break-word;
    word-break: break-all;
  }
  .wx_cz_beizhu{
    width: 100%;
    height: 0.78rem;
    line-height: 0.78rem;
    color: red;
    text-align: center;
    text-indent: 5%;
    float: none;
  }
  .wx_detail{
    width: 9.375rem;
    margin: auto;
    padding-top: 0.7rem;
    margin-bottom: 1rem;
  }
  .wx_detail p{
    color: black!important;
  }
  .wx_detail span{
    display: inline-block;
    flex-shrink:0;
  }
  .wx_detail i {
    color: red;
  }
  .wx_detail>li{
    width: 100%;
    margin-bottom: 0.3rem;
    display: flex;
  }
  .wx_detail>li label{
    margin-right: 0.3rem;
  }
  .wx_cz_erweima{
    width: 100%;
    height: 4.06rem;
  }
  .wx_cz_erweima span{
    width: 100%;
    display:inline-block;
    text-align: center;
    line-height: 0.719rem;
  }
  .erweima_box{
    width: 100%;
    height: 3.28rem;
  }
  .wx_cz_dl{
    padding: 0 0.5rem 0.3rem 0.5rem;
    margin-top: 1rem;
  }
  .wx_cz_dl dd{
    font-size: 0.38rem;
  }
  .wx_tj{
    width: 100%;
    height: 1.34rem;
    position: fixed;
    bottom: 0;
    background-color: #edac0c;
    outline: none;
    border: 0;
    color: white;
    font-size: 0.45rem;
  }
  .erweima{
    width: 3.28rem;
    height: 3.26rem;
    margin: auto;
    background: #e5e5e5;;
  }
  .erweima>img{
    width: 3.28rem;
    height: 3.28rem;
  }
</style>
