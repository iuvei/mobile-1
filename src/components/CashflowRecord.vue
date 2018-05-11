<template>
  <div style="background-color:#f1f1f0;">
    <div class="_CashflowRecord_ss_a">
    	<mt-header title="金流记录" style="background-image: linear-gradient(to bottom,#494c56,#1e2027 );position: fixed;top: 0;left:0 ;width: 100%;height: 1.125rem;color: #fff;z-index: 1;">
    <mt-button icon="back" slot="left" @click="goback" style="color: #fff">返回</mt-button>
</mt-header>
      <div class="_CashflowRecord_top">
      <span style="font-size: 0.4rem;">
        交易类型：
      </span>
        <select  v-model="zl" >
          <option value="0" class="_CashflowRecord_op">全部</option>
          <option value="1" class="_CashflowRecord_op">充值</option>
          <option value="2" class="_CashflowRecord_op">取款</option>
          <option value="3" class="_CashflowRecord_op">投注</option>
          <option value="4" class="_CashflowRecord_op">优惠</option>
        </select>
      </div>
      <div class="_CashflowRecord_time">
        <input type="date" v-model="sTime"/>
        <div></div>
        <input type="date" v-model="eTime"/>
      </div>
      <ul class="_CashflowRecord_date">
        <li @click="cx_today(1)">今天</li>
        <li @click="cx_today(2)">昨天</li>
        <li @click="cx_today(3)">本周</li>
        <li @click="cx_today(4)">上周</li>
        <li @click="cx_today(5)">本月</li>
        <li @click="cx_today(6)">上月</li>
      </ul>
      <div>
        <button class="_CashflowRecord_but" @click="cx">查询</button>
      </div>
      <div class="_CashflowRecord_nav">
        <ul class="_CashflowRecord_data_list" style="border-bottom: solid 2px #e7e7e7;" v-for="(item,index) in dataList">
          <li class="_CashflowRecord_li_one" style="width: 40%;line-height: 0.65rem;" >
            <div>时间：</div>
            <div>{{item.tradeDate.substring(0,19)}}</div>
          </li>
          <li class="_CashflowRecord_li_two" style="width: 40%;line-height: 0.65rem;">
            <div>金额：</div>
            <div>{{item.tradeAmount}}</div>
          </li>
          <li class="_CashflowRecord_li_three" style="width: 60%;line-height: 0.65rem;">
            <div>交易后：</div>
            <div>{{item.amountAfter}}</div>
          </li>
          <li class="_CashflowRecord_li_fore" style="width: 40%;line-height: 0.65rem;">
            <div>类别：</div>
            <div>{{item.tradeType}}</div>
          </li>
          <li class="_CashflowRecord_li_five" style="width: 60%;line-height: 0.65rem;">
            <div>项目：</div>
            <div>{{item.tradeItem}}</div>
          </li>
          <li class="_CashflowRecord_li_six" style="line-height: 0.7rem;">
            <div style="display: inline-block;width: 100%;">备注：{{item.tradeRemark}}</div>
          </li>
        </ul>
      </div>
      <Pagination ref="pg" v-on:index="changeindex" :countAll="countAll" :pages="pages" class="_CashflowRecord_pa_pp"></Pagination>
    </div>
  </div>
