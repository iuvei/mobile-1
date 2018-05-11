<template>
  <div>
  	<mt-header title="提现" style="z-index:2;background-image: linear-gradient(to bottom,#494c56,#1e2027 );position: fixed;top: 0;left:0 ;width: 100%;height: 1.125rem;">
    <mt-button icon="back" slot="left" @click="goback">返回</mt-button>
</mt-header>
    <div class="withdraw_container">
      <div class="withdraw_main">
        <ul>
          <ll class="ll"><label>提示信息：</label><label v-html="datas.tip"></label></ll>
          <li>消费比例：<p>提现需达投注量<span>{{datas.memberConsumeNeed}}</span>已达投注量<span>{{datas.memberConsume}}</span></p></li>
          <li><i>*</i>账户余额：{{Number(datas.accountBalance?datas.accountBalance:'0')}}元</li>
          <!--<li><i>*</i>银行支行：<input type="text" v-model="bankType"></li>-->
          <!--<li><i>*</i>支行行号：<input type="number" v-model="branch_code"></li>-->
          <!--<li><i>*</i>分行名称：<input type="text" v-model="offshootName"></li>-->
          <li><i>*</i><span>提现账号</span>：<select id="account" v-model="account">
            <option  v-for="item in datas.bankList" :value="item[0]">{{item[1]}}</option>
          </select>
          </li>
          <li style="height: auto;"><i style="margin-top: -0.4rem">*</i><span style="flex-shrink:0;margin-top: -0.5rem">提现金额：</span><div><input style="width: 2rem;height:0.9rem;border: 1px solid #b8b8b8; border-radius: 4px;text-indent: 7px" type="number" v-model="money" ><span class="withdraw_cash">元</span>
            <p style="font-size: 0.3rem">你本次最高提现{{datas.drawDegreeTimes}}元，最低提现{{datas.drawFloorTimes}}元</p>
          </div></li>

          <li style="height: auto;"><i style="margin-top: -0.4rem">*</i><span style="flex-shrink:0;margin-top: -0.5rem">资金密码：</span><div><input style="width: 6.8rem;height:0.9rem;border: 1px solid #b8b8b8; border-radius: 4px;text-indent: 7px" type="password" v-model="password">
            <p style="font-size: 0.3rem">请输入密码</p>
          </div></li>

          <li>免手续费次数：<span>{{datas.newNoCharges}}</span>次</li>
          <li>扣手续费：<span>{{datas.chargesPoint}}</span>元</li>
        </ul>

      </div>
      <button @click="withdraw" class="submit">提交</button>
    </div>
    <mt-popup
      v-model="popupVisible"
      popup-transition="popup-fade"
    >
      <div class="withdraw_yk_mo">
        <h2>系统讯息</h2>
        <p><span>订单已提交!</span>等待客服审核,审核完将会自动到账!</p>
        <button @click="confirm">确定</button>
      </div>
    </mt-popup>
  </div>
