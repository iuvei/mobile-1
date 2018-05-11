<template>
	<div class="buyColorBasket">

		<div v-show="showTxt" :style="showTitleCss" >
					<span>{{title}}</span>
				</div>
		<nav>
			<div class="fanhui" @click="goback">
				< 返回</div>
					<p>购彩篮</p>
					<div class="solde">
				<div style="position: absolute;right: 0.2rem;color: #fff;"><img style="vertical-align: middle;display: inline-block;" src="../../static/images/LoginNav/totalmoney.png"/><span  >{{Math.round(solde*100)/100}}</span>元</div>
			</div>
		</nav>
		<div class="goucai_header">
			<input type="checkbox" name="b" v-model="allChecked">全选
			<div class="bc_a">
			距 <span style="color: red;" v-text="winsDragonList==null?null:awarPeriod"></span>期截止:<b>{{content}}</b>
			</div>
			<span  @click="Delete" style="padding: 0.1rem;border: 1px solid #ccc;">
					删除
				</span>
		</div>
		<div class="goucai_container" style="background: #fff;">
			<div class="hr"></div>
			<ul class="goucai_container_list">
				<li class="a" v-for="(item,idx) in bettingList">
					<input type="checkbox" class="check" name="a" v-model="item.check">
					<div class="goucai_container_list_menu" style="min-height: 1.4rem;">
						<span style="width: 1rem;position: absolute;">选号:</span>
						<p class="list_menu_first"><span style="color:red;">{{item.xuanhao}}</span></p>
						<span style="width: 1rem;position: absolute;">玩法:</span>
						<p class="list_menu_second" style="text-align: left;"><span style="padding-left: 1rem;">{{item.Gameplay}}</span><span>注数:{{item.noteNumber}}注</span><span>金额:{{item.totalPrice}}元</span><span>赔率:{{item.oddMax}}</span></p>
					</div>
				</li>

			</ul>
		</div>

		<div class="goucai_zhuihao">
			<button @click="goChase" :style="db?disabledCss:''" >智能追号</button>
			<div class="goucai_jisuan" style="flex:0.9;height: 100%;display:flex;align-items: center;justify-content: center;">

				<p>共 <span @mouseover="titleShow" @mouseout="titleHide" class="foot_center_num" style="max-width: 1.2rem;">{{Math.round(sum*100)/100}}</span>元<span @mouseover="titleShow" @mouseout="titleHide" class="foot_center_num" style="max-width: 1.2rem;">{{amount}}</span>注</p>

			</div>
			<button @click="bet" style="">投注</button>
		</div>

		</div>
</template>

