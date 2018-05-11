<template >
  <div id="app" ref="app">
    <component v-show="reveal" :is="datas.currentView" :message="datas" @Show="showView" @loginDisplay="ld" >

    </component>
    <transition name="Slider">
      <SideView  v-cloak :information="personInformation" @hidden="hiddenShow" v-if="slider"  style="z-index:1002;height:100%;position: absolute;top: 0;left: 0"></SideView>
    </transition>
    <!--选择性缓存-->
    <transition :name="!istransition&&!onMove?'vux-pop-' + (direction === 'forward' ? 'in' : 'out'):''">
      <keep-alive>
      <router-view  :class="!istransition?'router-view':''" v-if="$route.meta.keepAlive || $route.meta.alive" ></router-view>
      </keep-alive>
    </transition>
    <transition :name="!istransition&&!onMove?'vux-pop-' + (direction === 'forward' ? 'in' : 'out'):''">
    <router-view :class="!istransition?'router-view':''"  v-if="!($route.meta.keepAlive) && !($route.meta.alive)"></router-view>
    </transition>

    <FooterNav v-if="clear"  ></FooterNav>
    <div id="div" v-show="isShow"><a></a></div>
  </div>
</template>
<script>

// var mo=function(e){e.preventDefault();};
//document.removeEventListener("touchmove",mo,false);
  import FooterNav from './components/FooterNav.vue'
  import SideView from './components/SideView.vue'
  import ComHead from './common/ComHead.vue'
  import TitleNav from './common/TitleNav.vue'
  import LoginNav from './common/LoginNav.vue'
  import childNav from './common/childNav.vue'
  import global_ from './Global.vue';
  import  {bus}  from './bus.js';
  import { MessageBox} from 'mint-ui';
  export default {
    name: 'app',
    data () {
      return {
      	routerArr:[],
        routes:['/Irecord','/activity','/award','/person','/home'],
        slider:false,
        clear:true,
        reveal:true,
        datas:{
          currentView:'ComHead',
          data:1,
          show:true
        },
        personInformation:'',
        //页面切换动画效果
        slipp:"",
        transitionName:"slide-right",
        direction:"",
        to:"",
        onMove:false,
        showDialog: true,
        link:'',
        isShow:true
      }
    },
    components: {
      ComHead,
      FooterNav,
      SideView,
      TitleNav,
      LoginNav,
      childNav,
    },
    destroyed () {
           sessionStorage.clear()
              },
    mounted(){
    	let that = this
      this.$axios.interceptors.response.use(function (response) {
	if(response.config.method=="get"||response.config.method=="post"){
		if (response.data.code == 666&&that.to!="/home"){
    	that.$dialog.alert({mes:"未登入",callback:function(){
								 sessionStorage.clear();
								that.$router.replace({name:'login'})
							}})
//      router.replace({name:'login'})
//       sessionStorage.clear()
    }
	}

    return response
}, function (error) {
    // Do something with response error
    return Promise.reject(error)
})
      this.startMove();
      bus.$on('newMessage', (msg) => {
        let type =JSON.parse(msg.data) ;
         if(type.messageType == '10'){
           MessageBox.alert(type.notice);
         }
      })
    },
    methods:{
      //在线客服
      Service(){
        var that=this;
        this.$axios({
          method: 'get',
          url:'/collect/helpService',
        }).then(function (data) {
          that.link=data.data.data
        }).catch(function (error) {
          console.log(error)
        })
      },
      //全局滑动效果
      startMove:function () {
        var that=this;
        var flag = 0; //标记是拖曳还是点击
        var oDiv = document.getElementById('div');
        var disX,moveX,moveY,L,T,starX,starY,starXEnd,starYEnd,disY;
        oDiv.addEventListener('touchstart',function(e){
          flag = 0;
          e.preventDefault();//阻止触摸时页面的滚动，缩放
          disX = e.touches[0].clientX - this.offsetLeft;
          disY = e.touches[0].clientY - this.offsetTop;
          //手指按下时的坐标
          starX = e.touches[0].clientX;
          starY = e.touches[0].clientY;
          //console.log(disX);
        });
        oDiv.addEventListener('touchmove',function(e){
          flag = 1;
          L = e.touches[0].clientX - disX ;
          T = e.touches[0].clientY - disY ;
          //移动时 当前位置与起始位置之间的差值
          starXEnd = e.touches[0].clientX - starX;
          starYEnd = e.touches[0].clientY - starY;
          //console.log(L);
          if(L<0){//限制拖拽的X范围，不能拖出屏幕
            L = 0;
          }else if(L > document.documentElement.clientWidth - this.offsetWidth){
            L=document.documentElement.clientWidth - this.offsetWidth;
          }
          if(T<0){//限制拖拽的Y范围，不能拖出屏幕
            T=0;
          }else if(T>document.documentElement.clientHeight - this.offsetHeight){
            T = document.documentElement.clientHeight - this.offsetHeight;
          }
          moveX = L + 'px';
          moveY = T + 'px';
          //console.log(moveX);
          this.style.left = moveX;
          this.style.top = moveY;
        });
        oDiv.addEventListener('touchend',function(e){
          //alert(parseInt(moveX))
          //判断滑动方向
          if(flag === 0) {//点击
            window.open(that.link);
          }
        });
      },
      //更新金钱
      renewMoney:function () {
        let self=this;
        self.$axios({
          method:'get',
          url:'/inter/user/userDetail'
        }).then(function (data) {
          let baseMember=sessionStorageGet('baseMember');
          if(baseMember){
            baseMember.accountBalance=data.data.data.accountBalance;
            sessionStorageSet('baseMember',baseMember);
            self.money=data.data.data.accountBalance;
          }
        }).catch(function () {

        })
      },
      //主页面试玩显示用户名；
      ld:function () {
        this.datas.currentView='LoginNav';
      },
      //隐藏底部导航
      hiddenBottomNav:function () {
        for(var k=0,a=0;k<this.routes.length;k++){
          if (this.$route.path==this.routes[k]){
            a+=1;
          }
        }
        if(a==0){
          this.clear=false;
          this.datas.currentView='childNav'
        }
      },
      //隐藏侧边框
      hiddenShow:function () {
        this.slider=false
      },
      //显示侧边框
      showView:function () {
        this.slider=true;
        this.personInformation=sessionStorageGet("baseMember");
      },
      //路由信息获取
      getRoute:function () {
        if (this.$route.path == '/home') {
        this.datas.currentView='ComHead'
        }else {
          this.datas.currentView='TitleNav';
          this.datas.data=this.$route.params.id;
          if(this.$route.path == '/person'){
            this.datas.show=true
          }else{
            this.datas.show=false
          }
        }
      },
      //登入界面展示（清除上下导航）
      clearRoute:function () {
        if(this.$route.path != '/Irecord'&&this.$route.path!='/activity'&&this.$route.path!='/home'&&this.$route.path!='/award'&&this.$route.path!='/person'){
          this.clear=false;
          this.reveal=false;
          this.slider=false;
          this.istransition = false;
        }else {
          this.clear=true;
          this.reveal=true;
          this.istransition = true;
        }
      },
      //玩家显示
      PlayerShow:function () {
        const Player=sessionStorage.getItem("code");
        if(Player==0&&(this.$route.path=='/home'||this.$route.path=='/')){
          this.datas.currentView='LoginNav'
        }
      },
      //路由传参，根据参数匹配标题信息
      conveyArguments:function () {
        const rt=this.$route.path;
//        console.log(this.$route);
        switch(rt){
          case '/Irecord':
            this.$route.params.id=0;
            break;
          case '/activity':
            this.$route.params.id=1;
            break;
          case '/award':
            this.$route.params.id=3;
            break;
          case '/person':
            this.$route.params.id=4;
            break;
          case '/enterjilu':
            this.$route.params.id=0;
            break;
          case '/security':
            this.$route.params.id=1;
            break;
          case '/tuiguanglink':
            this.$route.params.id=2;
            break;
          case '/administration':
            this.$route.params.id=3;
            break;
          case '/LotteryReport':
            this.$route.params.id=4;
            break;
          case '/Change':
            this.$route.params.id=5;
            break;
          case '/CashflowRecord':
            this.$route.params.id=6;
            break;
          case '/ProxyMember':
            this.$route.params.id=7;
            break;
          case '/withdraw':
            this.$route.params.id=9;
            break;
          case '/dataBind':
            this.$route.params.id=10;
            break;
          case '/lotteryHistory':
            this.$route.params.id=11;
            break;
          case '/personalReport':
            this.$route.params.id=12;
            break;
          case '/accountReport':
            this.$route.params.id=13;
            break;
        }
      }
    },
    created:function () {
      this.Service();
    	window.addEventListener("touchmove",()=>{
   		this.onMove = true
   	})
   	window.addEventListener("click",()=>{
   		this.onMove = false
   	})
      let self=this;
    	bus.$on('UPDATE_DIRECTION', (data) => {
                   this.direction=data.direction;
//                   console.log(this.direction)
              });

    	if(sessionStorageGet('baseMember')!=null){
    		this.websocketf()
    	}
      this.conveyArguments();
      this.getRoute();
      this.clearRoute();
      this.PlayerShow();
      this.hiddenBottomNav();
      //页面刷新时在线充值的头部；
      if(this.$route.matched.length!=0&&this.$route.matched[0].path=='/charge'){
        this.$route.params.id=8;
        //页面刷新时常见问题的头部；
      }else if(this.$route.matched.length!=0&&this.$route.matched[0].path=='/question'){
        this.$route.params.id=14;
      }
      bus.$on('newMessage',function (msg) {
        let datalist = JSON.parse(msg.data);
        if (datalist.messageType != 3) {
          self.$axios({
            method: 'get',
            url: '/inter/user/userDetail'
          }).then(function (data) {
            var baseMember = sessionStorageGet('baseMember');
            if (baseMember) {
              baseMember.accountBalance = data.data.data.accountBalance;
              sessionStorageSet('baseMember', baseMember);
            }
          }).catch(function () {

          })
        }
      })
    },




    watch: {
      $route (data,from) {
         this.to=data.path;
         if(this.to =="/login"||this.to=="/home"){
         	this.isShow = true
         }else{
         	this.isShow = false
         }
         if(data.path!='/login'&&data.name!='register'&&data.name!="container"){
         	 this.renewMoney();
         }
         if(data.path =="/login"&&from.path!="/"&&sessionStorageGet('baseMember')){
         	this.websocket.close();
         }
//       console.log(data)
        if(data.path=='/person'){
          this.$route.params.id=4;

        }
        this.conveyArguments();
        this.getRoute();
        this.clearRoute();
        this.PlayerShow();
        this.hiddenBottomNav();
        //路由跳转时在线充值的头部；
        if(data.matched.length!=0&&data.matched[0].path=='/charge'){
          this.$route.params.id=8;
          //路由跳转时常见问题的头部；
        }else if(this.$route.matched.length!=0&&this.$route.matched[0].path=='/question'){
          this.$route.params.id=14;
        }
        //判定路由跳转是否显示动画
        if(!this.$route.meta.slide){
          this.slipp="Esea";
        }else {
          this.slipp=""
        }
        if(this.routerArr.indexOf(data.from)!=-1) {
　　　　　　　　this.routerArr.push(data.path)
　　　　　　} else {

　　　　　}
      },
      routerArr(newArr,oldArr){
      	if(newArr.length>oldArr.length){
      		this.transitionName = 'slide-right'
      	}else{
      		 this.transitionName = 'slide-left'
      	}
      },

    }
}
</script>

