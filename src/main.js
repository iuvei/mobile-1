// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'babel-polyfill'
//import Mint from 'mint-ui'
import 'mint-ui/lib/style.css';
//import YDUI from 'vue-ydui';
//import 'vue-ydui/dist/ydui.rem.css';
//Vue.use(YDUI);
import {Alert,Confirm} from 'vue-ydui/dist/lib.rem/dialog';
import {interface_} from './instance.js';
Vue.prototype.interface_ = interface_;



Vue.component(Alert.name, Alert);
Vue.prototype.$dialog = {
    alert: Alert,
    confirm:Confirm
};
import { Tabbar,TabItem,Header,Button,Popup,MessageBox } from 'mint-ui'
import axios from 'axios'
import global_ from './Global.vue';
import  {bus}  from './bus.js';
import VueLazyload from 'vue-lazyload'
//import moment from 'moment';
//import { MessageBox} from 'mint-ui';
Vue.use(VueLazyload,{
  preLoad: 1.3,
  attempt: 1,
  listenEvents: [ 'scroll' ]
});
//Vue.use(moment);
//Vue.prototype.$messagebox = MessageBox;
Vue.prototype.websocketf=()=>{
          let URL_1 = window.location.host;
          let accord = window.location.protocol;
          let str = "wss:";
          if(accord=='https:'){
          	str = "wss:"
          }else if(accord=='http:'){
          	str = "ws:"
          }
//	      let URL_1 = global_.BASE_URL.substr(global_.BASE_URL.indexOf("//") + 2, global_.BASE_URL.length);

				Vue.prototype.websocket = new WebSocket(encodeURI(str + URL_1 + "/notify/" + sessionStorageGet('baseMember').account));
				Vue.prototype.websocket.onopen = function() {
//					 console.log('连接成功')
				};
				Vue.prototype.websocket.onerror = function() {
					// console.log('连接失败')
					//连接失败
				};
				Vue.prototype.websocket.onclose = function() {
					// console.log('连接断开')
					//连接断开
				};
				Vue.prototype.websocket.onmessage = (message)=> {
//			 	  console.log(message);
			// 	  let type =JSON.parse(message.data) ;
          // console.log(type);
          // if(type.messageType == '3'){
          //   MessageBox.alert(type.lotteryId);
          // }
					bus.$emit('newMessage',message )
				}

};
sessionStorageSet('routeIndx', 1);
router.beforeEach(function (to, from, next) {
//	if(!sessionStorageGet("baseMember")&&to.path!="/login"&&to.path!="/home"&&to.name!="register"){
//  MessageBox.confirm('', {
//    message: '尚未登录，去登陆吧！',
//    title: '提示',
//    confirmButtonText: '确定',
//    cancelButtonText: '取消'
//  }).then(action => {
//    if (action == 'confirm') {
//      router.replace({name:'login'});
//    }
//  }).catch(err => {
//    if (err == 'cancel') {
//      router.replace({path:'/home'});
//    }
//  });
//}
  if(sessionStorageGet('routeIndx')==-1){
  	bus.$emit('UPDATE_DIRECTION', {direction: 'reverse'});
  	sessionStorageSet('routeIndx', 1)
  }else{
  	bus.$emit('UPDATE_DIRECTION', {direction: 'forward'})
  }
    next()
});
Vue.config.debug = true;
Vue.prototype.GLOBAL = global_;
axios.defaults.baseURL=global_.BASE_URL;
Vue.prototype.$axios = axios;
axios.defaults.headers.post['Content-Type'] = 'appliction/json';
//允许跨域
axios.defaults.withCredentials=true;
//Vue.use(Mint);
Vue.component(Tabbar.name, Tabbar);
//Vue.component(Tabbar.name, Tabbar)
Vue.component(TabItem.name, TabItem);
Vue.component(Header.name, Header);
Vue.component(Button.name, Button);
Vue.component(Popup.name, Popup)
Vue.config.productionTip = false;
Vue.component(MessageBox.name, MessageBox)
//终止预检请求
//axios.interceptors.request.use(
//      config => {
//      	console.log(config.method)
//          if(config.method=='options'){
//
//             return false
//          }
//          return config
//      },function(error){
//          return Promise.reject(error)
//      }
//  )
//登录超时重定向到登录界面

/* eslint-disable no-new */
new Vue({
  el: '#app_1',
  router,
  template: '<App/>',
  components: { App },

});
