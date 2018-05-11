<template>
  <div class="kj" style="background-color: #3b3d42;position:absolute;top:1.125rem;bottom:1.34rem;width:100%">
    <div id="nav" style="position:fixed;top: 1.125rem; background-color: #9d9ea1;z-index: 100">
      <div class="p2">开奖种类:</div>
      <select name="" id="" v-model="classId" class="cz_id" @click="show = !show" >
        <option selected v-for="(item,index) in data"  :value="item.classId" >{{item.className}}</option>
      </select>
    </div>
    <!--<transition name="slide-fade">-->
    <!--<div style="width: 100%;height: 2.25rem;background: #3b3d42;"></div>-->
    <div style="width: 100%;position:absolute;top:1.125rem;bottom:0rem;background-color: #3b3d42;overflow: auto"  >
      <div class="kj_list" v-for="(item,index) in AclassId">
        <div class="kj_container" >
          <div class="kj_container_title">
            <div> <span class="kj_name">{{item.lotteryName}}</span> <span class="kj_date">第{{item.periodNo}}期</span> <span class="kj_time">{{item.awardTime.substring(0 ,19)}}</span></div>
          </div>
          <div class="kj_container_haoma"  v-bind:class="{ active: isActive }">
            <div v-for="item in arr[0][index]">{{item}}</div>
          </div>
          <router-link :to="{ name:'lotteryHistory',query:{kid:item.baseLotteryId,lName:item.lotteryName,cId:classId}}" class="next"></router-link>
        </div>
      </div>
    </div>
    <!--</transition>-->
    <div v-show="no" class="no"></div>
  </div>

</template>
<script>
//	import Vue from 'vue'
//	import { MessageBox} from 'mint-ui';
//	Vue.component(MessageBox.name, MessageBox);
  export default{
    data(){
      return {
        data:[],
        sscName:"",
        classId:'3',
        AclassId:[],
        arr:[],
        periodNo:'',
        pn:'',
        at:'',
        cId:'',
        id:'',
        no:false,
        show:true,
        isActive:false
      }
    },
    created(){
      let that = this;
      this.$axios({
        method:"get",
        url:"/inter/ticket/kind"
      }).then(function (data) {
//        console.log(data);
        that.data = data.data.data;
      }).catch(function (error) {
        console.log(error);
      });
      this.$axios({
        method:"get",
        url:'/inter/ticket/winHistory/'+ "3"
      }).then(function (data) {
//        console.log(data);
        that.AclassId = data.data.data;
//        console.log(that.AclassId);
        for(let i=0, a=[];i<that.AclassId.length;i++){
//          console.log(that.AclassId[i].winNum);
          that.periodNo = that.AclassId[i].periodNo;
          if(that.AclassId[i].winNum == null){
            a.push(['?','?','?','?','?'])
          }else {
            a.push((that.AclassId[i].winNum).split(","));
          }
          that.arr.push(a);
        }
//        console.log(that.arr)
      }).catch(function (error){
        console.log(error)
      })
    },
    methods:{
      cxkj(){
        console.log(this.classId);
        let vm  = this;
        this.$axios({
          method:"get",
          url:'/inter/ticket/winHistory/'+this.classId
        }).then(function (data) {
//          console.log(data);
          vm.AclassId = data.data.data;
//          console.log(vm.AclassId);
          vm.arr = [];
          for(let i=0, a=[];i<vm.AclassId.length;i++){
//            console.log(vm.AclassId[i].winNum);
            vm.periodNo = vm.AclassId[i].periodNo;
            if(vm.AclassId.length == 0){
              vm.no = true;
              vm.isActive = false;
            }else if(vm.AclassId[i].winNum == null && vm.classId == 6){
              vm.isActive = true;
              a.push(['?','?','?','?','?','?','?','?','?','?'])
            }else if(vm.AclassId[i].winNum == null && (vm.classId == 4 || vm.classId == 1 )) {
              vm.isActive = false;
              a.push(['?','?','?'])
            }else if(vm.AclassId[i].winNum == null){
              vm.isActive = false;
              a.push(['?','?','?','?','?'])
            }else{
              vm.isActive = false;
              a.push((vm.AclassId[i].winNum).split(","));
            }
            vm.arr.push(a);
          }
        }).catch(function (error){
          console.log(error)
        })
      }
    },
    watch:{
      classId(pp){
        this.cxkj();
      }
    },
    //监听路由从哪里来 from
    beforeRouteEnter (to, from, next) {
      if( from.path == "/lotteryHistory" ){
        to.meta.alive = true;
      }else{
        to.meta.alive = false;
      }
//      if(sessionStorageGet("baseMember")['type']=='1'){
//        next()
//      }else {
        next()
//      }
    }
  }
