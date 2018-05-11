<template>
	<div class="enterjilu" style="color: #000000;" >
		<mt-header title="登入记录" style="background-image: linear-gradient(to bottom,#494c56,#1e2027 );position:  fixed;top: 0;left:0 ;width: 100%;height: 1.125rem;;">

    <mt-button icon="back" @click="goback" slot="left" >返回</mt-button>

</mt-header>
		<div class="enterlist">
			<ul >
				<li v-for="item in memberLoginInfoList">
					<p><span>IP地址 &nbsp;&nbsp;</span>:<span style="color: #000;"> {{item.ip}}</span></p>
					<p><span>登陆时间</span>:<span style="color: #000;"> {{item.loginTime}}</span></p>
					<p><span>登陆地区</span>:<span style="color: #000;"> {{item.address=="nullnullnullnull"?"内网ip":item.address}}</span></p>
				</li>
			</ul>
		</div>
		<Pagination v-on:index="changeindex" :countAll="countAll" :pages="pages" style="position:fixed;bottom:0;width: 100%;"></Pagination>
	</div>
</template>

<script>
//	import Vue from 'vue';
	import { Header } from 'mint-ui';
	import Pagination from "../common/pagination.vue"


//	Vue.component(Header.name, Pagination);
//	Vue.component(Header.name, Header);

	export default {
		data() {
			return {
				memberLoginInfoList: "111",
				page:1,
				countAll:null,
				pages:1,
			}
		},
		methods: {
			goback(){
				sessionStorageSet('routeIndx', -1)
				this.$router.back()
			},
			changeindex(page) {
				console.log(page)
				this.page = page
			}
		},
		components: {
			Pagination,

		},
		created() {
			var that = this

			this.$axios({
				method: 'post',
				url: '/inter/user/queryLoginInfo',
				data: {
					page:1
				}

			}).then(function(data) {
//              console.log(data)
				that.countAll = data.data.data.countAll
				that.memberLoginInfoList = data.data.data.memberLoginInfoList
                that.pages=Math.ceil(that.countAll/10)
			}).catch(function(error) {
				console.log(error)
			})
		},
		watch:{
			page(newValue, oldValue) {
				var that = this
				this.$axios({
					method: 'post',
					url: '/inter/user/queryLoginInfo',
					data: {
						page: newValue
					}

				}).then(function(data) {

					that.countAll = data.data.data.countAll
					that.pages=Math.ceil(that.countAll/10)
					that.memberLoginInfoList = data.data.data.memberLoginInfoList

				}).catch(function(error) {
					console.log(error)
				})
			}
		}

	}
</script>

<style scoped="scoped">
	.enterjilu {
		width: 100%;
		height: 100%;

	}
	.enterjilu span{
		color: #edac0c;;
	}
	.enterlist{
		width: 100%;
		position: absolute;
        top:1.125rem;
		bottom: 1rem;
		overflow: auto;
	}

	.enterlist ul li {
		width: 100%;
		box-sizing: border-box;
		padding: 0.405rem 0.28rem;
        background: #fff;
		font-size: 16px;
		color: #edac0c;
    border-bottom: solid 1px #f1f1f0;
	}
</style>
