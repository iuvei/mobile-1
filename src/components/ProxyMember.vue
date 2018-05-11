<template>
  <div class="_ProxyMenber_pm_tit">
  	<mt-header title="代理会员" style="background-image: linear-gradient(to bottom,#494c56,#1e2027 );position: fixed;top: 0;left:0 ; z-index:1;width: 100%;height: 1.125rem;color: #fff;">
    <mt-button icon="back" slot="left" @click="goback" style="color: #fff">返回</mt-button>
  <mt-button  slot="right"  @click="toNewMember" style="color: #fff">新增</mt-button>
</mt-header>
    <!--<div class="agent_top"></div>-->
    <div class="_ProxyMenber_agent_user">
      <div class="_ProxyMenber_agent_user_top">
        <div class="_ProxyMenber_agent_user_inp">
          指定账号:
          <input type="text" placeholder="不指定时请留空！" v-model="proxyUsername">
        </div>
        <!--<div class="agent_user_inp_search"></div>-->
      </div>
      <div class="_ProxyMenber_agent_top_b"></div>
      <!--*******-->
      <div class="_ProxyMenber_ziliao">
        <div class="_ProxyMenber_ziliao_a">
          资料排序：
          <select name="cars" v-model="zlpx">
            <!--<option value="1">账号排序</option>-->
            <option value="2">余额排序</option>
            <option value="3">建立时间排序</option>
            <option value="4">登陆时间排序</option>
          </select>
        </div>
        <div class="_ProxyMenber_ziliao_b">
          <input type="radio" name="cc" value="1"  checked="checked" class="_ProxyMenber_ipt">⇧
          <!--<label for=""></label>-->
          <input type="radio" name="cc" value="2"  class="_ProxyMenber_ipt">⇩
        </div>
      </div>
      <!--<div class="agent_top_b"></div>-->
      <button class="_ProxyMenber_search" @click="pm_cx" style="font-size: 0.45rem;color: white;">查询</button>

    </div>
    <!--******************************-->
    <!--<input type="button" class="search" value="查询" @click="pm_cx" style="font-size: 0.45rem;color: white;">-->
    <!--<div class="zdcx">指定查询：a111111下级</div>-->
    <div style="box-sizing: border-box;width: 100%;padding-bottom: 1.125rem">
      <ul class="_ProxyMenber_zdcx_list" v-for="(item,index) in data">
        <li>会员账号：<span>{{item.account}}</span></li>
        <li>账号名称：<span>{{item.name}}</span></li>
        <li>钱包余额：<span>{{item.accountBalance}}</span></li>
        <li>团队人数：<span>{{item.childCount}}</span></li>
        <li>下级总额：<span>{{item.childAmount}}</span></li>
        <li>注册时间：<span>{{item.createTime.substring(0,19)}}</span></li>
        <li>最后登录时间：<span>{{item.lastLoginTime}}</span></li>
        <router-link :to="{name:'accountDetails',query:{act:item.account,lastTime:item.lastLoginTime,createTime:item.createTime}}"
                     tag="li" class="_ProxyMenber_details" v-show="AccountDetails">详情</router-link>
      </ul>
    </div>
    <Pagination v-on:index="changeindex" :countAll="countAll" :pages="pages"  style="position: fixed;bottom:0;width: 100%;"></Pagination>
  </div>
</template>
<script>
  import Pagination from "../common/pagination.vue"
 export default {
    data(){
      return{
        zlpx:"2",
        data:"",
        page:1,
        pages:0,
        countAll:1,
        proxyUsername:'',
        AccountDetails:true
      }
    },
   components:{
     Pagination
   },
   methods:{
   	toNewMember(){
   		this.$router.push({
					name: "newMember",
				})
   	},
   	goback(){
   		sessionStorageSet('routeIndx', -1);
				this.$router.back()
    },
     changeindex(page) {
//       console.log(page);
       this.page = page
     },
      pm_cx(){
        let that = this;
        let memberAccount;
        if(this.proxyUsername){
          this.memberAccount = this.proxyUsername
        }else{
          this.memberAccount = sessionStorageGet("baseMember").account;
        }
        //判断升序还是降序
        let sort;
        let tt = document.getElementsByClassName("_ProxyMenber_ipt");
        for(let i=0;i<tt.length;i++){
//          console.log(tt);
          if(tt[i].checked == true){
            that.sort = tt[i].value
          }
        }
        this.$axios({
          method:'post',
          url:'/inter/user/queryAgentMemberInfo',
          data:{
            memberAccount: this.memberAccount, // 账号，默认传当前登录账号
            sort: this.sort, // 1-升序，2-降序
            type: this.zlpx , // 1-账号排序,2-余额排序，3-建立时间排序，4-最后登录时间排序
          }
        }).then(function (data) {
//          console.log(data);
          that.data = data.data.data;
          //判断如果最后登陆时间为空时
          for(let i=0;i<that.data.length;i++){
            if(that.data[i].lastLoginTime == null ){
              that.data[i].lastLoginTime = "尚未登入记录"
            }else {
              that.data[i].lastLoginTime = that.data[i].lastLoginTime.substring(0,19)
            }
          }
          that.countAll = that.data.length;
          that.pages =Math.ceil(that.countAll/10);
//          console.log(that.countAll);
//          console.log(that.data)
        }).catch(function (error) {
          console.log(error)
        })
      }
   },
   watch:{
      //分页
      page(){
       let that = this;
       this.$axios({
         method:'post',
         url:'/inter/user/queryAgentMemberInfo',
         data:{
           memberAccount: this.memberAccount , // 账号，默认传当前登录账号
           sort: this.sort,// 1-升序，2-降序
           type: this.zlpx , // 1-账号排序,2-余额排序，3-建立时间排序，4-最后登录时间排序
         }
       }).then(function (data) {
//         console.log(data);
         that.data = data.data.data;
         that.countAll = that.data.length;
         that.pages =Math.ceil(that.countAll/10);
//         console.log(that.countAll);
//         console.log(that.data)
       }).catch(function (error) {
         console.log(error)
       })
     },
     sort(){
        this.sort.checked = true;
     }
   },
   //监听路由to当前页面的路由，from进入到本页面的路由，next去下一个页面的路由
   beforeRouteEnter(to, from, next){
//      console.log(to);
//      console.log(from);
     if(from.name=='newMember'||from.name=='accountDetails'){
       to.meta.isBack = true;
     }else{
       to.meta.isBack = false;
     }
     next();
   },
   activated(){
     if(!this.$route.meta.isBack){
//       this.pm_cx();
       this.data = [];
       this.proxyUsername = '';
     }
     this.$route.meta.isBack=false;
   }
 }