<style scoped>
  #div{
    position: fixed;
    right: 0.8rem;
    bottom: 2rem;
    width: 1.2rem;
    height: 1.2rem;
    z-index:9999;
    background-color: white;
    border-radius: 100% 100%;
    background-size: 100% 100%;
    box-shadow: 0 0 1px #000 inset;

  }
  #div>a{
    display: block;
    text-decoration: none;
    margin:0.1rem auto ;
    width: 1rem;
    height: 1rem;
    z-index:999;
    border-radius: 100% 100%;
    background-image: url("../static/images/service.png");
    background-size: 100% 100%;
  }

	.router-view {
    transition: all 250ms;
    width: 100%;
    height: 100%;
    position: absolute;
  }

  .vux-pop-out-enter {
     opacity: 0;

    transform: translate3d(-100%, 0, 0);
  }

  .vux-pop-out-leave-active {
    opacity: 0;

    transform: translate3d(100%, 0, 0);
  }

  .vux-pop-in-enter {
     opacity: 0;

    transform: translate3d(100%, 0, 0);
  }

  .vux-pop-in-leave-active {

    transform: translate3d(-100%, 0, 0);
  }
#app {
	-webkit-overflow-scrolling:touch;
         overflow-scrolling: touch;
	/*position: relative;*/