</template>
<script>
  import Pagination from "../common/pagination.vue"
  export default {
    data(){
      return{
        zl:'0',
        dataList:"",
        today:'',
        sTime:"",
        eTime:"",
        lastWeekDay:"",
        countAll:1,
        pages:1,
        page:1
      }
    },
    components:{
      Pagination
    },
    created(){
      let date = new Date();
//      console.log(date);
      let dateTime = date.getTime();
//        console.log(dateTime)
      let y = date.getFullYear(); //年
      let m = date.getMonth() + 1;//月
      m = m < 10 ? '0' + m : m;
      let d = date.getDate();
      this.d = d;
      d = d < 10 ? ('0' + d) : d;
      let today= y + '-' + m + '-' + d;
      this.today = today;
      this.sTime = this.today;
      this.eTime = this.today;
//      console.log(today); //今天
      let y_d = (d-1);
      y_d = y_d < 10 ? ("0" + y_d) : y_d;
      let lastDay = y + '-' + m + '-' + y_d;
      this.lastDay = lastDay;
//        console.log(lastDay); //昨天
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
//      console.log(SundayTime);

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
      this.lastWeekDay = lastWeekDay;
      this.week = week;//本周起始时间
//        console.log(week);
      let yyy = lastwk.getFullYear(); //年
      let mmm = lastwk.getMonth() + 1;//月
      mmm = mmm < 10 ? '0' + mmm : mmm;
      let ddd = lastwk.getDate();
      ddd = ddd < 10 ? ('0' + ddd) : ddd;
      let lastWeek = yyy + '-' + mmm + '-' + ddd;
      this.lastWeek= lastWeek;//上周起始时间
//        console.log(lastWeek);
      let that = this;
      this.$axios({
        method:"get",
        url:"/inter/user/myCash/"+"0"+"/"+today+"/"+today+"/"+this.page
      }).then(function (data) {
//        console.log(data);
        that.dataList = data.data.data.dataList;
        that.countAll = data.data.data.count;
//          console.log(that.countAll);
        that.pages =Math.ceil(that.countAll/10);
//        console.log(that.pages);
//        console.log(that.countAll);
//        console.log(that.dataList)
      }).catch(function (error){
        console.log(error)
      })
    },
    methods:{
    	goback(){
    		sessionStorageSet('routeIndx', -1);
				this.$router.back()
			},
      changeindex(page){
        this.page = page;
      },
      cx(){
        let that = this;
//        console.log(this.sTime);
        this.$axios({
          method:"get",
          url:"/inter/user/myCash/"+this.zl+"/"+this.sTime+"/"+this.eTime+"/"+this.page
        }).then(function (data) {
//          console.log(data);
          that.dataList = data.data.data.dataList;
          that.countAll = data.data.data.count;
//          console.log(that.countAll);
          that.pages =Math.ceil(that.countAll/10);
//          console.log(that.pages);
//          console.log(that.countAll);
//          console.log(that.dataList)
        }).catch(function (error){
          console.log(error)
        })
      },
      cx_today(dateCombo){
        var now = new Date();                    //当前日期
        var nowDayOfWeek = now.getDay();         //今天本周的第几
//        console.log(nowDayOfWeek);
        var nowDay = now.getDate();              //当前日
        nowDay= nowDay < 10 ? '0' +nowDay : nowDay;
        var nowMonth = now.getMonth();           //当前月
        nowMonth= nowMonth < 10 ? '0' +nowMonth : nowMonth;
        var nowYear = now.getYear();             //当前年
        nowYear += (nowYear < 2000) ? 1900 : 0;  //
        let today= nowYear + '-' + nowMonth + '-' + nowDay;
        let yesterDay = nowYear + '-' + nowMonth + '-' + (nowDay-1);
//        console.log(today);
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
          this.endTime =this.today;
        }else if(dateCombo == '2'){//昨日
          if(this.d == "01"){
            this.lastDay = lastMonthEndDay;
          }
          this.startTime =this.lastDay;
          this.endTime =this.lastDay;
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
        this.sTime = this.endTime;
        this.eTime = this.startTime;
        let ot = document.getElementsByClassName("_CashflowRecord_op");
        for(let i=0;i<ot.length;i++){
          ot[0].value = "0";
//          console.log(ot[0].value);
          if(ot[i].value == ""){
            this.cod = "0";
          }else {
            this.cod = this.zl;
          }
        }

        let that = this;
        this.$refs.pg.currentPage=1;
        this.page=this.$refs.pg.currentPage;
        this.page = 1;
        this.$axios({
          method:"get",
          url:"/inter/user/myCash/"+this.zl+"/"+this.endTime+"/"+this.startTime+"/"+this.page
        }).then(function (data) {
//          console.log(data);
          that.dataList = data.data.data.dataList;
          that.countAll = data.data.data.count;
//        console.log(data.data.data.count)
          that.pages =Math.ceil(that.countAll/10);
//          console.log(that.dataList);
        }).catch(function (error) {
          console.log(error)
        })
      }
    },
    watch:{
      page(){
        let thiss = this;
        this.$axios({
          method:"get",
          url:"/inter/user/myCash/"+this.zl+"/"+this.sTime+"/"+this.eTime+"/"+this.page
        }).then(function (data) {
          thiss.dataList = data.data.data.dataList;
          thiss.countAll = data.data.data.count;
        }).catch(function (error){
          console.log(error)
        })
      }
    },
    beforeRouteEnter (to, from, next) {
      if(sessionStorageGet("baseMember")['type']=='1'){
        next(false)
      }else {
        next()
      }
    }
  }
