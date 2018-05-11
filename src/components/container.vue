<template>
<div >
  <article class="container_article"  style="z-index: 100;">
    <div class="container_article-top">
      <div>
        <ul class="marquee" >
          <li :class="speed" v-if="content!=''">
            <span class="container_text1">
              <span v-if="content[0]">{{content[0].content}}</span><span v-if="content[1]">{{content[1].content}}</span><span v-if="content[2]">{{content[2].content}}</span>
            </span>
            <span class="container_text2">
              <span v-if="content[0]">{{content[0].content}}</span><span v-if="content[1]">{{content[1].content}}</span><span v-if="content[2]">{{content[2].content}}</span>
            </span>
          </li>
        </ul>
      </div>
      <img  class="container_img_ii" :src="'../../static/images/print.png'" alt="">
    </div>
    <div class="container_div">
      <ul class="container_title">
        <li><span><img src="../../static/images/container/category.png" alt=""></span>购彩大厅</li>
        <li @click="skip('/charge')"><span><img src="../../static/images/container/charge.png" alt=""></span>{{text[0]}}</li>
        <li @click="skip('/withdraw')"><span><img src="../../static/images/container/drawing.png" alt=""></span>{{text[1]}}</li>
      </ul>
      <div class="container_main">
        <div class="container_type" v-for="(list,index2) in datasZ">
          <div   v-for="(item,index) in list">
            <div class="container_className" :class="{pattern:item.show}" @click="showDown(list,item,index)"   >
              <p>
                <img style="background: white;border-radius: 50%;flex-shrink: 0;" :src="'../../static/images/container/'+item.classId+'.png'" alt="">
                <span style="display: inline-block;width: 2rem;flex-shrink: 0;text-align: left">{{item.className}}</span>
                <i  v-show="item.kindList.length!=0">></i>
              </p>
            </div>
          </div>
          <div v-if="list[Index]">
            <ul class="container_kindId" v-show="list[Index].show">
              <li  @click="goBettingHall" class="container_detail" v-for="(childList,index) in list[Index].kindList"  :kindId="childList.kindId" :kindName="childList.kindName">{{childList.shortName}}<countDown :id="childList.kindId"  :I="i" :endTime="time[childList.kindId]" v-if="parseInt(time[childList.kindId])>=0" :kindName="childList.kindName" :kindId="childList.kindId"></countDown></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </article>
  <div class="sportPei_motable" v-show="hide">
    <div class="sportPei_text">
      <div class="hidebut" @click="hideMotable()">╳</div>
      <div class="sportPei_text_header">额度转换</div>
      <div class="sportPei_text_top">
        <div>
          <img src="../../static/images/zhuzhanghu.png" alt="">
          <p>主账户</p>
          <span>${{accountBalance}}</span>
        </div>
        <div>
          <img class="zhuan" src="../../static/images/zhuanfa.png" alt="">
        </div>
        <div>
          <img src="../../static/images/shaba.png" alt="">
          <p>沙巴</p>
          <span>${{sportMoney}}</span>
        </div>
      </div>
      <div class="sportPei_text_nav">
        <div><input type="text" v-model="moneyNum"> <button @click="moneyChange()">确认转账</button></div>
        <!--<div><input type="password" placeholder="请输入资金密码" v-model="moneyPassword"> </div>-->
      </div>
      <div class="sportPei_text_bot">
        <div>
          <button @click="pushInput('100')" >$100</button>
          <button @click="pushInput('500')">$500</button>
          <button @click="pushInput('1000')">$1000</button>
          <button @click="pushInput('5000')">$5000</button>
          <button @click="pushInput('10000')">$10000</button>
          <button @click="pushInput(accountBalance)">全部转入</button>
        </div>
        <div >
          <a  :href = URL_ target="_blank"><button>直接进入游戏</button></a>
        </div>
      </div>
    </div>
  </div>
</div>
</template>
<script>
  import  {bus}  from '../bus.js'
