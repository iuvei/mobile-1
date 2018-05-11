<template>
  <div class="activity">
      <ul class="activity_content_ul">
        <li v-for="(item,index) in data" >
          <img class="img" :src="item.documentImageNewname" @click="activity_details(index)">
          <div v-show="show && idx == index" v-html="item.documentConetnt">
            {{item.documentConetnt}}
          </div>
          <div v-show="show && idx == index" class="activities">
            <!--<div class="participate_activities" >参加活动</div>-->
            <router-link to="/charge/companyIncome/bankPay" tag="div" :class="{'participate_activities_1':isActive}">参加活动</router-link>
          </div>
        </li>
      </ul>
  </div>
</template>
<script>
//	import Vue from 'vue'
//	import { MessageBox} from 'mint-ui';
//	Vue.component(MessageBox.name, MessageBox);
  export default {
    data(){
      return{
        data:"",
        show:false,
        isActive:false
      }
    },
    activated(){
    	this.show=false;
    	if(sessionStorageGet("baseMember")['type']=='1'){
    		this.isActive=true;
    	}else{
    		this.isActive=false;
    	}
    },
    created(){
      let that = this;
      this.$axios({
        method:"get",
        url:'/notice/queryDocumentContentList/?documentListId=402880435f948968015f948c1c8a0000'
      }).then(function (data) {
          console.log(data);
        that.data = data.data.data;
      }).catch(function (error) {
        console.log(error)
      })
    },
    methods:{
      activity_details( index ){
        this.idx = index;
        this.show = !this.show;
      }
    }
  }
</script>
<style scoped>
  *{
    margin: 0;
    padding: 0;
  }
  .activity{
    /*z-index: 100;*/
   /* padding-top: 1.125rem;*/
    width: 100%;
    /*height: 100%;*/
    background-color: #f1f1f0;
    position: absolute;
    overflow: auto;
    color: black;
   /* box-sizing: border-box;*/
     bottom: 1.34rem;
     top: 1.125rem;
  }
  .activity_content_ul{
  	/*position: absolute;
  	top: 1.125rem;
    overflow: au;
    bottom: 1.34rem;*/
  }
  .activity_content_ul>li{
    width: 100%;
    margin-bottom: 0.25rem;
  }
  .activity_content_ul>li>div{
   overflow: hidden;
  }
  .img{
    width: 100%;
    height: 3rem;
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }
  .activities{
    width: 100%;
    border-top: 1px solid #cecece;
    border-bottom:1px solid #cecece ;
    border-radius: 0 0 5px 5px;
  }
  .activities>div{
    width: 2rem;
    height: 0.8rem;
    margin: 0.2rem auto;
    background-color: #27ae60;
    color: white;
    text-align: center;
    line-height: 0.8rem;
    border-radius: 3px;

  }
  .participate_activities_1{
  	 background-color: #c5c5c5!important;
  }

</style>
