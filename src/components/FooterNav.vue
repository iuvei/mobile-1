<template>
  <div id="footer" style="z-index: 1000;">
    <footer>
      <ul>
        <router-link :to="{name:'Irecord',params:{id:0}}"  tag="li"><img src="../../static/images/record.png" alt=""><span>投注记录</span></router-link>
        <router-link :to="{name:'activity',params:{id:1}}" tag="li"><img src="../../static/images/activity.png" alt=""><span>优惠活动</span></router-link>
        <router-link :to="{name:'container',params:{id:2}}" tag="li"><img style="width:0.9rem;padding-top: 0.2rem;" src="../../static/images/logo.png" alt=""><span></span></router-link>
        <router-link :to="{name:'award',params:{id:3}}" tag="li"><img style="height: 0.53rem;" src="../../static/images/award.png" alt=""><span>开奖记录</span></router-link>
        <router-link :to="{name:'person',params:{id:4}}" tag="li"><img src="../../static/images/person.png" alt=""><span>个人中心</span></router-link>
      </ul>
    </footer>
  </div>
</template>
<script>
  export default {
    data (){
      return{
      }
    },
  }
</script>
<style scoped>
  #footer{
    width: 100%;
    position: fixed;
    bottom: 0;
  }
  footer{
    width: 100%;
    height: 1.34rem;
    background-image: linear-gradient(to bottom,#494c56,#1e2027 );
    color: white;
  }
  footer,ul{
    display: flex;
  }
  footer>ul{
    width: 100%;
    justify-content: space-around;
    align-items: center;
  }

  footer>ul img{
    width: 0.53rem;
    display: block;
    margin: auto;
  }
  footer>ul li:nth-child(3){
    width: 1.32rem;
    height: 1.32rem;
    border-radius: 50%;
    margin-top: 0.02rem;
    background-image:linear-gradient(to bottom,#ffe900,#ff9800) ;
  }
</style>
