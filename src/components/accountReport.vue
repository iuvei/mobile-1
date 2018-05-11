<template>
  <div class="accountReport_app">
  	<mt-header title="账变记录" style="background-image: linear-gradient(to bottom,#494c56,#1e2027 );position: fixed;top: 0;left:0 ;z-index:22;width: 100%;height: 1.125rem;">
    <mt-button icon="back" slot="left" @click="goback">返回</mt-button>
</mt-header>
    <div class="accountReport_article">
      <ul class="accountReport_container">
        <li class="accountReport_container_li">记录类型：
          <div>
            <select   id="accountReport_type" v-model="type">
              <option value="1" selected>充值</option>
              <option value="2">提现</option>
              <option value="3">转点</option>
              <option value="4">活动优惠</option>
            </select>
          </div>
        </li>
        <li class="accountReport_container_li_se">下级：<div><input type="search" placeholder="为空时查询自己" v-model="account"/></div></li>
        <li><div>
          <input type="date" :max="this.endTime" v-model="startTime">
        </div><hr/><div><input type="date" :min="startTime" :max="this.maxTime" v-model="endTime" ></div></li>
        <li>
          <ul class="accountReport_date">
            <li  @click="account==''?query0('today'):query('today')">今天</li>
            <li  @click="account==''?query0('yesterday'):query('yesterday')">昨天</li>
            <li  @click="account==''?query0('weeks'):query('weeks')">本周</li>
            <li  @click="account==''?query0('lastWeek'):query('lastWeek')">上周</li>
            <li  @click="account==''?query0('month'):query('month')">本月</li>
            <li  @click="account==''?query0('lastMonth'):query('lastMonth')">上月</li>
          </ul>
        </li>
        <li @click="account==''?query0():query()">查询</li>
      </ul>
      <!--<div class="accountReport_main">-->
        <ul class="accountReport_catory" v-for="item in datas.lotteryOrder">
          <li><span>类别：</span><span>{{item.item}}</span></li>
          <li><span>时间：</span><span>{{item.confirmDate.slice(0,-2)}}</span></li>
          <li><span>金额：</span><span>{{item.amount}}元</span></li>
        </ul>
      </div>
      <ul class="accountReport_calculate" v-if="calculate">
        <li>{{datas.sumMin.name}}：{{datas.sumMin.sum}}元</li>
        <li>{{datas.sumMax.name}}：{{datas.sumMax.sum}}元</li>
      </ul>
    <!--</div>-->
    <div class="accountReport_footer">
      <Pagination ref="pag" @index="changeindex" :countAll="counts" :pages='allPages' class="pagination pa" ></Pagination>
    </div>
  </div>
</template>
<script>
//	import Vue from 'vue'
  import Pagination from '@/common/pagination.vue';
