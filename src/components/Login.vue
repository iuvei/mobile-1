<style scoped>
  #login{
    width: 100%;
    height: 17.75rem;
    /*background-color: grey;*/
    background: url("/static/images/Login/login-bg.jpg") no-repeat ;
    background-size: cover;
  }
  .login{
    width: 6.01rem;
    height: 2rem;
    margin:auto;
    margin-top: 2.65rem;
    background: url("/static/images/ComHead/M5II-logo.png") no-repeat center;
    background-size: 100% 100%;
  }
  .user_input{
    width: 8.75rem;
    height: 1.375rem;
    box-sizing: border-box;
    margin: 0.5rem auto;
    border: 0.03rem solid grey;
    border-radius: 1rem;
  }
  .user_input>input{
    float: left;
    border: 0;
    width: 3.3rem;
    height: 1.375rem;
    background:  transparent;
    color: white;
  }
  .user_input>div{
    margin: 0 0.6rem 0 0;
    float: left;
    background-size: 100% 100%;
    background-repeat: no-repeat;
  }
  .user_name img{
    width: 0.6rem;
    height: 0.6rem;
    margin: 0.3rem 0 0 0.8rem;
  }
  .user_tb img{
    width: 0.6rem;
    height: 0.6rem;
    display: block;
    margin: 0.3rem 0 0 0.8rem;
    /*background-size: cover;*/
  }
  .pass_word img{
    width: 0.6rem;
    height: 0.6rem;
    display: block;
    margin: 0.3rem 0 0 0.8rem;
  }
  .but{
    width: 8.75rem;
    height: 1.66rem;
    margin: 0.703rem auto;
    border-radius: 1rem;
  }
  .but>div{
    width: 3.91rem;
    height: 1.375rem;
    border: 0.03rem solid grey;
    border-radius: 1rem;
    text-align: center;
    line-height: 1.375rem;
  }
  #validate{
    width: 2.5rem;
    height: 0.625rem;
    line-height: 0.625;
    float: right;
    margin-right: 0.5rem;
    margin-top: 0.31rem;
  }
  .login_btn{
    background-color:#FFD344;
    color: white;
    float: left;
  }
  .probation_btn{
    color: white;
    float:right;
  }
  .register{
    width: 4.125rem;
    height: 1rem;
    float: right;
    overflow: hidden;
    margin-top: -0.4rem;
  }
  .register_div{
    width: 4.125rem;
    float: right;
    height: 1rem;
    color: white;
    border-bottom: 0.03rem solid grey;
  }
  .service{
  	display: inline-block;
    /*float: right;*/
    width: 1rem;
    height: 1rem;
    background-color: white;
    border-radius: 100% 100%;
    box-shadow: 0 0 1px #000 inset;
    margin-left: 0.2rem;
  }
  .service>a{
    float: left;
    text-decoration: none;
    width: 100%;
    height: 100%;
    display: inline-block;
    /*background: url("../../static/images/service1.png") no-repeat 100% 100%;*/
  }
  .service>a>img{
   display: block;
   width: 90%;
   height: 90%;
   margin: 5% auto;
  }
  .register_div>div{
    float: left;
    text-align: center;
    line-height: 1rem;
  }
  .foot_t{
    width: 100%;
    height: 1rem;
    text-align: center;
    color: white;
    position: absolute;
    top: 16.5rem;
    font-size: 0.3rem;
  }
  .vertify{
    width: 2.8rem;
    height: 1rem;
  }
  .validate img{
    width: 0.6rem;
    height: 0.6rem;
    background: url("../../static/images/Login/yanzhengma.png") no-repeat center;
    background-size: cover;
    margin: 0.3rem 0 0 0.8rem;
  }
</style>

<template>
  <div id="login">
    <div class="login"></div>
    <div class="username user_input">
      <div class="user_name user_tb">
        <img src="../../static/images/Login/account.png" alt="">
      </div>
      <input v-model="username" type="text"  autofocus placeholder="手机/邮箱/用户名">
    </div>
    <div class="password user_input user_ab">
      <div class="pass_word">
        <img src="../../static/images/Login/password.png" alt="">
      </div>
      <input v-model="password" type="password"  placeholder="请输入密码">
    </div>
    <div class=" user_input">
      <div class="validate">
        <img src="../../static/images/Login/yanzhengma.png" alt="">
      </div>
      <input class="vertify" v-model="validate" maxlength="4" type="text" placeholder="验证码">
      <div @click="changeValidateCode"  id="validate" :style="validateCode"></div>
    </div>
    <div class="check" style="margin: 0.3rem auto;width: 8.45rem;font-size: 14px;">
    	<span>记住密码</span><input type="checkbox" :checked="flag" style="width:16px;height: 16px;margin-left: 0.1rem;" @click="flag=!flag" />
    </div>
    <div class="but">
      <div  class="login_btn" @click.stop="Login">登录</div>
      <div  class="probation_btn" @click="trial">试玩</div>
    </div>
    <div class="register">
      <div class="register_div">
        <div>没有账号？</div>
        <router-link to="/register" tag="div" style="color:#FFD344 ">立即注册</router-link>
      </div>
    </div>
    <div class="foot_t">
      <div style="font-size: 0.3rem;">M5II彩票娱乐系统2.0 &copy;版权所有</div>
      <div style="font-size: 0.3rem;">友情请示:理性购彩,热心公益,未满18周岁禁止购彩及兑奖</div>
    </div>
  </div>
