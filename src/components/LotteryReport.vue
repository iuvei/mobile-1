<template>
  <div class="_LotteryReport_ll_rr">
  	<mt-header title="彩票报表" style="background-image: linear-gradient(to bottom,#494c56,#1e2027 );position: fixed;top: 0;left:0 ;width: 100%;height: 1.125rem;">

    <mt-button icon="back" slot="left" @click="goback">返回</mt-button>

</mt-header>
      <div class="_LotteryReport_ll_rr_a">
        <div class="_LotteryReport_search">
          <div class="_LotteryReport_zhanghao">下级账号：</div>
          <input type="text" placeholder="为空时查询自己！" class="_LotteryReport_search_input" v-model="xj_username" >
        </div>
        <div class="_LotteryReport_time">
          <input type="date"  v-model="endTime"/>
          <div></div>
          <input type="date" v-model="startTime" />
        </div>
        <ul class="_LotteryReport_date">
          <li @click="cx_today(1)">今天</li>
          <li @click="cx_today(2)">昨天</li>
          <li @click="cx_today(3)">本周</li>
          <li @click="cx_today(4)">上周</li>
          <li @click="cx_today(5)">本月</li>
          <li @click="cx_today(6)">上月</li>
        </ul>
        <div>
          <button class="_LotteryReport_but" @click="lr_cx" style="font-size: 0.45rem;">查询</button>
        </div>
        <div class="_LotteryReport_prompt">
          <p style="font-size: 0.3rem;">温馨提示：当前查询账号为{{this.xj_username}}  更新时间为：{{this.Time}}查询时间为七点到七点的数据,例：2018-01-05~2018-01-05 查询的是2018-01-05 07:00:00~2018-01-06 07:00:00的数据，依次类推。</p>
        </div>
        <div style="padding-bottom: 1.125rem;">
          <ul class="_LotteryReport_lottery_data" v-for="(item,index) in List " style="font-size: 0.38rem;">
            <li> <span>账号： </span><div>{{item.member_account}}</div></li>
            <li> <span>总充值：</span ><div>{{item.p_deposit}}</div></li>
            <li> <span>总提现：</span><div>{{item.p_draw}}</div></li>
            <router-link :to="{name:'personalReport',query:{account:item.member_account,startTime:startTime,endTime:endTime}}" tag="li" class="_LotteryReport_allMoney"> <span>总下注额：</span><div style="color: blue;">{{item.total_pay}}</div></router-link>
            <li> <span>总投注笔数：</span><div>{{item.cnt}}</div></li>
            <li> <span>销售返点：</span><div>{{item.rebate}}</div></li>
            <li> <span>派彩金额：</span><div>{{item.win_amount}}</div></li>
            <li> <span>团队赚水：</span><div>{{item.quit_amount}}</div></li>
            <li> <span>盈亏：</span><div>{{item.real_amount}}</div></li>
            <li><span>实际盈亏：</span><div>{{item.real_amount+item.p_preferential}}</div></li>
            <router-link :to="{name:'accountReport',query:{account:item.member_account,startTime:startTime,endTime:endTime,value:'4'}}" tag="li" class="_LotteryReport_allMoney"><span>活动：</span><div style="color: blue;">{{item.p_preferential}}</div></router-link>
          </ul>
        </div>
      </div>
    <Pagination ref="pg" v-on:index="changeindex" :countAll="countAll" :pages="pages"  style="position: fixed;bottom:0;width: 100%;"></Pagination>
  </div>
