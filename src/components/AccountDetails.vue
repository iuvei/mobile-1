<template>
  <div class="_AccountDetails_aDetails">
  	 <mt-header title="详情" style="background-image: linear-gradient(to bottom,#494c56,#1e2027 );position: fixed;top: 0;left:0 ;width: 100%;height: 1.125rem;color: #fff;z-index: 10">

    <mt-button icon="back" slot="left" @click="goback" style="color: #fff">返回</mt-button>

        </mt-header>


    <!--<div class="_AccountDetails_aDetails_in" >详情</div>-->
    <ul v-if="data.baseMembers" class="_AccountDetails_ad_account">
      <li> <div>账    号：</div> <span>{{this.$route.query.act}}</span> </li>
      <li> <div>身    份：</div> <span>{{data.baseMembers.hierarchy}}</span> <button class="_AccountDetails_ad_account_but" v-if="dl" @click="Agency">转为代理</button></li>
      <li> <div>状    态：</div> <span>{{data.baseMembers.status}}</span> </li>
      <li> <div>建立时间：</div> <span>{{this.$route.query.createTime.substring(0,19)}}</span> </li>
      <li> <div>最后登陆：</div> <span>{{this.$route.query.lastTime}}</span> </li>
      <li> <div>登陆次数：</div> <span>{{data.baseMembers.loginTimes}}</span> </li>
    </ul>
    <ul class="_AccountDetails_ad_type" v-for="(item,index) in listRebate" v-if="item.baseLotteryClassId!='六合彩'">
      <li> <div>彩    种</div> <span>：{{item.baseLotteryClassId}}</span> </li>
      <li> <div>返    点</div> <span>：{{item.rebatePoint +"%"}}</span> </li>
      <li> <div>配额1</div> <span>：{{item.teamQuota1}}</span> 人</li>
      <li> <div>配额2</div> <span>：{{item.teamQuota2}}</span> 人</li>
      <li> <div>配额3</div> <span>：{{item.teamQuota3}}</span> 人</li>
      <li class="_AccountDetails_to_pz" @click="Quota(item.baseLotteryClassId,item.teamQuota1,item.teamQuota2,item.teamQuota3)" v-show="xq_but">详细配置></li>
    </ul>
    <div class="_AccountDetails_motable" v-show="hide" v-for="item in peie" @touchmove.prevent>
      <div class="_AccountDetails_text">
        <h1>团队返水配额</h1>
        <div class="_AccountDetails_fsbl">
          <div>
            <span >返水比例：</span>
            <span class="_AccountDetails_zgbl">（最高{{rebatePoint}}）</span>
          </div>
          <select name="cars"  v-model = "pei">
            <option  v-for="(item,index) in dd"  :value="item " >{{item}}</option>
          </select>
        </div>
        <div class="_AccountDetails_peie" v-show="one">
          <span>【{{maxRebatePoint}}】</span>
          <span>可增加{{teamQuota1}}名，不可低于{{data.minTeamQuota1}}名</span>
          <input type="text" class="_AccountDetails_peie_input"  v-model="qq1 " @input="mona"   >
        </div>
        <div class="_AccountDetails_peie" v-show="two">
          <span>【{{(maxRebatePoint-0.1).toFixed(1)}}】</span>
          <span>可增加{{teamQuota2}}名，不可低于{{data.minTeamQuota2}}名</span>
          <input type="text" class="_AccountDetails_peie_input"  v-model="qq2"  @input="monb">
        </div>
        <div class="_AccountDetails_peie" v-show="three">
          <span>【{{(maxRebatePoint-0.2).toFixed(1)}}】</span>
          <span>可增加{{teamQuota3}}名，不可低于{{data.minTeamQuota3}}名</span>
          <input type="text" class="_AccountDetails_peie_input" v-model="qq3"  @input="monc">
        </div>
        <div class="_AccountDetails_but">
          <button class="_AccountDetails_but_camcel" @click="camcel">取消</button>
          <button class="_AccountDetails_but_keep" @click="changeQuota(item.baseLotteryClassId,pei,qq1,qq2,qq3)">保存</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