</script>
<style scoped>
  *{
    color: black;
    /*padding: 0;
    margin: 0;*/
    /*font-size: 0.40625rem;*/
  }
  ul li{
    list-style: none;
  }
  ._CashflowRecord_top{
    height: 1.0625rem;
    width: 100%;
    padding: 0 0.3125rem;
    box-sizing: border-box;
    background-color: white;
    margin-bottom: 0.125rem;
    overflow: hidden;
  }
  ._CashflowRecord_top>span{
    float: left;
    height: 1.0625rem;
    width: 2.03125rem;
    text-align: center;
    line-height: 1.0625rem;
  }
  select{
    border: 0;
    float: left;
    height: 0.6rem;
    width: 2.03rem;
    margin-top: 0.2rem;
    /*outline: none;*/
  }
  select{
    border-radius: 5px;
    border:1px solid  #ccc;
    appearance: none;/*清除select下拉框默认样式*/
    -moz-appearance: none;
    -webkit-appearance: none;
    padding-right: 0.6rem;
    padding-left: 0.2rem;
    color: #000;
    background: url("../../static/images/img/xiala2.png") no-repeat scroll right center transparent;
    background-size: 0.5rem 0.5rem;
  }
  select option{
    color: #000;
  }
  ._CashflowRecord_date>li{
    width: 16.666%;
    height: 0.78125rem;
    float: left;
    text-align: center;
    line-height: 0.78125rem;
  }
  ._CashflowRecord_date>li:hover {
    color: #f1bf5b;
    border-radius: 0.0156rem;
    border: 0.0156rem solid #f1bf5b;
    box-sizing: border-box;
  }
  ._CashflowRecord_but{
    width: 100%;
    height: 1.25rem;
    background-color: #edac0c;
    margin-top: 0.125rem;
    border-radius: 0.05rem;
    color: white;
    outline: none;
    border: 0;
    font-size: 0.45rem;
  }
  ._CashflowRecord_time,._CashflowRecord_date{
    width: 100%;
    height: 1.25rem;
    background-color: white;
    padding: 0.156rem 0.28125rem;
    box-sizing: border-box;
    margin-top: 0.125rem;
    color: black;
  }
  ._CashflowRecord_time>input{
    width: 4.0625rem;
    height: 0.9218rem;
    border: 0.01256rem solid #D9D9D9;
    box-sizing: border-box;
    border-radius: 0.1rem;
    float: left;
    text-align: center;
    line-height: 0.9218rem;
  }
  ._CashflowRecord_time>div{
    width: 0.375rem;
    height: 0.02rem;
    background-color:#A0A0A0 ;
    float: left;
    margin: 0.5rem 0.335rem;
  }
  ._CashflowRecord_ss_a{
    padding: 1.125rem 0 1.3rem 0  ;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    height: 100%;
    overflow: auto;
  }
  ._CashflowRecord_nav{
    height: 10.125rem;
    padding-bottom: 1.1rem;
    box-sizing: border-box;

  }
  ._CashflowRecord_data_list{
    width: 100%;
    padding: 0.3125rem ;
    overflow: hidden;
    box-sizing: border-box;
    background-color: white;
  }
  ._CashflowRecord_pa_pp{
    position: fixed;
    bottom:0;
    width: 100%;
  }
  ._CashflowRecord_data_list>li{
    float: left;
  }
  ._CashflowRecord_data_list>li>div{
    float: left;
  }
  ._CashflowRecord_data_list>li>div:nth-child(1){
    float: left;
    /*color: #edac0c;*/
    display: inline;
    text-align: justify;
    /*text-justify: distribute-all-lines;*/
    /*text-align-last: justify;*/
    width: 1.925rem;
    /*white-space:nowrap;*/
    overflow:hidden;
    text-overflow:ellipsis;
  }
  ._CashflowRecord_data_list>li>div:nth-child(2){
    /*color: #707070;*/
    font-weight: 100;
    font-size: 0.4rem;
  }
  ._CashflowRecord_li_one,._CashflowRecord_li_six{
    width: 100% !important;
  }
</style>
