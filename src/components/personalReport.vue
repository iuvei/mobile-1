<template>
<div>
	<mt-header title="个人报表" style="background-image: linear-gradient(to bottom,#494c56,#1e2027 );position: fixed;top: 0;left:0 ;z-index:22;width: 100%;height: 1.125rem;">
    <mt-button icon="back" slot="left" @click="goback">返回</mt-button>
</mt-header>
  <div class="personalReport_pr_az">
    <div class="personalReport_search">
      <div class="personalReport_zhanghao">彩类</div><span>:</span>
      <select class="personalReport_select" v-model="lottersId" >
        <option  selected value="">全部</option>
        <option  v-for="item in lotters" :value="item.kindId">{{item.kindName}}</option>
      </select>
    </div>
    <div class="personalReport_time">
      <input type="date" :max="this.endTime" value=""  v-model="startTime"/>
      <div></div>
      <input type="date" :min="startTime" :max="this.maxTime" v-model="endTime"/>
    </div>
    <ul class="personalReport_date">
      <li @click="query('today')">今天</li>
      <li @click="query('yesterday')">昨天</li>
      <li @click="query('weeks')">本周</li>
      <li @click="query('lastWeek')">上周</li>
      <li @click="query('month')">本月</li>
      <li @click="query('lastMonth')">上月</li>
    </ul>
    <div>
      <button @click="query" class="but">查询</button>
    </div>
    <!--<div class="personalReport_prompt">-->
    <!--</div>-->
    <ul class="personalReport_lottery_data" v-for="(item,index) in datas[page-1]">
      <li>报表日期：<span>{{item.dayTime}}</span></li>
      <li>有效笔数：<span>{{item.cun}}</span></li>
      <li>有效投注：<span>{{item.allAmount}}</span></li>
      <li>实际亏盈：<span>{{item.allRealAmount}}</span></li>
      <div class="personalReport_myself">
        <button style="border: 0;">我的操作：</button>
        <button @click="operation(item.dayTime,'',0)">全部</button>
        <button @click="operation(item.dayTime,'0',1)" >中奖</button>
        <button @click="operation(item.dayTime,'4,5',2)" >退码</button>
        <button @click="operation(item.dayTime,'0,1,2',3)" >有效</button>
        <button @click="operation(item.dayTime,'2',4)">未颁奖</button>
      </div>
    </ul>

  </div>
  <div class="personalReport_footer">
    <Pagination ref="pag" @index="changeindex" :cupage="page" :countAll="counts" :pages='allPages' class="pagination" style="position: fixed;bottom: 0;"></Pagination>
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
      account:sessionStorageGet("baseMember")['account'],
      lotters:[],
      lottersId:'',
      startTime:'',
      endTime:'',
      maxTime:'',
      datas:[],
      counts:1,
      //显示总页数
      allPages:1,
      //当前页数
      page:1

    }
  },
