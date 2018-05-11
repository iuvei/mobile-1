<template>
	<div class="announce" @click="hideDel">
		<img src="../../static/images/zanwu.png" v-if="dataList.length==0" style="display:block;position: absolute;width: 5rem;height: 5rem;left:0;top: 0;right:0;bottom:0;margin: auto;" />
		<mt-header title="公告" style="background-image: linear-gradient(to bottom,#494c56,#1e2027 );position: fixed;top: 0;left:0 ;width: 100%;height: 1.125rem;z-index: 1000;">
			<mt-button icon="back" slot="left" @click="goback">返回</mt-button>
		</mt-header>
		<div style="position: absolute;width: 100%;top: 1.125rem;">
			<ul class="NavTab" style="position: fixed;width: 100%;top: 1.125rem;z-index: 1000;">
				<li v-for="(item,index) in navList" @click="changeIndex(index)" :class="idx==index?'active':''">{{item}}<img src="../../static/images/weidu.png" class="weidu" v-show="index==2&&nouvelles" /></li>

			</ul>

			<ul class="itemTab" v-if="flag" style="position: absolute;top: 1.2rem;width: 100%;background: #E9E9E9;">
                
				<li v-for="(item,index) in dataList" @click="showDetails(index)">
					<span style="width: 45%;height:1.2rem;display: inline-block;text-overflow:ellipsis;overflow: hidden;white-space: nowrap">{{item.title}}</span>
					<img src="../../static/images/new.png" class="newImg" v-if="item.isRead==0" />
					<span style="position:absolute;right: 1.3rem;">{{item.sentTime}}</span>
					<img src="../../static/images/zuo.png" class="zuo" @click.stop="show(index)" v-show="idx==2"/>
					<transition name="slide-fade">
					<span v-show="showDel&&delIdx==index&&idx==2"  class="del" @click.stop="delItem(index)">删除</span>
				    </transition>
				</li>

			</ul>

			<div v-if="!flag" class="announceDetail">
				<div class="back"><img src="../../static/images/houtui.png" class="back_icon" @click="back" /></div>
				<p style="color: #000000;width: 90%;padding-left: 0.4rem;" v-show="idx==2">发送时间：{{dataList[detailIndex].sentTime}}</p>
				<div style="margin-bottom: 0.5rem;margin-top: 0.5rem;">
					<header class="title"><span style="display: inline-block;"><b>标题：</b></span><span>{{dataList[detailIndex].title}}</span></header>
				</div>
				<div>
					<div class="box">
						<div v-show="idx==2"><span style="display: inline-block;"><b>发送人：</b></span><span>{{dataList[detailIndex].sentPersonName}}</span></div>
						<div><span style="display: inline-block;"><b>内容：</b></span><div v-text="dataList[detailIndex].content" style="font-family: verdana"></div></div>
					</div>
				</div>
			</div>
		</div>
		<div>
			<!--<div style="position: fixed;bottom: 0;width: 100%;height:1rem;color: #000000;display: flex;justify-content: space-between;align-items: center;">
				<div style="margin-left: 0.2rem;"><input type="checkbox" name="" id="" value="" /><span >全选</span></div>
				<div style="width: 1.2rem;height: 0.5rem;margin-right: 0.2rem;text-align: center;">删除</div>
			</div>-->

		</div>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				navList: ["近期公告", "最新消息", "站内私信"],
				selected: 1,
				dataList: [],
				notice_type: "2",
				idx: 0,
				flag: true,
				detailIndex: null,
				newdataList: [],
				nouvelles: false,
				delIdx:null,
				showDel:false,

			}
		},
		mounted() {
			let that = this;
			this.$axios({
				method: 'GET',
				url: '/notice/queryNoticeAlertList?is_read=' + "&memberid=" + sessionStorageGet('baseMember').account
			}).then(function(data) {
				that.newdataList = data.data.data
				that.newdataList.forEach((item) => {
//					console.log(item)
					if(item.isRead == 0) {
						that.nouvelles = true
						return false;
					}
				})
			}).catch(function(error) {
				console.log(error)
			})
		},
		methods: {
			hideDel(){
				this.showDel=false
			},
            show(idx){
            	this.delIdx = idx
            	this.showDel=true
            },
            delItem(index){
            	let that = this
//            	console.log(this.dataList[index].id)
            	this.$axios({
							method: 'GET',
							url: '/notice/deleteNoticeAlert?messageIds='+this.dataList[index].id
						}).then(function(data) {
							that.dataList.splice(index,1)
							that.showDel = false
						}).catch(function(error) {})
            },
			showDetails(idx) {
				this.flag = false;
				this.detailIndex = idx;
				if(this.idx == 2) {
					if(this.dataList[idx].isRead == 0) {
						this.$axios({
							method: 'GET',
							url: '/notice/updateNoticeAlert?messageId=' + this.dataList[idx].id,
						}).then(
							(data) => {
								let count=0
								this.dataList.forEach((item) => {
									if(item.isRead == 0) {
										count++
									}
								})
								if(count>1){
									this.nouvelles = true
								}else{
									this.nouvelles = false
								}
							}

						).catch(function(error) {})
					}
				}
			},
			back() {
				this.flag = true
				this.changeIndex(this.idx)
			},
			changeIndex(index) {
//				console.log(this.dataList)
				let that = this
				this.idx = index
				let notice_type = 3
				this.flag = true
				switch(this.idx) {
					case 0:
						notice_type = 2
						this.$axios({
							method: 'GET',
							url: '/notice/queryMemberNoticeList?notice_type=' + notice_type + "&type=" + 1
						}).then(function(data) {
//							console.log(data)
							that.dataList = data.data.data
						}).catch(function(error) {})
						break;
					case 1:
						notice_type = 3
						this.$axios({
							method: 'GET',
							url: '/notice/queryMemberNoticeList?notice_type=' + notice_type
						}).then(function(data) {
//							console.log(data)
							that.dataList = data.data.data
						}).catch(function(error) {

						})
						break;
					case 2:
						this.$axios({
							method: 'GET',
							url: '/notice/queryNoticeAlertList?is_read=' + "&memberid=" + sessionStorageGet('baseMember').account
						}).then(function(data) {

							that.dataList = data.data.data;

						}).catch(function(error) {

						})
						break;
				}

			},
			goback() {
				sessionStorageSet('routeIndx', -1);
				this.$router.back();
			},
		},
		created() {

			let that = this
			this.$axios({
				method: 'GET',
				url: '/notice/queryMemberNoticeList?notice_type=2&type=1'
			}).then(function(data) {
				that.dataList = data.data.data
			}).catch(function(error) {

			})

		},

	}
