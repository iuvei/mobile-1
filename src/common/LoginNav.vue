<template>
<div>
  <div id="LoginNav_app" >
    <div >
      <div id="LoginNav_nav" style="z-index: 1000;">
        <div class="LoginNav_nav-container">
          <div class="LoginNav_nav-left">
            <img @click="show"  src="../../static/images/ComHead/setting.png" alt="">
            <img style="position: absolute;left:0.7rem;width: 2.219rem;height: 0.89rem;margin-top:0.1rem" src="../../static/images/ComHead/M5II-logo.png" alt="">
          </div>
          <ul class="LoginNav_nav-right">
            <li class="LoginNav_nav-right-one"><img src="../../static/images/LoginNav/customer.png" alt="">{{data.account}}
              <div class="LoginNav_hidden-one">{{data.account}}</div>
            </li>
            <li class="LoginNav_nav-right-two"><img src="../../static/images/LoginNav/totalmoney.png" alt="">{{money}}元
            <div class="LoginNav_hidden-two">{{money}}元</div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</div>
</template>
<script>
  import  {bus}  from '../bus.js'
  export default{
    data(){
      return{
        data:sessionStorageGet("baseMember"),
        money:'',
        indicate:false
      }
    },
    methods:{
      com_display:function (event) {
        console.log(event);
        this.indicate=true;
      },
      Trunc:function () {
        this.money=this.data.accountBalance.toFixed(2)
      },
      show:function () {
        this.$emit('Show');
      },
    },
    created:function () {
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
      self.Trunc();
    },
    watch:{
      $route(to){

      }
    }

  }
</script>
<style scoped>
  #LoginNav_app {
    height: 100%;
  }
  #LoginNav_nav{
    position: fixed;
    top:0;
    z-index: 22;
    width: 100%;
    height: 1.125rem;
    background-image: linear-gradient(to bottom,#494c56,#1e2027 );
  }
  .LoginNav_nav-container{
    justify-content: space-between;
  }
  .LoginNav_nav-left>img:nth-child(1){
    float: left;
    width: 0.5rem;
    margin-top: 0.3rem;
    margin-left: 0.4rem;
    margin-right: 0.2rem;
    vertical-align: middle;
  }
  .LoginNav_nav-left>img:nth-child(2){
    float: left;
    width: 0.5rem;
    margin-left: 0.4rem;
    vertical-align: middle;
  }
  .LoginNav_nav-container,.LoginNav_nav-right{
    display: flex;
  }
  .LoginNav_nav-right{
    height: 1.125rem;
    align-items: center;
  }
  .LoginNav_nav-right>li{
    width: 2.3rem;
    overflow: hidden;
    line-height: 0.5rem;
    text-overflow:ellipsis;
    white-space: nowrap;
    margin-right: 0.2rem;
  }
  .LoginNav_nav-right>li>img{
    width: 0.375rem;
    float:left ;
    margin-right: 0.11rem;
    margin-top: 0.03rem;
  }
  .LoginNav_hidden-one,.LoginNav_hidden-two{
    height: 0.5rem;
    display: none;
    background: rgb(129, 130, 135);
    border: 1px solid rgb(204, 204, 204);
    border-radius: 2px;
    position: absolute;
    top:0;
    margin-top: 0.3rem;
    padding: 0.1rem;
  }
  .LoginNav_hidden-two{
    right: 0.1rem;
  }
  .LoginNav_nav-right-one:hover .LoginNav_hidden-one{
    display: block;
  }
  .LoginNav_nav-right-two:hover .LoginNav_hidden-two{
    display: block;
  }
</style>