</template>
<script>
  import Pagination from "../common/pagination.vue"
  export default {
    data () {
      return {
        List:"",
        className:'',
        today:'',
        lastDay:"",
        memberAccount:'',
        endTime:"",
        startTime:"",
        yesterDay:"",
        xj_username:"",
        lastWeekDay:"",
        countAll:1,
        page:1,
        pages:1,
        Time:'',
//        pg:1
      }
    },
    components:{
      Pagination
    },
    created(){
       let date = new Date();
//        console.log(date);
        let dateTime = date.getTime();
//        console.log(dateTime)
        let y = date.getFullYear(); //年
        let m = date.getMonth() + 1;//月
        m = m < 10 ? '0' + m : m;
        let d = date.getDate(); //日
        this.d = d;
        d = d < 10 ? ('0' + d) : d;
        let today = y + '-' + m + '-' + d;
        this.today = today;
        this.endTime = this.today;
        this.startTime = this.today;
//        console.log(today); //今天
        let y_d = (d-1);
        y_d = y_d < 10 ? ("0" + y_d) : y_d;
        let lastDay = y + '-' + m + '-' + y_d;
        this.lastDay = lastDay;
//        console.log(lastDay);
        let month = y + '-' + m + '-' + "01";
        this.month = month;
//        console.log(month);
        let lastMonth = y + '-' + (m-1) + '-' + "01";
        this.lastMonth = lastMonth;
//        console.log(lastMonth);

        let day = date.getDay();
//        console.log(day);
        let oneDayLong = 24*60*60*1000;

        let MondayTime = dateTime-(day-1)*oneDayLong;
//        console.log(MondayTime);
        let lastMondayTime = dateTime-(day+6)*oneDayLong;
//        console.log(lastMondayTime);

        let SundayTime = dateTime+(7-day)*oneDayLong;
//        console.log(SundayTime);

        let monday = new Date(MondayTime);
//        let sunday = new Date(SundayTime);
        let lastwk = new Date(lastMondayTime);

        let yy = monday.getFullYear(); //年
        let mm = monday.getMonth() + 1;//月
        mm = mm < 10 ? '0' + mm : mm;
        let dd = monday.getDate();
        dd = dd < 10 ? ('0' + dd) : dd;
        let week = yy + '-' + mm + '-' + dd;
        let l_dd = (dd-1);
        l_dd  = l_dd < 10 ? ("0" + l_dd) : l_dd;
        let lastWeekDay = yy + '-' + mm + '-' + l_dd;
        this.week = week;//本周起始时间
        this.lastWeekDay = lastWeekDay;
//        console.log(lastWeekDay);
        let yyy = lastwk.getFullYear(); //年
        let mmm = lastwk.getMonth() + 1;//月
        mmm = mmm < 10 ? '0' + mmm : mmm;
        let ddd = lastwk.getDate();
        ddd = ddd < 10 ? ('0' + ddd) : ddd;
        let lastWeek = yyy + '-' + mmm + '-' + ddd;
        this.lastWeek= lastWeek;//上周起始时间
        this.cx_today("1")
    },
    methods:{
    	goback(){
    		sessionStorageSet('routeIndx', -1);
				this.$router.back()
			},
      changeindex(page){
        this.page = page;
      },
      //按日期查询
      lr_cx(){
        let memberAccount;
        if(this.xj_username){
          this.memberAccount = this.xj_username
        }else{
          this.memberAccount = sessionStorageGet("baseMember").account;
        }
        let that = this;
//        console.log(sessionStorageGet("baseMember").account);
        this.$axios({
          method:"post",
          url:"/inter/user/queryLotteryReport",
          data:{
            endTime: this.startTime, // "2017-05-01"
            memberAccount: this.memberAccount, // 账号，为空时默认传当前登录账号
            startTime:this.endTime,  // "2017-05-01"
          }
        }).then(function (data) {
//          console.log(data);
          that.List = data.data.data;
          that.countAll = data.data.data.length;
//          console.log(that.countAll)
//          console.info(that.List);
        }).catch(function (error) {
          console.log(error)
        })
      },
      //查询今天
      cx_today(dateCombo){
//        console.log(memberAccount)
        var now = new Date();                    //当前日期
        var hours = now.getHours();              //当前小时
        hours = hours < 10 ? ('0'+ hours): hours;
        var min = now.getMinutes();               //当前分钟
        min = min < 10 ? ('0'+ min): min;
        var Seconds = now.getSeconds();           //当前秒
        Seconds = Seconds < 10 ? ('0'+ Seconds): Seconds;
        var nowDayOfWeek = now.getDay();         //今天本周的第几
//        console.log(nowDayOfWeek);
        var nowDay = now.getDate();              //当前日
        nowDay= nowDay < 10 ? '0' +nowDay : nowDay;
        var nowMonth = now.getMonth();           //当前月
        nowMonth= nowMonth < 10 ? '0' +nowMonth : nowMonth;
        var nowYear = now.getYear();             //当前年
        nowYear += (nowYear < 2000) ? 1900 : 0;  //
        this.Time = nowYear + '-' + (nowMonth+1) + '-' + nowDay+" "+ hours+':'+min+':'+Seconds;
//        console.log(this.Time);
        let today= nowYear + '-' + nowMonth + '-' + nowDay;
        let yesterDay = nowYear + '-' + nowMonth + '-' + (nowDay-1);
//       console.log(today);
        var lastMonthDate = new Date();  //上月日期
        lastMonthDate.setDate(1);
        lastMonthDate.setMonth(lastMonthDate.getMonth()-1);
        var lastYear = lastMonthDate.getYear();
        var lastMonth = lastMonthDate.getMonth();

        var monthStartDate = new Date(nowYear, lastMonth, 1);
        var monthEndDate = new Date(nowYear, lastMonth + 1, 1);
        var days = (monthEndDate - monthStartDate) / (1000 * 60 * 60 * 24);
        var getLastMonthStartDate = new Date(nowYear, lastMonth, 1);
        var getLastMonthEndDate = new Date(nowYear, lastMonth, days);
        var s_y = getLastMonthStartDate.getFullYear();
        var s_m = getLastMonthStartDate.getMonth()+1;
        s_m = s_m < 10 ? '0' + s_m : s_m;
        var s_d = getLastMonthStartDate.getDate();
        s_d = s_d < 10 ? '0' + s_d : s_d;
        var lastMonthStartDay = s_y + '-' + s_m + '-' + s_d;
        var e_y = getLastMonthEndDate.getFullYear();
        var e_m = getLastMonthEndDate.getMonth()+1;
        e_m = e_m < 10 ? '0' + e_m : e_m;
        var e_d = getLastMonthEndDate.getDate();
        e_d = e_d < 10 ? '0' + e_d : e_d;
        var lastMonthEndDay = e_y + '-' + e_m + '-' + e_d;

        if(dateCombo == '1'){//今日
          this.startTime =this.today;
          this.endTime = this.today;
        }else if(dateCombo == '2'){//昨日
          if( this.d == "01"){
            this.lastDay = lastMonthEndDay
          }
          this.startTime = this.lastDay;
          this.endTime = this.lastDay;
        }else if(dateCombo == '3'){//本周
          this.endTime = this.week;
          this.startTime = this.today;
        }else if(dateCombo == '4'){//上周
          this.endTime = this.lastWeek;
          this.startTime = this.lastWeekDay;
        }else if(dateCombo == '5'){//本月
          //获得某月的天数
          this.endTime = this.month;
          this.startTime = this.today;
        }else if(dateCombo == '6') {//上月
          //获得某月的天数
          if (lastMonth == '11') {//跨年
            nowYear = nowYear - 1;
          }
          this.endTime = lastMonthStartDay;
          this.startTime = lastMonthEndDay;
        }
        let that = this;
//        this.$refs.pg.currentPage=1;
//        this.page=this.$refs.pg.currentPage;
        this.$axios({
          method:"post",
          url:"/inter/user/queryLotteryReport",
          data:{
            endTime: this.startTime, // "2017-05-01"
            memberAccount: sessionStorageGet("baseMember").account, // 账号，为空时默认传当前登录账号
            startTime:this.endTime,  // "2017-05-01"
          }
        }).then(function (data) {
//          console.log(data);
          that.List = data.data.data;
          that.countAll = data.data.data.length;
//          console.log(that.countAll)
//          console.info(that.List);
        }).catch(function (error) {
          console.log(error)
        })
      }
    },
    watch:{
      page(){
        let that = this;
        this.$axios({
          method:"post",
          url:"/inter/user/queryLotteryReport",
          data:{
            memberAccount: sessionStorageGet("baseMember").account, // 账号，为空时默认传当前登录账号
            endTime: this.startTime, // "2017-05-01"
            startTime:this.endTime,  // "2017-05-01"
          }
        }).then(function (data) {
          that.List = data.data.data;
//          console.info(that.List);
        }).catch(function (error) {
          console.log(error)
        })
      }
    },
    beforeRouteEnter(to, from, next){
      if(from.name=='personalReport'||from.name=='accountReport'){
        to.meta.isBack = true;
      }
      next();
    },
    activated(){
      if(!this.$route.meta.isBack){
        this.cx_today('1');
      }
      this.$route.meta.isBack=false;
    }
  }