//	import Vue from 'vue'
//	import { MessageBox} from 'mint-ui';
//	Vue.component(MessageBox.name, MessageBox);
  export default {
    data(){
      return{
        hide:false,
        data:"",
        listRebate:"",
        lastLoginTime:"",
        dl:false,
        peie:'',
        one:true,
        two:true,
        three:true,
        pei:'0',
        pei_a:'0',
        pei_b:'0',
        pei_c:'0',
        maxPeis:[],
        xq_but:true,
        qq1:'',
        qq2:'',
        qq3:'',
      }
    },
   mounted(){
      this.tel();
      console.log(this.pei_a);
     if( this.$route.query.act == sessionStorageGet("baseMember").account ){
       this.xq_but = false;
     }else {
       this.xq_but = true;
     }
      this.$route.query.lastTime = this.$route.query.lastTime == "" ? "" : this.$route.query.lastTime.substring(0,19);
      this.$refs.pei.value = this.Point;
   },
    methods:{
      mona(e){
        let reg=/^[0-9]\d*$/;
        if(!reg.test(e.target.value) ){
          this.qq1="";
        }
      },
      monb(e){
        let reg=/^[0-9]\d*$/;
        if(!reg.test(e.target.value)){
          this.qq2="";
        }
      },
      monc(e){
        let reg=/^[0-9]\d*$/;
        if(!reg.test(e.target.value)){
          this.qq3="";
        }
      },
     camcel:function(){
       this.hide= false;
       this.tel();
     },
     goback(){
    		sessionStorageSet('routeIndx', -1);
				this.$router.back()
			},
      //查詢配額
      tel(){
        let that = this;
        this.$axios({
          method:"get",
          url:"/inter/user/queryMemberInfoEdit/"+this.$route.query.act //
        }).then(function (data) {
          if(data.data.code == 1){
          	that.$dialog.alert({mes:data.data.msg});
//          MessageBox.alert(data.data.msg);
            that.$router.replace({name:'proxyMember'});
          }
          that.data = data.data.data;
          var maxPei = [];
          maxPei.push(data.data.data.maxRebet01,data.data.data.maxRebet02,data.data.data.maxRebet03,data.data.data.maxRebet04,data.data.data.maxRebet05);
          that.maxPeis = maxPei;
          that.listRebate = data.data.data.listRebate;
          for(var i=0;i<that.listRebate.length;i++){
            if(that.listRebate[i].baseLotteryClassId == 1 ){
              that.listRebate[i].baseLotteryClassId = "福体彩"
            }else if(that.listRebate[i].baseLotteryClassId ==2){
              that.listRebate[i].baseLotteryClassId = "六合彩"
            }else if(that.listRebate[i].baseLotteryClassId == 3){
              that.listRebate[i].baseLotteryClassId = "时时彩"
            }else if(that.listRebate[i].baseLotteryClassId == 4){
              that.listRebate[i].baseLotteryClassId = "快三"
            }else if(that.listRebate[i].baseLotteryClassId == 5){
              that.listRebate[i].baseLotteryClassId = "11选5"
            }else if(that.listRebate[i].baseLotteryClassId == 6){
              that.listRebate[i].baseLotteryClassId = "北京赛车"
            }
            if(that.listRebate[i].rebatePoint == null){
              that.listRebate[i].rebatePoint = "0"
            }
          }
          that.xqpz = data.data;
//          console.log(that.listRebate);
          if(that.data.baseMembers.hierarchy == 0){
            that.data.baseMembers.hierarchy = "会员";
            that.dl = true
          }else {
            that.data.baseMembers.hierarchy = "代理";
            that.dl = false
          }
          if(that.data.baseMembers.status == 0){
            that.data.baseMembers.status = "正常"
          }else if(that.data.baseMembers.status == 1){
            that.data.baseMembers.status = "禁止登入"
          }else if (that.data.baseMembers.status == 2){
            that.data.baseMembers.status = "黑名单"
          }else{
            that.data.baseMembers.status = "返回限制降点"
          }
        }).catch(function (error) {
          console.log(error)
        })
      },
      //转为代理
      Agency(){
       let that = this;
       this.$axios({
         method:'get',
         url:'/inter/user/updateMemberAgent/'+this.$route.query.act+""
       }).then(function (data) {
//         console.log(data);
that.$dialog.alert({mes:data.data.msg});
//       MessageBox.alert(data.data.msg);
         that.tel();
       }).catch(function (error) {
         console.log(error)
       })
      },
      //查看反水配额
      Quota( id ,q1,q2,q3){
        let that = this;
        that.can();
//        that.stop();
//        that.pei = that.pei
        that.hide = true;
        var pp;
        if( id == "福体彩" ){
          id = "1";
          pp = that.maxPeis[0] ;
        }else if(id =="六合彩"){
          id = "2";
          pp = that.maxPeis[1] ;
        }else if(id == "时时彩"){
          id = "3";
          pp = that.maxPeis[1] ;
        }else if(id == "快三"){
          id = "4";
          pp = that.maxPeis[3] ;
        }else if(id == "11选5"){
          id = "5";
          pp = that.maxPeis[4] ;
        }else if(id == "北京赛车"){
          id = "6";
          pp = that.maxPeis[2] ;
        }
        this.$axios({
          method:'post',
          url:'/inter/user/queryTeamQutaType',
          data:{
            account: this.$route.query.act, // 被修改会员
            type:id,// 彩种 1-福体彩 3-时时彩 4-快三 5 - 11选5  6-赛车
          }
        }).then(function (data) {
//          console.log(data);
          if( data.data.code != 0 ){
          	that.$dialog.alert({mes:data.data.msg})
//          MessageBox.alert(data.data.msg);
          }
          that.data = data.data.data;
//          console.log(that.data);
          that.Point = that.data.ownRebate[0].rebatePoint;
          that.pei = that.Point.toFixed(1);
          that.dataList = data.data.data.baseLotteryClass;
          that.maxRebatePoint = data.data.data.baseLotteryClass.maxRebatePoint;
//          console.log(that.maxRebatePoint);
          that.dataList['qq1'] = q1;
          that.dataList['qq2'] = q2;
          that.dataList['qq3'] = q3;
          that.qq1 = that.dataList['qq1'];
          that.qq2 = that.dataList['qq2'];
          that.qq3 = that.dataList['qq3'];
          that.rebatePoint = data.data.data.listRebate[0].rebatePoint;
          that.childRebatePoint = data.data.data.listRebate[0].childRebatePoint;
          that.teamQuota1= data.data.data.listRebate[0].teamQuota1;
          that.teamQuota2= data.data.data.listRebate[0].teamQuota2;
          that.teamQuota3= data.data.data.listRebate[0].teamQuota3;
//          console.log(that.teamQuota1);
//          console.log(that.teamQuota2);
//          console.log(that.teamQuota3);
          that.peie = data.data.data.listRebate;
          that.peie['max'] = pp;
              if(that.Point < that.maxRebatePoint-0.2){
                that.one = false;
                that.two = false;
                that.three = false;
              }else if(that.Point == that.maxRebatePoint-0.2){
                that.one = false;
                that.two = false;
                that.qq1='0';
                that.qq2='0';
                that.three = true;
              }else if(that.Point == that.maxRebatePoint-0.1){
                that.one = false;
                that.qq1='0';
                that.two = true;
                that.three = true;
              }else if(that.Point == that.maxRebatePoint){
                that.one = true;
                that.two = true;
                that.three = true;
              }
          for(var i=0, d=[];i<=(that.rebatePoint)*10;i++){
            var p = (i/10).toFixed(1);
            d.push(p)
          }
          that.dd = d.reverse();
        }).catch(function (error) {
          console.log(error)
        })
      },



      //修改反水配额
      changeQuota(id,p,a,b,c){
        let that = this;
        let pp;
        if( id == "福体彩" ){
          id = "1";
          pp = that.maxPeis[0] ;
        }else if(id =="六合彩"){
          id = "2";
          pp = that.maxPeis[1] ;
        }else if(id == "时时彩"){
          id = "3";
          pp = that.maxPeis[1] ;
        }else if(id == "快三"){
          id = "4";
          pp = that.maxPeis[3] ;
        }else if(id == "11选5"){
          id = "5";
          pp = that.maxPeis[4] ;
        }else if(id == "北京赛车"){
          id = "6";
          pp = that.maxPeis[2] ;
        }
        if(that.one = false){

        }
        this.$axios({
          method:'post',
          url:'inter/user/updateTeamRebet',
          data:{
            account: this.$route.query.act+"" ,// 被修改会员
            childRebet: p == ''? that.Point+"" : p ,
            teamQuota1:a+"" == '' ? "0" : a+"",
            teamQuota2:b+"" == '' ? "0" : b+"",
            teamQuota3:c+"" == '' ? "0" : c+"",
            type: id // 彩种 1-福体彩 3-时时彩 4-快三 5 - 11选5  6-赛车
          }
        }).then(function (data) {
          if(data.data.code != 0){
          	that.$dialog.alert({mes:data.data.msg});
//          MessageBox.alert(data.data.msg);
           if(that.pei== that.maxRebatePoint){
             that.one = true;
           }
            that.hide = true;
          }else if(data.data.code == 0){
          	that.$dialog.alert({mes:"修改成功"});
//          MessageBox.alert("修改成功");
            that.hide = false;
          }
          that.tel();
        }).catch(function (error) {
          console.log(error)
        })
      },
      can(){
          this.qq1='';
          this.qq2='';
          this.qq3='';
          this.pei = '';
      },
//      stop(){
//        var mo=function(e){e.preventDefault();};
//        document.body.style.overflow='hidden';
//        document.addEventListener("touchmove",mo,false);//禁止页面滑动
//      },
//      /***取消滑动限制***/
//      move(){
//        var mo=function(e){e.preventDefault();};
//        document.body.style.overflow='';//出现滚动条
//        document.removeEventListener("touchmove",mo,false);
//      }
    },
    watch:{
        pei(newpei,oldpei){
          let that = this;
          if(newpei<=0.2){
            that.one = false;
            that.two = false;
            that.three = false;
          }else if(newpei>0.2){
            if(newpei < that.maxRebatePoint-0.2){
              that.one = false;
              that.two = false;
              that.three = false;
            }else if( newpei == that.maxRebatePoint-0.2) {
              that.one = false;
              that.two = false;
              that.three = true;
//              that.qq1='0';
//              that.qq2='0';
//              that.qq3 = that.listRebate[0].teamQuota3;
            }else if(newpei == that.maxRebatePoint-0.1){
              that.one = false;
              that.two = true;
              that.three = true;
//              that.qq1='0';
//              that.qq2 = that.listRebate[0].teamQuota2;
//              that.qq3 = that.listRebate[0].teamQuota3;
            }else if(newpei == that.maxRebatePoint){
              that.one = true;
              that.two = true;
              that.three = true;
//              that.qq1 = that.listRebate[0].teamQuota1;
//              that.qq2 = that.listRebate[0].teamQuota2;
//              that.qq3 = that.listRebate[0].teamQuota3;
            }
          }
        }
    }
  }