/*	height: 100%;*/
	width: 100%;
	/*height: 100%;*/
	/*position: absolute;*/
	/*top: 0;*/
	/*bottom: 0;*/
  /*height: 100%;*/


}
.nav-left>img{
  float: left;
  width: 0.5rem;
  margin-top: 0.4rem;
  margin-right: 0.14rem;
  margin-left: 0.4rem;
}
.nav-container>p{
  line-height: 1.2rem;
  text-align: center;
  position: absolute;
  left:0 ;
  right: 0;
}
.nav-right>li{
  width: 1.16rem;
  height: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 0.1875rem;
  border-radius: 4px;
}
.nav-right li:nth-child(1){
  background: #edac0c;
}
.nav-right li:nth-child(2){
  background: #5facfa;
}
.nav-right li:nth-child(3){
  background: #42b035;
  /*margin-right: 0.53rem;*/
}
.Slider-enter-active, .Slider-leave-active {
  transition: all .3s ease
}
.Slider-enter, .Slider-leave-to{
  transform: translateX(-7.31rem);
}
.Router {
 position: absolute;

 transition: all .3s linear;

}

.slide-left-enter,
 .slide-right-leave-active {

 -webkit-transform: translate(100%, 0);
 transform: translate(100%, 0);
}

.slide-left-leave-active,
.slide-right-enter {

 -webkit-transform: translate(-100%, 0);
 transform: translate(-100% 0);
}
</style>
