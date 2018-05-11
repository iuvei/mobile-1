<template>
  <div id="login">
    <div class="login"></div>
    <div class="number user_input">
      <div class="user_name user_tb">
        <img src="../../static/images/Login/account.png" alt="">
      </div>
      <input type="text" placeholder="请输入会员账号" ref="class_Name"  class="_register_input">
      <div class="prompt ">账号必须包含数字和字母，长度在6-16之间!</div>
    </div>
    <div class="name user_input">
      <div class="user_name user_tb">
        <img src="../../static/images/Login/zhanghao.png" alt="" >
      </div>
      <input type="text" placeholder="请输入昵称" ref="name"  class="_register_input" >
    </div>
    <div class="password user_input">
      <div class="pass_word">
        <img src="../../static/images/Login/password.png" alt="">
      </div>
      <input type="password" placeholder="请输入密码" ref="pass_word"   class="_register_input">
      <div class="prompt">密码为6-20位，至少包含数字和字母</div>
    </div>
    <div class="password user_input">
      <div class="pass_word">
        <img src="../../static/images/Login/password.png" alt="">
      </div>
      <input type="password" placeholder="确认密码" ref="do_pass_word"   class="_register_input">
      <div class="prompt">两次密码必须相同!</div>
    </div>
    <div class="but">
      <div class="login_btn" @click="register(number,name,password)">注册</div>
      <div class="probation_btn" @click="cancel" >清空</div>
    </div>
    <div class="register">
      <div class="register_div">
        <div>有账号!</div>
        <router-link to="/login" tag="div" style="color:#FFD344 ">去登陆</router-link>
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
//	import { MessageBox} from 'mint-ui';
//	 Vue.component(MessageBox.name, MessageBox);
  export default {
    name: 'Login',
    data () {
      return {
        class_Name:'',
        pass_word:'',
        do_pass_word:"",
      }
    },
    methods:{
      //会员账号正则
      className(){
        let that = this;
        let reg=/^[a-zA-Z][a-zA-Z0-9_]{5,16}$/;
        if(!reg.test(that.$refs.class_Name.value)){
          return false
        }else{
          return true
        }
      },
      //会员密码正则
      password(){
        let that = this;
        let pass=/(?![^a-zA-Z0-9]+$)(?![^a-zA-Z/D]+$)(?![^0-9/D]+$).{6,20}$/;
        if(!pass.test(that.$refs.pass_word.value)){
          return false
        }else{
          return true
        }
      },
      name(){
        let name = this.$refs.name.value;
        if(name != ""){
          return true
        }else {
          return false
        }
      },
      register(){
        let dd = window.location.href;
        let urlId = dd.substring(dd.indexOf("register")+9,dd.length);
        if(urlId==""||urlId==null||urlId==undefined){
          urlId="ff80808162232b920162327de2270133";
        }
        let that = this;
        if(!this.className()){
        	 that.$dialog.alert({mes:"请输入正确格式的账号"});
          return false
        }else if(!this.password()){
        	 that.$dialog.alert({mes:"请输入正确格式的密码"});
          return false
        }else if(!this.name()) {
        	 that.$dialog.alert({mes:"请输入昵称"});
          return false
        }else if(that.$refs.do_pass_word.value ===""){
          that.$dialog.alert({mes:"请再次确认密码"});
          return false;
        }else  if(that.$refs.do_pass_word.value != that.$refs.pass_word.value){
          that.$dialog.alert({mes:"两次输入的密码必须相同"});
          return false
        } else{
          let md5 = hex_md5(that.$refs.pass_word.value);
          this.$axios({
            method:"post",
            url:'/inter/user/registerMember',
            data:{
              memberAccount: that.$refs.class_Name.value, // 会员账号
              memberName: that.$refs.name.value, // 昵称
              password: md5, // 密码
              promoteId: urlId ,// 链接id
              way:'3'
            }
          }).then(function (data) {
            if(data.data.code == ""){
            	 that.$dialog.alert({mes:"注册成功"});
              that.$router.replace({name:'login',query:{username:that.$refs.class_Name.value,password:that.$refs.pass_word.value}})
            }else{
            	 that.$dialog.alert({mes:data.data.msg});
              that.cancel()
            }
          }).catch(function (error) {
            console.log(error)
          })
        }
      },
      //取消新增会员
      cancel(){
        for(let i=0;i<document.getElementsByClassName("_register_input").length;i++){
          if(document.getElementsByClassName("_register_input")[i].type=="text" || document.getElementsByClassName("_register_input")[i].type=="password"){
            document.getElementsByClassName("_register_input")[i].value="";
          }
        }
      }
    }
  }
</script>
<style scoped>
  #login{
    width: 100%;
    height: 17.75rem;
    background-color: grey;
    background: url("/static/images/Login/login-bg.jpg") no-repeat ;
    background-size: cover;
  }
  .login{
   width: 6.01rem;
    height: 2rem;
    margin:auto;
    margin-top: 2.65rem;
    background: url("/static/images/Login/M5II-logo.png") no-repeat center;
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
    border: 0.03rem solid #808080;
    border-radius: 1rem;
    text-align: center;
    line-height: 1.375rem;
  }
  .prompt{
    color: #808080;
    padding-left: 0.6rem;
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
  .name{
    margin-top: 0.8rem !important;
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
  .register_div>div{
    float: left;
    text-align: center;
    margin-left: 0.3rem;
    line-height: 1rem;
    font-size: 0.35rem
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
</style>