//import { MessageBox} from 'mint-ui';
//Vue.component(MessageBox.name, MessageBox);
  export default {
    data(){
      return{
        account:'',
        startTime:'',
        endTime:'',
        maxTime:'',
        type:'1',
        datas:'',
        show:false,
        allPages:1,
        counts:1,
        page:1,
        calculate:false
      }
    },
    components:{
      Pagination
    },
    mounted:function () {
//      console.log(this.$route.query)
      let date=new Date();
      let maxtime=this.Time(date);
      this.maxTime=maxtime;
      let self=this;
      //初始化当天时间；
      this.startTime=this.Time(new Date().getTime());
      this.endTime=this.Time(new Date().getTime());
      if(this.$route.query.account==sessionStorageGet("baseMember")['account']){
        this.startTime=this.$route.query.endTime;
        this.endTime=this.$route.query.startTime;
//        this.account=this.$route.query.account;
        this.type=this.$route.query.value+'';
        this.query0();
      }else if(this.$route.query.account!=sessionStorageGet("baseMember")['account']&&this.$route.query.account){
        this.startTime=this.$route.query.endTime;
        this.endTime=this.$route.query.startTime;
        this.account=this.$route.query.account;
        this.type=this.$route.query.value+'';
        this.query();
      } else if(!this.$route.query.account){
        this.query0('today');
      }
    },
    methods:{
    		goback(){
    			sessionStorageSet('routeIndx', -1);
				this.$router.back()
			},
      //时间解析;
      Time:function(now)   {
        let year=new Date(now).getFullYear();
        let month=new Date(now).getMonth()+1;
        let date=new Date(now).getDate();
        if (month < 10) month = "0" + month;
        if (date < 10) date = "0" + date;
        return   year+"-"+month+"-"+date
      },
      //本周第一天；
      showWeekFirstDay:function()
      {
        let Nowdate=new Date();
        let WeekFirstDay=new Date(Nowdate-(Nowdate.getDay()-1)*86400000);
        let M=Number(WeekFirstDay.getMonth())+1;
        if(M<10){
          M="0"+M;
        }
        let D=WeekFirstDay.getDate();
        if(D<10){
          D="0"+D;
        }
        return WeekFirstDay.getFullYear()+"-"+M+"-"+D;
      },
      //本周最后一天
      showWeekLastDay:function ()
      {
        let Nowdate=new Date();
        let WeekFirstDay=new Date(Nowdate-(Nowdate.getDay()-1)*86400000);
        let WeekLastDay=new Date((WeekFirstDay/1000+6*86400)*1000);
        let M=Number(WeekLastDay.getMonth())+1;
        if(M<10){
          M="0"+M;
        }
        let D=WeekLastDay.getDate();
        if(D<10){
          D="0"+D;
        }
        return WeekLastDay.getFullYear()+"-"+M+"-"+D;
      },
      //获得某月的天数：
      getMonthDays:function (myMonth){
        let monthStartDate = new Date(new Date().getFullYear(), myMonth, 1);
        let monthEndDate = new Date(new Date().getFullYear(), myMonth + 1, 1);
        let   days   =   (monthEndDate   -   monthStartDate)/(1000   *   60   *   60   *   24);
        return   days;
      },
      //查询
      query:function (way) {
        //每次查询页面从第一页开始；
        this.$refs.pag.currentPage=1;
        this.page=this.$refs.pag.currentPage;
        this.show=true;
        let self=this;
        switch (way){
          case 'today':
            this.startTime=this.maxTime;
            this.endTime=this.maxTime;
            break;
          case 'yesterday':
            this.startTime=this.Time(new Date().getTime()-24*60*60*1000);
            this.endTime=this.Time(new Date().getTime()-24*60*60*1000);
            break;
          case 'weeks':
            this.startTime=this.showWeekFirstDay();
            this.endTime=this.maxTime;
            break;
          case 'lastWeek':
            this.startTime=this.Time(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()-new Date().getDay()-6));
            this.endTime=this.Time(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()+(6-new Date().getDay()-6)));
            break;
          case 'month':
            this.startTime=this.Time(new Date(new Date().getFullYear(), new Date().getMonth(),1));
            this.endTime=this.maxTime;
            break;
          case 'lastMonth':
            this.startTime=this.Time(new Date(new Date().getFullYear(),new Date().getMonth()-1,1));
            this.endTime=this.Time(new Date(new Date().getFullYear(),new Date().getMonth()-1,this.getMonthDays(new Date().getMonth()-1)));
            break;
        }
        this.$axios({
          method:'post',
          url:'/inter/user/queryChildBill',
          data:{
            'account':this.account,
            'page':1,
            'startTime':this.startTime,
            'endTime':this.endTime,
            'type':this.type
          }
        }).then(function (data) {
//          console.log(data);
            self.datas=data.data.data;
            self.counts=data.data.data.countAll;
            self.allPages=self.counts/10==0?1:self.counts%10!=0?parseInt(self.counts/10)+1:self.counts/10;
            self.calculate=true;
        }).catch(function (error) {
          console.log(error);
        })
      },
      //空查询
      query0:function (way) {
        this.$refs.pag.currentPage=1;
        this.page=this.$refs.pag.currentPage;
        this.show=true;
        let self=this;
        switch (way){
          case 'today':
            this.startTime=this.maxTime;
            this.endTime=this.maxTime;
            break;
          case 'yesterday':
            this.startTime=this.Time(new Date().getTime()-24*60*60*1000);
            this.endTime=this.Time(new Date().getTime()-24*60*60*1000);
            break;
          case 'weeks':
            this.startTime=this.showWeekFirstDay();
            this.endTime=this.maxTime;
            break;
          case 'lastWeek':
            this.startTime=this.Time(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()-new Date().getDay()-6));
            this.endTime=this.Time(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()+(6-new Date().getDay()-6)));
            break;
          case 'month':
            this.startTime=this.Time(new Date(new Date().getFullYear(), new Date().getMonth(),1));
            this.endTime=this.maxTime;
            break;
          case 'lastMonth':
            this.startTime=this.Time(new Date(new Date().getFullYear(),new Date().getMonth()-1,1));
            this.endTime=this.Time(new Date(new Date().getFullYear(),new Date().getMonth()-1,this.getMonthDays(new Date().getMonth()-1)));
            break;
        }
        this.$axios({
          method:'post',
          url:'/inter/user/queryChildBill',
          data:{
            'account':sessionStorageGet("baseMember")['account'],
            'page':1,
            'startTime':this.startTime,
            'endTime':this.endTime,
            'type':this.type
          }
        }).then(function (data) {
//          console.log(data);
            self.datas=data.data.data;
            self.counts=data.data.data.countAll;
            self.allPages=self.counts/10==0?1:self.counts%10!=0?parseInt(self.counts/10)+1:self.counts/10;
            self.calculate=true;
        }).catch(function (error) {
          console.log(error);
        })
      },
      changeindex:function (page) {
//        console.log(page);
        this.page = page;
      }
    },
    watch:{
      page(newValue, oldValue) {
        let that = this;
        if(this.account==''){
          this.$axios({
            method: 'post',
            url: '/inter/user/queryChildBill',
            data: {
              'account':sessionStorageGet("baseMember")['account'],
              'page':newValue,
              'startTime':this.startTime,
              'endTime':this.endTime,
              'type':this.type
            }
          }).then(function(data) {
            that.datas = data.data.data;
            that.allPages=Math.ceil(that.datas.countAll/10)
          }).catch(function(error) {
          });
        }else{
          this.$axios({
            method: 'post',
            url: '/inter/user/queryChildBill',
            data: {
              'account':this.account,
              'page':newValue,
              'startTime':this.startTime,
              'endTime':this.endTime,
              'type':this.type
            }
          }).then(function(data) {
            that.datas = data.data.data;
            that.allPages=Math.ceil(that.datas.countAll/10)
          }).catch(function(error) {
          })
        }
      }
    },
    beforeRouteEnter (to, from, next) {
      if(sessionStorageGet("baseMember")['type']=='1'){
        next(false);
      }else {
        next();
      }

    }
  }
