<template>
  <div  id="container" @click="Hidden" >
    <div class="scroller">
      <aside>
        <div class="head_email">
          <div>
            <span><img src="../../static/images/picture.png" alt=""></span>
            <ul>
              <li>{{information.account}}</li>
              <li>会员类型：{{information.hierarchy==0?type[information.type]:information.hierarchy+'级代理'}}</li>
            </ul>
          </div>
          <span style="position: relative;" @click="goAnnouncement"><img src="../../static/images/email.png" alt=""><img src="../../static/images/weidu.png" class="weidu" v-show="nouvelles" /></span>
        </div>
        <section>
          <router-link to="/accountReport" tag="div" ><p :class="{disable:isActive}">账变记录</p></router-link>
          <router-link :to="{ path: '/personalReport', query: { plan: 'private' }}" tag="div"><p>个人报表</p></router-link>
          <router-link to="/question" tag="div"><p>常见问题</p></router-link>
        </section>
        <div class="type">
          <ul v-for="item in lists" >
            <li :class="{active:item.show}" class="title" @click="toggle(item)">
              <p class="ClassObj"><img style="background: white;border-radius: 50%" :src="'../../static/images/container/'+item.classId+'.png'">{{item.className}}</p>
            </li>
            <transition-group name="down" tag="p">
              <li class="kindObj" v-show="item.show" v-bind:key="'item'">
                <div>
                  <p v-cloak @click="goBettingHall(obj)" v-for="obj in item.kindList">{{obj.kindName}}</p>
                </div>
              </li>
            </transition-group>
          </ul>
        </div>
        <div class="button_div">
          <button @click="exit"><span><img src="../../static/images/tuichu.png" alt=""></span>退出</button>
        </div>
      </aside>
    </div>
  </div>
</template>
<script>
//	import Vue from 'vue'
//	import { MessageBox} from 'mint-ui';
//	Vue.component(MessageBox.name, MessageBox);
  export default{
    props:['slider','information'],
    data(){
      return{
        type:["正式会员","游客","测试会员"],
        lists:'',
        isActive:false,
        show:false,
        classId:'',
        nouvelles:false,
        newdataList:[]
      }
    },
    methods:{
    	goAnnouncement(){
    		 this.$router.push({name:'announcement'})
    	},
      //点击隐藏侧边框；
      Hidden:function (event) {
        if(event.clientX>document.getElementsByTagName('aside')[0].offsetWidth){
          this.$emit('hidden');
        }
      },
      //退出；
      exit:function () {
        let that = this;
        this.$axios({
          method:'GET',
          url:'/inter/user/userLogOut',
        }).then(function (data) {
          if(data.data.code==0){
            sessionStorage.clear();
            that.websocket.close();
            that.$router.replace({path:'/login'});
          }
//          else if(data.data.code=='666'){
//          	 sessionStorage.clear();
//            that.websocket.close();
//            that.$router.replace({path:'/login'});
//          }
        }).catch(function (error) {
          console.log(error);
        })
      },
      //点击展示隐藏小彩种；
      toggle:function (obj) {
        this.classId=obj.classId;
        if(obj.show==false){
          for(var k=0;k<this.lists.length;k++){
            this.lists[k].show=false;
            obj.show=true;
          }
        }else {
          obj.show=!obj.show;
        }
      },
      //跳转到投注页面；
      goBettingHall:function (object) {
        this.$router.push({name:'bettingHall',query:{'kindId':object.kindId,'classId':this.classId}})
      }
    },
    mounted () {
      let that=this;
      if(!sessionStorageGet('baseMember')){
      	 that.$dialog.alert({mes:'未登入',callback:function(){
								 sessionStorage.clear();
								  that.$router.replace({name:'login'});
							}})
//      MessageBox.alert("未登入").then(function () {
//        that.$router.replace({name:'login'});
//        sessionStorage.clear();
//      })
      }else if(this.information.type=='1')
      this.isActive=true;
      //公告；
       this.$axios({
				method: 'GET',
				url: '/notice/queryNoticeAlertList?is_read=' + "&memberid=" + sessionStorageGet('baseMember').account
			}).then(function(data) {
				that.newdataList = data.data.data;
				that.newdataList.forEach((item) => {
					if(item.isRead == 0) {
						that.nouvelles = true;
						return false;
					}
				})
			}).catch(function(error) {
				console.log(error)
			})
      //如果有本地数据则不再请求；
      if(sessionStorageGet('kinds')){
         var datas=sessionStorageGet('kinds');
        for(var i=0;i<datas.length;i++){
          if(datas[i].kindList.length!=0){
            datas[i]["show"]=false;
          }
        }
        that.lists=datas;
      }else{
        this.$axios({
          method:'GET',
          url:'/inter/ticket/kind'
        }).then(function (data) {
          for(var i=0;i<data.data.data.length;i++){
            if(data.data.data[i].kindList.length!=0){
              data.data.data[i]["show"]=false;
            }
          }
          that.lists=data.data.data;
        }).catch(function (error) {
        })
      }
      },
    watch:{
      //跳转之后侧边栏隐藏；
      $route(path){
        this.$emit('hidden');
      }
    }
  }
</script>


<style scoped>
	.head_email .weidu {
		position: absolute;
		top: -0.08rem;
		width: .3rem;
		height: .3rem;
		right: -0.08rem;
		z-index: 1000;
	}
  [v-cloak] {
    display: none;
  }
  #container{
    width: 100%;
  }
  #container>div,aside{
    height: 100%;
  }
  aside,.button_div{
    width: 7.34rem;
    background: #3c3d42;
  }
  aside{
    position: fixed;
    left: 0;
    bottom: 0;
  }
  .head_email,section,.type,button{
    width: 6.9rem;
    margin: auto;
  }
  .type{
    height: 9.4rem;
    overflow: auto;
  }
  .head_email,.head_email>div{
    display: flex;
    align-items: center;
  }
  .head_email{
    height: 2.66rem;
    justify-content: space-between;
  }
  .head_email>div>span{
    margin-right: 0.32rem;
  }
  .head_email>div>span>img{
    width: 1.34rem;
  }
  .head_email>span>img{
    width: 0.5rem;
  }
  section,section>div{
    height: 1rem;
    display: flex;
    background: #2f3237;
    border-radius: 3px;
  }
  section>div{
    flex: 1;
    justify-content: center;
    align-items: center;
  }
  section>div:nth-child(2) p{
    width: 100%;
    display: flex;
    justify-content: center;
    border-left: 1px solid white;
    border-right:1px solid white ;
  }
  .type>ul{
    margin-left: 0.2rem;
    margin-top: 0.3rem;
    margin-bottom: 0.2rem;
  }
  .ClassObj{
    height: 1rem;
    display: flex;
    align-items: center;
  }
  .ClassObj>img{
    width: 0.84rem;
    margin-right: 0.2rem;
  }
  .kindObj>div{
    width: 4.68rem;
    margin: auto;
    display: flex;
    flex-wrap: wrap;
  }
  .kindObj p{
    width: 50%;
    height: 1rem;
    display: flex;
    align-items: center;
  }
  .button_div{
    text-align: center;
    position: absolute;
    bottom: 0.5rem;
  }
  button{
    color: white;
    background: #fe5b5c;
  }

  .disable{
    color: #8b8b8b;
  }
  .active{
    background: #4c4f54;
  }
  .down-enter-active{
    transition: all 0.3s ease
  }
.down-leave-active{
    transition: all 0.3s ease;
  }
  .down-enter,.down-leave-to{
    transform: translateY(-1rem);
    opacity: 0;
  }

</style>

