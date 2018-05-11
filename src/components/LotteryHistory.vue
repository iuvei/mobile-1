<template>
  <div style="background-color: #2b2c30;">
  	<mt-header title="开奖历史" style="background-image: linear-gradient(to bottom,#494c56,#1e2027 );position: fixed;top: 0;left:0 ;width: 100%;height: 1.125rem;z-index: 1">
    <mt-button icon="back" slot="left" @click="goback" style="z-index: 1">返回</mt-button>
</mt-header>
    <div id="_LotteryHistory_nav">
      <p class="_LotteryHistory_p2">{{this.$route.query.lName}}</p>
      <span  tag="p" class="_LotteryHistory_p2" @click="goBettingHall" style="font-size: 0.43rem;">前往投注 > </span>
    </div>
    <div class="_LotteryHistory_ll_aaaa" >
      <div class="_LotteryHistory_kj_list" v-for="(item,index) in winList">
        <div class="_LotteryHistory_kj_container">
          <div class="_LotteryHistory_kj_container_title" >
            <div>第 <span>{{item.awarPeriod}}</span>期 <label>{{item.awardTime.substring(0.19)}}</label></div>
          </div>
          <div class="_LotteryHistory_kj_container_haoma" v-bind:class="{ active: isActive }" >
            <div v-for="item in lhList[0][index]">{{item}}</div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
  export default {
    data(){
      return{
        winList:[],
        lhList:[],
        kid:'',
        classId:'',
        cId:'',
        isActive:false
      }
    },
    created(){
//      console.log(this.$route.query.kid);
//      console.log(this.$route.query.cId);
      let lh = this;
      this.$axios.get('/inter/ticket/gamePlay/'+this.$route.query.cId+'/'+this.$route.query.kid).then((data)=> {
    				let classId = lh.$route.query.cId;
    				let kindId = lh.$route.query.kid
    				lh.standGameList = sessionStorageGet("standGameList")
				 lh.standGameList[classId][kindId] = data.data.data.standGameList
				sessionStorageSet("standGameList",lh.standGameList)
			}).catch(function(error) {
				console.log(error)
			})
      this.$axios({
        method:"get",
        url:"/inter/ticket/winsDragon/"+(this.$route.query.kid+"")
      }).then(function (data) {
//        console.log(data);
        lh.winList = data.data.data.winList;
//        console.log(lh.winList);
        for(let i=0,all=[];i<lh.winList.length;i++){
//          console.log(lh.winList[i].awardNum);
          if( lh.winList[i].awardNum==null && lh.$route.query.cId == 6){
            lh.isActive = true;
            all.push(['?','?','?','?','?','?','?','?','?','?'])
          }else if(lh.winList[i].awardNum==null && (lh.$route.query.cId == 4 || lh.$route.query.cId == 1)){
            lh.isActive = false;
            all.push(['?','?','?'])
          }else if(lh.winList[i].awardNum==null){
            lh.isActive = false;
            all.push(['?','?','?','?','?'])
          }else{
            lh.isActive = false;
            all.push((lh.winList[i].awardNum).split(","));
          }
          lh.lhList.push(all);
        }
//        console.log(lh.lhList)
      }).catch(function (error) {
        console.log(error)
      })
    },
    methods:{
    	goback(){
    		sessionStorageSet('routeIndx', -1);
				this.$router.back()
			},
			goBettingHall(){

				this.$router.push({name:'bettingHall',query:{"kindId":this.$route.query.kid,classId:this.$route.query.cId}})
			}
    }
  }
</script>
<style scoped>
  /**{*/
    /*margin: 0;*/
    /*padding: 0;*/
  /*}*/
  /*html{*/
    /*!*font-size: 16px;*!*/
  /*}*/
  #_LotteryHistory_nav{
    width: 100%;
    height: 1.125rem;
    background-image: linear-gradient(to bottom,#494c56,#1e2027 );
    display: flex;
    align-items: center;
    justify-content: space-around;
    position: fixed;
    top: 1.125rem;
    left: 0;
    z-index: 1;
  }
  #_LotteryHistory_nav>._LotteryHistory_p1{
    margin-left: -0.8rem;
  }
  p{
    color: white;
  }
  img{
    width: 0.5rem;
  }
  ._LotteryHistory_p2{
    margin-right: -0.8rem;
  }
  /******** ********* ********** ************** ***********/
  ._LotteryHistory_kj_list{
    width: 100%;
    /*height: 2.4rem;*/
    overflow: hidden;
    background-color: #3b3d42;
    border-bottom: solid 1px white;
  }
  ._LotteryHistory_kj_container{
    width: 9.3rem;
    /*height: 2.4rem;*/
    margin: auto;
    overflow: hidden;
  }
  ._LotteryHistory_kj_container_title{
    width: 9.3rem;
    height: 1.2rem;
  }

  ._LotteryHistory_kj_container_title div{
    line-height: 1.2rem;
    font-size: 0.4rem;
    color: white;
  }
  ._LotteryHistory_kj_container_title label{
    font-size: 0.4rem;
    color: #edac0c;
  }
  ._LotteryHistory_ll_aaaa{
    overflow: auto;
    position: absolute ;
    top:2.25rem;
    bottom: 0;
    width: 100%;
    box-sizing: border-box;
    background-color: #3b3d42;
    /*z-index: -100;*/
  }
  ._LotteryHistory_kj_container_haoma{
    width: 9.3rem;
    height: 1.2rem;
  }
  ._LotteryHistory_kj_container_haoma div{
    width: 0.9rem;
    height: 0.9rem;
    color: black;
    border-radius: 50%;
    background-color: white;
    float: left;
    text-align: center;
    line-height: 0.9rem;
    margin: 0.1rem 0 0 0.13rem;
    font-size: 18px;
  }
  .active{
    width: 5.2rem;
    height: 2.4rem;
  }
  .active div{
    width: 0.9rem;
    height: 0.9rem;
    color: black;
    border-radius: 50%;
    background-color: white;
    float: left;
    text-align: center;
    line-height: 0.9rem;
    margin: 0.1rem 0 0 0.13rem;
    font-size: 18px;
  }
</style>
