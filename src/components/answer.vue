<template>
<div class="container">
  <ul v-for="item in datas.datas.type[$route.params.type].lists">
    <li @click="toggle(item)">{{item.question}}</li>
    <transition name="fade">
      <li v-show="item.show"><p>{{item.answer}}</p></li>
    </transition>
  </ul>
</div>
</template>
<script>
  import Datas from '../../static/js/datas'
  
export default {
  data(){
    return{
      datas:''
    }
  },
  created:function () {
    this.datas=Datas;
//    console.log(this.datas)
  },
  methods:{
    toggle:function (obj) {
      obj.show=!obj.show
    }
  }
}
</script>
<style scoped>
  .container{
  width: 100%;
  position: absolute;
  top: 2.125rem;
}
ul>li:nth-child(1){
  width: 100%;
  height: 1.2rem;
  display: flex;
  align-items: center;
  text-indent: 0.15rem;
  border-bottom: 1px solid #5e6064;
}
ul>li:nth-child(2){
  text-indent: 0.15rem;
  border-bottom: 1px solid #5e6064;
  padding-bottom: .5rem;
}
  .fade-enter-active, .fade-leave-active {
    transition: opacity .1s
  }
  .fade-enter, .fade-leave-to{
    opacity: 0
  }
</style>
