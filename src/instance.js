import Vue from 'vue';
import axios from 'axios';
// import router from '../router';
// Vue.prototype.$http = axios;
//const baseUrl = "http://192.168.0.56:8081";
var instance = axios.create({});
instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
instance.defaults.baseURL = "http://192.168.0.103:8081"; // 本地开发环境  baseURL
const axiosURL = {
	// goSportLink:"/open",
	// getTotalBalance:"/totalBalance",
}
export var interface_ = async(type = 'POST', url = '', data = '') => {
  let result;
  type = type.toUpperCase();
  if (type === 'GET') {
    	url = axiosURL[url] + data;
    await instance.get(url)
        .then(res => {
        	result = res.data;
        	let currentPath = router.history.current.path;
            let reg = /help/g;

            let boolen = reg.test(currentPath);
        	if(result.code == '666'&&!boolen){
        		router.push({path:"/"})
        	}
        }).catch((err)=>{
        	console.log(err)
        })
  } else if (type === 'POST') {
    await instance({
    	            url:axiosURL[url],
					method: 'post',
					transformRequest: [function(data) {
						let ret = ''
						for(let it in data) {
							ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
						}
						return ret
					}],
					data:data,
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					},
				}).then((data) => {
					result = data
					console.log(result)
				}).catch(function(error) {
					    console.log(error)
				});
  }
  return result
};