</script>
<style scoped>
  *{
    margin: 0;
    padding: 0;
  }
  .no{
    height: 5rem;
    width: 5rem;
    position: fixed;
    top: 50%;
    left: 50%;
    margin-left: -2.5rem;
    background: url("../../static/images/img/no.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
  }
  #nav{
    width: 100%;
    height: 1.125rem;
    background-image: linear-gradient(to bottom,#494c56,#1e2027 );
    display: flex;
    align-items: center;
    justify-content: space-around;
    position: relative;
  }
  #nav>.p1{
    margin-left: -0.8rem;
  }
  p{
    color: white;
  }
  img{
    width: 0.5rem;
  }
  .p2{
    margin-right: -0.8rem;
  }
  select{
    border-radius: 5px;
    border:1px solid  #ccc;
    appearance: none;/*清除select下拉框默认样式*/
    -moz-appearance: none;
    -webkit-appearance: none;
    padding-right: 0.6rem;
    padding-left: 0.2rem;
    background: url("../../static/images/img/xiala.png") no-repeat scroll right center transparent;
    background-size: 0.5rem 0.5rem;
    /*background: #2b2c30;*/
    color: white;
  }
  select option{
    color: #000;
  }
  .kj_date{
    float: right;
    color: #5facfa;
    width: 3.5rem;
    /*height: 0.3rem;*/
    font-size: 0.38rem;
  }
  .kj_name{
    float: left;
    width: 2.2rem;
    /*font-size: 0.4rem;*/
  }
  .kj_time{
    float: left;
    color: #d39b14;
    width: 3.7rem;
    /*height: 0.3rem;*/
    /*font-size: 0.4rem;*/
  }
  /****************************************************/
  .kj_list{
    width: 100%;
    /*height: 2.335rem;*/
    overflow: hidden;
    background-color: #3b3d42;
    border-bottom: solid 0.03rem white;
    position: relative;
    /*z-index: 10;*/
  }
  .kj_container{
    width: 9.6rem;
    overflow: hidden;
    /*height: 2.335rem;*/
    margin: auto;
  }
  .kj_container_title{
    width: 9.6rem;
    height: 1.1675rem;
  }
  .kj_container_title div{
    line-height: 1.1675rem;
    font-size: 0.35rem;
    color: white;
  }
  .kj_container_title label{
    font-size: 0.28rem;
    color: #edac0c;
  }
  .kj_container_haoma{
    width: 9.3rem;
    height: 1.1675rem;
  }
  .kj_container_haoma div{
    width: 0.9rem;
    height: 0.9rem;
    color: black;
    border-radius: 50%;
    background-color: white;
    float: left;
    text-align: center;
    line-height: 0.9rem;
    margin: 0.1rem 0 0 0.13rem;
    font-size: 18px;
  }
  .next{
    position: absolute;
    top: 30%;
    right: 0.2rem;
    height: 1.2rem;
    width: 0.8rem;
    background: url("../../static/images/img/icon/right.png") no-repeat 100% 100%;
  }
  .active{
    width: 5.2rem;
    height: 2.33rem;
  }
  .active div{
    width: 0.9rem;
    height: 0.9rem;
    color: black;
    border-radius: 50%;
    background-color: white;
    float: left;
    text-align: center;
    line-height: 0.9rem;
    margin: 0.1rem 0 0 0.13rem;
    font-size: 18px;
  }

</style>
