<template>
	<div style="color: #000000;" class="zhuihao">
		<ChaseAlert v-show="show" v-on:cancel="hideChaseAlert" v-on:goChase="goChase" ></ChaseAlert>
		<nav>
			<div @click="goback" class="fanhui">< 返回</div>
			<p>智能追号</p>
			<div class="solde" style="position: absolute;left:86%;color:#fff">
				<div style="display: flex;align-items:center;position: absolute;right: 0.2rem;"><img style="vertical-align: middle;display: inline-block;height: 0.6rem;width: 0.6rem;" src="../../static/images/LoginNav/totalmoney.png"/><span  >{{Math.round(solde*100)/100}}</span>元</div>
			</div>
		</nav>
		<Time :awarPeriod="awarPeriod" :kindId="kindId" :winsDragonList="winsDragonList"></Time>
		<div id="navv">
			<div>
				总期数{{chaseList.length}}期
			</div>
			<span>追号总金额{{chaseList.length!=0?chaseList[chaseList.length-1].hasPay:0}}元</span>
			<div @click="showChaseAlert">
				修改方案
			</div>
		</div>
		<div class="zhuihao_box">
		<div class="zhuihao_list" v-for="(item,index) in chasePageList">
			<div class="zhuihao_list_menu">
				<ul>
					<li>期数：<span>{{item.periodNo}}</span></li>
					<li>投入金额：<span>{{item.currentPay}}</span></li>
					<li>累计投入：<span>{{item.hasPay}}</span></li>
					<li>盈利：<span>{{item.profit}}</span></li>
					<li>盈利率：<span>{{item.profitRate}}</span></li>
				</ul>
				<div class="zhuihao_list_menu_right">
					<span>倍率设定:</span>
					<div class="box">
						<button id="left" @click="setTimesDsc(index)">－</button>
						<input id="center" :value="item.times"  @blur="setTimes(index)"/>
						<button id="right" @click="setTimesAdd(index)">＋</button>
					</div>
				</div>
			</div>
		</div>
		</div>
		<Pagination v-on:index="changeindex" :countAll="countAll" :pages="pages"  style="position:fixed;bottom:1.12rem;height:1rem;width: 100%;"></Pagination>
		<div class="chaseFooter">
			<button class="betBtn" @click="bet">投注</button>
		</div>
	</div>
</template>

<script>
//	import Vue from 'vue'
	import  {bus}  from '../bus.js'
	import ChaseAlert from "./ChaseAlert.vue";
	import Pagination from "../common/pagination.vue";
	import Time from "./time.vue";
