<template>
  <div>
    <article class="person_article_ar">
      <section v-show="data.account">
        <ul>
          <li><img  src="/static/images/picture.png" alt=""></li>
          <li>{{data.account}}</li>
          <li>会员类型：{{data.hierarchy==0?type[data.type]:'代理'}}</li>
          <li>我的钱包：</li>
          <li>{{money}}元</li>
        </ul>
      </section>
      <ul>
        <router-link to="/charge" tag="li" :class="{disable:isActive}"><span><img src="/static/images/money.png" alt=""></span>充值</router-link>
        <li></li>
        <router-link to="/withdraw" tag="li" :class="{disable:isActive}"><span><img src="/static/images/cash.png" alt=""></span>提现</router-link>
      </ul>
      <ul class="person_ul_oo">
        <router-link to="/enterjilu"><li v-show="show"><span><img src="/static/images/note.png" alt="" ></span>登入记录</li></router-link>
        <router-link to="/security"><li v-show="show"><span><img src="/static/images/safe.png" alt=""></span>安全中心</li></router-link>
        <router-link to="/tuiguanglink"><li v-show="show2"><span><img src="/static/images/lianjie.png" alt=""></span><i>推广链接</i></li></router-link>
        <router-link to="/administration"><li v-show="show"><span><img src="/static/images/credit.png" alt=""></span>银行卡</li></router-link>
        <router-link to="/LotteryReport" tag="li" v-show="show"><span><img src="/static/images/table.png" alt=""></span>彩票报表</router-link>
        <router-link to="/Change" tag="li" v-show="show"><span><img src="/static/images/lower.png" alt=""></span>转点下级</router-link>
        <router-link to="/CashflowRecord" tag="li" v-show="show"><span><img src="/static/images/jinliu.png"  alt=""></span>金流记录</router-link>
        <router-link to="/ProxyMember" tag="li" v-show="show2"><span ><img  src="/static/images/huiyuan.png" alt=""></span><i>代理会员</i></router-link>
        <router-link to="/sportPei" tag="li" v-show="show2"><span ><img  src="/static/images/money-1.png" alt=""></span><i>额度转换</i></router-link>
      </ul>
    </article>
    <router-view></router-view>
    <mt-popup v-model="popupVisible" popup-transition="popup-fade" :closeOnClickModal="false">
      <div class="person_yk_mo">
        <h3>系统讯息</h3>
        <p>抱歉！您的 <span>资料不全,</span>请补全资料,是否绑定资料</p>
        <div class="person_sure_bind">
          <button @click="bind('yes')">是</button>
          <button @click="bind('no')">否</button>
        </div>
      </div>
    </mt-popup>
  </div>
</template>

<script>
//	import Vue from 'vue'
  import  {bus}  from '../bus.js'
//import { MessageBox} from 'mint-ui';
//Vue.component(MessageBox.name, MessageBox);
  export default{
    data(){
      return{
        money:'',
        data:sessionStorageGet("baseMember"),
        type:["会员","游客","测试会员"],
        popupVisible:false,
        code:'',
        show:true,
        isActive:false,
        show2:false
      }
    },
    methods:{
      Trunc:function () {
        if(this.data.accountBalance!=null){
          this.money=this.data.accountBalance.toFixed(2);
        }
      },
      bind:function (a) {
        if(a=='yes'){
          this.popupVisible=false;
          this.$router.replace({name:'dataBind',query:{id:sessionStorageGet('accountList')}})
        }else{
          this.popupVisible=false;
          this.$router.replace({name:'container'});
        }
      }
    },
    created() {
      if(sessionStorageGet('key')==1&&sessionStorageGet("baseMember")['type']!='1'){
        this.popupVisible=true;
      }else {
        this.popupVisible=false;
      }
      var self=this;
      bus.$on('newMessage',function (msg) {
        let datalist=JSON.parse(msg.data);
       if(datalist.messageType!=3){
         self.$axios({
           method:'get',
           url:'/inter/user/userDetail'
         }).then(function (data) {
           let baseMember=sessionStorageGet('baseMember');
           if(baseMember){
             baseMember.accountBalance=data.data.data.accountBalance;
             sessionStorageSet('baseMember',baseMember);
             self.money=data.data.data.accountBalance;
           }
         }).catch(function () {

         })
       }
      });
      if(sessionStorageGet("baseMember")['type']=='1'){
        this.show=false;this.isActive=true;
      }else if(sessionStorageGet("baseMember")['type']=='2'){
        this.isActive=true;
      }else if(sessionStorageGet("baseMember")['hierarchy']!='0'){
        this.show2=true;
      }
      this.Trunc()
    },
  }
</script>
<style scoped>
  .person_article_ar{
    width:100%;
    background:#f1f1f0;
    position: absolute;
    top: 1.125rem;
    bottom:1.34rem;
    overflow: hidden;
  }
  .person_ul_oo{
    width: 100%;
    height: 6rem;
  }
  .person_article_ar img{
    display: block;
    width: 0.5rem;
  }
  .person_article_ar section{
    height: 4.28rem;
    background-image: linear-gradient(to bottom,#272a31,#4a4d56 );
    display: flex;
    justify-content: center;
  }
  .person_article_ar section li{
    text-align: center;
  }
  .person_article_ar section img{
    width:1.56rem;
    height: 1.56rem;
    border-radius: 50%;
    margin: auto;
  }
  section>ul li:nth-child(4){
    margin-top: 0.25rem;
  }
  section>ul li:nth-child(5){
    color: #edac0c;
  }
  .person_article_ar ul:nth-child(2){
    width: 100%;
    height: 1.19rem;
    background: #1d1f25;
    display: flex;
  }
  .person_article_ar ul:nth-child(2) li{
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .person_article_ar ul:nth-child(2) li:nth-child(2){
    width: 1px;
    height: 1.19rem;
    background: white;
  }
  .person_article_ar ul:nth-child(2) li:nth-child(odd){
    width: 50%;
  }
  .person_article_ar ul:nth-child(2) img{
    width: 0.53rem;
    margin-right: 0.18rem;
  }
  .person_article_ar ul:first-child{
    width: 100%;
  }
  .person_article_ar ul:nth-child(3){
    background: #f1f1f0;
  }
  .person_article_ar ul:nth-child(3) img{
    width: 0.53rem;
    margin-bottom: 0.18rem;
  }
  .person_article_ar ul:nth-child(3) li{
    width: 25%;
    height: 2.66rem;
    color: black;
    background: white;
    float: left;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 0.18rem;
  }
  .person_yk_mo{
    width: 8.125rem;
    background-color: gainsboro;
    margin: auto;
  }
  .person_yk_mo h3{
    color: #edac0c;
    line-height: 1.525rem;
    text-align: center
  }
  .person_yk_mo p{
    color: black;
    margin-bottom: 0.59rem;
    padding-left: 0.34rem;
  }
  .person_sure_bind>button{
    width: 50%;
    height: 1.225rem;
    border: 0;
    outline: none;
    color: white;
  }
  span{
    color: red;
  }
  .person_sure_bind button:nth-child(1){
    background-color: #edac0c;
    float: left;
  }
  .person_sure_bind button:nth-child(2){
    background-color: #bababa;
    border-left: solid 0.03rem white;
  }
  .disable{
    background: #c5c5c5 ;
  }
</style>