</script>
<style scoped>
	.del {

   width: 1.2rem;
   height: 100%;
    position: absolute;
    top: 0;
    right: 0;
    color:#fff;
   background:#5FACFA;
   line-height: 1.6rem;
   text-align: center;
  }
	.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
	/*.announce_article>li{
  width: 100%;
  height:1.45rem;
}*/

	.announce {
		
		background: #E9E9E9;
		
		
	}

	.announce .weidu {
		position: absolute;
		top: 0.1rem;
		width: .3rem;
		height: .3rem;
	}

	.announceDetail {
		background: #fff;
		height: 100%;
		margin-top:1.125rem ;
		padding-bottom: 1rem;
	}

	.announceDetail .title {
		width: 90%;
		height: auto;
		margin: 0 auto;
		word-wrap: break-word;
		border-radius: 5px;
		background: #fff;
		color: #000000;
		border: 1px solid #ccc;
		line-height: 1rem;
		padding-left: 0.2rem;
		padding-right: 0.2rem;
	}

	.announceDetail .box {
		width: 90%;
		min-height: 6rem;
		margin: 0 auto;
		border-radius: 5px;
		background: #fff;
		color: #000000;
		border: 1px solid #ccc;
		word-wrap: break-word;
		line-height: 1rem;
		padding-left: 0.2rem;
		padding-right: 0.2rem;
	}

	.announce .back {
		width: 100%;
		height: 0.8rem;
		background: #fff;
	}

	.announce .back .back_icon {
		width: 0.8rem;
		height: 0.8rem;
	}

	.announce .itemTab .newImg {
		position: absolute;
		top: 0;
		right: 0;
	}
	.announce .itemTab .zuo{
		position: absolute;
		width: 0.8rem;
		height: 0.8rem;

		top: 0;
		bottom: 0;
		right:0.4rem;
		margin: auto;
	}
	.announce .NavTab {
		width: 100%;
		background: #fff;
		color: #000000;
		display: flex;
		justify-content: space-around;
		height: 1.125rem;
		align-items: center;
	}

	.announce .NavTab {
		border-bottom: 2px solid #5FACFA;
	}

	.announce .itemTab li {
		position: relative;
		background: #fff;
		line-height: 1.2rem;
		padding: 0.2rem;
		box-sizing: border-box;
		width: 100%;
		height: 1.6rem;
		color: #000000;
		border: 1px solid #ccc;
		margin-bottom: 0.14rem;
		margin-top: 0.14rem;
		border-radius: 2px;
	}

	.announce .NavTab li {
		text-align: center;
		flex: 1;
		height: 100%;
		line-height: 1.125rem;
		border-bottom: 2px solid #fff;
	}

	.announce .NavTab .active {
		border-bottom: 2px solid #5FACFA;
	}
</style>
