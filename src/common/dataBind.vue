<template>
  <div>
    <mt-header title="资料绑定" style="background-image: linear-gradient(to bottom,#494c56,#1e2027 );position: fixed;top: 0;left:0 ;z-index:20;width: 100%;height: 1.125rem;">
      <mt-button icon="back" slot="left" @click="goback">返回</mt-button>
    </mt-header>
    <div class="dataBind_container">
      <div style="height: auto;padding-bottom: 1.36rem;overflow: auto">
        <div class="dataBind_table">
          <ul class="dataBind_ul">
            <li>请填写资料：</li>
            <li><i>*</i><span>姓名</span>：<div><input type="text" v-model="name"></div></li>
            <li><i>*</i><span>选择银行</span>：<div>
              <select name="" v-model="bankType">
                <option v-for="item in banks " :value="item.id">{{item.bankName}}</option>
              </select>
            </div></li>
            <li><i>*</i><span>地址</span>：<div class="dataBind_address"><input type="text" v-model="province" placeholder="省："><input type="text" v-model="city" placeholder="市：">
            </div></li>
            <li><i>*</i><span>银行卡号</span>：<div><input type="text" v-model="cardNumber" oninput="if(value.length>19)value=value.slice(0,20)"></div></li>
            <li>已输入{{cardNumber.length}}位</li>
            <li style="margin-bottom: 0.34rem"><i></i><span>银行支行</span>：<div><input type="text" v-model="bankBranch"></div></li>
            <li style="padding: 0"><i></i><span>支行行号</span>：<div><input type="text" v-model="branchCode"></div></li>
            <li style="margin-bottom: 0.34rem"><i></i><span>分行名称</span>：<div><input type="text" v-model="offshootName"></div></li>
            <li style="padding: 0"><i>*</i><span>资金密码</span>：<div><input type="password" v-model="tradePassword1"></div></li>
            <li style="height:auto;padding-left: 2.7rem;margin: 0;display: inline-block"><span v-show="show" style="color: red;width: 100%;font-size: 0.3rem">密码为6-20位，至少包含数字和字母</span></li>
            <li><i>*</i><span>再次输入</span>：<div><input type="password" v-model="tradePassword2" ></div></li>
            <li style="height:auto;padding-left: 2.7rem;margin: 0;display: inline-block"><span v-show="display" style="color: red;width: 100%;font-size: 0.3rem">两次密码不一样</span></li>
            <li><i>*</i><span>手机号</span>：<div><input type="number" v-model="phone"></div></li>
          </ul>
        </div>
      </div>

      <div id="button">
        <button @click="bind">绑定</button>
      </div>
    </div>
  </div>
</template>
<script>
//	import Vue from 'vue'
//	import { MessageBox} from 'mint-ui';
//	Vue.component(MessageBox.name, MessageBox);
export default {
  data(){
    return{
      name:'',
      bankType:'',
      province:'',
      city:'',
      tradePassword1:'',
      tradePassword2:'',
      cardNumber:'',
      phone:'',
      banks:[],
      show:false,
      display:false,
      bankBranch:'',
      branchCode:'',
      offshootName:''
    }
  },
  methods:{
    goback(){
      sessionStorageSet('routeIndx', -1);
      this.$router.back()
    },
    bind:function () {
      let self=this;
      if(this.tradePassword1!=this.tradePassword2){
        this.display=true;
      }else if (!(/^1[34578]\d{9}$/.test(this.phone))){
      	self.$dialog.alert({mes:'手机号码有误，请重填'})
//      MessageBox.alert("手机号码有误，请重填");
      }else if(this.cardNumber.length<16){
      	self.$dialog.alert({mes:'银行卡号长度应在16-20之间'})
//      MessageBox.alert("银行卡号长度应在16-20之间");
      }else if(!(/(?![^a-zA-Z0-9]+$)(?![^a-zA-Z/D]+$)(?![^0-9/D]+$).{6,20}$/.test(this.tradePassword1))){
        this.show=true;
      }
      else{
        this.display=false;
        this.show=false;
        const md5 = hex_md5(this.tradePassword1);
        this.$axios({
          method:'post',
          url:'/inter/user/saveMemberBank',
          data:{
            'bankAccount':this.cardNumber,
            'companyBankId':this.bankType,
            'city':this.city,
            'name':this.name,
            'province':this.province,
            'tradePassword':md5,
            'phone':this.phone,
            'bankBranch':this.bankBranch,
            'branchCode':this.branchCode,
            'offshootName':this.offshootName

          }
        }).then(function (data) {
          console.log(data);
          if(data.data.code==0){
          	self.$dialog.alert({mes:'绑定成功',callback:function(){
          		 self.$router.replace({name:'administration'})
          	}})
//          MessageBox.alert("绑定成功").then(function () {
//            self.$router.replace({name:'administration'})
//          });
          }else{
          		self.$dialog.alert({mes:data.data.msg})
//          MessageBox.alert(data.data.msg);
          }
        }).catch(function(error) {
        })
      }
    }
  },
  created:function () {
    this.banks=this.$route.query.id;
    console.log(this.banks)
    let a=[];
    for(var i=0;i<this.banks.length;i++){
      if(this.banks[i].bankNo!=this.GLOBAL.BankNo[1]&&this.banks[i].bankNo!=this.GLOBAL.BankNo[2]&&this.banks[i].bankNo!=this.GLOBAL.BankNo[3]){
        a.push(this.banks[i]);
      }
    }
    this.banks=a;
    this.bankType=this.banks[0].id
  }

}
</script>
<style scoped>
  .dataBind_container{
    color: black;
    padding-top: 1.125rem;
  }
  .dataBind_container i{
    color: red;
  }
  .dataBind_container span{
    width: 2.5rem;
    display: block;
    text-align: justify;
    text-align-last: justify;
  }
  .dataBind_table{
    width: 100%;
    margin-bottom: 0.5rem;
    display: flex;
    justify-content: center;
  }
  .dataBind_ul{
  width: 9.5rem;
  height: auto;
}
  .dataBind_ul>li{
    height: 0.88rem;
    display: flex;
    align-items: center;
    margin-bottom: 0.34rem;
  }
  .dataBind_container ul input,select{
    width: 6.72rem;
    height: 0.88rem;
    outline: none;
    border: 1px solid #a6a6a6;
    border-radius: 5px;
    text-indent: 7px;
  }
  .dataBind_ul li:nth-child(1){
    margin-bottom:0;
  }
  .dataBind_ul li:nth-child(5){
    margin-bottom:0;
  }
  .dataBind_ul li:nth-child(7){
    margin-bottom:0;
  }
  .dataBind_ul li:nth-child(9){
    margin-bottom:0;
  }
  .dataBind_ul li:nth-child(6){
   padding-left: 2.7rem;
  }
  .dataBind_ul li:nth-child(8){
    padding-left: 2.28rem;
  }
  .dataBind_ul li:nth-child(10){
    padding-left: 2.28rem;
  }
  .dataBind_container button{
    width: 100%;
    height: 1.26rem;
    color: white;
    background: #edac0c;
  }
  .dataBind_address{
    width: 6.72rem;
    display: flex;
    align-items: center;
  }
  .dataBind_address>input{
    width: 3.05rem!important;
    margin-right: 0.5rem;
  }
  #button{
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
  }
</style>