</script>
<style scoped>
  *{
    /*margin: 0;
    padding: 0;*/
    list-style: none;
    color: black;
  }
  html{
    font-size: 16px;
  }
  nav>div{
    position: absolute;
    left: 0.4rem;
    /*font-size: 0.3rem;*/
    width: 1.43rem;
    height: 1.125rem;
    line-height: 1.125rem;
  }
  nav div img{
    margin-right: 0.15rem;
    vertical-align: middle;
  }
  nav{
    color: white;
    display: flex;
    align-items: center;
    justify-content: space-around;
    position: relative;
    width: 100%;
    height: 1.125rem;
    background-image: linear-gradient(to bottom,#393c44,#1e2026);
  }
  nav p:first-child{
    margin-left: -0.5rem;
  }
  /*.agent_top{*/
    /*width: 100%;*/
    /*height: 0.26rem;*/
    /*padding-top: 1.125rem;*/
    /*background-color: #f1f1f0;*/
  /*}*/
  ._ProxyMenber_agent_user{
    width: 100%;
    /*height: 2.74rem;*/
    text-indent: 0.5rem;

    padding: 1.125rem 0 0 0;
  }
  ._ProxyMenber_agent_user_top{
    width: 100%;
    height: 1.23rem;
  }
  ._ProxyMenber_agent_user_inp{
    line-height: 1.23rem;
    color: #1e2026;
    font-size: 0.4rem;
  }
  ._ProxyMenber_agent_user_inp input{
    width: 6.5rem;
    height: 1rem;
    padding-left: 0.25rem;
    border: 0.0125rem solid #b3a6a6;
    color: #b3a6a6;
    border-radius: 0.1rem;
    box-sizing: border-box;
  }
  ._ProxyMenber_agent_user_inp_search{
    width:0.7rem;
    height: 0.7rem;
    background: url("../../static/images/fdj.png") no-repeat center;
    position: relative;
    left: 8.4rem;
    top:-0.93rem;
  }
  ._ProxyMenber_agent_top_b{
    width: 100%;
    height: 0.26rem;
    background-color: #f1f1f0;
  }
  /***********/
  ._ProxyMenber_ziliao{
    width: 100%;
    height: 1.23rem;
  }
  ._ProxyMenber_ziliao_a{
    width: 65%;
    height: 1.23rem;
    float: left;
    line-height: 1.23rem;
    font-size: 0.4rem;
  }
  ._ProxyMenber_ziliao_a select{
    width: 3.8rem;
    height: 1rem;
  }
  ._ProxyMenber_ziliao_b{
    width: 35% ;
    float: left;
    height: 1rem;
    line-height: 1rem;
    padding-top: 0.2rem;
  }
  ._ProxyMenber_ziliao_b input{
    width: 0.5rem;
    height: 0.5rem;
    /*font-size: 0.5rem;*/
    margin-left: 0.4rem;
  }
  /*****************************************/
  ._ProxyMenber_search{
    width: 100%;
    height: 1.25rem;
    background-color: #edac0c;
    outline: none;
    margin-top: 0.2rem;
    border: 0;
    box-sizing: border-box;
  }
  ._ProxyMenber_zdcx{
    width: 100%;
    height: 1.25rem;
    line-height: 1.25rem;
    text-indent: 0.5rem;
  }
  /************************/
  ._ProxyMenber_zdcx_list{
    width: 100%;
    padding: 0 0.3rem;
    height:7rem ;
    background-color: white;
    margin: auto;
    border-top: 0.125rem solid #f1f1f0;
    color: #edac0c;
    position: relative;
    box-sizing: border-box;
  }
  ._ProxyMenber_pm_tit{
    background-color: #F1F1F0;
  }
  ._ProxyMenber_zdcx_list>._ProxyMenber_details{
    position: absolute !important;
    height: 1rem;
    width: 1.5rem;
    bottom: 1rem;
    right: 0.2rem;
    text-align: center;
    border: 0.0125rem solid #1e2026;
    border-radius: 0.1rem;
    background-color:#edac0c ;
    color: white;
  }
  ._ProxyMenber_zdcx_list li{
    height: 1rem;
    line-height: 1rem;
  }
  ._ProxyMenber_zdcx_list li span{
    color: black;
  }
  ._ProxyMenber_new_add{
    position: fixed;
    top: 0.3rem;
    right:0.4rem;
    z-index:9999;
    background-color: #2b2d34;
    color: white;
    font-size: 0.43rem;
  }
</style>
