<template>
  <div id="sportPei">
    <mt-header title="额度转换" style="background-image: linear-gradient(to bottom,#494c56,#1e2027 );position: fixed;top: 0;left:0 ;z-index:22;width: 100%;height: 1.125rem;">
      <mt-button icon="back" slot="left" @click="goback">返回</mt-button>
    </mt-header>
    <div style="margin-top: 1.125rem;color: #000000">
      <div class="sportPei_informationList" >
        <p><span style="color:#efb845;display: inline-block;width: 2.65rem;text-align:right ">我的厅室&nbsp;:&nbsp;</span><span>体育</span></p>
        <p><span style="color:#efb845;display: inline-block;width: 2.65rem;text-align:right ;">余&nbsp;额&nbsp;&nbsp;:&nbsp;</span><span>{{sportMoney}}</span></p>
        <!--<p><span style="color:#efb845;display: inline-block;width: 2.65rem;text-align:right ;">操&nbsp;作&nbsp;&nbsp;:&nbsp;</span><button >额度转换</button></p>-->
        <p><span style="color:#efb845;display: inline-block;width: 2.65rem;text-align:right ;"></span><button @click="showMotable()" >额度转换</button></p>
      </div>
    </div>
    <div class="sportPei_motable" v-show="hide">
      <div class="sportPei_text">
      <div class="sportPei_text_header">额度转换</div>
        <p>中心钱包 <span>{{accountBalance}}</span>元，沙巴钱包 <span>{{sportMoney}}</span> 元</p>
        <div class="sportPei_text_nav">
            <span>转入</span>
            <select v-model="addMoney" >
              <option value="0" >中心钱包</option>
              <option value="1">沙巴钱包</option>
            </select>
        </div>
        <div class="sportPei_text_nav">
            <span>转出</span>
            <select v-model="minusMoney" >
              <option value="0">沙巴钱包</option>
              <option value="1">中心钱包</option>
            </select>
        </div>
        <div class="sportPei_text_nav">
          <span>金额</span>
          <input type="text" v-model="moneyNum"  @input="mon">
        </div>
        <!--<div class="sportPei_text_nav">-->
          <!--<span>资金密码</span>-->
          <!--<input type="password" v-model="moneyPassword" >-->
        <!--</div>-->
        <div class="sportPei_text_nav">
           <button @click="moneyChange()">立即转换</button> <button @click="hideMotable()" class="hideBut">取消</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data(){
      return{
        url_:'',
        hide:false,
        moneyPassword:'',
        moneyNum:'',
        sportMoney:'0',
        accountBalance:'',
        addMoney:'0',
        minusMoney:'0',
//        refMoneyNum:'',
//        refMoneyPassword:''
      }
    },
    created(){
      this.balance();
      this.moneyPassword = "";
    },
    methods:{
      //沙巴余额请求
      balance(){
        let that = this;
        this.$axios({
          method:'post',
          url:'/inter/user/balance'
        }).then(function (data) {
          console.log(data);
          that.sportMoney = data.data.data
        }).catch(function (err) {
          console.log(err)
        })
      },
      //m5余额请求
      userDetail(){
        let that = this;
        this.$axios({
          method:'get',
          url:'/inter/user/userDetail'
        }).then(function (data) {
          let baseMember=sessionStorageGet('baseMember');
          if(baseMember){
            baseMember.accountBalance=data.data.data.accountBalance;
            sessionStorageSet('baseMember',baseMember);
            self.money=data.data.data.accountBalance;
          }
          that.accountBalance = JSON.parse(sessionStorage.getItem('baseMember')).accountBalance;
        }).catch(function (err) {
          console.log(err)
        })
      },
      mon(e){
        let reg=/^[1-9]\d*$/;
        if(!reg.test(e.target.value)){
          this.moneyNum="";
        }
      },
      //资金转换
      moneyChange(){
        let that = this;
        if(that.moneyNum == ''){
          that.$dialog.alert({mes:'转换金额不能为空!'});
          return false
        }
//        else if(that.moneyPassword == ''){
//          that.$dialog.alert({mes:'资金密码不能为空!'});
//          return false
//        }
        if(that.addMoney == '1'){
          that.url_ = '/inter/user/amountOut';
        }else {
          that.url_ = '/inter/user/withdrawal';
        }
        this.$axios({
          method:'post',
          url: that.url_,
          data:{
            amount:this.moneyNum+"",
//            amountPassword:hex_md5(this.moneyPassword),
            platform:"gm_ibc"
          }
        }).then(function (data) {
          that.$dialog.alert({mes:data.data.msg});
          that.balance();
          that.userDetail();
          that.moneyNum = "";
//          that.moneyPassword = "";
        }).catch(function (err) {
          console.log(err)
        });
      },

      showMotable(){
        let that = this;
        that.hide = true;
        that.accountBalance = JSON.parse(sessionStorage.getItem('baseMember')).accountBalance;
        that.balance();
      },

      hideMotable(){
        let that = this;
        that.hide = false;
        that.moneyNum = "";
        that.moneyPassword = "";
      },

      goback(){
        sessionStorageSet('routeIndx', -1);
        this.$router.back()
      }
    },
    watch:{
      addMoney(){
        let that = this;
        if(that.addMoney === '0'){
          that.minusMoney ='0'
        }else if(that.addMoney === '1'){
          that.minusMoney ='1'
        }
      },
      minusMoney() {
        let that = this;
        if (that.minusMoney === '0') {
          that.addMoney = '0'
        } else if (that.minusMoney === '1') {
          that.addMoney = '1'
        }
      }
    }
  }
