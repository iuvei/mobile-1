<template>
  <div>
    <div style="height: auto;padding-bottom: 1.34rem" class="qq_box">
      <div class="qq_cz">
        <div class="qq_cz_s"><span>姓名</span>：<input type="text" v-model="name"></div>
        <div class="qq_cz_f"><span>充值金额</span>：<input type="text" v-model="money"></div>
      </div>
      <div class="qq_cz_beizhu">⚠最低金额{{qq.gatherMin}}元,最高金额{{qq.gatherMax}}元</div>
      <ul class="qq_detail" v-show="qq.firstDeposit">
        <li><span>首次充值优惠：</span><p>充值至少<i>{{qq.discountAmount}}</i>元时，可以享受首次充值优惠<i>{{qq.discountPercent}}%</i>，最高优惠<i>{{qq.maxDiscountAmount}}</i></p></li>
        <li><span>首存打码倍数：</span><p>当前打码倍数为<i>{{qq.firstDiscountTimes}}</i></p></li>
        <li><span>是否享受首存优惠：</span><div><label for="yes"><input type='radio' id="yes" :checked="qq.firstDeposit" name="option">是</label><label for="no"><input type='radio' id="no" name="option">否</label>
          <p style="font-size: 0.3rem">打码大于<i>{{money*Number(qq.firstDiscountTimes)}}</i>才能提现</p>
        </div></li>
      </ul>
      <div class="qq_cz_erweima">
        <span>请用qq扫描下面的二维码(qq加好友充值)</span>
        <div class="qq_erweima_box">
          <div class="qq_erweima"><img :src="qq.qrCode" alt="二维码"></div>
        </div>
      </div>
    </div>

    <button @click="charge" class="qq_tj">提交订单</button>
  </div>
</template>
<script>
//	import Vue from 'vue'
//	import { MessageBox} from 'mint-ui';
//	 Vue.component(MessageBox.name, MessageBox);
  export default {
    data(){
      return{
        type:'',
        money:100,
        name:'',
        qq:'',
        firstDeposit:''
      }
    },
    methods:{
      charge: _.debounce(function () {
        let self=this;
        if(this.name==''||this.money==''){
        	 self.$dialog.alert({mes:'姓名和金额不能为空'})
//        MessageBox.alert('姓名和金额不能为空',"")
        }else if(this.money<this.qq.gatherMin||this.money>this.qq.gatherMax){
        	 self.$dialog.alert({mes:'存款失败，请填写正确金额'})
//        MessageBox.alert("存款失败，请填写正确金额");
        }else{
          if(document.getElementsByName("option")[0].checked){
            this.firstDeposit='1';
          }else {
            this.firstDeposit='0';
          }
          this.$axios({
            method:'post',
            url:'/inter/money/saveMoneyOrder',
            data: {
              'bankAccountId': this.qq.bankAccount,
              'firstDeposit': this.firstDeposit,
              'incomeType': this.type,
              'memberName': this.name,
              'orderNo': this.qq.orderNo,
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
      })
    },
    created: function () {
      if(this.$route.matched[1].path=='/charge/companyIncome'){
        this.type="0";
      }
      this.qq=JSON.parse(this.$route.query.qq);
    }
  }
</script>
<style scoped>
	.qq_box{
		width: 100%;
		position: absolute;
    top: 2.375rem;
    bottom: 0;
	}
  .qq_cz{
    width: 100%;
    height: 2.425rem;

  }
  .qq_cz_f,.qq_cz_s{
    width: 9.375rem;
    font-size: 0.4rem;
    display: flex;
    margin: auto;
    margin-top: 0.2rem;
    align-items: center;
  }
  .qq_cz_f>input{
    flex: 3;
    width: 7.4rem;
    height: 1rem;
    border: 1px solid #e5e5e5;
    text-indent: 7px;
  }
  .qq_cz_s>input{
    width: 7.4rem;
    height: 1rem;
    flex: 3;
    border: 1px solid #e5e5e5;
    text-indent: 7px;
  }
  .qq_cz_f span{
    flex: 1;
    line-height: 1rem;
    text-align: justify;
    text-align-last: justify;
  }
  .qq_cz_s span{
    flex: 1;
    line-height: 1rem;
    text-align: justify;
    text-align-last: justify;
  }
  .qq_cz_beizhu{
    width: 100%;
    height: 0.78rem;
    line-height: 0.78rem;
    color: red;
    text-align: center;
    text-indent: 5%;
  }
  .qq_detail{
    width: 9.375rem;
    margin: auto;
    padding-top: 0.7rem;
    margin-bottom: 1rem;
  }
  .qq_detail p{
    color: black!important;
  }
  .qq_detail span{
    display: inline-block;
    /*width:4rem ;*/
    flex-shrink:0;
    color: black!important;
  }
  .qq_detail i {
    color: red;
  }
  .qq_detail>li{
    margin-bottom: 0.3rem;
    display: flex;
  }
  .qq_detail>li label{
    margin-right: 0.3rem;
  }
  .qq_cz_erweima{
    width: 100%;
    height: 4.06rem;
  }
  .qq_cz_erweima span{
    width: 100%;
    height: 0.719rem;
    display: block;
    text-align: center;
    line-height: 0.719rem;
  }
  .qq_erweima_box{
    width: 100%;
    height: 3.28rem;
  }
  .qq_tj{
    width: 100%;
    height: 1.34rem;
    font-size: 0.45rem;
    position: fixed;
    bottom:0;
    background-color: #edac0c;
    outline: none;
    border: 0;
    color: white;
  }
  .qq_erweima{
    width: 3.28rem;
    height: 3.26rem;
    margin: auto;
    background: #e5e5e5;;
  }
  .qq_erweima>img{
    width: 3.28rem;
    height: 3.28rem;
  }
</style>
