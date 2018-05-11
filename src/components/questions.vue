<template>
  <div class="question">
  	<mt-header title="常见问题" style="background-image: linear-gradient(to bottom,#494c56,#1e2027 );position: fixed;top: 0;left:0 ;width: 100%;height: 1.125rem;z-index: 999;">
    <mt-button icon="back" slot="left" @click="goback">返回</mt-button>
</mt-header>
    <article>
      <ul>
        <router-link to="/question/answer/0" replace tag="li" active-class="active"><li>{{datas.datas.type[0].title}}</li></router-link>
        <router-link to="/question/answer/1" replace tag="li" active-class="active"><li>{{datas.datas.type[1].title}}</li></router-link>
        <router-link to="/question/answer/2" replace tag="li" active-class="active"><li>{{datas.datas.type[2].title}}</li></router-link>
      </ul>
      <router-view></router-view>
    </article>
  </div>
</template>
<script>
  import Datas from '../../static/js/datas'
export default{
  data(){
    return{
      datas:''
    }
  },
  created:function () {
    this.datas=Datas;
  },
  methods:{
  	goback(){
  		sessionStorageSet('routeIndx', -1)
				this.$router.back()
			},
  }
}
</script>
<style scoped>
  .question{
    width: 100%;
  }
  .question>article{
  color: black;
  padding-top: 1.125rem;
}
  .question>article>ul{
  width: 100%;
  height: 1rem;
  background: #fff;
  display: flex;
  z-index: 100;
  justify-content: center;
  position: fixed;
  top:1.125rem;
}
  .question>article>ul>li{
  padding: 0.25rem;
}
  .active{
    color: skyblue;
  }
</style>