<script>
//	import Vue from 'vue'
//import { Indicator,MessageBox } from 'mint-ui';
//Vue.component(MessageBox.name, MessageBox);
	var timed = null
	export default {
	    destroyed () {
              clearInterval(timed)
              },
		created(){

			let that = this
			this.solde=sessionStorageGet("baseMember").accountBalance
			if(sessionStorageGet("list")){
				this.bettingList =sessionStorageGet("list")
				this.bettingList.length==0?this.db=true:this.db=false;
			}else{
				this.db=true;
			}
			
			this.$axios.get('/inter/ticket/winsDragon/' + this.$route.query.kindId).then(function(data) {
				that.winsDragonList = data.data.data
				that.awarPeriod = that.winsDragonList.winList[0].awarPeriod;
				that.getTime(that.$route.query.kindId)
			that.timeLeft()
				
			}).catch(function(error) {
				console.log(error)
			})
		},
        mounted(){
        	 this.$route.query.classId==1?this.db=true:"";
        },
		data(){
			return {
				solde:"",
				bettingList: [],
				winsDragonList: null,
				amount: 0,
				sum: 0,
				flag: false,
				currentTime: "",
				nextTime: "",
				total: 60,
				content: "00:00",
				time: 60,
				ischeckAll: "",
				awarPeriod:null,
				showTxt:false,
				title:"",
				showTitleCss:{
					position: 'absolute',
					left:0,
					top:0,
					color:"#000",
					minWidth:1+'rem',
					height:'0.6rem',
					textAlign:"center",
					lineHeight:'0.6rem',
					borderRadius:"0.08rem",
					background:'#818287',
					zIndex:'1000',
					border:'1px solid #ccc'

				},
				show:false,
				disabledCss:{
					border:"solid 0.03rem #ddd",
					color:"#ddd"
				},
				db:true

			}
		},

		computed: {
			allChecked: {
				get: function() {
					if(this.bettingList.length>=1){
					return this.checkedCount == this.bettingList.length;
					}
				},
				set: function(value) {
//					console.log(value)
					this.bettingList.forEach(function(item) {
						item.check = value
					})
					return value;
				}
			},
			checkedCount: {
				get: function() {
					var i = 0;
					this.bettingList.forEach(function(item) {
						if(item.check == true) i++;
					})
					return i;
				}
			}
		},
		watch: {

			bettingList() {
				if(this.bettingList.length!=0){
				this.amount = 0;
				this.sum = 0;
				for(let i = 0; i < this.bettingList.length; i++) {
					this.amount += this.bettingList[i].noteNumber
					this.sum += this.bettingList[i].totalPrice*1
				}

			}else{
				this.amount = 0;
				this.sum = 0;
				this.db = true
			}
				},

		},

		methods: {
			goChase(){
				if(this.db){
					return false
				}
				this.$router.push({
					name: 'LintelligentChase',
					query: {
						kindId: this.$route.query.kindId,
						classId: this.$route.query.classId
					}
				})
			},

			titleShow(e){
				this.showTxt=true
              var y = e.target.offsetTop;
              var x = e.target.offsetLeft;
              var val = e.target.offsetParent;
              while(val != null){
              y += val.offsetTop;
              x += val.offsetLeft
                val = val.offsetParent;
               }

            this.title=e.target.innerHTML
            this.showTitleCss.left=x+'px';
            this.showTitleCss.top=y-20+'px';
			},
			titleHide(){
				this.showTxt=false;
			},
			getTime(kindId) {
//				console.log(this.awarPeriod)
				switch(kindId) {
					case "m5ffc":
					case "m5k3" :
					case "m511x5" :
					case 'txffc':
						this.time = 60;
						break
					case "m53fc":
						this.time = 180;
						break
					case "m55fc":
					case "bjpk10":
					case "mlaft":
						this.time = 300;
						break
					case "cqssc":
						let awarPeriod = this.awarPeriod.substring(this.awarPeriod.length - 3, this.awarPeriod.length)
						if(awarPeriod* 1 >= 94 || awarPeriod * 1 < 23) {
							this.time = 300;
						} else {
							this.time = 600;
						}
						break
					case "tjssc":
					case "gd11x5":
					case "xjssc":
					case "sd11x5":
					case "ahk3":
					case "gxk3":
					case "jsk3":
					case "jx11x5":
					case "sh11x5":
						this.time = 600;
						break
					case "shssl":
						this.time = 1800;
						break
					case "fc3d":
					case  "pl3" :
					this.time = 86400
					 break
					
				}
			},
			checkAll() {
				this.flag = !this.flag
				if(this.flag) {
					for(var i = 0; i < this.bettingList.length; i++) {
						this.bettingList[i].check = true
					}
				} else {
					for(var i = 0; i < this.bettingList.length; i++) {
						this.bettingList[i].check = false
					}
				}
			},
			timeLeft() {
				let that = this;
				that.$axios.get('/inter/ticket/timeLeft/' + that.$route.query.classId).then(function(data) {
					let kindId = that.$route.query.kindId
					if( data.data.data[kindId]<0) {
						that.total = data.data.data[kindId]+that.time
					}else{
						that.total = data.data.data[kindId]
					}
//							
					that.countdowm(that.total)
				}).catch(function(error) {
					console.log(error)
				})
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
				
        

		},
			countdowm(t) {
				let that = this;
				clearInterval(timed)
				timed = setInterval(function() {
					if(t > 0) {
						t -= 1;
						let min = Math.floor(t / 60);
						let sec = (t % 60 / 100).toFixed(2).slice(-2);
						min = min < 10 ? "0" + min : min;
						let format = min + ":" + sec;
						that.content = format;
					} else {
						t = that.time;
                        let periodNoAll = sessionStorageGet('periodNoAll')[that.$route.query.classId][that.$route.query.kindId]
						that.awarPeriod = that.createChasePeriod(that.awarPeriod,1,periodNoAll,that.$route.query.kindId)
					}
				}, 1000);
			},
			goback() {
				sessionStorageSet('routeIndx', -1)
				this.$router.push({
					name: 'bettingHall',
					query: {
						kindId: this.$route.query.kindId,
						classId: this.$route.query.classId
					}
				})
			},
			Delete() {
				var idxList = []
				let checkList = document.querySelectorAll(".goucai_container_list .a input")
				for(let i = 0; i < checkList.length; i++) {
					if(checkList[i].checked) {
						delete this.bettingList[i]
					}
				}
				for(var i = 0; i < this.bettingList.length; i++) {
					if(this.bettingList[i] == "" || typeof(this.bettingList[i]) == "undefined" || this.bettingList[i] == null) {
						this.bettingList.splice(i, 1);
						i = i - 1;
					}
				}
//				console.log(this.bettingList)
				sessionStorageSet("list", this.bettingList)
			},
			bet() {
					var that = this
				if(this.bettingList.length != 0) {
				
					this.$axios.get('/inter/ticket/winsDragon/' + this.$route.query.kindId).then(function(data) {
						if(data.data.code==666||!sessionStorageGet('baseMember')){
							that.$dialog.alert({mes:'未登入',callback:function(){
								 sessionStorage.clear();
								  that.$router.replace({name:'login'});
							}})
//            MessageBox.alert('未登入').then(function () {
//            that.$router.replace({name:'login'});
//            sessionStorage.clear();
//          })
          }
//						console.log(data.data.data)
						that.winsDragonList = data.data.data
//						Indicator.open();
						let orderList = []
						let cost = 0
						for(let i = 0; i < that.bettingList.length; i++) {
							let xuanhao = that.bettingList[i].xuanhao.replace(/\?/g, "")
							let item = {
								lotteryNum: xuanhao,
								orderNum: that.bettingList[i].noteNumber,
								periodNo: that.winsDragonList.winList[0].awarPeriod,
								subGameId: that.bettingList[i].subGameId,
								totalAmount: that.bettingList[i].totalPrice,
								unitPrice: that.bettingList[i].totalPrice / that.bettingList[i].noteNumber
							}
							cost += that.bettingList[i].totalPrice
							orderList.push(item)
						}
						that.$axios({
							method: 'post',
							url: '/inter/ticket/chipIn',
							data: {
								baseLotteryId: that.$route.query.kindId,
								cost: Math.round(cost*100)/100,
								orderList: orderList,
								orderType: "0",
								periodNo: that.winsDragonList.winList[0].awarPeriod
							}
						}).then(function(data) {
//							console.log(data)
							if(data.data.code == 0 && data.data.msg == "OK") {
								sessionStorageSet("list", [])
								that.bettingList = []
//								Indicator.close();
                                 that.$dialog.alert({mes:'投注成功'})
                                  that.solde-=Math.round(cost*100)/100
                        let baseMember =sessionStorageGet("baseMember")
                        baseMember.accountBalance = that.solde
                        sessionStorageSet("baseMember",baseMember)
//								MessageBox.alert("投注成功")
							} else {
								if(data.data.code==666||!sessionStorageGet('baseMember')){
									that.$dialog.alert({mes:'未登入',callback:function(){
								 sessionStorage.clear();
								  that.$router.replace({name:'login'});
							}})
//            MessageBox.alert('未登入').then(function () {
//            that.$router.replace({name:'login'});
//            sessionStorage.clear();
//          })
          }else{
          	 that.$dialog.alert({mes:data.data.msg})
//        	MessageBox.alert(data.data.msg)
          }
							}
						}).catch(function(error) {
							console.log(error)
						})
						//返回的结果
					}).catch(function(error) {
						console.log(error)
					})
				} else {
					 that.$dialog.alert({mes:"您的购彩篮空空如也,快去下注吧！"})
//					MessageBox.alert("您的购彩篮空空如也,快去下注吧！")
				}

			},

		}
	}
