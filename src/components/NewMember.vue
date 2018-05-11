<template>
  <div id="_NewMember_all" >
    <mt-header title="新增会员" style="background-image: linear-gradient(to bottom,#494c56,#1e2027 );position: fixed;top: 0;left:0 ;width: 100%;height: 1.125rem;">
      <mt-button icon="back" slot="left" @click="goback">返回</mt-button>
    </mt-header>
    <div class="_NewMember_card">
      <i></i>
      <span>会员身份：</span>
      <input type="radio"  class="_NewMember_pt" name="sex" value="0" checked="checked">会员
      <input type="radio"  class="_NewMember_pt" name="sex" value="1">代理
    </div>
    <div class="_NewMember_text">
      <i></i>
      <span>会员账号：</span>
      <input type="text" @blur="className" ref="class_Name" class="_NewMember_input">
      <div class="_NewMember_prompt _NewMember_classTile">账号必须包含数字和字母，长度在6-16之间!</div>
    </div>
    <div class="_NewMember_text">
      <i></i>
      <span>会员密码：</span>
      <input type="password" @blur="" ref="pass_word" class="_NewMember_input" autocomplete="off">
      <div class="_NewMember_prompt">密码为6-20位，至少包含数字和字母</div>
    </div>
    <div class="_NewMember_text">
      <i></i>
      <span>会员名称：</span>
      <input type="text" ref="name" class="_NewMember_input">
    </div>
    <button class="btn"@click="newMember">新增</button>
    <button class="_NewMember_cancel btn" @click="cancel" >取消</button>
  </div>
</template>
<script>
  //	import Vue from 'vue'
  //	import { MessageBox} from 'mint-ui';
  //	Vue.component(MessageBox.name, MessageBox);
  export default{
    data(){
      return{
        class_Name:'',
        pass_word:'',
//          name:''
      }
    },
    activated(){
      this.cancel()
    },
    methods:{
      goback(){
        sessionStorageSet('routeIndx', -1);
//    		console.log(sessionStorageGet('routeIndx'));
        this.$router.back()
      },
      //会员账号正则
      className(){
        let that = this;
        let reg=/^[A-Za-z0-9]{6,16}$/;
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
      //新增会员
      newMember(){
        let that = this;
        //判断是新增会员还是代理
        let memberType;
        let tt = document.getElementsByClassName("_NewMember_pt");
        for(let i=0;i<tt.length;i++){
//          console.log(tt);
          if(tt[i].checked == true){
            that.memberType = tt[i].value
          }
        }
        if(!this.className()){
          this.$dialog.alert({mes:'请输入正确格式的会员账号'});
//        MessageBox.alert("请输入正确格式的会员账号");
          return false
        }else if(!this.password()){
          this.$dialog.alert({mes:'请输入正确格式的账号密码'});
//        MessageBox.alert("请输入正确格式的账号密码");
          return false
        }else if(!this.name()){
          this.$dialog.alert({mes:'请输入用户名'});
//        MessageBox.alert("请输入用户名");
          return false
        }else{
          let md5 = hex_md5(that.$refs.pass_word.value);
          this.$axios({
            method:'post',
            url:'/inter/user/agentRegisterMember',
            data:{
              addMemberAccount: that.$refs.class_Name.value, //新增账号
              memberType: this.memberType, //会员类型 0-会员 1-代理
              name: that.$refs.name.value,//名称
              password: md5,//密码
              way:'3'
            }
          }).then(function (data) {
            that.$dialog.alert({mes:data.data.msg});
//            MessageBox.alert(data.data.msg);
            that.cancel();
          }).catch(function (error) {
            console.log(error)
          })
        }
      },
      //取消新增会员
      cancel(){
        for(let i=0;i<document.getElementsByClassName("_NewMember_input").length;i++){
          if(document.getElementsByClassName("_NewMember_input")[i].type=="text" || document.getElementsByClassName("_NewMember_input")[i].type=="password"){
            document.getElementsByClassName("_NewMember_input")[i].value="";
          }
        }
      }
    },
    watch:{

    }
  }
</script>
<style scoped>
  *{
    /*margin: 0;
    padding: 0;*/
    font-size: 0.4rem;
  }
  #_NewMember_all{
    width: 100%;
    position: absolute;
    background-color: #ffffff;
    color: black;
    padding-top: 1.125rem;
  }
  ._NewMember_head{
    position: fixed;
    top:0;
    left: 50%;
    margin-left:-1.5rem ;
    width: 3rem;
    height: 1.125rem;
    color: white;
    line-height: 1.125rem;
    z-index: 9999;
  }
  #_NewMember_all>div{
    height: 1.5rem;
    width: 100%;
    padding: 0 0.4rem;
    box-sizing: border-box;
  }
  #_NewMember_all>._NewMember_card{
    line-height: 1.5rem;
  }
  ._NewMember_card>i{
    margin-top: 0.6rem;
  }
  i{
    float: left;
    height: 0.2rem;
    width: 0.2rem;
    margin: 0.3rem 0.2rem;
    background: url("../../static/images/img/icon/xinghao.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }
  ._NewMember_text>input{
    width: 70%;
    height: 0.9rem;
    border: 1px solid gainsboro;
    border-radius: 0.1rem;
    padding-left: 0.25rem;
    box-sizing: border-box;
  }
  .btn{
    display: block;
    width: 100%;
    height: 1.25rem;
    color: white;
    background-color: #edac0c;
  }
  ._NewMember_cancel{
    margin-top: 0.2rem;
    background-color: #dedede;
  }
  ._NewMember_prompt{
    width: 100%;
    float: left;
    padding-left: 30%;
    box-sizing: border-box;
    color: #cecece;
    font-size: 0.3rem;
  }


</style>