</script>
<style scoped>
  ._LotteryReport_search{
    width: 100%;
    height: 1.25rem;
    background-color: #fff;
    color: #000;
  }
  ._LotteryReport_zhanghao{
    float: left;
    width: 25%;
    height: 1.25rem;
    text-align: center;
    line-height: 1.25rem;
    font-size: 0.4rem;
  }
  ._LotteryReport_search_input{
    width: 7.15rem;
    height: 0.93rem;
    margin-top: 0.156rem;
    background-color: white;
    border: 0.0125rem solid #D9D9D9;
    border-radius: 0.1rem;
    padding-left: 0.3rem;
    box-sizing: border-box;
  }
  ._LotteryReport_time,._LotteryReport_date{
    width: 100%;
    height: 1.25rem;
    background-color: white;
    padding: 0.156rem 0.28125rem;
    box-sizing: border-box;
    margin-top: 0.125rem;
    color: black;
  }
  ._LotteryReport_ll_rr{
    background-color: #F1F1F0;
    height: 100%;
  }
  ._LotteryReport_time>input{
    width: 4.0625rem;
    height: 0.9218rem;
    border: 0.01256rem solid #D9D9D9;
    box-sizing: border-box;
    border-radius: 0.1rem;
    float: left;
    text-align: center;
    line-height: 0.9218rem;
  }
  ._LotteryReport_time>div{
    width: 0.4rem;
    height: 0.02rem;
    /*background-color:#A0A0A0 ;*/
    float: left;
    margin: 0.5rem 0.335rem;
  }
  ._LotteryReport_ll_rr_a{
    padding: 1.125rem 0 0 0;
    box-sizing: border-box;
  }
  ._LotteryReport_date>li{
    width: 16.666%;
    height: 0.78125rem;
    float: left;
    text-align: center;
    line-height: 0.78125rem;
  }
  ._LotteryReport_date>li:hover {
    color: #f1bf5b;
    border-radius: 0.0156rem;
    border: 0.0156rem solid #f1bf5b;
    box-sizing: border-box;
  }
  ._LotteryReport_but{
    width: 100%;
    height: 1.25rem;
    background-color: #edac0c;
    margin-top: 0.125rem;
    border-radius: 0.05rem;
    color: white;
    outline: none;
    border: 0;
  }
  ._LotteryReport_prompt{
    width: 100%;
    overflow: hidden;
    margin-top: 0.125rem;
    padding: 0.125rem ;
    background-color: white;
    box-sizing: border-box;
    color: #000;
  }
  ._LotteryReport_prompt>p{
    width: 100%;
    overflow: hidden;
    box-sizing: border-box;
    color: #a6a6a6;
    font-size: 0.25rem;
  }
  ._LotteryReport_lottery_data{
    width: 100%;
    padding: 0.125rem 0.4rem;
    box-sizing: border-box;
    color: black;
    overflow: hidden;
    background-color: white;
    margin-top: 0.125rem;
  }
  ._LotteryReport_lottery_data>li{
    width: 50%;
    height: 0.5rem;
    float: left;
    font-size: 0.35rem;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
    line-height: 0.4rem;
  }
  ._LotteryReport_lottery_data>li>span{
    float: left;
    display: inline-block;
    text-align: justify;
    text-justify: distribute-all-lines;
    text-align-last: justify;
    color: #000;
    width: 2.3rem;
    white-space:nowrap;
    overflow:hidden;
    text-overflow:ellipsis;
  }
  ._LotteryReport_allMoney{
    color: #5ba4ff;
  }
  ._LotteryReport_lottery_data>li>div{
    float: left;
  }
</style>
