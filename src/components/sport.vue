<template>
  <div id="sport">
    <mt-header title="热门体育" style="background-image: linear-gradient(to bottom,#494c56,#1e2027 );position: fixed;top: 0;left:0 ;z-index:22;width: 100%;height: 1.125rem;">
      <mt-button icon="back" slot="left" @click="goback">返回</mt-button>
    </mt-header>
    <div style="margin-top: 1.125rem">体育</div>
  </div>
</template>
<script>
  export default {
    created(){

//      let data = {
//        account:"201709231513338448",
//        username:"0001",
//        pay_star_type:"pay_star_ggm",
//        service_type:"gm_ibc",
//        game_code:"1",
//        sign:"f32953ffc387e3634954e2a42c27917c"
//      };
//      this.interface_('post','goSportLink',data)
    },
    data(){
      return{
        msg:'sport'
      }
    },
    methods:{
      goback(){
        sessionStorageSet('routeIndx', -1);
        this.$router.back()
      }
    }
  }
</script>
<style>
#sport{
  color: #C81623;
  background: #ffffff;
}
</style>
