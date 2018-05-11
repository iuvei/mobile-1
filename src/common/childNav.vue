<template>
  <div v-if='hide'>
    <nav>
     <div @click="revert" style="font-size: 0.43rem;">＜&nbsp;返回</div>
      <p>{{subTitle[tabel]?subTitle[tabel]:titles[id]}}</p>
    </nav>
  </div>
</template>
<script>
export default {
  data() {
    return {
      id: '',
      tabel:'',
      titles: ['登入记录', '安全中心', '推广链接', '银行卡', '彩票报表', '转点下级', '金流记录', '代理会员', '在线充值', '提现', '绑定资料','开奖历史','个人报表','帐变记录','常见问题'],
      //个人报表下的子标题。
      subTitle:['全部','中奖','退码','有效','未颁奖'],
      hide:true,
      rightTxt:""

    }
  },
  created: function () {
    this.id = this.$route.params.id;
    this.tabel=this.$route.query.id;
  },
  methods: {
    //返回路由上一级
    revert: function () {
      this.$router.go(-1)
    }
  },
  watch:{
    $route (data){
      //监听路由，当路由为个人报表时，全部，中奖等标题消失。。
      if(data.path=='/personReportAll'){
        this.tabel=this.$route.query.id;
      }else {
        this.tabel='';
        this.id = this.$route.params.id;
      }
      if(data.path=='/BuyColourBasket'){
        this.hide=false;
      }else {
       this.hide=true;
      }
    }
  }
}


</script>
<style scoped>
  nav>div{
    position: absolute;
    left: 0.4rem;
    font-size: 0.3rem;
    width: 2rem;
    height: 1.125rem;
    line-height: 1.125rem;
    background: #2b2d34;
    display: flex;
    align-items: center;
  }
  nav div img{
    margin-right: 0.15rem;
    vertical-align: middle;
  }
  nav{
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0;
    width: 100%;
    height: 1.125rem;
    background-image: linear-gradient(to bottom,#393c44,#1e2026);
    background: #2b2d34;
    z-index: 15;
  }
</style>