</script>

<style scoped="scoped">


	.foot_center_num {
		text-align: center;
		text-overflow: ellipsis;

		overflow: hidden;
		height: 0.6rem;
		line-height: 0.6rem;
		color: #edac0c;
	}
	.list_menu_second span {
		margin-right: 0.15rem;
	}

	.fanhui {
		position: absolute;
		left: 0.4rem;
		width: 1.43rem;
		height: 1.125rem;
		line-height: 1.125rem;
    font-size: 0.43rem;
	}

	nav div img {
		margin-right: 0.15rem;
		vertical-align: middle;
	}

	.a {
		box-shadow: -1px -2px 8px black;
		overflow: hidden;
		display: flex;
		justify-content: space-around;
		align-items: center;
	}
    .solde{
   	height:0.8rem;
   	color: #d81e06;
   	line-height: 0.8rem;
   	display: flex;
   	align-items: center;
   	box-sizing: border-box;
   	
   }
   .solde img{
   	width: 0.6rem;
   	height: 0.6rem;
   }
	.buyColorBasket nav {
		display: flex;
		align-items: center;
		justify-content: center;
		position: fixed;
		color: white;
		width: 100%;
		height: 1.125rem;
		background-image: linear-gradient(to bottom, #393c44, #1e2026);

	}

	.goucai_bianji {
		width: 1rem;
		height: 1.125rem;
		position: absolute;
		right: 0.4rem;
		line-height: 1.25rem;
	}
	.goucai_header{
		top: 1.125rem;
		position:fixed;
		background: #fff;

	}
	.goucai_header,
	.goucai_header span {
		width: 100%;
		height: 1.4rem;
		line-height: 1.4rem;
		text-align: center;
		color: black;
		font-weight: 900;
	}

	.goucai_header b {
		color: red;
		font-weight: 900;
	}
	.goucai_container {
	width: 100%;
    position: absolute;
    top: 2.525rem;
    bottom: 1.7rem;
    overflow: auto;
	}

	.list_menu_first h1,
	.list_menu_first p {
		display: inline-block;
		word-wrap: break-word;
	}

	.goucai_container p
	{
		color: black;
	}

	.goucai_container_list {
		width: 9.2rem;
		color: #000;
		box-shadow: -1px -7px 10px #33333333;
		margin: auto;
	}

	.goucai_container_list_menu {
		width: 8rem;
		box-sizing: border-box;
		padding: 0.2rem;
	}

	.goucai_container i {
		width: 0.7rem;
		display: block;
		float: left;
		position: relative;
		left: 0.5rem;
		top: 0.3rem;
		/*background: url("/images/fuxuan.png") no-repeat center;*/
	}

	.hr {
		width: 9.6rem;
		height: 0.3rem;
		background-color: gainsboro;
		box-shadow: -1px -2px 8px black;
		border-radius: 5px;
		margin: auto;
	}
  .bc_a{
    display: inline-block;
    width: 64%;
  }
	/*******************************/

	.ss_a {
		width: 100%;
		height: 1.5rem;
		line-height: 1.34rem;
		color: #2b2c30;
		position: fixed;
		bottom: 1.8rem;
		background: #fff;
	}

	.sec_left_a {
		width: 50%;
		float: left;
		color: #2b2c30;
		line-height: 1.5rem;
		text-indent: 1rem;
	}

	.sec_right_a {
		width: 50%;
		float: right;
		color: #2b2c30;
		line-height: 1.5rem;
		text-indent: 3rem;
	}
	/*********************************************/

	.ss {
		width: 100%;
		/*height: 1.5rem;*/
		text-align: center;
		line-height: 1.34rem;
		color: #2b2c30;
		/*position: fixed;*/
		/*bottom: 1.7rem;*/
	}

	.sec_left {
		width: 50%;
		float: left;
		color: #2b2c30;
		line-height: 1.5rem;
	}

	.sec_right {
		width: 50%;
		float: right;
		color: #2b2c30;
		line-height: 1.5rem;
	}

	.sec_left input {
		width: 2.4rem;
		height: 0.8rem;
		margin: 0 0.2rem 0 0.2rem;
	}

	.sec_right input {
		width: 2.4rem;
		height: 0.8rem;
		margin: 0 0.2rem 0 0.2rem;
	}
  .list_menu_first{
    text-align: left;
    word-wrap: break-word;
    padding-left: 1rem;
  }

	.goucai_zhuihao {
		width: 100%;
		height: 1.7rem;
		position: fixed;
		bottom: 0;
		background-color: #f1f1f0;
		display: flex;
		justify-content: space-around;
		align-items: center;
	}

	.goucai_zhuihao button {
		width: 2.4rem;
		height: 1rem;

		color: black;
		font-weight: 900;
		border: solid 0.03rem #b0b0b0;
		border-radius: 0.1rem;
		text-align: center;
		background: #f1f1f0;
	}

	.goucai_jisuan {
		width: 2.4rem;
		color: black;
		font-weight: 900;
		text-align: center;
		background: #f1f1f0;
    flex:0.9;
    height: 100%;
    display:flex;
    align-items: center;
    justify-content: center;

	}

	.goucai_jisuan p {

		color: black;
	}

	.goucai_jisuan span {
		color: red;
	}

	.check {
		margin-left: 0.5rem;
	}
</style>
