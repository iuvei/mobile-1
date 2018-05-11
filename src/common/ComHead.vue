<template>
  <div>
    <div id="ComHead_app">
      <div>
        <div id="ComHead_nav">
          <div class="ComHead_nav-container">
            <div class="ComHead_nav-left">
              <img @click="show"  src="../../static/images/ComHead/setting.png" alt="">
              <img src="../../static/images/ComHead/M5II-logo.png" alt="">
            </div>
            <ul class="ComHead_nav-right">
              <router-link to="/login" tag="li"><a href="#">登陆</a></router-link>
              <li @click="display"><a href="#">试玩</a></li>
              <router-link to="/register" tag="li"><a href="#">注册</a></router-link>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <mt-popup
      v-model="popupVisible"
      popup-transition="popup-fade"
    >
      <div class="ComHead_main">
        <div class="ComHead_vertify">
          <div>
            <p>
              <input type="text" maxlength="4" placeholder="请输入验证码" v-model="validate">
            </p>
            <div @click="changeValidateCode"  id="validate" :style="validateCode"></div>
          </div>
          <button @click="trial">试玩</button>
        </div>
      </div>
    </mt-popup>
  </div>
</template>
<script>
  import  {bus}  from '../bus.js'
	import global_ from '../Global.vue';
//	import Vue from 'vue'
	import { Popup} from 'mint-ui';
//	Vue.component(MessageBox.name, MessageBox);

  export default{
    data(){
      return{
        slider:false,
        popupVisible:false,
        validateCode:"background-image: url(\'"+global_.BASE_URL+"/inter/user/validateCode?12\');background-size: cover;background-position:center;",
        validate:''
      }
    },
    methods:{
      show:function () {
        this.$emit('Show');
      },
      display:function () {
        this.popupVisible=true;
      },
      changeValidateCode:function () {
        this.validateCode="background-size: cover;background: url("+global_.BASE_URL+"/inter/user/validateCode?"+new Date().getTime()+") center center no-repeat / cover;"
      },
      trial:function () {
        this.popupVisible=false;
        var self=this;
        this.$axios({
          method: 'post',
          url: '/inter/user/visitorLogin',
          data: {'validationCode': this.validate,'loginFrom':'3'},
        }).then(function (data) {
          if(data.data.code == 0){
            self.$emit('loginDisplay');
            bus.$emit('loginfinish');//向container发送消息，判断登入是否成功
            sessionStorageSet("baseMember",data.data.data);
            sessionStorage.setItem("code", 0);
            self.websocketf()
            self.$router.replace({name:'container'});
     if(sessionStorageGet("specialArr")==null){
     	var SscSpecialArr = [];
	//bjsc两面盘subGameId数组;
	var bjscSpecialArr = [];
	for(var i = 1; i < 28; i++) {
					if(i < 10) {
						SscSpecialArr.push("30140" + i)
					} else {
						SscSpecialArr.push("3014" + i)
					}
				}
	for(var i = 3; i < 24; i++) {
					if(i < 10) {
						bjscSpecialArr.push("60050" + i)
					} else {
						bjscSpecialArr.push("6005" + i)
					}
				}


	//ks和值subGameId数组
	var ksSumValArr = ["400101", "400102", "400103", "400104", "400105", "400106", "400107", "400108", "400109", "400110", "400111", "400112", "400113", "400114", "400115", "400116"];
     }else{
     var ksSumValArr = sessionStorageGet("specialArr").ksSumValArr
     var SscSpecialArr = sessionStorageGet("specialArr").SscSpecialArr
     var bjscSpecialArr = sessionStorageGet("specialArr").bjscSpecialArr
     }
	
    	 var obj = [
    	 	SscSpecialArr,
    	 bjscSpecialArr,
    	 	ksSumValArr
    	 ]
    	 var listName = ["SscSpecial","bjscSpecial","ksSumVal"];
    	 obj.forEach((item,index)=>{
    	 	self.$axios({
					method: 'post',
					url: '/inter/ticket/subGames',
					data: {
						gameIds: item
					}
				    }).then((data)=> {
				    	 var itemList = {
				    		}
				    	 itemList[listName[index]] = data.data.data
				    	if(sessionStorageGet("specialList")==null){
				    		sessionStorageSet("specialList",itemList)
				    	}else{
				    		 let list = {};
				    		 list = sessionStorageGet("specialList")
				    		 list[listName[index]] = data.data.data
				    		 sessionStorageSet("specialList",list)
				    	}
//					console.log(sessionStorageGet("specialList"))
				    }).catch(function(error) {
					console.log(error)
				    })
    	 })
    	var kindList = [{kindId:"fc3d",classId:"1"},{kindId:"",classId:"2"},{kindId:"m5ffc",classId:"3"},{kindId:"ahk3",classId:"4"},{kindId:"gd11x5",classId:"5"},{kindId:"bjpk10",classId:"6"}]
    	kindList.forEach((item,index)=>{
    		if(index==1){
    			this.standGameListALL["2"]=null
    		}else{
    			this.$axios.get('/inter/ticket/gamePlay/'+item.classId+'/'+item.kindId).then((data)=> {
    				let keyName_1 = item.classId
				 this.standGameListALL[keyName_1] = data.data.data.standGameList
				sessionStorageSet("standGameListALL",this.standGameListALL)
			}).catch(function(error) {
				console.log(error)
			})
    		}


    	})


    


          }else {
          	 self.$dialog.alert({mes:data.data.msg,callback:function(){
								 self.changeValidateCode();
              self.validate='';
							}})
//          MessageBox.alert("试玩失败，请重新尝试").then(function () {
//           
//          });
          }
        }).catch(function () {

        })
      }
    }



  }