</template>
<script>
//	import Vue from 'vue'
//import { MessageBox} from 'mint-ui';
//Vue.component(MessageBox.name, MessageBox);
export default{
  data(){
    return{
      popupVisible:false,
      datas:'',
      account:'',
      money:'',
      password:'',
    }
  },
  methods:{
  	goback(){
  		sessionStorageSet('routeIndx', -1)
				this.$router.back()
			},
    //提交
    withdraw: _.debounce(function () {
      let self=this;
      //md5加密；
      const md5 = hex_md5(this.password);
      if(this.account==''||this.money==''||this.password==''){
      	 self.$dialog.alert({mes:'星号标注的不能为空'})
//      MessageBox.alert('星号标注的不能为空',"");
      }else if(this.money>this.datas.drawDegreeTimes){
      	self.$dialog.alert({mes:'提现金额不得超过'+this.datas.drawDegreeTimes+"元"})
//      MessageBox.alert('提现金额不得超过'+this.datas.drawDegreeTimes+"元","")
      }else if(this.money<this.datas.drawFloorTimes){
      	self.$dialog.alert({mes:'提现金额不得低于'+this.datas.drawFloorTimes+"元"})
//      MessageBox.alert('提现金额不得低于'+this.datas.drawFloorTimes+"元","")
      } else {
        this.$axios({
          method:'post',
          url:'/inter/money/saveDrawMoneyInfo',
          data:{
            'applyAmount':this.money,
            'bankId':this.account,
//            'bankBranch':this.bankType,
            'bankPoundage':String(this.datas.chargesPoint),
            'memberConsume':String(this.datas.memberConsume),
            'memberConsumeNeed':String(this.datas.memberConsumeNeed),
            'tradePassword':md5,
            'way':'3'
//            'branch_code':this.branch_code,
//            'offshootName':this.offshootName
          }
        }).then(function (data) {
          if(data.data.code==0&&data.data.msg=='OK'){
            self.popupVisible=true;
          }else if(data.data.code==1){
          	self.$dialog.alert({mes:data.data.msg})
//          MessageBox.alert(data.data.msg);
          }else if(data.data.code==0&&data.data.msg!="OK"){
          		self.$dialog.alert({mes:data.data.msg})
//          MessageBox.alert(data.data.msg);
          }else if((data.data.code!=0)&&(data.data.code!=1)){
          		self.$dialog.alert({mes:'出了一点小意外，请稍候重试'})
//          MessageBox.alert('出了一点小意外，请稍候重试');
          }
        }).catch(function (error) {
        })
      }
    },300),
    confirm:function (){
      this.popupVisible=false;
      this.$router.replace({name:'person'});
    }
  },
  created:function () {
    let self=this;
    this.$axios({
      method:'get',
      url:'/inter/money/queryDrawCondition'
    }).then(function (data) {
      if(data.data.code!=0){
      	 self.$dialog.alert({mes:'未登入',callback:function(){
								 sessionStorage.clear();
								  self.$router.replace({name:'login'});
							}})
//      MessageBox.alert(data.data.msg,"").then(function () {
//        if(data.data.code==666){
//          self.$router.push({name:'login'});
//        }
//      })
      }
      self.datas=data.data.data;
      //默认选中第一个
      self.account=self.datas.bankList[0][0];
      if(self.datas.memberConsumeNeed>self.datas.memberConsume){
      	self.$dialog.alert({mes:'消费金额不足，无法提现',callback:function(){
							 self.$router.replace({name:'person'});
							}})
//      MessageBox.alert('消费金额不足，无法提现',"").then(function () {
//        self.$router.replace({name:'person'});
//      })
      }
    }).catch(function () {
    });
  },
  beforeRouteEnter (to, from, next) {
    if(sessionStorageGet("baseMember")['type']=='1'||sessionStorageGet("baseMember")['type']=='2'){
      next(false);
    }else {
      next();
    }
  }
}
</script>
<style scoped>
  .ll{
    word-break:break-all;
    overflow:auto;
    word-wrap:break-word;
    float: left;
    display: inline;
    width: 9.2rem;
  }
  .ll>label>p{
    color: black!important;
  }
  p{
    width: 7rem;
    overflow: hidden;
    word-wrap: normal;
    float: left;
    color: black!important;
  }
  .withdraw_container{
    width: 100%;
    color: black;
    padding-top: 1.125rem;
}
  .withdraw_main{
    width: 100%;
    height: 12.3rem;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    overflow: auto;
    padding-bottom: 1.44rem;
    z-index: -2;
  }
  .withdraw_main>ul{
    width: 9.5rem;
    position: absolute;
    top: 1.125rem;
    z-index: 0;
    padding-bottom: 1.44rem;
  }
  .withdraw_main>ul>li{
    width: 9.5rem;
    height: 0.9rem;
    display: flex;
    align-items: center;
  }
  .withdraw_main>ul li:nth-child(2){
    align-items:flex-start!important;
    margin-bottom: 0.4rem;
  }
  .withdraw_main>ul li:nth-child(2) span{
    margin-right: 0.3rem;
    color: red;
  }
  .withdraw_main label{
    font-size: 0.4rem;
  }
  .withdraw_main>ul>li>input{
  width: 6.7rem;
  height: 0.94rem;
  text-indent: 7px;
  border: 1px solid #b8b8b8!important;
  border-radius: 4px;
}
  .withdraw_main i{
  color: red;
}
  .withdraw_main>ul li:nth-child(3){
  height: 1.3rem;
  color: red;
}
  .withdraw_main>ul li:nth-child(4){
  margin-bottom: 0.3rem;
}
  .withdraw_main>ul li:nth-child(5){
  margin-bottom: 0.3rem;
}
  .withdraw_main>ul li:nth-child(6){
  margin-bottom: 0.3rem;
}
  .withdraw_main>ul li:nth-child(7){
    margin-bottom: 0.3rem;
  }
  .withdraw_main>ul li:nth-child(8) input{
    width: 2.1rem;
}
  .withdraw_main>ul li:nth-child(9){
    font-size: 0.3rem;
    text-indent: 2.3rem;
  }
  .withdraw_main>ul li:nth-child(11){
    font-size: 0.3rem;
    text-indent: 2.3rem;
  }
  #account{
    width: 6.8rem;
    height: 0.94rem;
    text-indent: 7px;
    border: 1px solid #b8b8b8!important;
    border-radius: 4px;
    outline: none;
  }
.submit{
  width: 100%;
  height: 1.34rem;
  color: white;
  background: #edac0c;
  position: fixed;
  bottom: 0;
}
.withdraw_yk_mo{
  width: 8.125rem;
  height: 4.17rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  color: black;
  margin: auto;
}
.withdraw_yk_mo h2{
  color: #e55100;;
  line-height: 1.525rem;
}
.withdraw_yk_mo p{
  width: 6.9rem;
  margin-bottom: 0.5rem;
  color: black;
}
  .withdraw_yk_mo span{
    color: #e55100;
  }
  .withdraw_yk_mo button{
    width: 100%;
    height: 1.1rem;
    color: white;
    background:#edac0c ;
  }
  .withdraw_cash{
  color: red;
}
</style>
