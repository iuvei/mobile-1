<template>
  <div class="_change_cha">
  	<mt-header title="转点下级" style="background-image: linear-gradient(to bottom,#494c56,#1e2027 );position: fixed;top: 0;left:0 ;width: 100%;height: 1.125rem;">

    <mt-button icon="back" slot="left" @click="goback">返回</mt-button>

</mt-header>
    <div class="_change_cha_dd">
    <div class="change_a">
      <i></i>
      <span>转点金额:</span>
      <input type="text" v-model="changge_amount" required="required" class="money _change_input" @input="mon" autocomplete="off" >
      <span>元</span>
    </div>
      <div class="change_b">
      <i></i>
      <span>下级账号:</span>
      <input type="text" v-model="change_inAccount" required="required" class="_change_input" autocomplete="off" >
    </div>
    <div class="change_c">
      <i></i>
      <span>资金密码:</span>
      <input type="password" ref="change_tradePassword" required="required" class="_change_input" autocomplete="off">
    </div>
    <div class="change_d">
      <button @click="change_cx" style="font-size: 0.45rem;" class="button_1">确认转点</button>
    </div>
  </div>
  </div>
</template>
<script>
//	import Vue from 'vue'
//	import { MessageBox} from 'mint-ui';
//	Vue.component(MessageBox.name, MessageBox);
  export default {
    name: 'Change',
    data () {
      return {
        changge_amount:"",
        change_inAccount:"",
        change_tradePassword:""
      }
    },
    methods: {
    	goback(){
    		sessionStorageSet('routeIndx', -1);
				this.$router.back()
			},
      mon(e){
        let reg=/^[1-9]\d*$/;
        if(!reg.test(e.target.value)){
          this.changge_amount="";
        }
      },
      change_cx(){
        let that = this;
        let md5 = hex_md5(this.$refs.change_tradePassword.value);
        this.$axios({
          method:"post",
          url:"/inter/user/turnPoint",
          data:{
            amount: this.changge_amount ,// 金额
            inAccount:this.change_inAccount ,// 下级账号
            tradePassword: md5 // 资金密码
          }
        }).then(function (data) {
        	 that.$dialog.alert({mes:data.data.msg})
//        MessageBox.alert(data.data.msg);
          if(data.data.code == '0'){
            that.cel()
          }
        }).catch(function (error) {
          console.log(error)
        })
      },
      cel(){
        for(let i=0;i<document.getElementsByClassName("_change_input").length;i++){
          if(document.getElementsByClassName("_change_input")[i].type=="text" || document.getElementsByClassName("_change_input")[i].type=="password"){
            document.getElementsByClassName("_change_input")[i].value="";
          }
        }
      }
    }
  }
</script>
<style scoped >
  .change_a,.change_b,.change_c{
    width: 100%;
    height: 0.96rem;
    padding:0 0.48rem ;
    color: black;
    margin: 0.3rem 0;
    box-sizing: border-box;
  }
  ._change_cha i{
    float: left;
    height: 0.3rem;
    width: 0.3rem;
    margin: 0.3rem 0.2rem;
    background: url("../../static/images/img/icon/xinghao.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }
  ._change_cha input{
    width: 65%;
    height: 0.9rem;
    border: 1px solid gainsboro;
    border-radius: 0.1rem;
    padding-left: 0.25rem;
    box-sizing: border-box;
  }
  .change_a>input{
    width: 30%;
  }
 ._change_cha span{
    font-size: 0.4rem;
    line-height: 0.9rem;
  }
  ._change_cha{
    overflow: hidden;
    background-color: #f1f1f0;
  }
  ._change_cha_dd{
    background-color: #F1F1F0;
    padding: 1.125rem 0 0 0;
  }
 ._change_cha .button_1{
    display: block;
    width: 100%;
    height: 1.25rem;
    margin-top: 0.625rem;
    color: white;
    background-color: #edac0c;
  }
</style>
