<template>
<div>
	<mt-header title="在线充值" style="background-image: linear-gradient(to bottom,#494c56,#1e2027 );position: fixed;top: 0;left:0 ;width: 100%;height: 1.125rem;z-index: 100;">
    <mt-button icon="back" slot="left" @click="goback">返回</mt-button>
</mt-header>
  <section class="change_section" ref="change_section">
    <router-link class="change_income"  to="/charge/companyIncome" replace active-class="word" tag="div" v-show="conpanyShow"style="font-size: 0.4rem;">公司入款</router-link>
    <router-link to="/charge/shortPay" replace active-class="word" tag="div" v-show="shortShow" style="font-size: 0.4rem;">快捷支付</router-link>
  </section>
<router-view></router-view>
</div>
</template>
<script>
//	import Vue from 'vue'
//	import { MessageBox} from 'mint-ui';
//	Vue.component(MessageBox.name, MessageBox);
  export default{
      data(){
      return{
        conpanyShow:false,
        shortShow:false,
        type:''
      }
    },
    created:function () {
      let self=this;
      this.$axios({
        method:'get',
        url:'/inter/money/queryIncome'
      }).then(function (data) {
        //判断账号是否掉线
        if(data.data.msg!="OK"){
//        MessageBox.alert(data.data.msg,"").then(function () {
//          self.$router.push({name:'login'});
//          sessionStorage.clear();
//        })
 self.$dialog.alert({mes:'未登入',callback:function(){
								 sessionStorage.clear();
								  self.$router.replace({name:'login'});
							}})
        }
        //判断是否有第三方充值
        for(var i=0,a=0,b=0;i<data.data.data.length;i++){
          if(data.data.data[i].id=="0") {
            a += 1;
          }
          if(data.data.data[i].id=="2"){
           b+=1;
          }
        }
        if(a!=0){
          self.conpanyShow=true;
        }else {
          self.conpanyShow=false;
        }
        if(b!=0){
          self.shortShow=true;
        }else {
          self.shortShow=false;
        }
      }).catch(function () {
      });
    },
    mounted(){
    	this.$refs.change_section.ontouchmove = function(e){
				e.stopPropagation()
			}
    },
    methods:{
    	goback(){
    		sessionStorageSet('routeIndx', -1);
				this.$router.back();
			},
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
  .word{
    color: #edac0c;
    background: #2a2f48;
  }
  .change_section{
  	 position: fixed;
  	 z-index: 100;
    top: 1.125rem;
    width: 100%;
    height: 1.34rem;
    background: #2b2c30;
    text-align: center;
    line-height: 1.34rem;
  }
  .change_section>div{
    width: 50%;
    float: left;
  }
</style>
