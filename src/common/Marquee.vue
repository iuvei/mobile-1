<template>
  <div class="marquee-box">
    <div class="marquee-content">
      <p :class="run?speed:''">
        <span class="text1">
          {{content}}
        </span>
        <span class="text2" v-show="run" >
         {{content}}
        </span>
      </p>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'VueMarquee',
    data (){
      return{
        run: false,
        pWidth: '',
      }
    },
    props: {
      content: {
        default: "暂无内容",
      },
      speed: {
        default: 'slow',
        type: String
      },
      showtwo: {
        default: true
      }
    },
    mounted (){
      var _this = this;
      var two= document.getElementsByClassName('marquee-box')[0];
      console.log(two.innerHTML)
      this.$nextTick(()=>{
        _this.run=true;

      });
    },
  }
</script>
<style>
  .marquee-box {
    height: 50px;
    line-height: 50px;
    color: #000;
    font-size: 24px;
    background-size: 24px 24px;
  }
  .marquee-content{
    overflow: hidden;
    width:100%
  }
  .marquee-content p{
    display: inline-block;
    white-space: nowrap;
    margin: 0;
    font-size: 0;
  }
  .marquee-content span{
    display: inline-block;
    white-space: nowrap;
    padding-right: 40px;
    font-size: 24px;

    color: white;
  }
  /*.quick{*/
    /*-webkit-animation: marquee 5s linear infinite;*/
    /*animation: marquee 5s linear infinite;*/
  /*}*/
  /*.middle{*/
    /*-webkit-animation: marquee 8s linear infinite;*/
    /*animation: marquee 8s linear infinite;*/
  /*}*/
  .slow{
    -webkit-animation: marquee 25s linear infinite;
    animation: marquee 25s linear infinite;
  }
  @-webkit-keyframes marquee {
    0%  { -webkit-transform: translate3d(0,0,0); }
    100% { -webkit-transform: translate3d(-50%,0,0); }
  }
  @keyframes marquee {
    0%  { transform: translateX(0); }
    100% { transform: translateX(-50%);}
  }
</style>

