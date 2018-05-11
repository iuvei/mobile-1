<template>
<div>
  <div id="app">
    <div>
      <div id="nav">
        <div class="nav-container">
          <div class="nav-left" >
            <img @click="show" src="../../static/images/ComHead/setting.png" alt="">
          </div>
          <p>{{title[message.data]}}</p>
          <div  class="nav-right" >
          	<img src="../../static/images/weidu.png" class="weidu" v-show="nouvelles&&message.show" />
            <img v-show="message.show"  src="../../static/images/ComHead/message.png" alt="" @click="announce">
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>
<script>
  export default {
    data(){
      return {
        title:["投注记录","优惠活动","","开奖记录","个人中心"],
        nouvelles:false,
        newdataList:[]
      }
    },
    props:['message'],
    methods:{
      show:function () {
        this.$emit('Show')
      },
      //进入公告
      announce:function () {
        this.$router.push({name:'announcement'})
      }
    },
    created:function () {
    	let that = this;
       if(this.message.show){
       	  this.$axios({
				method: 'GET',
				url: '/notice/queryNoticeAlertList?is_read=' + "&memberid=" + sessionStorageGet('baseMember').account
			}).then(function(data) {
				that.newdataList = data.data.data
				that.newdataList.forEach((item) => {
					
					if(item.isRead == 0) {
						that.nouvelles = true
						return false;
					}
				})
			}).catch(function(error) {
				console.log(error)
			})
       }
    }

  }
</script>
<style scoped>
	
	.nav-right .weidu {
		position: absolute;
		top: -0.1rem;
		width: .3rem;
		height: .3rem;
		right: -0.1rem;
		z-index: 1000;
	}
  #app {
    height: 100%;
    z-index: 999;
  }
  #nav{
    width: 100%;
    height: 1.125rem;
    position: fixed;
    top:0;
    background-color: #1e2027;
    background-image: linear-gradient(to bottom,#494c56, #1e2027);
    z-index: 999;
  }
  .nav-container{
    height: 1.125rem;
    position: relative;
    justify-content: space-between;
    align-items: center;
    z-index: 999;
  }
  .nav-container>p{
    margin-right: 0.2rem;
    z-index: 999;
  }
  .nav-left>img{
    float: left;
    width: 0.5rem;
    margin-right: 0.14rem;
    margin-left: 0.4rem;
    z-index: 999;
  }
  .nav-right{
    width: 0.6rem;
    height: 0.6rem ;
    margin-right: 0.39rem;
    position: relative;
  }
  .nav-right>img{
    width: 0.6rem;
    height: 0.6rem ;
    z-index: 999;
  }
  .nav-container,.nav-right{
    display: flex;
    z-index: 999;
  }
</style>
