<template>
    <span :endTime="endTime" >
        <slot>
          {{content}}
        </slot>
    </span>
</template>
<script>
  export default {
    data() {
      return {
        content: '',
        time:0,
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
    props: ['endTime','I','id'],
    created() {
      this.countdowm(this.endTime)
    },
    methods: {
      countdowm(t) {
        let self = this;
        self.content=t;
        self.timeFormat(t);
        let timer = setInterval(function () {
        var hours=new Date().getHours();
        var second=new Date().getSeconds();
          if((hours>22&&second>0)||(hours<2&&second>0)){
          self.datas5.push('cqssc')
          }else{
            self.datas10.push('cqssc')
          }
          if (t > 0) {
            t -= 1;
           self.timeFormat(t);
          } else {
            clearInterval(timer);
            if(self.datas1.indexOf(self.id)!=-1){
              self.countdowm(59);
            }else if (self.datas3.indexOf(self.id)!=-1){
              self.countdowm(179);
            }else if (self.datas5.indexOf(self.id)!=-1){
              self.countdowm(299);
            }else if (self.datas10.indexOf(self.id)!=-1){
              self.countdowm(599);
            }else if (self.datasDay.indexOf(self.id)!=-1){
              self.countdowm(86399);
            }else if(self.datashour.indexOf(self.id)!=-1){
              self.countdowm(1799);
            }
          }
        }, 1000);
      },
      timeFormat:function (time) {
        var min = Math.floor(time / 60);
        var sec = (time % 60 / 100).toFixed(2).slice(-2);
        min = min < 10 ? "0" + min : min;
        var format = min + ":" + sec;
        return this.content = format;
      }
    }
  }
</script>