//	import { Indicator } from 'mint-ui';
//	import { MessageBox} from 'mint-ui';
//	Vue.component(MessageBox.name, MessageBox);
	export default {
		components: {
			ChaseAlert,
			Pagination,
			Time
		},

		data() {
			return {
				show: false,
				chaseList: [],
				isFirst: true,
				content: "00:00",
				time: 60,
				total: 60,
				awarPeriod: null,
				winsDragonList: {},
				confirmBetFields: {},
				kindId: "",
				page:1,
				countAll:null,
				pages:1,
				chasePageList:[],
				times:"1",
				solde:"0"

			}
		},
		mounted(){
   this.solde=sessionStorageGet("baseMember").accountBalance

		},
		created() {
			bus.$on("update",()=>{
				this.updateChase()
			})
			let that = this
			this.kindId = this.$route.query.kindId
			if(sessionStorageGet("list")) {
				this.bettingList = sessionStorageGet("list")
			}

			this.$axios.get('/inter/ticket/winsDragon/' + this.$route.query.kindId).then(function(data) {
				if(data.data.code==666||!sessionStorageGet('baseMember')){
//            MessageBox.alert('未登入').then(function () {
//            that.$router.replace({name:'login'});
//            sessionStorage.clear();
//          })
              that.$dialog.alert({mes:'未登入',callback:function(){
								 sessionStorage.clear();
								  that.$router.replace({name:'login'});
							}})
          }
				that.winsDragonList = data.data.data
				that.awarPeriod = that.winsDragonList.winList[0].awarPeriod;
				var confirmBetFields = {
					chasePeriods:10,
					chaseTimes:1,
					confirmBetType:2,
					chaseStop:true,
				}
			that.goChase(confirmBetFields)
			that.countAll = that.chaseList.length
			that.pages=Math.ceil(that.countAll/10)
			that.chasePageList = that.chaseList.slice(0,10)
			}).catch(function(error) {
				console.log(error)
			})
		},
		methods: {
             setTimes(i){
             	let reg = /^[1-9]\d*$/
				if(!reg.test(event.target.value)) {
					event.target.value = 1
				}else if(event.target.value >10000){
					event.target.value = 10000
				}
             	this.isFirst = false
             	this.chaseList[i].times = event.target.value*1
             	this.goChase(this.confirmBetFields)
             	
             },
			changeindex(page){
				this.page = page
			},
			setTimesAdd(i) {
				this.isFirst = false
				this.chaseList[i].times++
					this.goChase(this.confirmBetFields)
			},
			setTimesDsc(i) {
				this.isFirst = false
				this.chaseList[i].times == 1 ? 1 : this.chaseList[i].times--
					this.goChase(this.confirmBetFields)
			},
			goback() {
				sessionStorageSet('routeIndx', -1)
				this.$router.back()
			},
			goChase(confirmBetFields){
               
				this.confirmBetFields = confirmBetFields
				var betList = sessionStorageGet("list")
				var chaseList = this.chaseList
				var periodNo = this.awarPeriod
				var gameType = betList[0].gameType
				var isFirst = this.isFirst;
				console.log(confirmBetFields,"confirmBetFields")
               console.log(betList,"betList")
               console.log(chaseList,"chaseList")
               console.log(isFirst,"isFirst")
               console.log(gameType,"gameType")
				this.chaseList = createChaseList({
					confirmBetFields,
					betList,
					chaseList,
					periodNo,
					gameType,
					isFirst
				})
				this.chasePageList = this.chaseList.slice(0,10)
				this.isFirst = true;
				this.show= false;
				bus.$emit('page')
			},
			showChaseAlert() {

				this.show = true
			},
			hideChaseAlert() {
				this.show = false
			},
			bet() {
				var that = this;
				var orderType;
				var orderList = [];
				var betList = sessionStorageGet("list")
//				console.log(betList)
				var orderFrom = null
				var length = that.chaseList.length
//				Indicator.open();
				if(this.confirmBetFields.chaseWinType != undefined) {
					var orderFrom = this.confirmBetFields.chaseWinType+""
				}
                if(this.confirmBetFields.chasePrePay!=undefined){
                	var cost = that.chaseList[length - 1].hasPay-that.confirmBetFields.chasePrePay
                }else{
                	var cost = that.chaseList[length - 1].hasPay
                }
				if(this.confirmBetFields.chaseStop) {
					orderType = "2";
					
				} else {
					orderType = "1";
				}
//				console.log(this.confirmBetFields.confirmBetType)
                if(this.confirmBetFields.confirmBetType==2){
                	
                						this.chaseList.forEach((item1, index) => {
					console.log(item1)
					let periodNo = item1.periodNo
					betList.forEach((item2) => {
						let obj = {}
						let xuanhao = item2.xuanhao.replace(/\?/g, "")
						let subGameId = item2.subGameId
						obj.lotteryNum = xuanhao
						obj.periodNo = periodNo
						obj.subGameId = subGameId
						obj.unitPrice = (item2.totalPrice/item2.noteNumber)*item1.times
						obj.totalAmount = item2.noteNumber*obj.unitPrice
						obj.orderNum = item2.noteNumber
						orderList.push(obj)
					})

				})

                }else{
                	
                	this.chaseList.forEach((item1, index) => {
                		console.log(item1)
					let periodNo = item1.periodNo
					betList.forEach((item2) => {
						
						let obj = {}
						let xuanhao = item2.xuanhao.replace(/\?/g, "")
						let subGameId = item2.subGameId
						obj.lotteryNum = xuanhao
						obj.periodNo = periodNo
						obj.subGameId = subGameId
						obj.totalAmount = item2.noteNumber * item1.times
						obj.unitPrice = item1.times
						obj.orderNum = item2.noteNumber
						orderList.push(obj)
					})

				})
                }
				

				that.$axios({
					method: 'post',
					url: '/inter/ticket/chipIn',
					data: {
						baseLotteryId: that.kindId,
						cost:cost ,
						orderList: orderList,
						orderType: orderType,
						orderFrom: orderFrom,
						periodNo: that.awarPeriod
					}
				}).then(function(data) {
					
					if(data.data.code == 0 && data.data.msg == "OK") {
//						Indicator.close();
						sessionStorageSet("list", [])
						that.bettingList = [];
						that.$dialog.alert({mes:"投注成功"})
						that.solde-=Math.round(cost*100)/100
                        let baseMember =sessionStorageGet("baseMember")
                        baseMember.accountBalance = that.solde
                        sessionStorageSet("baseMember",baseMember)
//						MessageBox.alert("投注成功")
						that.$router.push({
							name: 'BuyColourBasket',
							query: {
								kindId: that.$route.query.kindId,
								classId: that.$route.query.classId
							}
						})
					} else {
//						Indicator.close();
if(data.data.code == 666){
//			  MessageBox.alert('未登入').then(function () {
//            that.$router.replace({name:'login'});
//            sessionStorage.clear();
//					})
that.$dialog.alert({mes:'未登入',callback:function(){
								 sessionStorage.clear();
								  that.$router.replace({name:'login'});
							}})
			  }else{
			  	that.$dialog.alert({mes:data.data.msg})
//			  	MessageBox.alert(data.data.msg)
			  }
						
						
					}
				}).catch(function(error) {
					console.log(error)
				})
			},
			updateChase() {
				let that =this
				        that.isFirst = false
				        let periodNoAll = sessionStorageGet('periodNoAll')[that.$route.query.classId][that.$route.query.kindId]
						that.awarPeriod = that.createChasePeriod(that.awarPeriod,1,periodNoAll,that.$route.query.kindId)
				        that.goChase(that.confirmBetFields)
                        that.countAll = that.chaseList.length
			            that.pages=Math.ceil(that.countAll/10)
			            that.chasePageList = that.chaseList.slice(0,10)
			},
			 createChasePeriod(period,offset,periodNoAll,kindId){
				if(kindId=="bjpk10"){
					return parseInt(period) + offset + '';
				}else{
					if(kindId == "fc3d"||kindId == "pl3"){
							var digit = period.length - 4;
        // 当前期号的日期
        var periodTime = period.substr(0, 4);
        // 转化为moment型，方便后面计算
        var momentTime = moment(periodTime, 'YYYY');
        var nowPeriodString = period.substr(4, digit);
        // 当前期号
        var nowPeriod = parseInt(period.substr(4, digit));
         // 目标期号
        var targetPeriod = nowPeriod + offset;
        var targetTime = void 0;
        if (targetPeriod > periodNoAll) {
            targetPeriod -= periodNoAll;
            targetTime = momentTime.add(1, 'y').format('YYYY');
        }
        else {
            targetTime = periodTime;
        }
        var targetPeriodString = targetPeriod + '';
        return targetTime + targetPeriodString.padStart(digit, '0');
					}else{
						var digit = period.length - 8;
        // 当前期号的日期
        var periodTime = period.substr(0, 8);
        // 转化为moment型，方便后面计算
        var momentTime = moment(periodTime, 'YYYYMMDD');
        var nowPeriodString = period.substr(8, digit);
        // 当前期号
        var nowPeriod = parseInt(period.substr(8, digit));
         // 目标期号
        var targetPeriod = nowPeriod + offset;
        var targetTime = void 0;
        if (targetPeriod > periodNoAll) {
            targetPeriod -= periodNoAll;
            targetTime = momentTime.add(1, 'd').format('YYYYMMDD');
        }
        else {
            targetTime = periodTime;
        }
        var targetPeriodString = targetPeriod + '';
        return targetTime + targetPeriodString.padStart(digit, '0');
					}
					
       
    
			}
				
        

		}
		},
       watch :{
       	chaseList:{
       		 handler(newData){
       		 this.countAll = newData.length
			this.pages=Math.ceil(this.countAll/10)

       		 },
       		 deep: true
       	},
       	page(newPage){
       		let start = (newPage-1)*10;
			let end = newPage*10
			this.chasePageList = this.chaseList.slice(start,end)

       	}

       }
	}