//	import Vue from 'vue'
//	import { MessageBox} from 'mint-ui';
//	Vue.component(MessageBox.name, MessageBox);
  import countDown from '../common/countDown.vue'
  	//ssc两面盘subGameId数组;
	var SscSpecialArr = [];
	//bjsc两面盘subGameId数组;
	var bjscSpecialArr = [];
	var ksSumValArr = ["400101", "400102", "400103", "400104", "400105", "400106", "400107", "400108", "400109", "400110", "400111", "400112", "400113", "400114", "400115", "400116"];
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
  export default {
    props:['status'],
    data() {
      return {
        URL_:'',
        sportMoney:'',
        accountBalance:'',
        moneyPassword:'',
        moneyNum:'',
        hide:false,
        newSport:{
          classId:'0',
          className:"热门体育",
          kindList:[]
        },
        datas: [],
        datasZ: [],
        i: 0,
        hidden: false,
        time: [],
        kindId:" m5ffc",
        Index:0,
        content:'',
        speed:'',
        word:'',
        modal:true,
        standGameList:{"1":{},"2":{},"3":{},"4":{},"5":{},"6":{}},
        text:[],
        //1分钟
        datas1:['m5ffc','m5k3','m511x5','txffc'],
        //3分钟
        datas3:['m53fc'],
        //5分钟
        datas5:['m55fc','bjpk10','mlaft'],
        //10分钟
        datas10:['tjssc','xjssc','gd11x5','sd11x5','ahk3','gxk3','jsk3','jx11x5','sh11x5'],
        //一天
        datasDay:['fc3d','pl3'],
        //半个小时
        datashour:['shssl']
      }
    },
    created(){

    },
    mounted(){
      this.goSport();
    	bus.$on('login',()=>{

    	} )
    	if(sessionStorageGet("standGameList")==null){
    		sessionStorageSet("standGameList",{"1":{},"2":{},"3":{},"4":{},"5":{},"6":{}})
    	}
    	if(sessionStorageGet("specialList")==null){
	//ks和值subGameId数组
    	 var obj = [
    	 	SscSpecialArr,
    	 bjscSpecialArr,
    	 	ksSumValArr
    	 ]
    	 var listName = ["SscSpecial","bjscSpecial","ksSumVal"];
    	 obj.forEach((item,index)=>{
    	 	this.$axios({
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
    	 }
//  	console.log(sessionStorageGet("standGameListALL").length)

    	if(sessionStorageGet("specialArr")==null){
    	sessionStorageSet("specialArr",{SscSpecialArr:SscSpecialArr,bjscSpecialArr:bjscSpecialArr,ksSumValArr:ksSumValArr})
    	}
    	},
    methods: {
      showMotable(){
        let that = this;
        that.toPath();
        that.type = JSON.parse(sessionStorage.getItem('baseMember')).type;
        if( that.type != '0' ){
          that.$dialog.alert({mes:'会员登录畅玩更多精彩游戏!'});
          return false
        }else {
          that.hide = true;
          that.userDetail();
          this.$axios({
            method:'post',
            url:'/inter/user/balance'
          }).then(function (data) {
            console.log(data);
            if(data.data.code == '1'){
              that.sportMoney = 0;
//              that.$dialog.alert({mes:data.data.msg});
            }else {
              that.sportMoney = data.data.data
            }
          }).catch(function (err) {
            console.log(err)
          })
        }
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
    	getObjLg(obj){
    var count = 0;
    for(var i in obj){
       count ++;
     }
     return count;
    	},
      skip:function (to) {
        if(sessionStorageGet('key')==1&&sessionStorageGet("baseMember")['type']!='1'){
          this.$router.push({name:'dataBind',query:{id:sessionStorageGet('accountList')}});
        }else{
        	if(this.text[1]=='app下载'&&to!="/charge"){
        		window.open('https://app.app-lottery.com/m52_app/')
        	}else{
        		this.$router.push(to);
        	}

        }
      },
      //点击隐藏展示小彩种,和时间
      showDown: function (thing,obj,a) {
      	  let that = this;
      	  if(obj.classId == '0'){
      	    that.showMotable();
          }
      	  let obj2;
      		var kindList = obj.kindList;
      		if(sessionStorageGet("standGameList")==null){
      			sessionStorageSet("standGameList",{"1":{},"2":{},"3":{},"4":{},"5":{},"6":{}});
      			 obj2 = sessionStorageGet("standGameList")[obj.classId]
      		}else{
      			 obj2 = sessionStorageGet("standGameList")[obj.classId]
      		}

      		if(this.getObjLg(obj2)==0){
      			kindList.forEach((item,index)=>{
      			that.$axios.get('/inter/ticket/gamePlay/'+obj.classId+'/'+item.kindId).then((data)=> {
    				let classId = obj.classId;
    				let kindId = item.kindId;
    				that.standGameList = sessionStorageGet("standGameList");
				 that.standGameList[classId][kindId] = data.data.data.standGameList;
				sessionStorageSet("standGameList",that.standGameList)
			}).catch(function(error) {
				console.log(error)
			})
      		})
      		}
        //点击当前一横条的，其他的全部隐藏
        if(obj.show==false){
          for(var i=0;i<this.datasZ.length;i++){
            if(this.datasZ[i][0]){
              this.datasZ[i][0].show=false;
            }
            if(this.datasZ[i][1]){
              this.datasZ[i][1].show=false;
            }
          }
        }
        //确保相邻两个不同时显示
        if(a==1){
          if(thing[0]){
            thing[0].show=false;
          }
        }else if(a==0){
          if(thing[1]){
            thing[1].show=false;
          }
        }
        this.i = obj.classId;
        obj.show=!obj.show;
        this.Index=a;
        this.$axios.get("/inter/ticket/timeLeft/" + obj.classId).then(function (data) {
//        console.log(data.data.data)
          var hours=new Date().getHours();
          var second=new Date().getSeconds();
          //判断重庆时时彩
          if((hours>22&&second>0)||(hours<2&&second>0)){
            that.datas5.push('cqssc')
          }else{
            that.datas10.push('cqssc')
          }
          for(var key in data.data.data){
            if(data.data.data[key]<0){
              if(that.datas1.indexOf(key)!=-1){
                data.data.data[key]+=60;
              }else if (that.datas3.indexOf(key)!=-1){
                data.data.data[key]+=180;
              }else if (that.datas5.indexOf(key)!=-1){
                data.data.data[key]+=300;
              }else if (that.datas10.indexOf(key)!=-1){
                data.data.data[key]+=600;
              }else if(that.datasDay.indexOf(key)!=-1){
                data.data.data[key]+=86400;
              }else if(that.datashour.indexOf(key)!=-1){
                data.data.data[key]+=1800
              }
            }
          }
          that.time = data.data.data;
        }).catch(function () {
        })
//      console.log(obj.kindList)
//      obj.kindList.forEach((item,index)=>{
//      	console.log(item.kindId)
//      })
//  	console.log(sessionStorageGet('kinds'))
//  this.$axios.get('/inter/ticket/gamePlay/'+item.classId+'/'+item.kindId).then((data)=> {
//  				let keyName_1 = item.classId
//				 this.standGameListALL[keyName_1] = data.data.data.standGameList
//				sessionStorageSet("standGameListALL",this.standGameListALL)
//			}).catch(function(error) {
//				console.log(error)
//			})


//      console.log(obj)
      },
//      跳转到相应的投注页面
      goBettingHall(e){
      	sessionStorageSet("list", []);
      	var kindName=e.target.getAttribute("kindName");
        var kindId=e.target.getAttribute("kindId");
      	this.$router.push({name:'bettingHall',query:{"kindId":kindId,"kindName":kindName,classId:this.i}})
      },

      getPeriodNoAll(){
      	let list = {};
      	var periodNoAll = sessionStorageGet('kinds');
      	periodNoAll.forEach((item,index)=>{
      		list[item.classId] ={};
      		item.kindList.forEach((item2,index2)=>{
      			list[item.classId][item2.kindId] = item2.periodNoAll
      		})
      	});
      	sessionStorageSet('periodNoAll',list)
      },
      //循环大彩种列表，并把每两个彩种放在一个数组里
      loop:function () {
        let that = this;
        for (var j = 0; j < that.datas.length; j++) {
          if (that.datas[j].kindList.length != 0) {
            that.datas[j]["show"] = false;
          }
        }

        for (var k = 0, a = [], i = that.datas.length; k < i; k += 2) {
          a.push(that.datas.slice(k, k + 2));
        }
        that.datasZ = a;
      },

      //跳转到热门体育
      goSport(){
//        let toSp = document.getElementsByClassName('container_className')[0];
//        toSp.style.color = '#eb1014';
        this.$axios({
          method:'post',
          url:'/inter/user/register',

        }).then(function (data) {
          console.log(data)
        });
      },
      toPath() {
        let that = this;
        this.$axios({
          method:'post',
          url:'/inter/user/open',
          data:{
            mobile:"yes"
          }
        }).then(function (data) {
          that.URL_ = data.data.data;
//          console.log(that.URL_)
        }).catch(function (err) {
          console.log(err)
        });
      },
      //关闭额度转换弹出框
      hideMotable(){
        let that = this;
        that.hide = false;
        that.moneyNum = "";
        that.moneyPassword = "";
      },
      //额度转换button点击传值到input
      pushInput(num){
        let that = this;
        if( num > that.accountBalance){
          that.moneyNum = that.accountBalance;
          that.$dialog.alert({mes:"可转金额最大值为钱余额"});
          return false
        }else {
          that.moneyNum = num
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
        this.$axios({
          method:'post',
          url: '/inter/user/amountOut',
          data:{
            amount:this.moneyNum+"",
//            amountPassword:hex_md5(this.moneyPassword),
            platform:"gm_ibc"
          }
        }).then(function (data) {
          that.$dialog.alert({mes:data.data.msg});
          that.moneyNum = "";
//          that.moneyPassword = "";
          that.showMotable();
        }).catch(function (err) {
          console.log(err)
        });
      },
    },
    components: {
      countDown
    },
    created: function () {
      let that = this;
      //跑马灯速度为慢
      that.speed='slow';
     //判断登入显示主页信息
      bus.$on('loginfinish',function () {
        that.text=['快速充值','便携提款'];
      })
      if(!sessionStorageGet('baseMember')){
        that.text=['线路检测','app下载'];
      }else{
        that.text=['快速充值','便携提款'];
      }
      //如果本地存储在，则无需请求；
      if(sessionStorageGet('kinds')&&sessionStorageGet('content')){
        that.datas=sessionStorageGet('kinds');
        that.content=sessionStorageGet('content');
        //调用彩种循环
        that.loop();
      }else{
        this.$axios.get('/inter/ticket/kind').then(function (data) {
          if (data.data.msg == "OK") {
            that.datas = data.data.data;
            that.datas.unshift(that.newSport);
            sessionStorageSet('kinds',data.data.data);
            that.getPeriodNoAll();
            that.loop();
          }
        }).catch(function (error) {

        });
        this.$axios({
          method:'get',
          url:'/notice/queryMemberNoticeList',
          params:{notice_type:2,type:2}
        }).then(function (data) {
          sessionStorageSet('content',data.data.data);
          that.content=data.data.data;
        }).catch(function (error) {
          console.log(error);
        })
      }
      this.$axios({
        method:'get',
        url:'/inter/user/memberIfBind'
      }).then(function (data) {
        sessionStorageSet('accountList',data.data.data.companyBankAccountList);
        sessionStorageSet('key',data.data.code);
      }).catch(function (error) {
        console.log(error);
      });
    },

  }
</script>
<style scoped>
  body html{
    height: 100%;
    width: 100%;
  }
  .marquee {
    width: 100%;
    font-size: 0;
    overflow: hidden;
  }
  .marquee>li{
    display: inline-block;
    white-space: nowrap;
    margin: 0;
    font-size: 0;
  }
  .marquee span{
    display: inline-block;
    white-space: nowrap;
    padding-right: 10rem;
    font-size: 0.43rem;
    color: white;
  }
  .container_text1{
    padding-right: 0!important;
  }
  .container_text2{
    padding-right: 0!important;
  }
.slow{
  animation: marquee 25s linear infinite;
}
  @-webkit-keyframes marquee {
    from { -webkit-transform: translateX(0); }
    to { -webkit-transform: translateX(-50%);}
  }
  .pattern{
    background: #2a2f48!important;
  }
  .container_article{
    width:100%;
    background: #15141a;
    padding-bottom: 0.5rem;
    position: absolute;
    top: 1.125rem;
    bottom:1.3rem;
    overflow: auto;
  }
  .container_img_ii{
    width: 100%;
    height: 3.44rem;
  }
  .container_article-top>p{
    width: 100%;
    line-height: 1.09rem;
    background:#15141a;
    color: white;
  }
  .container_div,.container_title{
    background-color: #15141a;
  }
  .container_title{
    height: 1.58rem;
    display: flex;
    color: white;
  }
  .container_title>li:nth-child(1){
    color:#ebbd07;
  }
  .container_title img{
    width: 0.44rem;
    height: 0.44rem;
    vertical-align: middle;
    display: block;
    margin-right: 0.14rem;
  }
  .container_title li{
    flex: 1;
    display: flex;
    align-self: center;
    align-items: center;
    justify-content: center;
  }
  .container_main{
    /*flex-wrap: wrap ;*/
    height: 100%;
    background-color: #15141a;
  }
  .container_type{
    width: 9.64rem;
    margin: auto;
    overflow: hidden;
    overflow-y: auto;
  }
  .container_type p{
  display: flex;
  width: 3.625rem;
  height: 1.28rem;
  align-items: center;
}
  .container_className{
    border-radius:6px;
  }
  .container_type>div>div{
    float: left;
    width: 4.72rem;
    height:1.953rem ;
    background: #2b2c30;
    margin: 0.05rem;
    color: white;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .container_type img{
    width: 1.28rem;
    height: 1.28rem;
    margin-right: 0.35rem;
  }
  .container_kindId{
    float: left;
    width: 100%;
    color: white;
  }
  .container_detail{
    width: 4.72rem;
    height: 1.1rem;
    float: left;
    overflow: hidden;
    background: #2a2f48;
    margin: 0.05rem;
    border-radius: 0.2rem;
    line-height: 1.1rem;
    text-align: center;
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s
  }
  .fade-enter, .fade-leave-to {
    opacity: 0
  }



  .sportPei_motable{
    height: 100%;
    width: 100%;
    position: fixed;
    top: 0;left: 0;
    background: rgba(70,70,70,0.8);
    z-index: 1000;
    color: #8b8b8b;
  }
  .sportPei_text{
    overflow: hidden;
    width: 9rem;
    /*height: 9rem;*/
    background-color: white;
    opacity: 1 !important;
    position: relative;
    top:50%;
    left: 50%;
    margin-left: -4.5rem;
    margin-top: -5rem;
    padding: 0.375rem 0.3rem;
    box-sizing: border-box;
  }
  .sportPei_text_header{
    height: 0.7rem;
    font-size: 0.45rem;
    text-align: center;
    line-height: 0.7rem;
    border-bottom: 1px solid #8b8b8b;
    color: #ff6700;
    font-weight: 700;
  }
  .sportPei_text_nav{
    overflow:hidden;

  }
  .sportPei_text_nav div{
    height: 1.1rem;
    box-sizing: border-box;
    padding: 0.15rem 1rem;
  }
  .sportPei_text_nav input{
    float: left;
    width: 60%;
    height: 0.8rem;
    border: 1px solid gainsboro;
    border-radius: 0.1rem;
    padding-left: 0.25rem;
    box-sizing: border-box;
  }
  .sportPei_text_nav button{
    float: right;
    background-color: #2e8cf0;
    margin: 0 0.1rem;
    color: #ffffff;
    padding: 0.15rem 0.3rem;
    border-radius: 0.15rem;
  }
  .hidebut{
    position: absolute;
    top: 0.3rem;
    right: 0.4rem;
    height: 0.4rem;
    width: 0.4rem;
    font-size: 0.5rem;
  }

  .sportPei_text_top{
    /*height: 3.2rem;*/
    overflow: hidden;
    padding: 0.2rem;
    box-sizing: border-box;
    font-weight: 700;
  }
  .sportPei_text_top div{
    width: 33%;
    float: left;
    text-align: center;
  }
  .sportPei_text_top div span{
    color: #db1700;
    font-size: 0.5rem;
  }
  .sportPei_text_top div:nth-child(2){
   padding-top: 0.8rem;
  }
  .sportPei_text_bot{
    overflow: hidden;
    padding: 0.15rem ;
  }
  .sportPei_text_bot div:nth-child(1){
    float: left;
    height: 2rem;
    width: 70%;
  }
  .sportPei_text_bot div:nth-child(1) button{
    background-color: #2e8cf0;
    color: #ffffff;
    width: 30%;
    border-radius: 0.15rem;
    height: 0.9rem;
    text-align: center;
    line-height: 0.75rem;
    margin-bottom: 0.1rem;
  }
  .sportPei_text_bot div:nth-child(2){
    float: left;
    height: 2rem;
    width: 30%;
  }
  .sportPei_text_bot div:nth-child(2) button{
    background-color: #2e8cf0;
    color: #ffffff;
    border-radius: 0.15rem;
    height: 0.9rem;
    padding: 0 0.1rem;
    text-align: center;
    line-height: 0.9rem;
    margin-bottom: 0.1rem;
  }

</style>