</script>
<style scoped>
  #sportPei{
    background: #f1f1f0;
  }
  .sportPei_informationList {
    box-sizing: border-box;
    width: 100%;
    height: 2.968rem;
    font-size: 0.45rem;
    background: #fff;
    margin-bottom: 0.125rem;
    padding-top: 0.513rem;
  }
  .sportPei_informationList p {
    line-height: 0.6rem;
  }
  .sportPei_informationList p button {
    display: inline-block;
    padding: 0.15rem 0.25rem;
    background: #edac0c;
    color: #ffffff;
    border-radius: 0.1rem;
    margin-left: 4.5rem;
  }

  .sportPei_motable{
    height: 100%;
    width: 100%;
    position: fixed;
    top: 0;left: 0;
    background: rgba(70,70,70,0.8);
    z-index: 10;
    color: #8b8b8b;
  }
  .sportPei_text{
    width: 9rem;
    /*height: 9rem;*/
    background-color: white;
    opacity: 1 !important;
    position: absolute;
    top:50%;
    left: 50%;
    margin-left: -4.5rem;
    margin-top: -4.5rem;
    padding: 0.375rem 0.3rem;
    box-sizing: border-box;
  }
  .sportPei_text_header{
    height: 0.7rem;
    font-size: 0.45rem;
    text-align: center;
    line-height: 0.7rem;
    border-bottom: 1px solid #8b8b8b;
  }
  .sportPei_text p{
    /*font-size: 0.21rem;*/
    text-align: center;
    margin: 0.2rem 0;
  }
  .sportPei_text p span{
    color: #C81623;
  }
  .sportPei_text_nav{
    height: 1.2rem;
    padding: 0.2rem 0;
    /*text-align: center;*/
    box-sizing: border-box;
  }
  .sportPei_text_nav span{
    float: left;
    width: 30%;
    text-align: right;
    line-height: 0.8rem;
    margin-right: 0.5rem;
    font-size: 0.4rem;
  }
  .sportPei_text_nav select{
    float: left;
    width: 50%;
    height: 0.8rem;
    border-bottom: 1px solid gainsboro;
    border-radius: 0.1rem;
    padding-left: 0.25rem;
    background: #ffffff;
    box-sizing: border-box;
  }
  .sportPei_text_nav input{
    float: left;
    width: 50%;
    height: 0.8rem;
    border: 1px solid gainsboro;
    border-radius: 0.1rem;
    padding-left: 0.25rem;
    box-sizing: border-box;
  }
  .sportPei_text_nav button{
    float: right;
    background-color: #edac0c;
    margin: 0 0.1rem;
    color: #ffffff;
    padding: 0.15rem 0.3rem;
    border-radius: 0.15rem;
  }
  .hideBut{
    background: #8b8b8b !important;
  }
</style>