</script>
<style scoped>
  .selected{
    color: #edac0c;
  }
  .accountReport_app{
    background: #f1f1f0;
    color: black;
    width: 100%;
    height: 100%;
  }
  .pa{
    position:fixed;
    bottom: 0;
    left: 0;
  }
  .accountReport_article{
    width: 100%;
    position: absolute;
    top:1.125rem;
    bottom: 1rem;
    overflow: auto;
    padding-bottom: 0.1rem;
  }
  .accountReport_container>li{
    width: 100%;
    height: 1.31rem;
    display: flex;
    align-items: center;
    margin-bottom: 2px;
    background: white;
  }
  .accountReport_container_li{
    width: 50%!important;
    float: left;
    text-indent: 0.1rem;
  }
  .accountReport_container_li>div{
    height:100%;
    display: flex;
    align-items: center;
  }
  .accountReport_container_li_se{
    width: 50%;
    float: left;
  }
  .accountReport_date{
    width: 100%;
    display: flex;
    justify-content: space-around;
  }
  .accountReport_date>li{
    width: 1.31rem;
    height: 0.77rem;
    border-radius: 3px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid white;
  }
  .accountReport_date>li:hover {
    color: #f1bf5b;
    border-color:#f1bf5b;
  }
  .accountReport_container>li:nth-child(1){
  }
  .accountReport_container>li:nth-child(2){
    width: 50%;
  }
  .accountReport_container>li:nth-child(2)>div{
    width: 70%;
    border-radius: 4px;
    border: 1px solid #d8d8d8;
  }
  .accountReport_container>li:nth-child(3){
    justify-content:space-around;
  }
  .accountReport_container>li:nth-child(5){
    justify-content: center;
    margin-bottom: 0;
    color: white;
    background:#edac0c ;
  }
  select{
    border: none;
    outline: none;
  }
  input[type='search']{
    width: 100%;
    float: right;
    height: 0.94rem;
    outline: none;
    text-indent: 7px;
  }
  input[type='date']{
    width: 4.05rem;
    height: 0.89rem;
    border: 1px solid #cfcfcf;
    border-radius: 4px;
    text-align: center;
    outline: none;
  }
  hr{
    width: 0.36rem;
    height: 0.016rem;
    margin: 0 0.45rem;
  }
  .accountReport_catory {
    width: 100%;
    height: 2.36rem;
    background: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-bottom: solid 2px #ececec;
  }
  .accountReport_catory>li{
    margin-left: 0.47rem;
    margin-bottom: 0.1rem;
  }
  .accountReport_calculate{
    background: white;
    height:1.69rem;
    position: fixed;
    right: 0.2rem;
    top:11rem;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }
  .pagination{
    width: 100%;
  }
  .accountReport_main{
    width: 100%;
  }
  .accountReport_footer{
    width: 100%;
    position: fixed;
    bottom: 0.2rem;
    left: 0;
    height: 1.16rem;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
  }
</style>
