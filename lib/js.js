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
for (var i = 1; i < 28; i++) {
	if (i < 10) {
		SscSpecialArr.push("30140" + i);
	} else {
		SscSpecialArr.push("3014" + i);
	}
}
for (var i = 3; i < 24; i++) {
	if (i < 10) {
		bjscSpecialArr.push("60050" + i);
	} else {
		bjscSpecialArr.push("6005" + i);
	}
}
//ks和值subGameId数组
var ksSumValArr = ["400101", "400102", "400103", "400104", "400105", "400106", "400107", "400108", "400109", "400110", "400111", "400112", "400113", "400114", "400115", "400116"];
//包胆数组
var baodan = ["300212", "300216", "300310", "300410", "300510"];
//特殊号码
var specialNum = ["300312", "300412", "300512"];

export default {
	name: 'BettingHall',
	data: function data() {
		return {
			title: '',
			showTxt: false,
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
				background: "#15141A"
			},
			labelCss1: {
				float: 'left',
				background: "#efb845",
				width: 0.90 + 'rem',
				height: 0.90 + 'rem',
				borderRadius: 0.90 + 'rem',
				marginBottom: 0.25 + 'rem',
				textAlign: 'center',
				lineHeight: 0.90 + 'rem'
			},
			labelCss2: {
				float: 'left',
				background: "red",
				width: 0.90 + 'rem',
				height: 0.90 + 'rem',
				borderRadius: 0.90 + 'rem',
				marginBottom: 0.25 + 'rem',
				textAlign: 'center',
				lineHeight: 0.90 + 'rem'
			},
			labelCss3: {
				float: 'left',
				background: "red",
				width: 0.90 + 'rem',
				height: 0.90 + 'rem',
				borderRadius: 0.90 + 'rem',
				margin: 0.2 + 'rem',
				textAlign: 'center',
				lineHeight: 0.90 + 'rem'
			},
			labelCss4: {
				float: 'left',
				background: "#efb845",
				width: 0.90 + 'rem',
				height: 0.90 + 'rem',
				borderRadius: 0.90 + 'rem',
				margin: 0.2 + 'rem',
				textAlign: 'center',
				lineHeight: 0.90 + 'rem'
			},
			labelCss5: {
				float: 'left',
				background: "red",
				padding: 0.1 + 'rem',
				borderRadius: 0.10 + 'rem',
				margin: 0.2 + 'rem',
				textAlign: 'center',
				lineHeight: 0.90 + 'rem'
			},
			labelCss6: {
				float: 'left',
				background: "#efb845",
				padding: 0.1 + 'rem',
				borderRadius: 0.10 + 'rem',
				margin: 0.2 + 'rem',
				textAlign: 'center',
				lineHeight: 0.90 + 'rem'
			},
			ulLabelCss: {
				display: "flex",
				justifyContent: 'space-around'
			},
			ulLabelCss2: {
				display: "flex",
				justifyontent: 'flex-start'

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
				lineHeight: 0.90 + 'rem'
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
				lineHeight: 0.90 + 'rem'
			},
			shortcut: {
				display: "flex",
				flexWrap: "wrap",
				justifyContent: "space-around",
				alignItems: "center",
				height: "100%"
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
				boxSizing: 'border-box;'
			},
			kshzCss1: {
				background: "rgb(239, 184, 69)",
				width: "0.9rem",
				height: "0.9rem",
				borderRadius: "0.9rem",
				margin: "0.2rem 0.15rem",
				textAlign: "center",
				lineHeight: "0.9rem"
			},
			kshzCss2: {
				background: "red",
				width: "0.9rem",
				height: "0.9rem",
				borderRadius: "0.9rem",
				margin: "0.2rem 0.15rem",
				textAlign: "center",
				lineHeight: "0.9rem"
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
			showTitleCss: {
				position: 'absolute',
				left: 0,
				top: 0,
				color: "#000",
				minWidth: 1 + 'rem',
				height: '0.6rem',
				textAlign: "center",
				lineHeight: '0.6rem',
				borderRadius: "0.08rem",
				background: '#818287',
				zIndex: '1000',
				border: '1px solid #ccc'

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
			SpecialDataList: [],
			reacquire: true,
			ksSubVal: false,
			bjscSpecial: false,
			sscSpecial: false

		};
	},

	//获取数据
	created: function created() {
		var _this = this;

		this.$axios.get('/inter/ticket/gamePlay/' + this.$route.query.classId + '/' + this.kindId).then(function (data) {
			_this.standGameList = data.data.data.standGameList;
			_this.gameName = _this.standGameList[0].gameSons[0].gameName, _this.subGameId = _this.standGameList[0].gameSons[0].subGameId;
			_this.leftName = _this.standGameList[0].gameSons[0].leftName;
			_this.rightName = _this.standGameList[0].gameSons[0].rightName;
			_this.playList = _this.standGameList[0].gameSons;
			_this.isksSumVal();
			_this.getDataList();
			//子玩法列表信息
		}).catch(function (error) {
			console.log(error);
		});
		this.subClassGame();
		this.lotteryNumLg();
		this.timeLeft();

		this.winsDragon();
		this.websocketf();
		if (sessionStorageGet("list")) {
			this.tradeNumber = sessionStorageGet("list").length;
		}
	},

	methods: {
		//判断是否为特殊玩法
		isSpecial: function isSpecial() {
			if (ksSumValArr.indexOf(this.subGameId) != -1 || SscSpecialArr.indexOf(this.subGameId) != -1 || bjscSpecialArr.indexOf(this.subGameId) != -1) {
				return true;
			} else {
				return false;
			}
		},

		//获取数据
		getDataList: function getDataList() {
			var _this2 = this;

			if (!this.isSpecial()) {
				//一般玩法
				this.$axios.get('/inter/ticket/subGame/' + this.subGameId).then(function (data) {
					_this2.subGameList = data.data.data;
				}).catch(function (error) {
					console.log(error);
				});
				this.dataList = createBetNumbers({
					leftName: this.leftName,
					rightName: this.rightName,
					subGameId: this.subGameId
				});
				this.ksSubVal = false;
				this.bjscSpecial = false;
				this.sscSpecial = false;
				this.reacquire = true;
			} else {
				//特殊玩法
				var subGameIdArr = [];
				if (ksSumValArr.indexOf(this.subGameId) != -1) {
					//ks和值
					this.ksSubVal = true;
					subGameIdArr = ksSumValArr;
				} else if (SscSpecialArr.indexOf(this.subGameId) != -1) {
					//ssc两面盘
					this.sscSpecial = true;
					subGameIdArr = SscSpecialArr;
				} else if (bjscSpecialArr.indexOf(this.subGameId) != -1) {
					//bjsc两面盘
					this.bjscSpecial = true;
					subGameIdArr = bjscSpecialArr;
				}
				this.betTypeData();
				if (this.reacquire) {
					this.$axios({
						method: 'post',
						url: '/inter/ticket/subGames',
						data: {
							gameIds: subGameIdArr
						}
					}).then(function (data) {
						_this2.subGameList = data.data.data;
						console.log(_this2.subGameList);
						_this2.dataList = createSpecialBetNumbers({
							betRates: [_this2.subGameList],
							betTypeMap: _this2.betTypeMap,
							subGameIds: subGameIdArr
						});
						console.log(_this2.dataList.numbers);
						_this2.setSpecialDataList();
						_this2.reacquire = false;
					}).catch(function (error) {
						console.log(error);
					});
				} else {
					this.dataList = createSpecialBetNumbers({
						betRates: [this.subGameList],
						betTypeMap: this.betTypeMap,
						subGameIds: subGameIdArr
					});
					this.setSpecialDataList();
				}
			}
		},

		//注数，金额提示弹层
		titleShow: function titleShow(e) {
			this.showTxt = true;
			var y = e.target.offsetTop;
			var x = e.target.offsetLeft;
			var val = e.target.offsetParent;
			while (val != null) {
				y += val.offsetTop;
				x += val.offsetLeft;
				val = val.offsetParent;
			}
			this.title = e.target.innerHTML;
			this.showTitleCss.left = x + 'px';
			this.showTitleCss.top = y - 20 + 'px';
		},

		//隐藏提示弹层
		titleHide: function titleHide() {
			this.showTxt = false;
		},

		//快捷投注参数
		betParams: function betParams() {
			var that = this;
			// 空数组收集投注参数
			var orderList = [];
			var cost = 0;
			for (var _i = 0; _i < that.betList.length; _i++) {

				var xuanhao = that.betList[_i].xuanhao.replace(/\?/g, "");
				var item = {
					lotteryNum: xuanhao,
					orderNum: that.betList[_i].noteNumber,
					periodNo: that.awarPeriod1,
					subGameId: that.betList[_i].subGameId,
					totalAmount: that.betList[_i].totalPrice,
					unitPrice: that.betList[_i].totalPrice / that.betList[_i].noteNumber
					//每次投注总金额
				};cost += that.betList[_i].totalPrice * 1;
				orderList.push(item);
			}
			//data为post请求参数
			var data = {
				baseLotteryId: that.kindId,
				cost: cost,
				orderList: orderList,
				orderType: "0",
				periodNo: that.awarPeriod1
			};
			that.betAxios(data);
		},

		//快捷投注请求
		betAxios: function betAxios(data) {
			var that = this;
			that.$axios({
				method: 'post',
				url: '/inter/ticket/chipIn',
				data: data
			}).then(function (data) {
				if (data.data.code == 0 && data.data.msg == "OK") {
					alert("投注成功");
					that.clear();
					that.betList = [];
				} else {
					that.betList = [];
					alert(data.data.msg);
				}
			}).catch(function (error) {
				console.log(error);
			});
		},

		//bjsc特殊号码提交方式
		bjscSpecialCommit: function bjscSpecialCommit() {
			if (this.leftName == "冠亚合值") {
				for (var _i2 = 0; _i2 < this.newNumbers.length; _i2++) {
					if (this.newNumbers[_i2].length != 0) {
						var value = {
							noteNumber: 1,
							oddMax: this.subGameList.oddMax,
							totalPrice: this.price,
							Gameplay: this.leftName + "(" + this.dataList.numbers[_i2].cols[0].label + ")",
							xuanhao: this.dataList.numbers[_i2].cols[0].label,
							kindId: this.kindId,
							subGameId: this.subGameId,
							check: false
						};
						this.betList.push(value);
					}
				}
			} else {
				//截取属于冠亚组合合值的subGameId的数组
				var arr = bjscSpecialArr.slice(4);
				//截取属于冠亚组合合值的赔率的数组
				var oddMaxData = this.subGameList.slice(4);
				//每个subGameId的赔率

				for (var _i3 = 0; _i3 < this.newNumbers.length; _i3++) {
					if (this.newNumbers[_i3].length != 0) {
						var _value = {
							noteNumber: 1,
							oddMax: oddMaxData[_i3].oddMax,
							totalPrice: this.price,
							Gameplay: this.leftName,
							xuanhao: this.dataList.numbers[_i3].cols[0].label,
							kindId: this.kindId,
							subGameId: oddMaxData[_i3].subGameId,
							check: false
						};
						this.betList.push(_value);
					}
				}
			}
		},

		//ks和值提交方式
		ksSubValCommit: function ksSubValCommit() {
			var oddMax = void 0;
			for (var _i4 = 0; _i4 < this.newNumbers[0].length; _i4++) {
				switch (this.newNumbers[0][_i4]) {
					case '3':
						oddMax = this.subGameList[0].oddMax;
						this.subGameId = "400101";
						break;
					case '18':
						this.subGameId = "400116";
						oddMax = this.subGameList[0].oddMax;
						break;
					case '4':
						this.subGameId = "400102";
						oddMax = this.subGameList[1].oddMax;
						break;
					case '17':
						this.subGameId = "400115";
						oddMax = this.subGameList[1].oddMax;
						break;
					case '5':

						this.subGameId = "400103";
						oddMax = this.subGameList[2].oddMax;
						break;
					case '16':
						this.subGameId = "400114";
						oddMax = this.subGameList[2].oddMax;
						break;
					case '6':
						this.subGameId = "400104";
						oddMax = this.subGameList[3].oddMax;
						break;
					case '15':
						this.subGameId = "400113";
						oddMax = this.subGameList[3].oddMax;
						break;
					case '7':
						this.subGameId = "400105";
						oddMax = this.subGameList[4].oddMax;
						break;
					case '14':
						this.subGameId = "400112";
						oddMax = this.subGameList[4].oddMax;
						break;
					case '8':
						this.subGameId = "400106";
						oddMax = this.subGameList[5].oddMax;
						break;
					case '13':
						this.subGameId = "400111";
						oddMax = this.subGameList[5].oddMax;
						break;
					case '9':
						this.subGameId = "400107";
						oddMax = this.subGameList[6].oddMax;
						break;
					case '12':
						this.subGameId = "400110";
						oddMax = this.subGameList[6].oddMax;
						break;
					case '10':
						this.subGameId = "400108";
						oddMax = this.subGameList[7].oddMax;
						break;
					case '11':
						this.subGameId = "400109";
						oddMax = this.subGameList[7].oddMax;
						break;
				}

				var value = {
					noteNumber: 1,
					oddMax: oddMax,
					totalPrice: this.price,
					Gameplay: this.leftName,
					xuanhao: this.newNumbers[0][_i4],
					kindId: this.kindId,
					subGameId: this.subGameId,
					check: false
				};
				this.betList.push(value);
			}
			return false;
		},

		//ks胆拖提交方式
		ksdantuoCommit: function ksdantuoCommit() {
			for (var _i5 = 0; _i5 < this.newNumbers.length; _i5++) {
				for (var k = 0; k < this.newNumbers[_i5].length; k++) {

					var idx = this.newNumbers[_i5][k];
					this.newNumbers[_i5][k] = this.dataList.numbers[_i5].cols[idx].label;
				}
			}
		},

		//ssc两面盘提交方式
		sscSpecialCommit: function sscSpecialCommit() {
			if (this.leftName != '龙虎') {
				for (var _i6 = 0; _i6 < this.newNumbers.length; _i6++) {
					if (this.newNumbers[_i6].length != 0) {
						for (var k = 0; k < this.newNumbers[_i6].length; k++) {
							var idx = this.newNumbers[_i6][k];

							this.newNumbers[_i6][k] = this.dataList.numbers[_i6].cols[idx].label;
						}
						var value = {
							noteNumber: this.newNumbers[_i6].length,
							oddMax: this.subGameList[0].oddMax,
							totalPrice: this.price * this.newNumbers[_i6].length,
							Gameplay: this.dataList.numbers[_i6].leftName + "(" + this.dataList.numbers[_i6].rowName + ")",
							xuanhao: this.newNumbers[_i6].join(","),
							kindId: this.kindId,
							subGameId: this.dataList.numbers[_i6].subGameId,
							check: false
						};
						this.betList.push(value);
					}
				}
			} else {
				var he = [];
				for (var _i7 = 0; _i7 < this.newNumbers.length; _i7++) {
					if (this.newNumbers[_i7].length != 0) {
						if (this.newNumbers[_i7].length == 2) {
							var _idx = this.newNumbers[_i7][0];
							this.newNumbers[_i7][0] = this.dataList.numbers[_i7].cols[_idx].label;
							this.newNumbers[_i7][1] = this.dataList.numbers[_i7].rightName;
							console.log(this.dataList.numbers[_i7].cols[_idx].label);
							he.push(this.newNumbers[_i7][1]);
							this.newNumbers[_i7].splice(1, 1);
							var _value2 = {
								noteNumber: 1,
								oddMax: this.subGameList.oddMax,
								totalPrice: this.price,
								Gameplay: this.dataList.numbers[_i7].leftName + "(" + this.dataList.numbers[_i7].rowName + ")",
								xuanhao: this.newNumbers[_i7][0],
								kindId: this.kindId,
								subGameId: this.dataList.numbers[_i7].subGameId,
								check: false
							};
							this.betList.push(_value2);
						} else {
							var _idx2 = this.newNumbers[_i7][0];
							console.log(_idx2);
							if (_idx2 == 2) {
								this.newNumbers[_i7][0] = this.dataList.numbers[_i7].rightName;
								he.push(this.newNumbers[_i7][0]);
							} else {
								this.newNumbers[_i7][0] = this.dataList.numbers[_i7].cols[_idx2].label;
								var _value3 = {
									noteNumber: 1,
									oddMax: this.subGameList.oddMax,
									totalPrice: this.price,
									Gameplay: this.dataList.numbers[_i7].leftName + "(" + this.dataList.numbers[_i7].rowName + ")",
									xuanhao: this.newNumbers[_i7][0],
									kindId: this.kindId,
									subGameId: this.dataList.numbers[_i7].subGameId,
									check: false
								};
								this.betList.push(_value3);
							}
						}
					}
				}
				if (he.length != 0) {
					var hao = he.join(",");
					var _value4 = {
						noteNumber: he.length,
						oddMax: this.subGameList.oddMax,
						totalPrice: this.price * he.length,
						Gameplay: this.leftName + "(" + "和" + ")",
						xuanhao: he.join(","),
						kindId: this.kindId,
						subGameId: '301417',
						check: false
					};
					this.betList.push(_value4);
				}
			}
		},
		quickBet: function quickBet() {
			if (this.noteNumber != 0) {
				//判断单注上限金额
				if (this.price >= this.subGameList.oneNoteLimit) {
					alert("单注金额上限是 " + this.subGameList.oneNoteLimit + "元");
					return false;
				}
				//判断每注投注金额
				if (this.totalPrice >= this.subGameList.singleLimit) {
					alert("每次投注金额上限是 " + this.subGameList.singleLimit + "元");
					return false;
				}
				//bjsc特殊号码提交方式
				if (this.bjscSpecial) {
					this.bjscSpecialCommit();
					this.betParams();
					return false;
				}
				//ks和值提交方式
				if (this.ksSubVal) {
					this.ksSubValCommit();
					this.betParams();
					return false;
				}
				//快三胆拖提交
				if (this.dantuoArr.indexOf(this.subGameId) != -1) {
					this.ksdantuoCommit();
				}
				//ssc两面盘提交方式
				if (this.sscSpecial) {
					this.sscSpecialCommit();
					this.betParams();
					return false;
				}
				//单式提交方式
				if (this.isUnitary) {
					console.log(this.subGameList);
					this.newNumbers = calcInputBetCount(this.dataList, this.inputTxt, []).numbers;
					this.newNumbers = this.newNumbers.join(",");
					var _value5 = {
						noteNumber: this.noteNumber,
						oddMax: this.subGameList.oddMax,
						totalPrice: this.totalPrice,
						Gameplay: this.leftName + "(" + this.rightName + ")",
						xuanhao: this.newNumbers,
						subGameId: this.subGameId,
						kindId: this.kindId,
						check: false
					};
					this.betList.push(_value5);
					this.clearInput();
					this.betParams();
					return false;
				}
				//非特殊玩法提交方式	
				//============================================

				if (this.specialNum) {
					//前三特殊号码提交方式

					var lg = this.newNumbers[0];

					for (var _i8 = 0; _i8 < lg.length; _i8++) {
						var _value6 = {
							noteNumber: this.noteNumber / lg.length,
							oddMax: this.subGameList.oddMax,
							totalPrice: this.totalPrice,
							Gameplay: this.leftName + "(" + this.rightName + ")",
							xuanhao: lg[_i8],
							kindId: this.kindId,
							subGameId: this.subGameId,
							check: false
						};
						this.betList.push(_value6);
					}
					this.betParams();
					return false;
				}
				var idx = this.dataList.numbers.length; //长度
				if (idx == 1) {
					//单列
					if (this.isbaodan) {
						//包胆
						this.newNumbers = this.newNumbers[0][0] + "";
					} else if (this.specialNum) {
						//特殊号码
						this.newNumbers = this.newNumbers.join(",");
					} else {
						//单行非特殊号码
						this.newNumbers = this.newNumbers[0].join(",");
					}
				} else {
					for (var _i9 = 0; _i9 < this.newNumbers.length; _i9++) {
						if (this.newNumbers[_i9].length == 0) {
							this.newNumbers[_i9] = "?"; //place?为空用？代替
						} else {
							this.newNumbers[_i9] = this.newNumbers[_i9].join(""); //不为空则进行排序并拼接成字符串
						}
					}
					this.newNumbers = this.newNumbers.join(","); //多列最终格式  例“123,?,34,67,36”
				}
				//非特殊号码提交方式
				var value = {
					noteNumber: this.noteNumber,
					oddMax: this.subGameList.oddMax,
					totalPrice: this.totalPrice,
					Gameplay: this.leftName + "(" + this.rightName + ")",
					xuanhao: this.newNumbers,
					kindId: this.kindId,
					subGameId: this.subGameId,
					check: false
				};
				this.betList.push(value);
				this.betParams();
			} else {

				alert("请至少选择1注进行投注!");
			}
		},
		addList: function addList() {

			if (this.noteNumber != 0) {
				//判断单注上限金额
				if (this.price >= this.subGameList.oneNoteLimit) {
					alert("单注金额上限是 " + this.subGameList.oneNoteLimit + "元");
					return false;
				}
				//判断每注投注金额
				if (this.totalPrice >= this.subGameList.singleLimit) {
					alert("每次投注金额上限是 " + this.subGameList.singleLimit + "元");
					return false;
				}
				//bjsc特殊号码提交方式
				if (this.bjscSpecial) {
					this.bjscSpecialCommit();
					this.addSession();
					this.clear();
					return false;
				}
				//ks和值提交方式
				if (this.ksSubVal) {
					this.ksSubValCommit();
					this.addSession();
					this.clear();
					return false;
				}
				//快三胆拖提交
				if (this.dantuoArr.indexOf(this.subGameId) != -1) {
					this.ksdantuoCommit();
				}
				//ssc两面盘提交方式
				if (this.sscSpecial) {
					this.sscSpecialCommit();
					this.addSession();
					this.clear();
					return false;
				}
				//单式提交方式
				if (this.isUnitary) {
					console.log(this.subGameList);
					this.newNumbers = calcInputBetCount(this.dataList, this.inputTxt, []).numbers;
					this.newNumbers = this.newNumbers.join(",");
					var _value7 = {
						noteNumber: this.noteNumber,
						oddMax: this.subGameList.oddMax,
						totalPrice: this.totalPrice,
						Gameplay: this.leftName + "(" + this.rightName + ")",
						xuanhao: this.newNumbers,
						subGameId: this.subGameId,
						kindId: this.kindId,
						check: false
					};
					this.betList.push(_value7);
					this.clearInput();
					this.addSession();
					return false;
				}
				//非特殊玩法提交方式	
				//============================================

				if (this.specialNum) {
					//前三特殊号码提交方式

					var lg = this.newNumbers[0];

					for (var _i10 = 0; _i10 < lg.length; _i10++) {
						var _value8 = {
							noteNumber: this.noteNumber / lg.length,
							oddMax: this.subGameList.oddMax,
							totalPrice: this.totalPrice,
							Gameplay: this.leftName + "(" + this.rightName + ")",
							xuanhao: lg[_i10],
							kindId: this.kindId,
							subGameId: this.subGameId,
							check: false
						};
						this.betList.push(_value8);
					}
					this.addSession();
					this.clear();
					return false;
				}
				var idx = this.dataList.numbers.length; //长度
				if (idx == 1) {
					//单列
					if (this.isbaodan) {
						//包胆
						this.newNumbers = this.newNumbers[0][0] + "";
					} else if (this.specialNum) {
						//特殊号码
						this.newNumbers = this.newNumbers.join(",");
					} else {
						//单行非特殊号码
						this.newNumbers = this.newNumbers[0].join(",");
					}
				} else {
					for (var _i11 = 0; _i11 < this.newNumbers.length; _i11++) {
						if (this.newNumbers[_i11].length == 0) {
							this.newNumbers[_i11] = "?"; //place?为空用？代替
						} else {
							this.newNumbers[_i11] = this.newNumbers[_i11].join(""); //不为空则进行排序并拼接成字符串
						}
					}
					this.newNumbers = this.newNumbers.join(","); //多列最终格式  例“123,?,34,67,36”
				}
				//非特殊号码提交方式
				var Gameplay = void 0;
				if (this.rightName == null) {
					Gameplay = this.leftName;
				} else {
					Gameplay = this.leftName + "(" + this.rightName + ")";
				}

				var value = {
					noteNumber: this.noteNumber,
					oddMax: this.subGameList.oddMax,
					totalPrice: this.totalPrice,
					Gameplay: Gameplay,
					xuanhao: this.newNumbers,
					kindId: this.kindId,
					subGameId: this.subGameId,
					check: false
				};
				this.betList.push(value);
				this.addSession();
				this.clear();
			} else {

				alert("请至少选择1注进行投注!");
			}
		},

		//判断开奖号码位数
		lotteryNumLg: function lotteryNumLg() {
			switch (this.classId) {
				case '1':
					break;
				case '2':
					break;
				case '3':
					this.lotteryLg = 5;
					break;
				case '4':
					this.lotteryLg = 3;
					break;
				case '5':
					this.lotteryLg = 5;
					break;
				case '6':
					this.lotteryLg = 10;
					break;

			}
		},

		//判断是否为ks和值
		isksSumVal: function isksSumVal() {
			if (this.ksSumValArr.indexOf(this.subGameId) != -1) {
				this.ksSubVal = true;
			} else {
				this.ksSubVal = false;
			}
		},

		//胆拖选号
		bileDragSelect: function bileDragSelect(indexObj) {
			this.commitList = this.dataList;
			var index = indexObj.split("-");
			//胆码选择上限
			var dantuoMax = this.dataList.dantuoMax;
			//点击之前的状态
			var boolen = this.dataList.numbers[index[0]]["cols"][index[1]].data_selected;
			//index[0]=="0"是点击的为胆码按钮
			this.dataList.numbers[index[0]]["cols"][index[1]].data_selected = !boolen;
			if (!boolen) {
				if (index[0] == "0") {
					//点击后将当前点击的胆码位置添加到bileCodeArr
					this.bileCodeArr.push(index[1]);
					console.log(this.bileCodeArr);
					var length = this.bileCodeArr.length;
					//判断this.bileCodeArr是否超过胆码选择上限
					if (length >= dantuoMax) {
						//要变为未选中的按钮的下标
						var oldIdx = this.bileCodeArr[0];
						//要变为选中的按钮的下标
						var newIdx = this.bileCodeArr[length - 1];
						//改变状态
						this.dataList.numbers[0]["cols"][oldIdx].data_selected = false;
						this.dataList.numbers[0]["cols"][newIdx].data_selected = true;
						//状态改变后删除第0条
						this.bileCodeArr.splice(0, 1);
					}
				} else {
					this.dataList.numbers[0]["cols"][index[1]].data_selected = false;
					if (this.bileCodeArr.indexOf(index[1]) != -1) {
						var idx = this.bileCodeArr.indexOf(index[1]);
						this.bileCodeArr.splice(idx, 1);
					}
				}
			} else {
				this.dataList.numbers[0]["cols"][index[1]].data_selected = false;
				if (this.bileCodeArr.indexOf(index[1]) != -1) {
					var _idx3 = this.bileCodeArr.indexOf(index[1]);
					this.bileCodeArr.splice(_idx3, 1);
				}
			}

			//胆码与拖码互斥，两者间只有一个按钮得状态为true
			if (index[0] == "0") {
				if (this.dataList.numbers[0]["cols"][index[1]].data_selected == true) {
					this.dataList.numbers[1]["cols"][index[1]].data_selected = false;
				}
			} else if (index[0] == "1") {
				if (this.dataList.numbers[1]["cols"][index[1]].data_selected == true) {
					this.dataList.numbers[0]["cols"][index[1]].data_selected = false;
				}
			}
			this.noteNumber = calcChooseBetCount(this.dataList, []).ticketCount;
			this.newNumbers = calcChooseBetCount(this.dataList, []).newNumbers;
		},

		//两面盘按钮选择方式
		changeSelected: function changeSelected(index) {
			//点击改变状态
			this.dataList.numbers[index[0]]["cols"][index[1]].data_selected = !this.dataList.numbers[index[0]]["cols"][index[1]].data_selected;
			//点击之后的状态
			var boolen = this.dataList.numbers[index[0]]["cols"][index[1]].data_selected;
			//inverse为label对应的号码   大-1  小-0
			var inverse = this.dataList.numbers[index[0]]["cols"][index[1]].inverse;
			switch (inverse) {
				//大小单双质合互斥
				case 0:
					if (boolen) {
						this.mutex(index, 1, boolen);
					}
					break;
				case 1:
					if (boolen) {
						this.mutex(index, 0, boolen);
					}
					break;
				case 2:
					if (boolen) {
						this.mutex(index, 3, boolen);
					}
					break;
				case 3:
					if (boolen) {
						this.mutex(index, 2, boolen);
					}
					break;
				case 4:
					if (boolen) {
						this.mutex(index, 5, boolen);
					}
					break;
				case 5:
					if (boolen) {
						this.mutex(index, 4, boolen);
					}
					break;
			}
			this.noteNumber = calcChooseBetCount(this.dataList, []).ticketCount;
			this.newNumbers = calcChooseBetCount(this.dataList, []).newNumbers;
			if (this.isbjpkSpecial) {
				this.numberScreening();
			}
		},

		//两面盘互斥算法
		mutex: function mutex(index, num, boolen) {
			for (var _i12 = 0; _i12 < this.dataList.numbers[index[0]]["cols"].length; _i12++) {
				if (this.dataList.numbers[index[0]]["cols"][_i12].inverse == num) {
					this.dataList.numbers[index[0]]["cols"][_i12].data_selected = !boolen;
				}
			}
		},

		//清除单式文本内容
		clearInput: function clearInput() {
			this.inputTxt = "";
			this.errPrompt = "";
		},

		//重置样式
		clear: function clear() {
			//循环初始化数据源this.dataList,清除样式。
			this.bileCodeArr = [];
			for (var _i13 = 0; _i13 < this.dataList.numbers.length; _i13++) {
				for (var n = 0; n < this.dataList.numbers[_i13]["cols"].length; n++) {
					this.dataList.numbers[_i13]["cols"][n]["data_selected"] = false;
				}
			}
			this.noteNumber = 0;
			this.totalPrice = 0;
		},

		//得到各彩种开奖周期时间
		getTime: function getTime() {
			switch (this.kindId) {
				case "m5ffc":
					this.time = 60;
					break;
				case "m53fc":
					this.time = 180;
					break;
				case "m55fc":
					this.time = 180;
					break;
				case "cqssc":
					var awarPeriod2 = this.awarPeriod2.substring(this.awarPeriod2.length - 3, this.awarPeriod2.length);
					if (awarPeriod2 * 1 >= 95 || awarPeriod2 * 1 < 24) {
						this.time = 300;
					} else {
						this.time = 600;
					}

					break;
				case "tjssc":
					this.time = 600;
					break;
				case "xjssc":
					this.time = 600;
					break;
			}
		},

		//根据大彩类获取旗下所有彩类的倒计时
		timeLeft: function timeLeft() {
			var that = this;
			that.$axios.get('/inter/ticket/timeLeft/' + that.$route.query.classId).then(function (data) {
				for (var i in data.data.data) {
					if (i == that.kindId) {
						that.total = data.data.data[i];
						break;
					}
				}
				that.countdowm(that.total);
			}).catch(function (error) {
				console.log(error);
			});
		},

		//输入框正则验证
		verification: function verification() {
			var reg = /^[1-9]\d*$/;
			if (!reg.test(this.price)) {
				this.price = 1;
			}
		},

		//单式注数算法
		judgeFromat: function judgeFromat() {
			this.commitList = this.dataList;
			this.errPrompt = calcInputBetCount(this.commitList, this.inputTxt, []).msg;
			this.noteNumber = calcInputBetCount(this.commitList, this.inputTxt, []).ticketCount;
			this.totalPrice = this.noteNumber * this.price * this.moneyUnit;
		},

		//获取长龙开奖历史
		winsDragon: function winsDragon() {
			var _this3 = this;

			this.$axios.get('/inter/ticket/winsDragon/' + this.kindId).then(function (data) {
				_this3.winList = data.data.data.winList;
				_this3.awarPeriod1 = _this3.winList[0].awarPeriod;
				_this3.awarPeriod2 = _this3.winList[1].awarPeriod;
				//特殊彩种重庆时时彩,需要获取当前时间段的开奖周期
				if (_this3.kindId == "cqssc") {
					_this3.getTime();
				}
				if (_this3.winList[1].awardNum != null) {
					_this3.awardNum = _this3.winList[1].awardNum.split(",");
					_this3.awardNum2 = _this3.winList[5].awardNum.split(",");
					setTimeout(function () {
						this.end = false;
						this.animation = "animation";
						this.message = null;
					}, 3000);
				}
			}).catch(function (error) {
				console.log(error);
			});
		},

		//返回---
		goback: function goback() {
			clearInterval(timed);
			sessionStorageSet("list", []);
			this.$router.push({
				name: 'container'

			});
		},

		//根据返回的数据,提出label值(用于添加数据到购彩篮以及下注)
		numberScreening: function numberScreening() {
			for (var _i14 = 0; _i14 < this.newNumbers.length; _i14++) {
				for (var k = 0; k < this.newNumbers[_i14].length; k++) {
					var index = this.newNumbers[_i14][k];
					this.newNumbers[_i14][k] = this.dataList.numbers[_i14]["cols"][index]["label"];
				}
			}
			console.log(this.newNumbers);
		},

		//计算投注数量,非特殊玩法
		oneSelect: function oneSelect(indexObj) {
			this.changeIndex(indexObj);
			this.noteNumber = calcChooseBetCount(this.dataList, []).ticketCount;
			this.newNumbers = calcChooseBetCount(this.dataList, []).newNumbers;
			this.totalPrice = this.noteNumber * this.price * this.moneyUnit;
			this.numberScreening();
		},
		changeIndex: function changeIndex(indexObj) {
			var index = indexObj.split("-");
			var boolen = this.dataList.numbers[index[0]]["cols"][index[1]].data_selected;
			var row = index[0] * 1;
			var col = index[1] * 1;
			if (this.isbaodan) {
				//包胆玩法----一列只能选一个数字
				if (boolen == true) {
					this.dataList.numbers[row]["cols"][col]["data_selected"] = false;
				} else {
					for (var _i15 = 0; _i15 < this.dataList.numbers.length; _i15++) {
						for (var k = 0; k < this.dataList.numbers[_i15].cols.length; k++) {
							this.dataList.numbers[_i15]['cols'][k]["data_selected"] = false;
						}
					}
					//将其他按钮的["data_selected"] = false;
					this.dataList.numbers[row]["cols"][col]["data_selected"] = true;
				}
			} else {
				//非特殊玩法
				if (boolen == true) {
					//选中
					this.dataList.numbers[row]["cols"][col]["data_selected"] = false;
					//改变属性
				} else {
					//未选中
					this.dataList.numbers[row]["cols"][col]["data_selected"] = true;
				}
			}
		},

		//提交下注数据到购彩篮
		addSession: function addSession() {
			if (sessionStorageGet("list") == null) {
				sessionStorageSet("list", this.betList);
				this.tradeNumber = sessionStorageGet("list").length;
			} else {
				this.betList = sessionStorageGet("list").concat(this.betList);
				sessionStorageSet("list", this.betList);
				this.tradeNumber = sessionStorageGet("list").length;
			}
		},

		//跳转至购彩篮
		to: function to() {
			clearInterval(timed);
			this.$router.push({
				name: 'BuyColourBasket',
				query: {
					kindId: this.kindId,
					classId: this.$route.query.classId
				}
			});
		},

		//快捷选号
		quickSelectNum: function quickSelectNum(obj) {
			var newBetNumbers = this.dataList;
			var middleNumber = newBetNumbers.max / 2;
			switch (obj[1]) {
				case 'all':
					//全选
					for (var k = 0; k < this.dataList.numbers[obj[0]].cols.length; k++) {
						this.dataList.numbers[obj[0]]["cols"][k]["data_selected"] = true;
					}
					break;
				case 'big':
					//大
					for (var _k = 0; _k < this.dataList.numbers[obj[0]].cols.length; _k++) {
						if (parseInt(this.dataList.numbers[obj[0]].cols[_k].label) > middleNumber) {
							this.dataList.numbers[obj[0]]["cols"][_k]["data_selected"] = true;
						} else {
							this.dataList.numbers[obj[0]]["cols"][_k]["data_selected"] = false;
						}
					}
					break;
				case 'small':
					//小
					for (var _k2 = 0; _k2 < this.dataList.numbers[obj[0]].cols.length; _k2++) {
						if (parseInt(this.dataList.numbers[obj[0]].cols[_k2].label) <= middleNumber) {
							this.dataList.numbers[obj[0]]["cols"][_k2]["data_selected"] = true;
						} else {
							this.dataList.numbers[obj[0]]["cols"][_k2]["data_selected"] = false;
						}
					}
					break;
				case 'odd':
					//单
					for (var _k3 = 0; _k3 < this.dataList.numbers[obj[0]].cols.length; _k3++) {
						if (parseInt(this.dataList.numbers[obj[0]].cols[_k3].label) % 2 === 1) {

							this.dataList.numbers[obj[0]]["cols"][_k3]["data_selected"] = true;
						} else {
							this.dataList.numbers[obj[0]]["cols"][_k3]["data_selected"] = false;
						}
					}
					break;
				case 'even':
					//双
					for (var _k4 = 0; _k4 < this.dataList.numbers[obj[0]].cols.length; _k4++) {
						if (parseInt(this.dataList.numbers[obj[0]].cols[_k4].label) % 2 === 0) {
							this.dataList.numbers[obj[0]]["cols"][_k4]["data_selected"] = true;
						} else {
							this.dataList.numbers[obj[0]]["cols"][_k4]["data_selected"] = false;
						}
					}
					break;
				case 'clear':
					//清
					for (var _k5 = 0; _k5 < this.dataList.numbers[obj[0]].cols.length; _k5++) {
						this.dataList.numbers[obj[0]]["cols"][_k5]["data_selected"] = false;
					}
					break;
			}

			this.noteNumber = calcChooseBetCount(this.dataList, []).ticketCount;
			this.newNumbers = calcChooseBetCount(this.dataList, []).newNumbers;
			this.totalPrice = this.noteNumber * this.price * this.moneyUnit;
			this.numberScreening();
		},

		//选择子类玩法
		subClassGame: function subClassGame() {
			var _this4 = this;

			this.$axios.get('/inter/ticket/kind').then(function (data) {
				var list = data.data.data;
				for (var _i16 = 0; _i16 < list.length; _i16++) {
					if (_this4.$route.query.classId == list[_i16].classId) {
						_this4.subClass = list[_i16].kindList;
					}
				}
			}).catch(function (error) {
				console.log(error);
			});
		},

		//选择左名称    idx==当前点击的li索引
		childRenPlay: function childRenPlay(idx) {
			var leftName = event.target.innerHTML;
			var arr = [];
			console.log(leftName);
			for (var _i17 = 0; _i17 < this.playList.length; _i17++) {
				if (leftName == this.playList[_i17].leftName) {
					arr.push(this.playList[_i17]);
				}
			}
			this.childRenPlayList = arr;
			this.leftName = leftName;
			this.activeIdx2 = idx;
		},

		//选择gameName   name==gameName  id==gameId   idx==当前点击的li索引
		selectGameName: function selectGameName(name, id, idx) {
			this.gameName = name;
			for (var _i18 = 0; _i18 < this.standGameList.length; _i18++) {
				if (id == this.standGameList[_i18].gameId && name == this.standGameList[_i18].gameName) {
					this.playList = this.standGameList[_i18].gameSons;
				}
			}
			this.leftName = this.playList[0].leftName;
			this.rightName = this.playList[0].rightName;
			this.set1();
			this.activeIdx1 = idx;
			this.activeIdx2 = 0;
		},

		//显示各个玩法选项导航
		showMobile: function showMobile() {
			this.is = true;
		},
		betTypeData: function betTypeData() {
			this.betTypeMap = {};
			for (var _i19 = 0; _i19 < this.playList.length; _i19++) {
				var subGameId = this.playList[_i19].subGameId;
				this.betTypeMap[subGameId] = {
					rightName: this.playList[_i19].rightName,
					leftName: this.playList[_i19].leftName
				};
			}
		},

		//选择rightName,获取subGameId
		selectRightName: function selectRightName(idx) {
			this.rightName = event.target.innerHTML;
			this.subGameId = event.target.getAttribute("subGameId");
			this.activeIdx3 = idx;
		},

		//获取左名称列表
		set1: function set1() {
			var a = [];
			for (var _i20 = 0; _i20 < this.playList.length; _i20++) {
				var leftName = this.playList[_i20].leftName;
				a.push(leftName);
			}
			this.leftNameList = this.unique(a);
			this.leftName = this.leftNameList[0];
		},

		//数组去重
		unique: function unique(arr) {
			var result = [],
			    hash = {};
			for (var i = 0, elem; (elem = arr[i]) != null; i++) {
				if (!hash[elem]) {
					result.push(elem);
					hash[elem] = true;
				}
			}
			return result;
		},

		//确认玩法
		affirm: function affirm() {
			this.noteNumber = 0;
			this.totalPrice = 0;
			this.getDataList();
			if (specialNum.indexOf(this.subGameId) != -1) {
				//判断是否为特殊号码
				this.specialNum = true;
			} else {
				this.specialNum = false;
			}
			if (baodan.indexOf(this.subGameId) != -1) {
				//判断玩法是否为包胆
				this.isbaodan = true;
			} else {
				this.isbaodan = false;
			}
			console.log(this.dataList);
			if (this.dataList.inputFormat != false && this.dataList.numbers.length == 0) {
				//单式
				this.show = false;
				this.inputFormat = this.dataList.inputFormat;
				this.isUnitary = true;
				this.betBgColor = {
					background: "#fff"
				};
				this.is = false;
				return false;
			} else {
				this.show = true;
				this.isUnitary = false;
				this.betBgColor = {
					background: "#15141A"
				};
				this.is = false;
				return false;
			}
			return false;
			this.clear();
		},
		websocketf: function websocketf() {
			var _this5 = this;

			var URL = global_.BASE_URL.substring(global_.BASE_URL.indexOf("//") + 2, global_.BASE_URL.length);

			var websocket = new WebSocket(encodeURI("ws:" + URL + "/notify/" + sessionStorageGet('baseMember').account));
			websocket.onopen = function () {
				//连接成功
			};
			websocket.onerror = function () {
				//连接失败
			};
			websocket.onclose = function () {
				//连接断开
			};
			websocket.onmessage = function (message) {
				_this5.message = message.data;
			};
		},
		countdowm: function countdowm(t) {
			var that = this;
			that.t = t;
			clearInterval(timed);
			timed = setInterval(function () {
				if (t > 0) {
					t -= 1;
					var min = Math.floor(t / 60);
					var sec = (t % 60 / 100).toFixed(2).slice(-2);
					min = min < 10 ? "0" + min : min;
					that.content = min + ":" + sec;
				} else {
					t = that.time;
					that.awarPeriod2++;
					that.awarPeriod1++;
					that.animation = 'result-number-list animation';
				}
			}, 1000);
		},
		setSpecialDataList: function setSpecialDataList() {
			var _this6 = this;

			var that = this;
			if (!this.ksSubVal) {
				var SpecialDataList = [];
				this.dataList.numbers.forEach(function (item) {
					if (item.leftName == _this6.leftName) {
						SpecialDataList.push(item);
					}
				});
				this.dataList.numbers = SpecialDataList;
			}
		},

		//两面盘所有的subGameId的数组
		SpecialMap: function SpecialMap() {
			for (var i = 1; i < 28; i++) {
				if (i < 10) {
					this.SpecialArr.push("30140" + i);
				} else {
					this.SpecialArr.push("3014" + i);
				}
			}
		}
	},

	watch: {
		message: function message(newMessage) {
			if (newMessage != null) {
				var that = this;
				var lotteryId = JSON.parse(newMessage).lotteryId;
				if (lotteryId == this.kindId) {
					this.winsDragon();
				}
			}
		},

		//监听注数变化
		noteNumber: function noteNumber() {
			this.totalPrice = Math.round(this.noteNumber * this.price * this.moneyUnit * 100) / 100;
		},

		//监听单价变化
		price: function price(newvalue, oddvalue) {
			this.totalPrice = Math.round(this.noteNumber * this.price * this.moneyUnit * 100) / 100;
		},

		//监听金额单位变化
		moneyUnit: function moneyUnit(newvalue, oddvalue) {
			this.totalPrice = Math.round(this.noteNumber * this.price * this.moneyUnit * 100) / 100;
		},

		//监听子类ID变化，初始化各项数据
		kindId: function kindId(newKindId) {
			var that = this;
			sessionStorageSet("list", []);
			this.winsDragon();
			that.animation = "result-number-list animation";
			this.$axios.get('/inter/ticket/gamePlay/' + this.$route.query.classId + '/' + newKindId).then(function (data) {
				that.standGameList = data.data.data.standGameList;
				console.log(that.standGameList);
				that.subGameId = that.standGameList[0].gameSons[0].subGameId;
				that.leftName = that.standGameList[0].gameSons[0].leftName;
				that.rightName = that.standGameList[0].gameSons[0].rightName;
				that.affirm();
				console.log(that.subGameId);
				that.activeIdx1 = 0;
				that.activeIdx2 = 0;
				that.activeIdx3 = 0;
				sessionStorageSet("list", []);
				that.tradeNumber = 0;
				that.noteNumber = 0;
				that.totalPrice = 0;
				that.timeLeft();
			}).catch(function (error) {
				console.log(error);
			});
		},
		standGameList: function standGameList() {
			this.gameName = this.standGameList[0].gameName;
			this.gameId = this.standGameList[0].gameId;
			this.playList = this.standGameList[0].gameSons;
			this.set1();
		},
		leftNameList: function leftNameList() {
			var leftName = this.leftNameList[0];
			var arr = [];
			console.log(leftName);
			for (var _i21 = 0; _i21 < this.playList.length; _i21++) {
				if (leftName == this.playList[_i21].leftName) {
					arr.push(this.playList[_i21]);
				}
			}
			this.childRenPlayList = arr;
		},
		activeIdx1: function activeIdx1() {
			this.activeIdx3 = 0;
			this.activeIdx2 = 0;
		},
		activeIdx2: function activeIdx2() {
			this.activeIdx3 = 0;
		},
		leftName: function leftName() {
			this.rightName = this.childRenPlayList[0].rightName;
			this.subGameId = this.childRenPlayList[0].subGameId;
		}
	}

};