</script>
<style scoped>
  #ComHead_app {
    height: 100%;
   
  }
  #ComHead_nav{
    width: 100%;
    height: 1.125rem;
    position: fixed;
    top:0;
    z-index:220;
    background-image: linear-gradient(to bottom,#494c56,#1e2027 );
  }
  .ComHead_nav-container{
    position: relative;
    justify-content: space-between;
  }
  .ComHead_nav-left>img{
    float: left;
    width: 0.5rem;
    margin-top: 0.4rem;
    margin-right: 0.14rem;
    margin-left: 0.4rem;
  }
  .ComHead_nav-left>img:nth-child(2){
    position: absolute;
    left:0.7rem;
    width: 2.219rem;
    height: 0.89rem;
    margin-top:0.1rem
  }
  .ComHead_nav-container,.ComHead_nav-right{
    display: flex;
  }
  .ComHead_nav-right{
    height: 1.125rem;
    align-items: center;
  }
  .ComHead_nav-right>li{
    width: 1.06rem;
    height: 0.53rem;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 0.1875rem;
    border-radius: 4px;
  }
  .ComHead_nav-right li:nth-child(1){
    background: #edac0c;
  }
  .ComHead_nav-right li:nth-child(2){
    background: #5facfa;
  }
  .ComHead_nav-right li:nth-child(3){
    background: #42b035;
  }
  .ComHead_vertify p{
    width: 2.8rem;
    height: 0.80rem;
    float: left;
  }
  .ComHead_vertify input{
    width: 3rem;
    height: 0.8rem;
    font-size: 0.4rem;
    text-indent: 7px;
    border: 1px solid #d5d5d5;
  }
  .ComHead_main{
    width: 6.22rem;
    height: 3.1rem;
    border-radius: 6px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .ComHead_vertify{
    width: 5.47rem;
    height: 2.1rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .ComHead_vertify>div{
    display: flex;
    height: 1rem;
    justify-content: space-between;
    align-items: center;
  }
  #validate{
    width: 2.14rem;
    height: 0.80rem;
    float: right;
  }
  .ComHead_vertify button{
    width: 100%;
    height: 0.97rem;
    color: white;
    background: #ecac0c;
    display: inline-block;
  }
</style>