components:{
  Pagination
},
  mounted:function () {
    let date=new Date();
    let max=this.Time(date);
    this.maxTime=max;
//    console.log(max);
    let self=this;
    //初始化当天时间；
    this.startTime=this.Time(new Date().getTime());
    this.endTime=this.Time(new Date().getTime());
    this.$axios({
      method:'get',
      url:'/inter/ticket/kind'
    }).then(function (data) {
//      console.log(data);
      let arr=[];
      for(let i=0;i<data.data.data.length;i++){
        if(data.data.data[i].kindList!=[]){
          for(let k=0;k<data.data.data[i].kindList.length;k++){
            arr.push(data.data.data[i].kindList[k]);
          }
        }
      }
      self.lotters=arr;
//      console.log(self.lotters);
    }).catch(function (error) {
    });
//    console.log(this.$route.query);
    if(this.$route.query.account){
      this.account=this.$route.query.account;
      this.startTime=this.$route.query.endTime;
      this.endTime=this.$route.query.startTime;
      this.query();
    }else if(this.$route.query.plan){
      this.query('today');
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
    showWeekFirstDay:function() {
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
    showWeekLastDay:function () {
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
    query:function (way) {
      let self=this;
      this.$refs.pag.currentPage=1;
      this.page=this.$refs.pag.currentPage;
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
        url:'/inter/user/queryMemberReport',
        data:{
          'account':this.account,
          'baseLotteryId':this.lottersId,
          'startTime':this.startTime,
          'endTime':this.endTime
        }
      }).then(function (data) {
          for(var k=0,arr=[];k<data.data.data.length;k+=10){
            arr.push(data.data.data.slice(k,k+10));
          }
          self.counts=data.data.data.length;
          self.datas=arr;
//          console.log(self.datas);
          self.allPages=self.counts/10==0?1:self.counts%10!=0?parseInt(self.counts/10)+1:self.counts/10;

      }).catch(function (error) {
        console.log(error);
      })
    },
    operation:function (time,status,index) {
      let self=this;
      this.$axios({
        method:'post',
        url:'/inter/user/queryMemberReportAll',
        data:{
          'account':this.account,
          'baseLotteryId':this.lottersId,
          'dayTime':time,
          'page':1,
          'statusWin':status
        }
      }).then(function (data) {
//        console.log(data);
        let datasBase=JSON.stringify(data.data.data);
        let messages=JSON.stringify({'account':self.account,'baseLotteryId':self.lottersId,'dayTime':time,'statusWin':status})
//        console.log(datasBase);
        if(data.data.code==0){
          self.$router.push({name:'personReportAll',query:{information:messages,list:datasBase,id:parseInt(index)}})
        }else{
          self.$dialog.alert({mes:'未登入',callback:function(){
								 self.$router.replace({name:'login'});
							}})
        }
      }).catch(function (error) {

      })

    },
    changeindex:function (page) {
//      console.log(page);
      this.page = page;
    }
  },
  watch: {
    $route(to){
      if(to.query.account){
        this.account=this.$route.query.account;
        this.startTime=this.$route.query.endTime;
        this.endTime=this.$route.query.startTime;
        this.query();
      }
    }
  },
  beforeRouteEnter(to, from, next){
    if(from.name=='personReportAll'||from.name=='lotteryReport'){
      to.meta.isBack=true;
    }
    next();
  },
  activated(){
    if(!this.$route.meta.isBack){
      this.query('today');
    }
    this.$route.meta.isBack=false;
  }

}
</script>
<style scoped>
  .personalReport_search{
    width: 100%;
    height: 1.25rem;
    color: black;
    display: flex;
    align-items: center;
  }
  .personalReport_search span{
    float: left;
  }
  .personalReport_zhanghao{
    float: left;
    font-size: 0.4rem;
    line-height: 1.25rem;
    padding-left: 0.5rem;
    margin-right: 0.17rem;
  }
  .personalReport_select{
    float: left;
    z-index: 0;
    width: 3rem;
    margin-left: 0.45rem;
  }
  .personalReport_time,.personalReport_date{
    width: 100%;
    height: 1.25rem;
    background-color: white;
    padding: 0.156rem 0.28125rem;
    box-sizing: border-box;
    margin-top: 0.125rem;
    color: black;
  }
  .personalReport_time>input{
    width: 4.0625rem;
    height: 0.9218rem;
    border: 0.01256rem solid #D9D9D9;
    box-sizing: border-box;
    border-radius: 0.1rem;
    float: left;
    text-align: center;
    line-height: 0.9218rem;
  }
  .personalReport_time>div{
    width: 0.4rem;
    height: 0.02rem;
    background-color:#A0A0A0 ;
    float: left;
    margin: 0.5rem 0.335rem;
  }
  .personalReport_date{
    display: flex;
    justify-content: space-around;
  }
  .personalReport_date>li{
    width: 1.31rem;
    height: 0.77rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid white;
  }
  .personalReport_date>li:hover {
    color: #f1bf5b;
    border-radius: 3px;
    border-color:#f1bf5b;
  }
  .personalReport_pr_az{
    width: 100%;
    position: absolute;
    top:1.125rem;
    bottom:1rem ;
    padding-bottom: 0.3rem;
    overflow: auto;
  }
  .but{
    width: 100%;
    height: 1.25rem;
    font-size: 0.45rem;
    background-color: #edac0c;
    margin-top: 0.125rem;
    border-radius: 0.05rem;
    color: white;
    outline: none;
    border: 0;
  }
  .personalReport_prompt{
    width: 100%;
    overflow: hidden;
    margin-top: 0.125rem;
    padding: 0.125rem ;
    background-color: white;
    box-sizing: border-box;
    color: #000;
  }
  .personalReport_prompt>p{
    width: 100%;
    overflow: hidden;
    box-sizing: border-box;
    color: #a6a6a6;
    font-size: 0.25rem;
  }
  .personalReport_lottery_data{
    width: 100%;
    padding: 0.125rem 0.4rem;
    box-sizing: border-box;
    color: black;
    overflow: hidden;
    background-color: white;
    margin-top: 0.125rem;
    border-bottom: solid 2px #e8e8e8;
  }
  .personalReport_lottery_data>li{
    width: 100%;
    margin-bottom: 0.4rem;
    float: left;
  }
  .personalReport_lottery_data li:nth-child(4){
    margin-bottom: 0.1rem;
  }
  .personalReport_myself{
    width: 100%;
    height: 1rem;
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }
  .personalReport_myself button{
    display: block;
    margin:0 0.2rem;
    font-size: 0.4rem;
    line-height: 0.58rem;
    border: 1px solid #a0a0a0;
    border-radius: 4px;
    outline: none;
    background: white;
  }
  .personalReport_myself button:nth-child(1){
    margin-left: 0;
  }
  .pagination{
    width: 100%;
    height: 1rem;
    background: transparent;
  }
  .personalReport_footer{
    width: 100%;
    position: fixed;
    bottom: 0.2rem;
    height: 1.16rem;
    justify-content: center;
  }
</style>