</script>
<style scoped>
  body,html{
    height: 100%;
    overflow: hidden;
  }
  ._AccountDetails_aDetails{
  	position: absolute;
  	height: 100%;
    padding-top:1.125rem;
    z-index: 1;
  }
  ._AccountDetails_aDetails_in{
    position: fixed;
    top: 0;
    left: 50%;
    width: 3rem;
    margin-left: -1.5rem;
    color:#fff;
    height:1.125rem;
    z-index: 9999;
    line-height: 1.125rem;
    text-align: center;
    font-size: 0.4rem;
  }
*{

  color: #1e2026;
}
  ul li{
    list-style: none;
  }
  ._AccountDetails_ad_account,._AccountDetails_ad_type{
    width: 100%;
    height: 5.5625rem;
    padding: 0.5rem 0.375rem ;
    box-sizing: border-box;
    border-bottom: 0.125rem solid #f1f1f0;
  }
  ._AccountDetails_ad_type{
    height: 3.34375rem !important;
    position: relative;
  }
  ._AccountDetails_ad_account>li{
     width: 100%;
     height: 0.73125rem;
   }
  ._AccountDetails_ad_account>li>div{
        display: inline;
       width: 2rem;
       color: #eeaf18 !important;
     }
  ._AccountDetails_ad_account>li>._AccountDetails_ad_account_but{
    display: inline-block;
    width: 1.875rem;
    height: 0.73125rem;
    background-color: #0a9e42;
    color: white;
    text-align: center;
    line-height: 0.73125rem;
    border-radius: 0.1rem;
  }
  ._AccountDetails_ad_type>li{
    width: 50%;
    float: left;
    height: 0.73125rem;
  }
  ._AccountDetails_ad_type>li>div{
    display: inline;
    text-align: justify;
    text-justify: distribute-all-lines;
    text-align-last: justify;
    float: left;
    height: 0.73125rem;
    width: 2rem;
    color: #eeaf18;
  }
  ._AccountDetails_ad_type>._AccountDetails_to_pz{
    position: absolute;
    right: 0.5rem;
    bottom: 0.3rem;
    height: 0.875rem;
    width: 2.375rem;
    text-align: center;
    line-height: 0.875rem;
    border: 0.0125rem solid #3b3d42 ;
    border-radius: 0.1rem;
    box-sizing: border-box;
    background-color: #edac0c;
    color: white;
  }
  ._AccountDetails_motable{
    height: 100%;
    width: 100%;
    position: fixed;
    top: 0;left: 0;
    background: rgba(70,70,70,0.8);
    z-index: 10;
  }
  ._AccountDetails_text{
    width: 9rem;
    height: 6.5rem;
    background-color: white;
    opacity: 1 !important;
    position: absolute;
    top:50%;
    left: 50%;
    margin-left: -4.5rem;
    margin-top: -3.25rem;
    padding: 0.375rem 0.3rem;
    box-sizing: border-box;
  }
  ._AccountDetails_peie{
    height: 0.71875rem;
    margin: 0.2rem 0;
  }
  ._AccountDetails_peie_input{
    width: 1.4rem;
    height: 0.71875rem;
    border: 1.5px solid #9d9ea1;
    border-radius: 0.1rem;
    box-sizing: border-box;
    padding-left: 1.5px;
    background-color: #f1f1f0;
  }
  ._AccountDetails_but{
    width: 4rem;
    float: right;
    margin-top: 0.33rem;
  }
  ._AccountDetails_but>button{
    width: 1.625rem;
    height: 0.71785rem;
    border-radius: 0.1rem;
    color: white;
  }
  ._AccountDetails_but_camcel{
    background-color: #dedede;
  }
  ._AccountDetails_but_keep{
    background-color: #edac0c;
  }
  ._AccountDetails_fsbl{
    height: 1rem;
  }
  ._AccountDetails_fsbl>div{
    height: 1rem;
    width: 2rem;
    text-align: right;
    float: left;
    position: relative;
  }
  ._AccountDetails_fsbl>select{
    width: 5rem;
    /*height: 1rem;*/
    height: 0.71785rem;
    border: 0.0125rem solid #3b3d42;
    border-radius: 0.1rem;
    box-sizing: border-box;
    float: right;
    margin-right: 1rem;
  }
  ._AccountDetails_zgbl{
    display: inline;
    position: absolute;
    top:0.5rem;
    left: -0.5rem;
    width: 2.5rem;
    height: 0.6rem;
    font-size: 0.2rem ;
    color: #3b3d42;
  }
  h1{
    height: 1rem;
    font-weight: 700;
  }
</style>