</script>

<style>
	
	.zhuihao_box{
		width: 100%;
		position: absolute;
		top: 3.925rem;
		bottom: 2.12rem;
		overflow: auto;

	}
	.zhuihao .fanhui{
	position: absolute;
    left: 0.4rem;
    width: 1.43rem;
    height: 1.125rem;
    line-height: 1.125rem;
    font-size: 0.43rem;
	}
	.zhuihao nav>div {
		position: absolute;
		left: 0.4rem;
		font-size: 0.3rem;
		width: 1.43rem;
		height: 1.125rem;
		line-height: 1.125rem;
	}

	.zhuihao nav div img {
		margin-right: 0.15rem;
		vertical-align: middle;
	}
	 

	.zhuihao nav {
		display: flex;
		align-items: center;
		justify-content: center;
		position: fixed;;
		width: 100%;
		color: white;
		height: 1.125rem;
		background-image: linear-gradient(to bottom, #393c44, #1e2026);
	}
	.zhuihao_header{
		position: fixed;
		top: 1.125rem;
	}
	.zhuihao_header,
	.zhuihao_header span {
		width: 100%;
		height: 1.4rem;
		line-height: 1.4rem;
		text-align: center;
		color: black;
		background-color: #f1f1f0;
		font-weight: 900;
	}

	.zhuihao_header b {
		color: red;
		font-weight: 900;
	}

	.betBtn {
		width: 100%;
		height: 1.12rem;
		color: #fff;
		background:#edac0c;
		position: fixed;
		bottom: 0;
	}

	#navv {
		width: 100%;
		height: 1.4rem;
		background-color: #ffffff;
		color: black;
		display: flex;
		position: fixed;
		top: 2.525rem;
		align-items: center;
		justify-content: space-between;
		border-bottom: solid 0.03rem gainsboro;
	}

	#navv div:nth-child(1) {
		margin-left: 0.4rem;
	}

	#navv div:nth-child(3) {
		margin-right: 0.4rem;
	}



	.zhuihao_list {
		width: 100%;
		height: 3.7rem;
		border-bottom: solid 0.03rem gainsboro;
		overflow: hidden;
	}

	.zhuihao_list_menu {
		width: 9.2rem;
		height: 100%;
		margin: auto;

	}

	.zhuihao_list_menu ul {
		width: 4.2rem;
		float: left;
		height: 100%;
		padding-top: 0.1rem;
	}

	.zhuihao_list_menu_right {
		width: 5rem;

		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		float: right;
	}

	.zhuihao .box {
		width: 3rem;
		height: auto;
		float: right;

	}

	.box button {
		border: 0;
		outline: none;
	}

	#left,
	#center,
	#right {
		float: left;
		width: 1rem;
		height: 1rem;
		line-height: 1rem;
		text-align: center;
		background: #eee;
		font-weight: bold;
	}

	#center {
		width: 1rem;
		background: #fff;
		cursor: auto;
	}

	#right {
		float: right;
	}

	.zhuihao_footer {
		width: 100%;
		height: 2.34rem;
		background-color: #f1f1f0;
		position: absolute;
		bottom: 0;
	}
</style>