</template>
<script>
//	import Vue from 'vue'
	import global_ from '../Global.vue';
//	import { MessageBox } from 'mint-ui';
//	Vue.component(MessageBox.name, MessageBox);
  export default {
    data() {
      return {
        datas: '',
        username: '',
        password: '',
        validate: '',
        validateCode:"background: url(\'"+global_.BASE_URL+"/inter/user/validateCode?12\') 100% 100%;background-size: cover",
        link:'',
        flag:false
      }
    },
    created(){
//  	console.log(localStorageGet('username'))
    	if(localStorageGet('username')){
    		this.username=localStorageGet('username');
    	}
    	if(localStorageGet('password')){
    		this.password=localStorageGet('password');
    		this.flag = true
    	}
//      this.Service();
      if(this.$route.query.password){
        this.username=this.$route.query.username;
        this.password=this.$route.query.password;
      }
      sessionStorage.clear();


    },
    activated:function () {
      //每次进入到登入页面都刷新验证码
      this.changeValidateCode();
      this.username='';
      this.password='';
      this.validate='';
    },
    methods: {
    	go(){
    		window.open(this.link)
    	},
      //刷新验证码
      changeValidateCode:function () {
        this.validateCode="background-size: cover;background-image: url("+global_.BASE_URL+"/inter/user/validateCode?"+new Date().getTime()+")"
      },
      //试玩跳转
      trial:  _.debounce(function () {
        var self=this;
        this.$axios({
          method: 'post',
          url: '/inter/user/visitorLogin',
          data: {'validationCode': this.validate,'loginFrom':'3'},
        }).then(function (data) {
          if(data.data.code == 0){
            sessionStorageSet("baseMember",data.data.data);
            sessionStorage.setItem("code", 0);
            self.$router.push({name:'container'});
            self.websocketf();
          }else {
          	 self.$dialog.alert({mes:data.data.msg,callback:function(){
								  self.changeValidateCode();
              self.validate='';
							}})
//          MessageBox.alert(data.data.msg).then(function () {
//            self.changeValidateCode();
//            self.validate='';
//          });
          }
        }).catch(function () {

        })
      },300),
      //登入跳转
      Login: _.debounce(function () {
        let self = this;
      var md5 = hex_md5(this.password);
        if(localStorageGet('password')&&this.username===localStorageGet('username')){
        	 var md5=this.password
        }
       this.$axios({
          method: 'post',
          url: '/inter/user/userLogin',
          data: {'username': this.username, 'password': md5, 'validationCode': this.validate,'loginFrom':'3'},
        }).then(function (data) {
          if (data.data.code == 0) {
            //把登入信息保存到session中
            sessionStorageSet("baseMember",data.data.data);
            localStorageSet("username",self.username);
            if(self.flag){
            	localStorageSet('password',md5);
            }else{
            	localStorageGet('password')==null?"":localStorageRemove("password");
            }
            self.$router.push({name:'container'});
            sessionStorage.setItem("code", 0);
            self.websocketf();
          }else{
          	 self.$dialog.alert({mes:data.data.msg,callback:function(){
								  self.changeValidateCode();
              self.validate='';
							}})
//          MessageBox.alert(data.data.msg).then(function () {
//            self.changeValidateCode();
//            self.validate='';
//          })
          }
        }).catch(function (error) {
          console.log(error)
        })
      },300),
      //在线客服
//      Service(){
//        var that=this;
//        this.$axios({
//          method: 'get',
//          url:'/collect/helpService',
//        }).then(function (data) {
////          console.log(data)
//          that.link=data.data.data
//        }).catch(function (error) {
//          console.log(error)
//        })
//      }
    },
    //监听路由跳转到哪里去用to
    beforeRouteLeave (to, from, next) {
      var that=this;
      if( to.path == "/home" ){
        next( );
          that.$axios({
            method:"get",
            url:'notice/queryMemberNoticeList?notice_type=2&type=1'
          }).then(function (data) {
            for(let i=0;i<data.data.data.length;i++){
              alert(data.data.data[i].content);
            }
          })
        }else {
        next( );
      }
    }
  }
</script>
