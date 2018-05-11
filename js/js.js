  import Vue from "vue";
	import { Popup } from 'mint-ui';
	Vue.component(Popup.name, Popup);
	import global_ from '../Global.vue';
	import '../../static/js/utils/CalcBetCount.js';
	import '../../static/js/utils/CalcBetCountConfig.js';
	import '../../static/js/utils/CreateBetNumbers.js';
	var timed = null;
	//ssc两面盘subGameId数组;
	var SscSpecialArr = [];
	//bjsc两面盘subGameId数组;
	var bjscSpecialArr = [];
	for(var i = 1; i < 28; i++) {
					if(i < 10) {
						SscSpecialArr.push("30140" + i)
					} else {
						SscSpecialArr.push("3014" + i)
					}
				}
	for(var i = 3; i < 24; i++) {
					if(i < 10) {
						bjscSpecialArr.push("60050" + i)
					} else {
						bjscSpecialArr.push("6005" + i)
					}
				}
	//ks和值subGameId数组
	var ksSumValArr = ["400101", "400102", "400103", "400104", "400105", "400106", "400107", "400108", "400109", "400110", "400111", "400112", "400113", "400114", "400115", "400116"];
	//包胆数组
	var baodan = ["300212", "300216", "300310", "300410", "300510"]
	//特殊号码
	var specialNum = ["300312", "300412", "300512"]
	
	export default {
		name: 'BettingHall',
		data() {
			return {
				title:'',
				showTxt:false,
				showOddDetail: false,
				classId: this.$route.query.classId,
				idx1: "",
				idx2: "",
				arr: [],
				rowName: '',
				label: '',
				dataList: [],
				commitList: [],
				noteNumber: 0,
				sessionList: [],
				checkedNumer: [],
				tradeNumber: 0,
				totalPrice: 0,
				multiple: 1,
				subGameList: "",
				price: 1,
				moneyUnit: 1,
				subClass: "",
				kindId: this.$route.query.kindId,
				standGameList: "",
				gameName: "",
				gameId: "",
				playList: "",
				leftNameList: [],
				childRenPlayList: [],
				is: false,
				subGameId: "",
				leftName: "",
				rightName: "",
				activeIdx1: 0,
				activeIdx2: 0,
				activeIdx3: 0,
				winList: "",
				awardNum: [],
				end: true,
				nextTime: "",
				currentTime: "",
				content: "00:00",
				animation: "result-number-list animation",
				t: "",
				message: null,
				awarPeriod1: "",
				awarPeriod2: "",
				show: true,
				inputTxt: "",
				errPrompt: "",
				inputFormat: "",
				isUnitary: false,
				isbaodan: false,
				specialNum: false,
				total: null,
				popupVisible: false,
				awardNumLg: "",
				check: "clear",
				newNumbers: [],
				betTypeMap: {},
				SpecialHide: true,
				ksSumValArr: ["400101", "400102", "400103", "400104", "400105", "400106", "400107", "400108", "400109", "400110", "400111", "400112", "400113", "400114", "400115", "400116"],
				dantuoArr: ['500105', '500110', '500115', '500205', '500210', '500701', '500702', '500703', '500704', '500705', '500706', '500707', '400402', '400802', '400701'],
				SpecialArr: [],
				SpecialBox: false,
				time: 60,
				betBgColor: {
					background: "#15141A",
				},
				labelCss1: {
					float: 'left',
					background: "#efb845",
					width: 0.90 + 'rem',
					height: 0.90 + 'rem',
					borderRadius: 0.90 + 'rem',
					marginBottom: 0.25 + 'rem',
					textAlign: 'center',
					lineHeight: 0.90 + 'rem',
				},
				labelCss2: {
					float: 'left',
					background: "red",
					width: 0.90 + 'rem',
					height: 0.90 + 'rem',
					borderRadius: 0.90 + 'rem',
					marginBottom: 0.25 + 'rem',
					textAlign: 'center',
					lineHeight: 0.90 + 'rem',
				},
				labelCss3: {
					float: 'left',
					background: "red",
					width: 0.90 + 'rem',
					height: 0.90 + 'rem',
					borderRadius: 0.90 + 'rem',
					margin: 0.2 + 'rem',
					textAlign: 'center',
					lineHeight: 0.90 + 'rem',
				},
				labelCss4: {
					float: 'left',
					background: "#efb845",
					width: 0.90 + 'rem',
					height: 0.90 + 'rem',
					borderRadius: 0.90 + 'rem',
					margin: 0.2 + 'rem',
					textAlign: 'center',
					lineHeight: 0.90 + 'rem',
				},
				labelCss5: {
					float: 'left',
					background: "red",
					padding: 0.1 + 'rem',
					borderRadius: 0.10 + 'rem',
					margin: 0.2 + 'rem',
					textAlign: 'center',
					lineHeight: 0.90 + 'rem',
				},
				labelCss6: {
					float: 'left',
					background: "#efb845",
					padding: 0.1 + 'rem',
					borderRadius: 0.10 + 'rem',
					margin: 0.2 + 'rem',
					textAlign: 'center',
					lineHeight: 0.90 + 'rem',
				},
				ulLabelCss: {
					display: "flex",
					justifyContent: 'space-around',
				},
				ulLabelCss2: {
					display: "flex",
					justifyontent: 'flex-start',

				},
				red: {
					background: "red",
					float: 'left',
					width: 0.90 + 'rem',
					height: 0.90 + 'rem',
					borderRadius: 0.90 + 'rem',
					marginBottom: 0.25 + 'rem',
					textAlign: 'center',
					margin: 0.2 + 'rem',
					lineHeight: 0.90 + 'rem',
				},
				fd: {
					background: "#efb845",
					float: 'left',
					width: 0.90 + 'rem',
					height: 0.90 + 'rem',
					borderRadius: 0.90 + 'rem',
					marginBottom: 0.25 + 'rem',
					textAlign: 'center',
					margin: 0.2 + 'rem',
					lineHeight: 0.90 + 'rem',
				},
				shortcut: {
					display: "flex",
					flexWrap: "wrap",
					justifyContent: "space-around",
					alignItems: "center",
					height: "100%",
				},
				rightBoxLiCss: {
					float: 'left',
					width: '0.90rem ',
					height: '0.90rem ',
					border: '1px solid #fff',
					borderRadius: '0.1rem',
					textAlign: 'center',
					lineHeight: '0.90rem',
					margin: "0.2rem",
					boxSizing: 'border-box;',
				},
				kshzCss1: {
					background: "rgb(239, 184, 69)",
					width: "0.9rem",
					height: "0.9rem",
					borderRadius: "0.9rem",
					margin: "0.2rem 0.15rem",
					textAlign: "center",
					lineHeight: "0.9rem",
				},
				kshzCss2: {
					background: "red",
					width: "0.9rem",
					height: "0.9rem",
					borderRadius: "0.9rem",
					margin: "0.2rem 0.15rem",
					textAlign: "center",
					lineHeight: "0.9rem",
				},
				bjpkCss: {
					width: "0.808rem",
					height: "0.808rem",
					lineHeight: "0.808rem",
					fontSize: '0.390625rem',
					fontWeight: "700",
					textAlign: "center",
					color: "#FFF",
					margin: "0.08rem"
				},
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
				bileCodeArr: [],
				dragCodeArr: [],
				
				awardNum2: [],
				isbjscSpecial: false,
				bjscData: [],
				ksSumval: [],
				lotteryLg: 5,
				ksSumData: [],
				bjscDataList: [],
				betList: [],
				SpecialDataList:[],
				reacquire:true,
				ksSubVal: false,
				bjscSpecial:false,
				sscSpecial:false
				
				
                
			}
		},
		//获取数据
		created() {
			
			this.$axios.get('/inter/ticket/gamePlay/' + this.$route.query.classId + '/' + this.kindId).then((data)=> {
				this.standGameList = data.data.data.standGameList
				this.gameName = this.standGameList[0].gameSons[0].gameName,
				this.subGameId = this.standGameList[0].gameSons[0].subGameId
				this.leftName = this.standGameList[0].gameSons[0].leftName
				this.rightName = this.standGameList[0].gameSons[0].rightName
				this.playList = this.standGameList[0].gameSons
				this.isksSumVal()
				this.getDataList()
				//子玩法列表信息
			}).catch(function(error) {
				console.log(error)
			})
			this.subClassGame()
			this.lotteryNumLg();
			this.timeLeft();
			
			this.winsDragon();
			this.websocketf();
			if(sessionStorageGet("list")) {
				this.tradeNumber = sessionStorageGet("list").length;
			}
		},
		methods: {
			//判断是否为特殊玩法
			isSpecial(){
				if(ksSumValArr.indexOf(this.subGameId)!=-1||SscSpecialArr.indexOf(this.subGameId)!=-1||bjscSpecialArr.indexOf(this.subGameId)!=-1){
					return true;
				} else {
					return false;
				}
			},
			//获取数据
			getDataList(){
				if(!this.isSpecial()){//一般玩法
					this.$axios.get('/inter/ticket/subGame/' + this.subGameId).then((data) =>{
						this.subGameList = data.data.data
					}).catch(function(error) {
						console.log(error)
					})
				this.dataList = createBetNumbers(
					{
						leftName: this.leftName,
						rightName: this.rightName,
						subGameId: this.subGameId,
					}
					)
				this.ksSubVal= false;
				this.bjscSpecial=false;
				this.sscSpecial=false;
				this.reacquire = true;
				}else{//特殊玩法
					 let subGameIdArr = []
					if(ksSumValArr.indexOf(this.subGameId)!=-1){//ks和值
						this.ksSubVal= true;
						subGameIdArr = ksSumValArr;
					} else if(SscSpecialArr.indexOf(this.subGameId)!=-1){//ssc两面盘
						this.sscSpecial=true;
						subGameIdArr = SscSpecialArr;
					} else if(bjscSpecialArr.indexOf(this.subGameId)!=-1){//bjsc两面盘
						this.bjscSpecial=true;
						subGameIdArr = bjscSpecialArr;
					}
					this.betTypeData()
					if(this.reacquire){
						this.$axios({
					method: 'post',
					url: '/inter/ticket/subGames',
					data: {
						gameIds: subGameIdArr
					}
				    }).then((data)=> {
					this.subGameList = data.data.data
					console.log(this.subGameList)
					this.dataList = createSpecialBetNumbers(
						{
						betRates: [this.subGameList],
						betTypeMap: this.betTypeMap,
						subGameIds: subGameIdArr
					    }
						)
					console.log(this.dataList.numbers)
					this.setSpecialDataList()
					this.reacquire = false;
				    }).catch(function(error) {
					console.log(error)
				    })
					}else{
						this.dataList = createSpecialBetNumbers(
						{
						betRates: [this.subGameList],
						betTypeMap: this.betTypeMap,
						subGameIds: subGameIdArr
					    }
						)
					this.setSpecialDataList()
					}
					
				}
			},
			//注数，金额提示弹层
			titleShow(e){
			  this.showTxt=true
              var y = e.target.offsetTop;
              var x = e.target.offsetLeft;
              var val = e.target.offsetParent;
              while(val != null){
              y += val.offsetTop;
              x += val.offsetLeft;
                val = val.offsetParent;
               }
            this.title=e.target.innerHTML;
            this.showTitleCss.left=x+'px';
            this.showTitleCss.top=y-20+'px';
			},
			//隐藏提示弹层
			titleHide() {
				this.showTxt=false;
			},
			//快捷投注参数
			betParams() {
				let that = this;
				// 空数组收集投注参数
				let orderList = [];
				let cost = 0;
				for(let i = 0; i < that.betList.length; i++) {
					
					let xuanhao = that.betList[i].xuanhao.replace(/\?/g, "");
					let item = {
						lotteryNum: xuanhao,
						orderNum: that.betList[i].noteNumber,
						periodNo: that.awarPeriod1,
						subGameId: that.betList[i].subGameId,
						totalAmount: that.betList[i].totalPrice,
						unitPrice: that.betList[i].totalPrice / that.betList[i].noteNumber
					}
					//每次投注总金额
					cost += that.betList[i].totalPrice * 1;
					orderList.push(item);
				}
				//data为post请求参数
				let data = {
					baseLotteryId: that.kindId,
					cost: cost,
					orderList: orderList,
					orderType: "0",
					periodNo: that.awarPeriod1
				}
				that.betAxios(data)
			},
			//快捷投注请求
			betAxios(data) {
				let that = this;
				that.$axios({
					method: 'post',
					url: '/inter/ticket/chipIn',
					data: data
				}).then(function(data) {
					if(data.data.code == 0 && data.data.msg == "OK") {
						alert("投注成功")
						that.clear()
						that.betList = []
					} else {
						that.betList = []
						alert(data.data.msg)
					}
				}).catch(function(error) {
					console.log(error)
				})

			},
			//bjsc特殊号码提交方式
			bjscSpecialCommit(){
				       if(this.leftName == "冠亚合值"){
							for(let i = 0; i < this.newNumbers.length; i++) {
								if(this.newNumbers[i].length != 0) {
									let value = {
										noteNumber: 1,
										oddMax: this.subGameList.oddMax,
										totalPrice: this.price,
										Gameplay: this.leftName + "(" + this.dataList.numbers[i].cols[0].label + ")",
										xuanhao: this.dataList.numbers[i].cols[0].label,
										kindId: this.kindId,
										subGameId: this.subGameId,
										check: false
									}
									this.betList.push(value)
								}
							}
							
			}else{
				            //截取属于冠亚组合合值的subGameId的数组
							let arr = bjscSpecialArr.slice(4);
							//截取属于冠亚组合合值的赔率的数组
							let oddMaxData = this.subGameList.slice(4);
							//每个subGameId的赔率
							
								for(let i = 0; i < this.newNumbers.length; i++) {
									if(this.newNumbers[i].length!=0){
										let value = {
											noteNumber: 1,
											oddMax: oddMaxData[i].oddMax ,
											totalPrice: this.price,
											Gameplay: this.leftName ,
											xuanhao:this.dataList.numbers[i].cols[0].label ,
											kindId: this.kindId,
											subGameId: oddMaxData[i].subGameId,
											check: false
										}
										this.betList.push(value)
									}
								}
								
						
			}
				      },
			//ks和值提交方式
			ksSubValCommit(){
				let oddMax
						for(let i = 0; i < this.newNumbers[0].length; i++) {
							    switch(this.newNumbers[0][i]){
								case '3':
									oddMax = this.subGameList[0].oddMax
									this.subGameId = "400101"
									break
								case '18':
									this.subGameId = "400116"
									oddMax = this.subGameList[0].oddMax
									break
								case '4':
									this.subGameId = "400102"
									oddMax = this.subGameList[1].oddMax
									break
								case '17':
									this.subGameId = "400115"
									oddMax = this.subGameList[1].oddMax
									break
								case '5':

									this.subGameId = "400103"
									oddMax = this.subGameList[2].oddMax
									break
								case '16':
									this.subGameId = "400114"
									oddMax = this.subGameList[2].oddMax
									break
								case '6':
									this.subGameId = "400104"
									oddMax = this.subGameList[3].oddMax
									break
								case '15':
									this.subGameId = "400113"
									oddMax = this.subGameList[3].oddMax
									break
								case '7':
									this.subGameId = "400105"
									oddMax = this.subGameList[4].oddMax
									break
								case '14':
									this.subGameId = "400112"
									oddMax = this.subGameList[4].oddMax
									break
								case '8':
									this.subGameId = "400106"
									oddMax = this.subGameList[5].oddMax
									break
								case '13':
									this.subGameId = "400111"
									oddMax = this.subGameList[5].oddMax
									break
								case '9':
									this.subGameId = "400107"
									oddMax = this.subGameList[6].oddMax
									break
								case '12':
									this.subGameId = "400110"
									oddMax = this.subGameList[6].oddMax
									break
								case '10':
									this.subGameId = "400108"
									oddMax = this.subGameList[7].oddMax
									break
								case '11':
									this.subGameId = "400109"
									oddMax = this.subGameList[7].oddMax
									break
							}
							
							let value = {
								noteNumber: 1,
								oddMax: oddMax,
								totalPrice: this.price,
								Gameplay: this.leftName,
								xuanhao:this.newNumbers[0][i],
								kindId: this.kindId,
								subGameId: this.subGameId,
								check: false
							}
							this.betList.push(value)

						}
						return false
					
			},
			//ks胆拖提交方式
			ksdantuoCommit(){
				for(let i = 0;i<this.newNumbers.length;i++){
					for(let k=0;k<this.newNumbers[i].length;k++){
						
						let idx = this.newNumbers[i][k]
						 this.newNumbers[i][k]= this.dataList.numbers[i].cols[idx].label
					}
				}
			},
			//ssc两面盘提交方式
			sscSpecialCommit(){
				if(this.leftName!='龙虎'){
				for(let i = 0 ;i<this.newNumbers.length; i++){
					if(this.newNumbers[i].length!=0){
						for(let k = 0;k<this.newNumbers[i].length;k++){
							let idx = this.newNumbers[i][k]
							
							this.newNumbers[i][k]=this.dataList.numbers[i].cols[idx].label
						}
						let value = {
									noteNumber: this.newNumbers[i].length,
									oddMax: this.subGameList[0].oddMax,
									totalPrice: this.price * this.newNumbers[i].length,
									Gameplay: this.dataList.numbers[i].leftName + "(" + this.dataList.numbers[i].rowName + ")",
									xuanhao: this.newNumbers[i].join(","),
									kindId: this.kindId,
									subGameId: this.dataList.numbers[i].subGameId,
									check: false
								}
								this.betList.push(value)
					}
				}
				}else{
							let he = []
							for(let i = 0; i < this.newNumbers.length; i++) {
								if(this.newNumbers[i].length!=0){
									if(this.newNumbers[i].length == 2) {
										   let idx = this.newNumbers[i][0]
										    this.newNumbers[i][0]=this.dataList.numbers[i].cols[idx].label;
										    this.newNumbers[i][1]=this.dataList.numbers[i].rightName;
										    console.log(this.dataList.numbers[i].cols[idx].label)
											he.push(this.newNumbers[i][1])
											this.newNumbers[i].splice(1, 1)
											let value = {
											noteNumber: 1,
											oddMax: this.subGameList.oddMax,
											totalPrice: this.price,
											Gameplay: this.dataList.numbers[i].leftName + "(" + this.dataList.numbers[i].rowName + ")",
											xuanhao: this.newNumbers[i][0],
											kindId: this.kindId,
											subGameId:this.dataList.numbers[i].subGameId ,
											check: false
										}
									     this.betList.push(value)
										}else {
											let idx = this.newNumbers[i][0]
											console.log(idx)
											if(idx==2){
												this.newNumbers[i][0]=this.dataList.numbers[i].rightName;
												he.push(this.newNumbers[i][0])
											}else{
												this.newNumbers[i][0]=this.dataList.numbers[i].cols[idx].label;
												let value = {
											noteNumber: 1,
											oddMax: this.subGameList.oddMax,
											totalPrice: this.price,
											Gameplay: this.dataList.numbers[i].leftName + "(" + this.dataList.numbers[i].rowName + ")",
											xuanhao: this.newNumbers[i][0],
											kindId: this.kindId,
											subGameId:this.dataList.numbers[i].subGameId ,
											check: false
										}
									      this.betList.push(value)
											}
											
										}
									
								}
					}
							if(he.length != 0) {
								let hao = he.join(",")
								let value = {
									noteNumber: he.length,
									oddMax: this.subGameList.oddMax,
									totalPrice: this.price * he.length,
									Gameplay: this.leftName + "(" + "和" + ")",
									xuanhao: he.join(","),
									kindId: this.kindId,
									subGameId: '301417',
									check: false
								}
								this.betList.push(value)
							}
							
				}
				
			},
			quickBet() {
				if(this.noteNumber != 0) {
					//判断单注上限金额
					if(this.price >= this.subGameList.oneNoteLimit) {
						alert("单注金额上限是 " + this.subGameList.oneNoteLimit + "元")
						return false
					}
					//判断每注投注金额
					if(this.totalPrice >= this.subGameList.singleLimit) {
						alert("每次投注金额上限是 " + this.subGameList.singleLimit + "元")
						return false
					}
					//bjsc特殊号码提交方式
					if(this.bjscSpecial) {
						this.bjscSpecialCommit()
						this.betParams()
						return false
					}
					//ks和值提交方式
					if(this.ksSubVal) {
						this.ksSubValCommit()
						this.betParams()
						return false
					}
					//快三胆拖提交
					if(this.dantuoArr.indexOf(this.subGameId) != -1) {
						this.ksdantuoCommit()
					}
					//ssc两面盘提交方式
					if(this.sscSpecial){
						this.sscSpecialCommit()
						this.betParams()
						return false;
					}
					//单式提交方式
					if(this.isUnitary){
						console.log(this.subGameList)
						this.newNumbers = calcInputBetCount(this.dataList, this.inputTxt, []).numbers
							this.newNumbers = this.newNumbers.join(",")
							let value = {
							noteNumber: this.noteNumber,
							oddMax: this.subGameList.oddMax,
							totalPrice: this.totalPrice,
							Gameplay: this.leftName + "(" + this.rightName + ")",
							xuanhao: this.newNumbers,
							subGameId: this.subGameId,
							kindId: this.kindId,
							check: false
						}
						this.betList.push(value)
						this.clearInput()
						this.betParams()
						return false;
					}
					//非特殊玩法提交方式	
					//============================================
					
					if(this.specialNum) { //前三特殊号码提交方式
						
							let lg = this.newNumbers[0]
							
							for(let i = 0; i < lg.length; i++) {
								let value = {
									noteNumber: this.noteNumber / lg.length,
									oddMax: this.subGameList.oddMax,
									totalPrice: this.totalPrice,
									Gameplay: this.leftName + "(" + this.rightName + ")",
									xuanhao: lg[i],
									kindId: this.kindId,
									subGameId: this.subGameId,
									check: false
								}
								this.betList.push(value)

							}
							this.betParams()
							return false
						}
						let idx = this.dataList.numbers.length //长度
							if(idx == 1) {//单列
								if(this.isbaodan) { //包胆
									this.newNumbers = this.newNumbers[0][0] + "";
								} else if(this.specialNum) { //特殊号码
									this.newNumbers = this.newNumbers.join(",")
								} else { //单行非特殊号码
									this.newNumbers = this.newNumbers[0].join(",")
								}
							} else {
								for(let i = 0; i < this.newNumbers.length; i++) {
									if(this.newNumbers[i].length == 0) {
										this.newNumbers[i] = "?" //place?为空用？代替
									} else {
										this.newNumbers[i] = this.newNumbers[i].join("") //不为空则进行排序并拼接成字符串
									}
								}
								this.newNumbers = this.newNumbers.join(",") //多列最终格式  例“123,?,34,67,36”

							}
							//非特殊号码提交方式
							let value = {
								noteNumber: this.noteNumber,
								oddMax: this.subGameList.oddMax,
								totalPrice: this.totalPrice,
								Gameplay: this.leftName + "(" + this.rightName + ")",
								xuanhao: this.newNumbers,
								kindId: this.kindId,
								subGameId: this.subGameId,
								check: false
							}
							this.betList.push(value)
							this.betParams()
							
						
				} else {

					alert("请至少选择1注进行投注!")
				}

			},
			addList(){
				
				if(this.noteNumber != 0) {
					//判断单注上限金额
					if(this.price >= this.subGameList.oneNoteLimit) {
						alert("单注金额上限是 " + this.subGameList.oneNoteLimit + "元")
						return false
					}
					//判断每注投注金额
					if(this.totalPrice >= this.subGameList.singleLimit) {
						alert("每次投注金额上限是 " + this.subGameList.singleLimit + "元")
						return false
					}
					//bjsc特殊号码提交方式
					if(this.bjscSpecial) {
						this.bjscSpecialCommit()
						this.addSession()
						this.clear()
						return false
					}
					//ks和值提交方式
					if(this.ksSubVal) {
						this.ksSubValCommit()
						this.addSession()
						this.clear()
						return false
					}
					//快三胆拖提交
					if(this.dantuoArr.indexOf(this.subGameId) != -1) {
						this.ksdantuoCommit()
						
					}
					//ssc两面盘提交方式
					if(this.sscSpecial){
						this.sscSpecialCommit()
						this.addSession()
						this.clear()
						return false;
					}
					//单式提交方式
					if(this.isUnitary){
						console.log(this.subGameList)
						this.newNumbers = calcInputBetCount(this.dataList, this.inputTxt, []).numbers
							this.newNumbers = this.newNumbers.join(",")
							let value = {
							noteNumber: this.noteNumber,
							oddMax: this.subGameList.oddMax,
							totalPrice: this.totalPrice,
							Gameplay: this.leftName + "(" + this.rightName + ")",
							xuanhao: this.newNumbers,
							subGameId: this.subGameId,
							kindId: this.kindId,
							check: false
						}
						this.betList.push(value)
						this.clearInput()
						this.addSession()
						return false;
					}
					//非特殊玩法提交方式	
					//============================================
					
					if(this.specialNum) { //前三特殊号码提交方式
						
							let lg = this.newNumbers[0]
							
							for(let i = 0; i < lg.length; i++) {
								let value = {
									noteNumber: this.noteNumber / lg.length,
									oddMax: this.subGameList.oddMax,
									totalPrice: this.totalPrice,
									Gameplay: this.leftName + "(" + this.rightName + ")",
									xuanhao: lg[i],
									kindId: this.kindId,
									subGameId: this.subGameId,
									check: false
								}
								this.betList.push(value)

							}
							this.addSession()
							this.clear()
							return false
						}
						let idx = this.dataList.numbers.length //长度
							if(idx == 1) {//单列
								if(this.isbaodan) { //包胆
									this.newNumbers = this.newNumbers[0][0] + "";
								} else if(this.specialNum) { //特殊号码
									this.newNumbers = this.newNumbers.join(",")
								} else { //单行非特殊号码
									this.newNumbers = this.newNumbers[0].join(",")
								}
							} else {
								for(let i = 0; i < this.newNumbers.length; i++) {
									if(this.newNumbers[i].length == 0) {
										this.newNumbers[i] = "?" //place?为空用？代替
									} else {
										this.newNumbers[i] = this.newNumbers[i].join("") //不为空则进行排序并拼接成字符串
									}
								}
								this.newNumbers = this.newNumbers.join(",") //多列最终格式  例“123,?,34,67,36”

							}
							//非特殊号码提交方式
							let Gameplay;
							if(this.rightName == null){
								 Gameplay = this.leftName
							}else{
								 Gameplay = this.leftName + "(" + this.rightName + ")" ;
							}
							
							let value = {
								noteNumber: this.noteNumber,
								oddMax: this.subGameList.oddMax,
								totalPrice: this.totalPrice,
								Gameplay:Gameplay,
								xuanhao: this.newNumbers,
								kindId: this.kindId,
								subGameId: this.subGameId,
								check: false
							}
							this.betList.push(value)
							this.addSession()
							this.clear()
				} else {

					alert("请至少选择1注进行投注!")
				}
			},
			//判断开奖号码位数
			lotteryNumLg() {
				switch(this.classId) {
					case '1':
						break
					case '2':
						break
					case '3':
						this.lotteryLg = 5
						break
					case '4':
						this.lotteryLg = 3
						break
					case '5':
						this.lotteryLg = 5
						break
					case '6':
						this.lotteryLg = 10
						break

				}
			},
			//判断是否为ks和值
			isksSumVal() {
				if(this.ksSumValArr.indexOf(this.subGameId) != -1) {
					this.ksSubVal = true;


				} else {
					this.ksSubVal = false;

				}
			},
			//胆拖选号
			bileDragSelect(indexObj) {
				this.commitList = this.dataList
				let index = indexObj.split("-")
				//胆码选择上限
				let dantuoMax = this.dataList.dantuoMax
				//点击之前的状态
				let boolen = this.dataList.numbers[index[0]]["cols"][index[1]].data_selected
				//index[0]=="0"是点击的为胆码按钮
				this.dataList.numbers[index[0]]["cols"][index[1]].data_selected = !boolen
				if(!boolen) {
					if(index[0] == "0") {
						//点击后将当前点击的胆码位置添加到bileCodeArr
						this.bileCodeArr.push(index[1])
						console.log(this.bileCodeArr)
						let length = this.bileCodeArr.length
						//判断this.bileCodeArr是否超过胆码选择上限
						if(length >= dantuoMax) {
							//要变为未选中的按钮的下标
							let oldIdx = this.bileCodeArr[0];
							//要变为选中的按钮的下标
							let newIdx = this.bileCodeArr[length - 1];
							//改变状态
							this.dataList.numbers[0]["cols"][oldIdx].data_selected = false;
							this.dataList.numbers[0]["cols"][newIdx].data_selected = true;
							//状态改变后删除第0条
							this.bileCodeArr.splice(0, 1)
						}
					} else {
						this.dataList.numbers[0]["cols"][index[1]].data_selected = false;
						if(this.bileCodeArr.indexOf(index[1]) != -1) {
							let idx = this.bileCodeArr.indexOf(index[1])
							this.bileCodeArr.splice(idx, 1)
						}

					}
				} else {
					this.dataList.numbers[0]["cols"][index[1]].data_selected = false;
					if(this.bileCodeArr.indexOf(index[1]) != -1) {
						let idx = this.bileCodeArr.indexOf(index[1])
						this.bileCodeArr.splice(idx, 1)
					}
				}

				//胆码与拖码互斥，两者间只有一个按钮得状态为true
				if(index[0] == "0") {
					if(this.dataList.numbers[0]["cols"][index[1]].data_selected == true) {
						this.dataList.numbers[1]["cols"][index[1]].data_selected = false
					}
				} else if(index[0] == "1") {
					if(this.dataList.numbers[1]["cols"][index[1]].data_selected == true) {
						this.dataList.numbers[0]["cols"][index[1]].data_selected = false
					}
				}
				this.noteNumber = calcChooseBetCount(this.dataList, []).ticketCount;
				this.newNumbers = calcChooseBetCount(this.dataList, []).newNumbers;
			},
			//两面盘按钮选择方式
			changeSelected(index) {
				//点击改变状态
				this.dataList.numbers[index[0]]["cols"][index[1]].data_selected = !this.dataList.numbers[index[0]]["cols"][index[1]].data_selected;
				//点击之后的状态
				let boolen = this.dataList.numbers[index[0]]["cols"][index[1]].data_selected;
				//inverse为label对应的号码   大-1  小-0
				let inverse = this.dataList.numbers[index[0]]["cols"][index[1]].inverse;
				switch(inverse) {
					//大小单双质合互斥
					case 0:
						if(boolen) {
							this.mutex(index, 1, boolen)
						}
						break
					case 1:
						if(boolen) {
							this.mutex(index, 0, boolen)
						}
						break
					case 2:
						if(boolen) {
							this.mutex(index, 3, boolen)
						}
						break
					case 3:
						if(boolen) {
							this.mutex(index, 2, boolen)
						}
						break
					case 4:
						if(boolen) {
							this.mutex(index, 5, boolen)
						}
						break
					case 5:
						if(boolen) {
							this.mutex(index, 4, boolen)
						}
						break
				}
				this.noteNumber = calcChooseBetCount(this.dataList, []).ticketCount;
				this.newNumbers = calcChooseBetCount(this.dataList, []).newNumbers;
				if(this.isbjpkSpecial) {
					this.numberScreening()
				}
				
			},
			//两面盘互斥算法
			mutex(index, num, boolen) {
				for(let i = 0; i < this.dataList.numbers[index[0]]["cols"].length; i++) {
					if(this.dataList.numbers[index[0]]["cols"][i].inverse == num) {
						this.dataList.numbers[index[0]]["cols"][i].data_selected = !boolen
					}
				}
			},
			//清除单式文本内容
			clearInput() {
				this.inputTxt = "";
				this.errPrompt = "";
			},
			//重置样式
			clear() {
		    //循环初始化数据源this.dataList,清除样式。
				this.bileCodeArr = []
				for(let i = 0; i < this.dataList.numbers.length; i++) {
					for(let n = 0; n < this.dataList.numbers[i]["cols"].length; n++) {
						this.dataList.numbers[i]["cols"][n]["data_selected"] = false;
					}
				}
				this.noteNumber = 0
				this.totalPrice = 0
			},
			//得到各彩种开奖周期时间
			getTime() {
				switch(this.kindId) {
					case "m5ffc":
						this.time = 60;
						break
					case "m53fc":
						this.time = 180;
						break
					case "m55fc":
						this.time = 180;
						break
					case "cqssc":
						let awarPeriod2 = this.awarPeriod2.substring(this.awarPeriod2.length - 3, this.awarPeriod2.length)
						if(awarPeriod2 * 1 >= 95 || awarPeriod2 * 1 < 24) {
							this.time = 300;
						} else {
							this.time = 600;
						}

						break
					case "tjssc":
						this.time = 600;
						break
					case "xjssc":
						this.time = 600;
						break
				}
			},
			//根据大彩类获取旗下所有彩类的倒计时
			timeLeft() {
				let that = this;
				that.$axios.get('/inter/ticket/timeLeft/' + that.$route.query.classId).then(function(data) {
					for(var i in data.data.data) {
						if(i == that.kindId) {
							that.total = data.data.data[i]
							break;
						}
					}
					that.countdowm(that.total)
				}).catch(function(error) {
					console.log(error)
				})
			},
			//输入框正则验证
			verification() {
				let reg = /^[1-9]\d*$/
				if(!reg.test(this.price)) {
					this.price = 1
				}
			},
			//单式注数算法
			judgeFromat() {
				this.commitList = this.dataList
				this.errPrompt = calcInputBetCount(this.commitList, this.inputTxt, []).msg
				this.noteNumber = calcInputBetCount(this.commitList, this.inputTxt, []).ticketCount
				this.totalPrice = this.noteNumber * this.price * this.moneyUnit
			},
			//获取长龙开奖历史
			winsDragon() {
				this.$axios.get('/inter/ticket/winsDragon/' + this.kindId).then((data)=>{
					this.winList = data.data.data.winList
					this.awarPeriod1 = this.winList[0].awarPeriod;
					this.awarPeriod2 = this.winList[1].awarPeriod;
					//特殊彩种重庆时时彩,需要获取当前时间段的开奖周期
					if(this.kindId == "cqssc") {
						this.getTime()
					}
					if(this.winList[1].awardNum != null) {
						this.awardNum = this.winList[1].awardNum.split(",");
						this.awardNum2 = this.winList[5].awardNum.split(",")
						setTimeout(function() {
							this.end = false
							this.animation = "animation"
							this.message = null
						}, 3000)
					}
				}).catch(function(error) {
					console.log(error)
				})
			},
			//返回---
			goback() {
				clearInterval(timed)
				sessionStorageSet("list", [])
				this.$router.push({
					name: 'container',

				})
			},
			//根据返回的数据,提出label值(用于添加数据到购彩篮以及下注)
			numberScreening() {
				for(let i = 0; i < this.newNumbers.length; i++) {
					for(let k = 0; k < this.newNumbers[i].length; k++) {
						let index = this.newNumbers[i][k]
						this.newNumbers[i][k] = this.dataList.numbers[i]["cols"][index]["label"]
					}
				}
				console.log(this.newNumbers)
			},
			//计算投注数量,非特殊玩法
			oneSelect(indexObj) {
				this.changeIndex(indexObj);
				this.noteNumber = calcChooseBetCount(this.dataList, []).ticketCount;
				this.newNumbers = calcChooseBetCount(this.dataList, []).newNumbers;
				this.totalPrice = this.noteNumber * this.price * this.moneyUnit;
				this.numberScreening()
			},
			changeIndex(indexObj) {
				let index = indexObj.split("-");
				let boolen = this.dataList.numbers[index[0]]["cols"][index[1]].data_selected;
				let row = index[0] * 1;
				let col = index[1] * 1;
				if(this.isbaodan) { //包胆玩法----一列只能选一个数字
					if(boolen == true) {
						this.dataList.numbers[row]["cols"][col]["data_selected"] = false;
					} else {
						for(let i = 0; i < this.dataList.numbers.length; i++) {
							for(let k = 0; k < this.dataList.numbers[i].cols.length; k++) {
								this.dataList.numbers[i]['cols'][k]["data_selected"] = false;
							}
						}
						//将其他按钮的["data_selected"] = false;
						this.dataList.numbers[row]["cols"][col]["data_selected"] = true;
					}
				} else { //非特殊玩法
					if(boolen == true) {
						//选中
						this.dataList.numbers[row]["cols"][col]["data_selected"] = false
						//改变属性
					} else {
						//未选中
						this.dataList.numbers[row]["cols"][col]["data_selected"] = true
					}
				}
			},
			//提交下注数据到购彩篮
			addSession(){
				if(sessionStorageGet("list")==null){
					sessionStorageSet("list", this.betList)
					this.tradeNumber = sessionStorageGet("list").length
				}else{
					this.betList = sessionStorageGet("list").concat(this.betList);
					sessionStorageSet("list", this.betList)
					this.tradeNumber = sessionStorageGet("list").length
				}
			},
			//跳转至购彩篮
			to() {
				clearInterval(timed)
				this.$router.push({
					name: 'BuyColourBasket',
					query: {
						kindId: this.kindId,
						classId: this.$route.query.classId
					}
				})
			},
			//快捷选号
			quickSelectNum(obj) {
				let newBetNumbers = this.dataList;
				let middleNumber = newBetNumbers.max / 2;
				switch(obj[1]) {
					case 'all': //全选
						for(let k = 0; k < this.dataList.numbers[obj[0]].cols.length; k++) {
							this.dataList.numbers[obj[0]]["cols"][k]["data_selected"] = true;
						}
						break;
					case 'big': //大
						for(let k = 0; k < this.dataList.numbers[obj[0]].cols.length; k++) {
							if(parseInt(this.dataList.numbers[obj[0]].cols[k].label) > middleNumber) {
								this.dataList.numbers[obj[0]]["cols"][k]["data_selected"] = true;
							} else {
								this.dataList.numbers[obj[0]]["cols"][k]["data_selected"] = false;
							}
						}
						break;
					case 'small': //小
						for(let k = 0; k < this.dataList.numbers[obj[0]].cols.length; k++) {
							if(parseInt(this.dataList.numbers[obj[0]].cols[k].label) <= middleNumber) {
								this.dataList.numbers[obj[0]]["cols"][k]["data_selected"] = true;
							} else {
								this.dataList.numbers[obj[0]]["cols"][k]["data_selected"] = false;
							}
						}
						break;
					case 'odd': //单
						for(let k = 0; k < this.dataList.numbers[obj[0]].cols.length; k++) {
							if(parseInt(this.dataList.numbers[obj[0]].cols[k].label) % 2 === 1) {

								this.dataList.numbers[obj[0]]["cols"][k]["data_selected"] = true;

							} else {
								this.dataList.numbers[obj[0]]["cols"][k]["data_selected"] = false;
							}
						}
						break;
					case 'even': //双
						for(let k = 0; k < this.dataList.numbers[obj[0]].cols.length; k++) {
							if(parseInt(this.dataList.numbers[obj[0]].cols[k].label) % 2 === 0) {
								this.dataList.numbers[obj[0]]["cols"][k]["data_selected"] = true;
							} else {
								this.dataList.numbers[obj[0]]["cols"][k]["data_selected"] = false;
							}
						}
						break;
					case 'clear': //清
						for(let k = 0; k < this.dataList.numbers[obj[0]].cols.length; k++) {
							this.dataList.numbers[obj[0]]["cols"][k]["data_selected"] = false;
						}
						break;
				}

				this.noteNumber = calcChooseBetCount(this.dataList, []).ticketCount
				this.newNumbers = calcChooseBetCount(this.dataList, []).newNumbers
				this.totalPrice = this.noteNumber * this.price * this.moneyUnit
				this.numberScreening()
			},
			//选择子类玩法
			subClassGame() {
				this.$axios.get('/inter/ticket/kind').then((data)=> {
					let list = data.data.data
					for(let i = 0; i < list.length; i++) {
						if(this.$route.query.classId == list[i].classId) {
							this.subClass = list[i].kindList
						}

					}
				}).catch(function(error) {
					console.log(error)
				})
			},
			//选择左名称    idx==当前点击的li索引
			childRenPlay(idx) {
				let leftName = event.target.innerHTML
				let arr = []
				console.log(leftName)
				for(let i = 0; i < this.playList.length; i++) {
					if(leftName == this.playList[i].leftName) {
						arr.push(this.playList[i])
					}
				}
				this.childRenPlayList = arr
				this.leftName = leftName
				this.activeIdx2 = idx
			},
			//选择gameName   name==gameName  id==gameId   idx==当前点击的li索引
			selectGameName(name, id, idx) {
				this.gameName = name
				for(let i = 0; i < this.standGameList.length; i++) {
					if(id == this.standGameList[i].gameId && name == this.standGameList[i].gameName) {
						this.playList = this.standGameList[i].gameSons
					}
				}
				this.leftName = this.playList[0].leftName
				this.rightName = this.playList[0].rightName
				this.set1()
				this.activeIdx1 = idx
				this.activeIdx2 = 0
			},
			//显示各个玩法选项导航
			showMobile() {
				this.is = true;

			},
			betTypeData() {
				this.betTypeMap = {}
				for(let i = 0; i < this.playList.length; i++) {
					let subGameId = this.playList[i].subGameId
					this.betTypeMap[subGameId] = {
						rightName: this.playList[i].rightName,
						leftName: this.playList[i].leftName
					}
				}
			},
			//选择rightName,获取subGameId
			selectRightName(idx) {
				this.rightName = event.target.innerHTML;
				this.subGameId = event.target.getAttribute("subGameId")
				this.activeIdx3 = idx
			},
			//获取左名称列表
			set1() {
				let a = []
				for(let i = 0; i < this.playList.length; i++) {
					let leftName = this.playList[i].leftName
					a.push(leftName)
				}
				this.leftNameList = this.unique(a)
				this.leftName = this.leftNameList[0]
			},
			//数组去重
			unique(arr) {
				var result = [],
					hash = {};
				for(var i = 0, elem;
					(elem = arr[i]) != null; i++) {
					if(!hash[elem]) {
						result.push(elem);
						hash[elem] = true;
					}
				}
				return result;
			},
			//确认玩法
			affirm() {
				this.noteNumber = 0
				this.totalPrice = 0
				this.getDataList()
				if(specialNum.indexOf(this.subGameId) != -1) { //判断是否为特殊号码
					this.specialNum = true;
				} else {
					this.specialNum = false;
				}
				if(baodan.indexOf(this.subGameId) != -1) { //判断玩法是否为包胆
					this.isbaodan = true;
				} else {
					this.isbaodan = false;
				}
				console.log(this.dataList)
				if(this.dataList.inputFormat != false && this.dataList.numbers.length == 0) { //单式
					this.show = false;
					this.inputFormat = this.dataList.inputFormat;
					this.isUnitary = true;
					this.betBgColor = {
								background: "#fff",
							}
				            this.is = false;
				            return false
				} else {
					this.show = true
					this.isUnitary = false
					this.betBgColor = {
								background: "#15141A",
							}
				            this.is = false;
				            return false

				}
			    return false
				this.clear();

			},

			websocketf() {
          
				let URL = global_.BASE_URL.substring(global_.BASE_URL.indexOf("//") + 2, global_.BASE_URL.length);
				

				var websocket = new WebSocket(encodeURI("ws:" + URL + "/notify/" + sessionStorageGet('baseMember').account));
				websocket.onopen = function() {
					//连接成功
				}
				websocket.onerror = function() {
					//连接失败
				}
				websocket.onclose = function() {
					//连接断开
				}
				websocket.onmessage = (message)=> {
					this.message = message.data
				}
			},
			countdowm(t) {
				let that = this;
				that.t = t
				clearInterval(timed)
				timed = setInterval(function() {
					if(t > 0) {
						t -= 1;
						let min = Math.floor(t / 60);
						let sec = (t % 60 / 100).toFixed(2).slice(-2);
						min = min < 10 ? "0" + min : min;
						that.content = min + ":" + sec;
					} else {
						t = that.time;
						that.awarPeriod2++;
						that.awarPeriod1++;
						that.animation = 'result-number-list animation'

					}
				}, 1000);
			},

			setSpecialDataList() {
				
				let that = this
 					       if(!this.ksSubVal){
 					          let SpecialDataList = [];
 					       	this.dataList.numbers.forEach((item)=>{
                               	       if(item.leftName == this.leftName) {
                               	       	SpecialDataList.push(item)
                               	       }
                               })
 					       	  this.dataList.numbers=SpecialDataList
 					       }
			},
			//两面盘所有的subGameId的数组
			SpecialMap() {
				for(var i = 1; i < 28; i++) {
					if(i < 10) {
						this.SpecialArr.push("30140" + i)
					} else {
						this.SpecialArr.push("3014" + i)
					}
				}
			}

		},

		watch: {
			
			message(newMessage) {
				if(newMessage != null) {
					let that = this
					let lotteryId = JSON.parse(newMessage).lotteryId
					if(lotteryId == this.kindId) {
						this.winsDragon()
					}
				}
			},
			//监听注数变化
            noteNumber(){
           	this.totalPrice = Math.round(this.noteNumber * this.price * this.moneyUnit*100)/100
           },
			//监听单价变化
			price(newvalue, oddvalue) {
				this.totalPrice = Math.round(this.noteNumber * this.price * this.moneyUnit*100)/100
			},
			//监听金额单位变化
			moneyUnit(newvalue, oddvalue) {
				this.totalPrice = Math.round(this.noteNumber * this.price * this.moneyUnit*100)/100
			},
			//监听子类ID变化，初始化各项数据
			kindId(newKindId) {
				let that = this
				sessionStorageSet("list", [])
				this.winsDragon()
				that.animation = "result-number-list animation"
				this.$axios.get('/inter/ticket/gamePlay/' + this.$route.query.classId + '/' + newKindId).then(function(data) {
					that.standGameList = data.data.data.standGameList
					console.log(that.standGameList)
					that.subGameId = that.standGameList[0].gameSons[0].subGameId
					that.leftName = that.standGameList[0].gameSons[0].leftName
					that.rightName = that.standGameList[0].gameSons[0].rightName
					that.affirm()
					console.log(that.subGameId)
					that.activeIdx1 = 0;
					that.activeIdx2 = 0;
					that.activeIdx3 = 0;
					sessionStorageSet("list", [])
					that.tradeNumber = 0
					that.noteNumber = 0
					that.totalPrice = 0
					that.timeLeft()
				}).catch(function(error) {
					console.log(error)
				})

			},
			standGameList() {
				this.gameName = this.standGameList[0].gameName;
				this.gameId = this.standGameList[0].gameId
				this.playList = this.standGameList[0].gameSons
				this.set1()
			},
			leftNameList() {
				let leftName = this.leftNameList[0]
				let arr = []
				console.log(leftName)
				for(let i = 0; i < this.playList.length; i++) {
					if(leftName == this.playList[i].leftName) {
						arr.push(this.playList[i])
					}
				}
				this.childRenPlayList = arr
			},
			activeIdx1() {
				this.activeIdx3 = 0;
				this.activeIdx2 = 0;
			},
			activeIdx2() {
				this.activeIdx3 = 0;
			},
			leftName() {
				this.rightName = this.childRenPlayList[0].rightName;
				this.subGameId = this.childRenPlayList[0].subGameId;
			}

		}

	}