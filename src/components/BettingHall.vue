<template >
	<div class="Bet_bettingHall" :style="betBgColor" ref="Bet_bettingHall" >
		<div v-show="showTxt" :style="showTitleCss" >
					<span>{{title}}</span>
				</div>
		<div class="Bet_header" v-if="hide">
			<div @click="goback" style="margin:0.1rem;font-size: 0.43rem;">
				< 返回 </div>
					<select v-model="kindId" class="Bet_select">
						<option v-for="item in subClass" :value="item.kindId">{{item.kindName}}</option>
					</select>
					<div :gameId="gameId" @click="showMobile" >{{!isSpecial()&&['600501','600502'].indexOf(subGameId)==-1?gameName==leftName?gameName:gameName+leftName+rightName:gameName==leftName?gameName:gameName+leftName}}</div>
					<div @click="popupVisible=!popupVisible" style="margin: 0.12rem;">?</div>
			</div>
			
			<mt-popup v-model="popupVisible" position="top" style="background: #CECECE;width:80%;height:30%;border-radius: 0.2rem;top:2rem;padding: 0.5rem;">
				<p style="color: #000;text-align:left">{{isSpecial()&&subGameList instanceof Array?subGameList[0].gameCase:subGameList.gameCase}}</p>
				<p style="color: #000;text-align:left">{{isSpecial()&&subGameList instanceof Array?subGameList[0].gameRemark:subGameList.gameRemark}}</p>
				<p style="color: #000;text-align:left"><b>投注说明</b> : {{isSpecial()&&subGameList instanceof Array?subGameList[0].gameTip:subGameList.gameTip}}</p>
			</mt-popup>
			<mt-popup v-model="is" :modal="false" position="top" style="background: #fff;width:100%;min-height: 20%;" :closeOnClickModal="false">
				<div class="Bet_moblie">
					<div class="Bet_play_title">
					</div>
					<div class="Bet_play_first">
						<ul>
							<li v-for="(item,index) in standGameList">
								<p :gameName="item.gameName" @click="selectGameName(item.gameName,item.gameId,index)" :class="index==activeIdx1?'active':''">{{item.gameName}}</p>
							</li>
						</ul>
					</div>
					<div class="Bet_play_second">
						<ul>
							<li v-for="(item,index) in leftNameList">
								<p @click="childRenPlay(index)" :class="index==activeIdx2?'active':''">{{item}}</p>
							</li>
						</ul>
					</div>
					<div class="Bet_play_third" v-if="!isSpecial()&&['600501','600502'].indexOf(subGameId)==-1">
						<ul>
							<li v-for="(item,index) in childRenPlayList">
								<p :subGameId="item.subGameId" @click="selectRightName(index)" :class="index==activeIdx3?'active':''">{{item.rightName}}</p>
							</li>
						</ul>
					</div>
					<div class="Bet_play_end">
						<button class="Bet_play_queren" @click="affirm">确认</button>
					</div>
				</div>
			</mt-popup>
			<div>
			<div class="Bet_lottery_num" :style="classId=='6'?{height:'2.5rem'}:''">
				<!--<transition name="fade">-->
					<div class="Bet_lottery_num_left">
						<div>{{awarPeriod2}}期开奖号码</div>
						<div class="Bet_one">
							<div class="Bet_two" v-for="(item,idx) in lotteryLg" :style="classId=='6'?bjpkCss:''">
								<ul :class="animation">
									<li>{{end?"?":awardNum[idx]}}</li>
									<li v-for="index in 9">{{index}}</li>
									<li>?</li>
								</ul>
							</div>
						</div>
					</div>
				<!--</transition>-->
				<div class="Bet_lottery_num_right" style="height: 100%;" v-if="!fermer">
					<div>距{{awarPeriod1}}期截至</div>
					<div class="Bet_time" :style="classId=='6'?{margin:'0.6rem auto'}:{margin:'0.1rem auto'}">{{content}}</div>
				</div>
				<div class="Bet_lottery_num_right" style="height: 100%;" v-if="fermer">
					<div :style="classId=='6'?{color: 'red',fontSize: '0.6rem',width: '100%',lineHeight:'2.5rem'}:{color: 'red',fontSize: '0.6rem',width: '100%',lineHeight:'1.7rem'}" >已关盘</div>
				</div>
			</div>
			<div class="solde" :style="classId=='6'?{marginTop:'3.78125rem'}:''">
				<div><img style="vertical-align: middle;display: inline-block;" src="../../static/images/LoginNav/totalmoney.png" /><div style="display: inline-block;line-height: 0.5rem;min-width:1rem;height: 0.5rem;background: #1d2026;border-radius:5px;text-align: center;color: #fff;">{{Math.round(solde*100)/100}}元</div></div>
			</div>
			</div>
			<div class="Bet_main" :style="classId=='6'?{top:'4.58125rem'}:{top:'3.78125rem'}" ref="Bet_main">
				<ul class="Bet_fushi" v-if="show">
					<transition-group name="list" tag="p">
					<li class="Bet_main_list" v-for="(items,index1) in dataList.numbers"  v-show="!isSpecial()&&!is" :key="index1">
						<div class="Bet_main_list_left" v-if="items.rowName!=null">
							<span :style="items.rowName.length>2?{width:0.5+'rem',lineHeight:0.4+'rem'}:''">{{items.rowName}}</span></div>
						<div class="Bet_main_list_center">
							<ul class="Bet_main_list_left_top" :style="items.cols.length>10?ulLabelCss2:ulLabelCss" v-cloak >

								<li v-if="classId!=4" v-for="(item,index2) in items.cols" @click="dantuoArr.indexOf(subGameId)!=-1?bileDragSelect(index1+'-'+index2+'-'+item.label):oneSelect(index1+'-'+index2+'-'+item.label)" :style="dantuoArr.indexOf(subGameId)!=-1?item.data_selected?red:fd:items.cols.length>10?item.data_selected?labelCss3:labelCss4:item.data_selected?labelCss2:labelCss1" v-cloak>{{item.label}}</li>
								<li v-if="classId==4" v-for="(item,index2) in items.cols" @click="dantuoArr.indexOf(subGameId)!=-1?bileDragSelect(index1+'-'+index2+'-'+item.label):oneSelect(index1+'-'+index2+'-'+item.label)" :style="dantuoArr.indexOf(subGameId)!=-1?item.data_selected?red:fd:items.cols.length==1?item.data_selected?labelCss5:labelCss6:item.data_selected?labelCss2:labelCss1" v-cloak>{{item.label}}</li>

							</ul>
						</div>
						<div class="Bet_main_list_right" v-if="dataList.quickBtnOption.length!=0" v-cloak>
							<ul >
								<li v-for="item in dataList.quickBtnOption" :value="item.value" @click="quickSelectNum([index1,item.value])" :style="items.cols.length>10?rightBoxLiCss:''" v-cloak>{{item.label}}</li>
							</ul>
						</div>
					</li>
					</transition-group >
					<!--两面盘布局-->
					<li class="Bet_main_list" v-for="(items,index1) in dataList.numbers" :data-id="index1" v-show="sscSpecial&&!is&&index1!=10">
						<div class="Bet_main_list_left" style="width: 1.5rem;">{{items.rowName}}</div>
						<div class="Bet_main_list_center" style="width: 80%;">
							<ul class="Bet_main_list_left_top" :style="items.cols.length<4?ulLabelCss:ulLabelCss2">
								<li v-for="(item,index2) in items.cols" @click="changeSelected([index1,index2])" :value="item.selected" :style="item.data_selected?red:fd">{{item.label}}</li>
							</ul>
						</div>
					</li>
					<!--冠亚合值及冠亚组合和值-->
					<li class="Bet_main_list" v-if="bjscSpecial&&!is">
						<div class="Bet_main_list_left" style="width: 1.5rem;">冠亚和值</div>
						<div class="Bet_main_list_center" style="width: 80%;">
							<ul class="Bet_main_list_left_top" style="margin-bottom:0.4rem;">
								<li v-if="leftName == '冠亚合值'"   v-for="(items,index2) in dataList.numbers" @click="changeSelected([index2,0])" :style="items.cols[0].data_selected?red1:fd1"><span>{{items.cols[0].label}}</span><span style="position: absolute;bottom:-50%;left: 0;right: 0;line-height: 0.4rem;color: #fff;" >{{subGameList[index2].oddMax}}</span></li>
								<li v-if="leftName == '冠亚组合合值'"  v-for="(items,index2) in dataList.numbers" @click="changeSelected([index2,0])" :style="items.cols[0].data_selected?red1:fd1"><span>{{items.cols[0].label}}</span><span style="position: absolute;bottom:-50%;left: 0;right: 0;line-height: 0.4rem;color: #fff;" >{{subGameList[index2+4].oddMax}}</span></li>

							</ul>
							<!--<h1 style="text-align: left;" v-if="leftName=='冠亚组合合值'">温馨提示:每个号码的赔率都不同哦!<span style="color:#01AAED;" @click="showOddDetail=!showOddDetail">点击查看</span></h1>
							<mt-popup v-model="showOddDetail" position="top" style="background: #CECECE;width:40%;height:36%;border-radius: 0.2rem;top:0;bottom:0;left:0;right:0;margin:auto 50%;position:absolute;padding: 0.5rem;">
								<table class="Bet_showOddDetail">
									<tr>
										<th>号码</th>
										<th>赔率</th>
									</tr>
									<tr>
										<td>3,4,18,19</td>
										<td>{{subGameList[20].oddMax}}</td>
									</tr>
									<tr>
										<td>5,6,16,17</td>
										<td>{{subGameList[18].oddMax}}</td>
									</tr>
									<tr>
										<td>7,8,14,15</td>
										<td>{{subGameList[16].oddMax}}</td>
									</tr>
									<tr>
										<td>9,10,12,13</td>
										<td>{{subGameList[14].oddMax}}</td>
									</tr>
									<tr>
										<td>11</td>
										<td>{{subGameList[12].oddMax}}</td>
									</tr>

								</table>

							</mt-popup>-->

						</div>
					</li>

					<!--快三和值布局-->
					<li v-show="ksSubVal&&!is" v-for="(items,index1) in dataList.numbers" >
						<div>
							<ul style="float: left;" class="Bet_kshz">
								<li @click="quickSelectNum([index1,'small'])">小(3-10)</li>
								<li @click="quickSelectNum([index1,'odd'])">单(所有奇数)</li>
								<li @click="quickSelectNum([index1,'even'])">双(所有偶数)</li>
								<li @click="quickSelectNum([index1,'big'])">大(11-18)</li>
							</ul>
						</div>
						<div class="Bet_kscenter" style="width: 100%;">
							<ul class="Bet_kscenter_ul">
								<li v-for="(item,index2) in items.cols" @click="oneSelect(index1+'-'+index2+'-'+item.label)" :style="item.data_selected?kshzCss2:kshzCss1" v-if="index2<(items.cols.length)/2" v-cloak>{{item.label}}</li>
								<!--<li class="reversal" v-for="(item,index2) in items.cols" @click="oneSelect(index1+'-'+index2+'-'+item.label)" :style="item.data_selected?kshzCss2:kshzCss1" v-if="index2>(items.cols.length)/2-1">{{item.label}}</li>-->
							</ul>
							<ul class="Bet_kscenter_ul reversal">
								<!--<li  v-for="(item,index2) in items.cols" @click="oneSelect(index1+'-'+index2+'-'+item.label)" :style="item.data_selected?kshzCss2:kshzCss1" v-if="index2<(items.cols.length)/2">{{item.label}}</li>-->
								<li v-for="(item,index2) in items.cols" @click="oneSelect(index1+'-'+index2+'-'+item.label)" :style="item.data_selected?kshzCss2:kshzCss1" v-if="index2>(items.cols.length)/2-1" v-cloak>{{item.label}}</li>
							</ul>
							<ul style="display: flex;border-bottom: 1px solid #818287;border-top: 1px solid #818287">
								<li class="Bet_oddMax" v-for="(item,index) in subGameList" v-if="index<subGameList.length/2" style="flex: 1;text-align: center;">{{item.oddMax}}</li>

							</ul>
						</div>
					</li>
				</ul>
				<ul class="Bet_danshi" v-if="!show">
					<div class="Bet_msg">手动输入号码，至少输入1个{{inputFormat}}位数号码组成一注！</div>
					<div class="Bet_wenxin">
						<ul>
							<li class="la_a_a">温馨提示:</li>
							<li class="la_b_b">多注号码请用英文逗号(,)或者英文分号(;)或者空格或者回车来分开</li>
							<li class="la_c_c"><button @click="clearInput">清空</button></li>
						</ul>
						<p style="color:red;text-align: center;font-size: 14px;height: 0.375rem;line-height: 0.375rem;">{{errPrompt}}</p>
						<textarea class="Bet_input_txt" @input="judgeFromat" v-model="inputTxt">
    </textarea>
					</div>
				</ul>
			</div>
			<div class="Bet_money">
				<select class="Bet_money_left" v-model="moneyUnit">
					<option value="1" checked>元</option>
					<option value="0.1">角</option>
					<option value="0.01">分</option>
				</select>
				<div class="Bet_money_center">
					<span style="font-size: 0.4rem;text-align: center;line-height: 0.6rem;height: 0.6rem;">倍数：</span>
					<ul style="">
						<li @click="price<=1?1:price--">-</li>
						<input class="Bet_price" v-model="price" @blur="verification" type="number" />
						<li @click="price++">+</li>
					</ul>
				</div>
				<div class="Bet_money_peilv" v-if="!ksSubVal&&leftName!='冠亚组合合值'&&leftName!='冠亚合值'">
					<div style="font-size: 0.4rem;display:flex ;"><span>赔率：</span><span class="Bet_foot_center_num" style="max-width: 1rem;"  @mouseover="titleShow" @mouseout="titleHide" >{{isSpecial()&&subGameList instanceof Array?subGameList[0].oddMax:subGameList.oddMax}}</span></div>
				</div>
				<div class="Bet_money_right" @click="to">
					<div>{{tradeNumber}}</div>
				</div>
			</div>
			<div class="Bet_foot">

				<div class="Bet_foot_center">
					<span>共</span>
					<span class="Bet_foot_center_num" style="max-width: 1.2rem;" @mouseover="titleShow" @mouseout="titleHide">{{noteNumber}}</span>
					<span>注，共</span>
					<span class="Bet_foot_center_num" style="max-width: 1.2rem;" @mouseover="titleShow" @mouseout="titleHide">{{totalPrice}}</span>
					<span>元</span>
				</div>
				<button class="Bet_foot_left" @click="quickBet">快捷投注</button>
				<button class="Bet_foot_right" @click="addList">添加</button>
			</div>
		</div>
</template>
<script>
//	import Vue from "vue";
	import  {bus}  from '../bus.js'
	import { Popup } from 'mint-ui';
//	Vue.component(Popup.name, Popup);
//	Vue.component(MessageBox.name, MessageBox);
	var timed = null;
	
	//包胆数组
	var baodan = ["300212", "300216", "300310", "300410", "300510"]
	//特殊号码
	var specialNum = ["300312", "300412", "300512"]

	export default {
		name: 'BettingHall',
		created(){
			this.classId = this.$route.query.classId;
			this.kindId = this.$route.query.kindId ;
//			console.log(this.createChasePeriod("664853",1,53,"bjpk10"))
//			console.log(sessionStorageGet("specialList"))
                if(!sessionStorageGet("standGameList")[this.classId][this.kindId]){
                	 this.$axios.get('/inter/ticket/gamePlay/' + this.$route.query.classId + '/' + this.kindId).then((data)=> {
           		this.standGameList = data.data.data.standGameList
				this.gameName = this.standGameList[0].gameSons[0].gameName,
				this.subGameId = this.standGameList[0].gameSons[0].subGameId
				this.leftName = this.standGameList[0].gameSons[0].leftName
				this.rightName = this.standGameList[0].gameSons[0].rightName
				this.playList = this.standGameList[0].gameSons
				this.getDataList()
				//子玩法列表信息
			}).catch(function(error) {
				console.log(error)
			})
                }else{
                	this.standGameList = sessionStorageGet("standGameList")[this.classId][this.kindId];
				this.gameName = this.standGameList[0].gameSons[0].gameName,
				this.subGameId = this.standGameList[0].gameSons[0].subGameId
				this.leftName = this.standGameList[0].gameSons[0].leftName
				this.rightName = this.standGameList[0].gameSons[0].rightName
				this.playList = this.standGameList[0].gameSons
				this.getDataList()
                }
                
           	    this.$axios.get('/inter/ticket/gamePlay/' + this.$route.query.classId + '/' + this.kindId).then((data)=> {
           		if(data.data.code == "511"){
					this.$dialog.alert({mes:data.data.msg,callback:()=>{
						         sessionStorageSet('kinds',null)
						         sessionStorageSet("specialList",null)
						         sessionStorageSet("standGameList",{"1":{},"2":{},"3":{},"4":{},"5":{},"6":{}})
								this.$router.push({name:'container'})
							}})
						
				}
           		
				//子玩法列表信息
			}).catch(function(error) {
				console.log(error)
			})
           
//         if(sessionStorageGet("specialList"))
//			
			this.subClassGame()
			this.lotteryNumLg();
			this.timeLeft();
			this.winsDragon();
			bus.$on('newMessage', (msg) => {
                   this.message = msg
              })
			if(sessionStorageGet("list")){
				this.tradeNumber = sessionStorageGet("list").length;
			}
			
		},
		mounted(){
			this.solde=sessionStorageGet("baseMember").accountBalance
			this.$refs.Bet_bettingHall.ontouchmove = function(e){
				e.preventDefault()
			}
			this.$refs.Bet_main.ontouchmove = function(e){
				e.stopPropagation()
			}
		},
		destroyed () {
              clearInterval(timed)
              },
		data() {
			
			return {
				fermer:false,
				solde:0,
				title:'',
				showTxt:false,
				showOddDetail: false,
				classId:'' ,
				arr: [],
				rowName: '',
				label: '',
				dataList: [],
				commitList: [],
				noteNumber: 0,
				tradeNumber: 0,
				totalPrice: 0,
				subGameList: "",
				price: 1,
				moneyUnit: 1,
				subClass: "",
				kindId:'',
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
				animation: "Bet_result-number-list animation",
				dantuoArr: ['500105', '500110', '500115', '500205', '500210', '500701', '500702', '500703', '500704', '500705', '500706', '500707', '400402', '400802', '400701'],
				t: "",
				message1:this.message,
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
				check: "clear",
				newNumbers: [],
				betTypeMap: {},
				SpecialArr: [],
				time: 60,
				hide:true,
				betBgColor: {
					background: "#15141A",
				},
				labelCss1: {
					float: 'left',
					background: "#fff",
					color:"#000",
//					background: "#fff",
					fontSize:"18px",
					width: 0.90 + 'rem',
					height: 0.90 + 'rem',
					borderRadius: 0.90 + 'rem',
					marginBottom: 0.25 + 'rem',
					textAlign: 'center',
					lineHeight: 0.90 + 'rem',
				},
				labelCss2: {
					float: 'left',
//					background: "#fff",
					background: "#efb845",
					color:"#fff",
					fontSize:"18px",
					width: 0.90 + 'rem',
					height: 0.90 + 'rem',
					borderRadius: 0.90 + 'rem',
					marginBottom: 0.25 + 'rem',
					textAlign: 'center',
					lineHeight: 0.90 + 'rem',
				},
				labelCss3: {
					float: 'left',
					background: "#efb845",
//					background: "#fff",
					color:"#fff",
					fontSize:"18px",
					width: 0.90 + 'rem',
					height: 0.90 + 'rem',
					borderRadius: 0.90 + 'rem',
					margin: 0.2 + 'rem',
					textAlign: 'center',
					lineHeight: 0.90 + 'rem',
				},
				labelCss4: {
					float: 'left',
					background: "#fff",
//					background: "#efb845",
					width: 0.90 + 'rem',
					color:"#000",
					fontSize:"18px",
					height: 0.90 + 'rem',
					borderRadius: 0.90 + 'rem',
					margin: 0.2 + 'rem',
					textAlign: 'center',
					lineHeight: 0.90 + 'rem',
				},
				labelCss5: {
					float: 'left',
					background: "#efb845",
//					background: "#fff",
					color:"#fff",
					fontSize:"18px",
					padding: 0.1 + 'rem',
					borderRadius: 0.10 + 'rem',
					margin: 0.2 + 'rem',
					textAlign: 'center',
					lineHeight: 0.90 + 'rem',
				},
				labelCss6: {
					float: 'left',
					background: "#fff",
//					background: "#efb845",
                    color:"#000",
					fontSize:"18px",
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
					background: "#efb845",
//					background: "#fff",
					float: 'left',
					color:"#fff",
					fontSize:"18px",
					width: 0.90 + 'rem',
					height: 0.90 + 'rem',
					borderRadius: 0.90 + 'rem',
					marginBottom: 0.25 + 'rem',
					textAlign: 'center',
					margin: 0.2 + 'rem',
					lineHeight: 0.90 + 'rem',
				},
				red1: {
					position: "relative",
					background: "#efb845",
//					background: "#fff",
					float: 'left',
					color:"#fff",
					fontSize:"18px",
					width: 0.90 + 'rem',
					height: 0.90 + 'rem',
					borderRadius: 0.90 + 'rem',
					textAlign: 'center',
					margin: "0.3rem 0.2rem",
					marginBottom:0.3+"rem",
					lineHeight: 0.90 + 'rem',
				},
				fd1: {
					position: "relative",
					background: "#fff",
//					background: "#efb845",
                    color:"#000",
					float: 'left',
					fontSize:"18px",
					width: 0.90 + 'rem',
					height: 0.90 + 'rem',
					borderRadius: 0.90 + 'rem',
					textAlign: 'center',
					margin: "0.3rem 0.2rem",
					lineHeight: 0.90 + 'rem',
				},
				fd: {
					background: "#fff",
//					background: "#efb845",
                    color:"#000",
					float: 'left',
					fontSize:"18px",
					width: 0.90 + 'rem',
					height: 0.90 + 'rem',
					borderRadius: 0.90 + 'rem',
					marginBottom: 0.25 + 'rem',
					textAlign: 'center',
					margin: 0.2 + 'rem',
					lineHeight: 0.90 + 'rem',
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
//					background: "rgb(239, 184, 69)",
                    background: "#fff",
                    color:"#000",
					fontSize:"18px",
					width: "0.9rem",
					height: "0.9rem",
					borderRadius: "0.9rem",
					margin: "0.2rem 0.15rem",
					textAlign: "center",
					lineHeight: "0.9rem",
				},
				kshzCss2: {
					background: "#efb845",
//					background: "#fff",
					width: "0.9rem",
					height: "0.9rem",
					color:"#fff",
					fontSize:"18px",
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
					maxWidth:2+'rem',
					minHeight:'0.6rem',
					textAlign:"center",
					lineHeight:'0.6rem',
					borderRadius:"0.08rem",
					background:'#818287',
					zIndex:'10001',
					border:'1px solid #ccc',
					whiteSpace:"normal",
                    wordBreak:"break-all",
                    wordWrap:"break-word"
				},
				bileCodeArr: [],
				awardNum2: [],
				lotteryLg: 5,
				betList: [],
				SpecialDataList:[],
				reacquire:true,
				ksSubVal: false,
				bjscSpecial:false,
				sscSpecial:false,
				message:"",
				gameType:[],
				nouveauBet:false
			}
		},

		methods: {
             getObjLg(obj){
    var count = 0;
    for(var i in obj){
       count ++;
     }
     return count;
    	},
			//判断是否为特殊玩法
			isSpecial(){
				var ksSumValArr = sessionStorageGet("specialArr").ksSumValArr
				var SscSpecialArr = sessionStorageGet("specialArr").SscSpecialArr
				var bjscSpecialArr = sessionStorageGet("specialArr").bjscSpecialArr
				if(ksSumValArr.indexOf(this.subGameId)!=-1||SscSpecialArr.indexOf(this.subGameId)!=-1||bjscSpecialArr.indexOf(this.subGameId)!=-1){
					return true;
				} else {
					return false;
				}
			},
			//获取数据
			getDataList(){
				var ksSumValArr = sessionStorageGet("specialArr").ksSumValArr
				var SscSpecialArr = sessionStorageGet("specialArr").SscSpecialArr
				var bjscSpecialArr = sessionStorageGet("specialArr").bjscSpecialArr
				if(!this.isSpecial()){//一般玩法
					this.$axios.get('/inter/ticket/subGame/' + this.subGameId).then((data) =>{
						this.subGameList = data.data.data
//						console.log(this.subGameList)
					}).catch(function(error) {
						console.log(error)
					})
//					console.log(this.leftName,this.rightName,this.subGameId)
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
					 let specialList = sessionStorageGet("specialList")
					if(ksSumValArr.indexOf(this.subGameId)!=-1){//ks和值
						this.ksSubVal= true;
						subGameIdArr = ksSumValArr;
						//缓存完毕则使用缓存,否则重新请求
						if(this.getObjLg(specialList)>=3&&specialList!=null){
							this.subGameList = sessionStorageGet("specialList").ksSumVal
						}else{
							this.getSubGames(subGameIdArr)
						}
                        
					} else if(SscSpecialArr.indexOf(this.subGameId)!=-1){//ssc两面盘
						this.sscSpecial=true;
						subGameIdArr = SscSpecialArr;
                        if(this.getObjLg(specialList)>=3&&specialList!=null){
							this.subGameList = sessionStorageGet("specialList").SscSpecial
						}else{
							this.getSubGames(subGameIdArr)
						}
					} else if(bjscSpecialArr.indexOf(this.subGameId)!=-1){//bjsc两面盘
						this.bjscSpecial=true;
						subGameIdArr = bjscSpecialArr;
                        if(this.getObjLg(specialList)>=3&&specialList!=null){
							this.subGameList = sessionStorageGet("specialList").bjscSpecial
							console.log(this.subGameList)
						}else{
							this.getSubGames(subGameIdArr)
						}
					}
					this.betTypeData()
					if(this.reacquire){
//						console.log(this.subGameList)
					this.dataList = createSpecialBetNumbers(
						{
						betRates: [this.subGameList],
						betTypeMap: this.betTypeMap,
						subGameIds: subGameIdArr
					    }
						)
//					console.log(this.dataList.numbers)
					this.setSpecialDataList()
					this.reacquire = false;
				    
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
			getSubGames(item){
				this.$axios({
					method: 'post',
					url: '/inter/ticket/subGames',
					data: {
						gameIds: item
					}
				    }).then((data)=> {
				    	this.subGameList = data.data.data
				    }).catch(function(error) {
					console.log(error)
				    })
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
            this.showTitleCss.left=x-30+'px';
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
//					console.log(item)
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
			betAxios(data1) {
				let that = this;
				if(!that.fermer){
					that.$axios({
					method: 'post',
					url: '/inter/ticket/chipIn',
					data: data1
				}).then(function(data) {
					if(data.data.code == 0 && data.data.msg == "OK") {
						that.$dialog.alert({mes:"投注成功"})
//						MessageBox.alert("投注成功")
                        that.solde-=data1.cost
                        let baseMember =sessionStorageGet("baseMember")
                        baseMember.accountBalance = that.solde
                        sessionStorageSet("baseMember",baseMember)
						that.clear()
						that.betList = []
						that.nouveauBet = false
					} else {
					
          	that.$dialog.alert({mes:data.data.msg})
//        	MessageBox.alert(data.data.msg)
						that.nouveauBet = true
          
//						that.betList = []
						
					}
				}).catch(function(error) {
					console.log(error)
				})
				}else{
					that.clear()
						that.betList = []
						that.nouveauBet = false
					that.$dialog.alert({mes:"此彩类已关盘"})
				}
				

			},

			//bjsc特殊号码提交方式
			bjscSpecialCommit(){
				       if(this.leftName == "冠亚合值"){
				       	let oddMaxData = this.subGameList.slice(0,4);
				       	let oddMax ;
				       	
							for(let i = 0; i < this.newNumbers.length; i++) {
								let xuanhao=this.dataList.numbers[i].cols[0].label;
								if(this.newNumbers[i].length != 0) {
									switch(xuanhao){
										case "大" :
										this.subGameId = oddMaxData[0].subGameId;
										oddMax = oddMaxData[0].oddMax
										break
										case "小" :
										this.subGameId = oddMaxData[1].subGameId;
										oddMax = oddMaxData[1].oddMax
										break
										case "单" :
										this.subGameId = oddMaxData[2].subGameId;
										oddMax = oddMaxData[2].oddMax
										break
										case "双" :
										this.subGameId = oddMaxData[3].subGameId;
										oddMax = oddMaxData[3].oddMax
										break
									}
									let value = {
										noteNumber: 1,
										oddMax: oddMax,
										totalPrice: this.price*this.moneyUnit,
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
//				            //截取属于冠亚组合合值的subGameId的数组
//							let arr = bjscSpecialArr.slice(4);
							//截取属于冠亚组合合值的赔率的数组
							let oddMaxData = this.subGameList.slice(4);
							//每个subGameId的赔率

								for(let i = 0; i < this.newNumbers.length; i++) {
									if(this.newNumbers[i].length!=0){
										
										let value = {
											noteNumber: 1,
											oddMax: oddMaxData[i].oddMax ,
											totalPrice: this.price*this.moneyUnit,
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
								totalPrice: this.price*this.moneyUnit,
								Gameplay: this.leftName,
								xuanhao:this.newNumbers[0][i],
								kindId: this.kindId,
								subGameId: this.subGameId,
								check: false
							}
//							console.log(value)
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
									totalPrice: this.price* this.moneyUnit*this.newNumbers[i].length,
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
											totalPrice: this.price*this.moneyUnit,
											Gameplay: this.dataList.numbers[i].leftName + "(" + this.dataList.numbers[i].rowName + ")",
											xuanhao: this.newNumbers[i][0],
											kindId: this.kindId,
											subGameId:this.dataList.numbers[i].subGameId ,
											check: false
										}
									     this.betList.push(value)
										}else {
											let idx = this.newNumbers[i][0]
//											console.log(idx)
											if(idx==2){
												this.newNumbers[i][0]=this.dataList.numbers[i].rightName;
												he.push(this.newNumbers[i][0])
											}else{
												this.newNumbers[i][0]=this.dataList.numbers[i].cols[idx].label;
												let value = {
											noteNumber: 1,
											oddMax: this.subGameList.oddMax,
											totalPrice: this.price*this.moneyUnit,
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
									totalPrice: this.price * he.length*this.moneyUnit,
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
				if(!this.nouveauBet){
				if(this.noteNumber != 0) {
					//判断单注上限金额
					if(this.price >= this.subGameList.oneNoteLimit) {
						 	this.$dialog.alert({mes:"单注金额上限是 " + this.subGameList.oneNoteLimit + "元"})
//						MessageBox.alert("单注金额上限是 " + this.subGameList.oneNoteLimit + "元")
						return false
					}
					//判断每注投注金额
					if(this.totalPrice >= this.subGameList.singleLimit) {
						this.$dialog.alert({mes:"每次投注金额上限是 " + this.subGameList.singleLimit + "元"})
//						MessageBox.alert("每次投注金额上限是 " + this.subGameList.singleLimit + "元")
						return false
					}
					if(this.totalPrice<0.02){
						this.$dialog.alert({mes:"每次投注金额不能低于 " +0.02  + "元"})
//						MessageBox.alert("每次投注金额不能低于 " +0.02  + "元")
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
//						console.log(this.subGameList)
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
                    this.$dialog.alert({mes:"请至少选择1注进行投注!"})
//					MessageBox.alert("请至少选择1注进行投注!")
				}
				}else{
					this.betParams()
				}

			},
			addList(){
				this.betList= [];
				if(this.fermer){
					this.clear()
					this.betList = []
					this.nouveauBet = false
					this.$dialog.alert({mes:"此彩类已关盘"})
					return false;
				}
				if(this.noteNumber != 0) {
					//判断单注上限金额
					if(this.price >= this.subGameList.oneNoteLimit) {
						 this.$dialog.alert({mes:"单注金额上限是 " + this.subGameList.oneNoteLimit + "元"})
//						MessageBox.alert("单注金额上限是 " + this.subGameList.oneNoteLimit + "元")
						return false
					}
					//判断每注投注金额
					if(this.totalPrice >= this.subGameList.singleLimit) {
						 this.$dialog.alert({mes:"每次投注金额上限是 " + this.subGameList.singleLimit + "元"})
//						MessageBox.alert("每次投注金额上限是 " + this.subGameList.singleLimit + "元")
						return false
					}
					if(this.totalPrice<0.02){
						 this.$dialog.alert({mes:"每次投注金额不能低于 " +0.02  + "元"})
//						MessageBox.alert("每次投注金额不能低于 " +0.02  + "元")
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
//						console.log(this.subGameList)
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
                   this.$dialog.alert({mes:"请至少选择1注进行投注!"})
//					MessageBox.alert("请至少选择1注进行投注!")
				}
			},
			//判断开奖号码位数
			lotteryNumLg() {
				switch(this.classId) {
					case '1':
					    this.lotteryLg = 3
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
				this.nouveauBet = false
				this.betList = []
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
			getTime(kindId) {
				switch(kindId) {
					case "m5ffc":
					case "m5k3" :
					case "m511x5" :
					case "txffc" :
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
						let awarPeriod2 = this.awarPeriod2.substring(this.awarPeriod2.length - 3, this.awarPeriod2.length)
						if(awarPeriod2 * 1 >= 95 || awarPeriod2 * 1 < 24) {
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
			 
			//根据大彩类获取旗下所有彩类的倒计时
			timeLeft() {
				let that = this;
				that.$axios.get('/inter/ticket/timeLeft/' + that.$route.query.classId).then(function(data) {
					
					if(that.kindId in data.data.data  == false){
					    that.fermer = true
					}else{
						 that.fermer = false
					}
					for(var i in data.data.data) {
						if(i == that.kindId&&data.data.data[i]<0) {
							that.getTime(i)
							that.total = data.data.data[i]+that.time
							break;
						}else if(i == that.kindId){
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
				}else if(this.price >10000){
					this.price = 10000
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
					if(this.winList[1].awardNum != null) {
						this.awardNum = this.winList[1].awardNum.split(",");
						this.awardNum2 = this.winList[5].awardNum.split(",");
						this.end = false
						setTimeout(() =>{
							this.animation = "animation"
						}, 300)
					}
				}).catch(function(error) {
					console.log(error)
				})
			},
			//返回---
			goback() {



				clearInterval(timed)
				sessionStorageSet('routeIndx', -1)
				sessionStorageSet("list", [])
				this.$router.push({
					name: 'container',
					query:{
						refurbish:false
					}
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
//				console.log(this.newNumbers)
			},
			//计算投注数量,非特殊玩法
			oneSelect(indexObj) {
				this.changeIndex(indexObj);
				this.nouveauBet = false
				this.betList = []
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
					this.subGameList.betName =this.gameName
					this.betList[0].gameType=this.selectGameType()
					Object.assign(this.betList[0],this.subGameList)
					sessionStorageSet("list", this.betList)
					this.tradeNumber = sessionStorageGet("list").length
				}else{
					this.subGameList.betName =this.gameName
					this.betList[0].gameType=this.selectGameType()
					Object.assign(this.betList[0],this.subGameList)
					this.betList = sessionStorageGet("list").concat(this.betList);
					sessionStorageSet("list", this.betList)
					this.tradeNumber = sessionStorageGet("list").length
				}
				
				
			},
			selectGameType(){
				let list = {}
				this.gameType.forEach((item)=>{
					if(item.classId==this.classId){
						for (var i=0;i<item.kindList.length;i++) {

							if(item.kindList[i].kindId == this.kindId){
								list = item.kindList[i]
								return false
							}

						}
					}
				})
				return list
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
                this.nouveauBet = false
                this.betList = []
				this.noteNumber = calcChooseBetCount(this.dataList, []).ticketCount
				this.newNumbers = calcChooseBetCount(this.dataList, []).newNumbers
				this.totalPrice = this.noteNumber * this.price * this.moneyUnit
				this.numberScreening()
			},
			//选择子类玩法
			subClassGame() {
					this.gameType=sessionStorageGet("kinds")
//					console.log(this.gameType)
					let list = sessionStorageGet("kinds")
					for(let i = 0; i < list.length; i++) {
						if(this.$route.query.classId == list[i].classId) {
							this.subClass = list[i].kindList
						}
					}
			
			},
			//选择左名称    idx==当前点击的li索引
			childRenPlay(idx) {
				let leftName = event.target.innerHTML
				let arr = []
//				console.log(leftName)
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
//				console.log(this.playList)
//				console.log(this.betTypeMap,"111111111")
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
//				console.log(this.dataList)
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
						that.getTime(that.kindId)
						t = that.time;
						let periodNoAll = sessionStorageGet('periodNoAll')[that.classId][that.kindId]
						that.awarPeriod2 = that.awarPeriod1
						that.awarPeriod1 = that.createChasePeriod(that.awarPeriod1,1,periodNoAll,that.kindId)
						that.animation = 'Bet_result-number-list animation'

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
        

		},

		watch:{
			message(newMessage){
				if(this.kindId!=undefined){
					let data = JSON.parse(newMessage.data)
				if(data.messageType=="3"&&data.lotteryId==this.kindId){
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
			kindId(newKindId,oldKindId) {
				let that = this
				if(oldKindId!=""){
					sessionStorageSet("list", [])
				this.winsDragon()
				that.animation = "Bet_result-number-list animation"
				this.$axios.get('/inter/ticket/gamePlay/' + this.$route.query.classId + '/' + newKindId).then(function(data) {
					that.standGameList = data.data.data.standGameList
					that.subGameId = that.standGameList[0].gameSons[0].subGameId
					that.leftName = that.standGameList[0].gameSons[0].leftName
					that.rightName = that.standGameList[0].gameSons[0].rightName
					that.affirm()
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

				}

			},

			standGameList() {
				if(this.standGameList!=''){
					this.gameName = this.standGameList[0].gameName;
				this.gameId = this.standGameList[0].gameId
				this.playList = this.standGameList[0].gameSons
				this.set1()
				}

			},
			leftNameList() {
				let leftName = this.leftNameList[0]
				let arr = []
//				console.log(leftName)
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
</script>
<style scoped>
	/*.list-enter-active, .list-leave-active{
      transition: all 0.5s;
    }
    .list-enter, .list-leave-to{
      opacity: 0;
      transform: translateX(100%);
    }*/
      [v-cloak] {
        display: none;
          }
	.Bet_showOddDetail td,
	.Bet_showOddDetail th {
		width: 2.5rem;
		color: #000000;
		border: 1px solid #000;
		text-align: center;
	}

	.reversal {
		flex-direction: row-reverse
	}

	* {
		padding: 0;
		margin: 0;
		font-size: 0.4rem;
	}

	.Bet_kshz {
		width: 100%;
		display: flex;
		padding-top: 0.3rem;
		justify-content: space-around;
		padding-bottom: 0.2rem;
		background: #3b3d42;
    float: left;
	}

	.Bet_kshz li {
		float: left;
		border: 1px solid #CCCCCC;
		border-radius: 1px;
		padding: 0.1rem 0.15rem;
	}

	.Bet_kscenter ul {
		background: #3b3d42;
		display: flex;
		width: 100%;
		flex-wrap: wrap;
		justify-content: space-between;
		/*border-bottom: 1px solid #818287;*/
	}

	.Bet_kscenter .Bet_kscenter_ul li {}

	.Bet_select {
		height: 0.8rem;
		border-radius: 5px;
		border: 1px solid #ccc;
		appearance: none;
		/*清除select下拉框默认样式*/
		-moz-appearance: none;
		-webkit-appearance: none;
		padding-right: 0.6rem;
		padding-left: 0.2rem;
		color: #fff;
		background: #000000;
		background: url("../../static/images/BettingHall/xiala.png") no-repeat scroll right center transparent;
		background-size: 0.5rem 0.5rem;
	}

	.Bet_select option {
		color: #000;
	}

	ul li {
		list-style: none;
	}

	.Bet_header {
		height: 1.28125rem;
		width: 100%;
		background: linear-gradient(#373a42, #272931, #1d2026);
		position: absolute;
		top: 0;
		color: white;
		overflow: hidden;
		padding: 0.25rem;
		z-index: 10;
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
	}

	.Bet_header>div {
		height: 0.59375rem;
		line-height: 0.59375rem;
		text-align: center;
	}

	.Bet_header>div:nth-child(1) {
		width: 1.328rem;
	}

	.Bet_header>div:nth-child(2) {
		margin-left: 0.8125rem;
	}

	.Bet_header>div:nth-child(3) {
		box-sizing: border-box;
		padding: 0 0.12rem;
		font-size: 0.34375rem;
		color: #818287;
		border: 1px solid #818287;
		border-radius: 0.1rem;
		line-height: 0.8rem;
		height: 0.8rem;
	}

	.Bet_header>div:nth-child(4) {
		width: 0.5rem;
		height: 0.5rem;
		border: 1px solid #818287;
		border-radius: 0.5rem;
		box-sizing: border-box;
		text-align: center;
		line-height: 0.5rem;
		/*margin: 0.078rem 0 0 1.5rem;*/
		/*float: right;*/
	}

	.Bet_lottery_num {
		height: 1.70rem;
		width: 100%;
        z-index: 10;
		background: #C2C2C2;
		position: absolute;
		color: #1e2026;
		top: 1.28125rem;
		box-sizing: border-box;
		overflow: hidden;
	}

	.Bet_lottery_num_left {
		width: 55%;
		float: left;
		text-align: center;
		overflow: hidden;
	}

	.Bet_lottery_num_right {
		width: 45%;
		float: right;
    height: 100%;
		text-align: center;
		/*overflow: hidden;*/
	}
   .solde{
   	padding-left: 0.2rem;
   	background: #3b3d42;
   	height:0.8rem;
   	margin-top: 2.98125rem;
   	color: #d81e06;
   	line-height: 0.8rem;
   	display: flex;
   	align-items: center;
   	box-sizing: border-box;
   	border-bottom: 1px solid #818287 ;
   	
   }
   .solde img{
   	width: 0.6rem;
   	height: 0.6rem;
   	margin-bottom: 0.1rem;
   }
	.Bet_lottery_num_left>ul {
		width: 100%;
		display: flex;
		justify-content: space-around;
		padding: 0 10%;
		box-sizing: border-box;
		margin-top: 0.2343rem;
	}

	.Bet_lottery_num_left>ul>li {
		float: left;
		width: 0.5625rem;
		height: 0.5625rem;
		border-radius: 0.5625rem;
		background-color: #d2112d;
		color: #ffffff;
	}

	.Bet_time {
		width: 2.09375rem;
		height: 0.625rem;
		background-color: #282a32;
		color: #51f003;
		border-radius: 0.1rem;
		margin: 0.2343rem auto 0;
		text-align: center;
		line-height: 0.625rem;
	}

	.mint-popup {
		z-index: 10002;
	}

	.v-modal {
		z-index: 10001;
	}

	.Bet_main {
		width: 100%;
		position: absolute;
		overflow: auto;
		top: 3.78125rem ;
		bottom: 2.10925rem;
		-webkit-overflow-scrolling: touch;
	}

	.Bet_main_list {
		width: 100%;
		height: auto;
		background: #3b3d42;
		display: flex;
		color: white;
		padding: 0 2.5%;
		box-sizing: border-box;
		overflow: hidden;
		border-bottom: 1px solid #818287;
		align-items: center;
	}
	.Bet_main_list_center {

		flex: 1;
		/*width: 5.15625rem;*/
		/*width: 55%;*/
	}

	.Bet_main_list_center>ul {
		width: 100%;
		margin-top: 0.25rem;
		display: flex;
	}

	.Bet_main_list_center>ul>li {
		/*margin: 0.2rem;*/
	}

	.Bet_main_list_left_top>li {
		background-color: #efb845;
		color: white;
	}

	.Bet_main_list_left_button>li {
		background-color: white;
		color: black;
	}

	.Bet_main_list_right {
		display: flex;

		/*width: 3.28125rem;*/
		width: 35%;
		height: 100%;



	}

	.Bet_main_list_right>ul {

					display: flex;
					flex-wrap: wrap;
					justify-content: space-around;
					width: 100%;
                    margin-top: 0.25rem
				}


	.Bet_main_list_right>ul>li {
		width: 0.90rem;
		height: 0.90rem;
		border: 1px solid #fff;
		border-radius: 0.1rem;
		text-align: center;
		line-height: 0.90rem;
		box-sizing: border-box;
		margin-bottom: 0.25rem;
	}

	.Bet_main_list_left {
		/*width: 0.9375rem;*/
		width: 10%;
		display: flex;
		align-items: center;
		text-align: center;
	}

	.Bet_money {
		height: 0.78125rem;
		width: 100%;
		background-color: #818287;
		position: absolute;
		bottom: 1.328rem;
		z-index: 10;
		color: white;
		display: flex;
		align-items: center;
		justify-content: space-around;
		font-size: 0.34375rem;
		box-sizing: border-box;
	}

	.Bet_money_left {
		float: left;
		width: 1.0625rem;
		height: 0.47rem;
		background-color: #3b3d42;
		border-radius: 0.1rem;
		font-size: 0.34375rem;
		text-align: center;
		line-height: 0.47rem;
		color: #000;
	}

	.Bet_money_left>div {
		float: left;
		width: 0.47rem;
		height: 0.47rem;
	}

	.Bet_money_left {
		padding-left: 0.15rem;
		appearance: none;
		background: url("../../static/images/BettingHall/sanjiao.png") right;
		background-repeat: no-repeat;
		background-size: 0.35rem 0.35rem;
		text-align: center;
	}

	.Bet_money_center {
		float: left;
		width: 4.2rem;
		height: 0.6rem;
		margin-left: 0.3rem;
		display: flex;
	}

	.Bet_money_center>span {
		float: left;
		width: 1.2rem;
		height: 0.47rem;
		line-height: 0.47rem;
		font-size: 0.34375rem;
	}

	.Bet_money_center>ul {
		width: 2.76rem;
		height: 0.6rem;
		float: left;
		background-color: #3b3d42;
		border-radius: 0.6rem;
	}

	.Bet_money_center>ul>li {
		float: left;
		height: 0.6rem;
		width: 0.6rem;
		background-color: #6a6d75;
		border-radius: 0.6rem;
		text-align: center;
		line-height: 0.6rem;
	}

	.Bet_money_center>ul>li:nth-child(2) {
		margin: 0 0.295rem;
		background-color: #3b3d42;
	}

	.Bet_money_center>ul>li:nth-child(3) {
		float: right;
	}

	.dist {
		float: left;
		height: 0.6rem;
		margin-left: 0.25rem;
	}

	.Bet_money_peilv>div {
		float: left;
		font-size: 0.34375rem;
	}

	.Bet_input {
		float: left;
		width: 0.8rem;
		height: 0.47rem;
		background-color: #3b3d42;
		text-align: center;
		text-overflow: ellipsis;
		overflow: hidden;
	}

	.Bet_money_right {
		float: right;
		height: 0.6rem;
		width: 0.6rem;
		background: url("../../static/images/BettingHall/shopcard.png");
		background-size: 100% 100%;
		background-repeat: no-repeat;
		position: relative;
	}

	.Bet_money_right>div {
		position: absolute;
		width: 0.4rem;
		height: 0.4rem;
		border-radius: 0.4rem;
		text-align: center;
		line-height: 0.4rem;
		font-size: 0.25rem;
		top: 0;
		right: 0;
		background-color: #e74c08;
	}

	.Bet_foot {
		height: 1.328rem;
		width: 100%;
		background-color: #3b3d42;
		position: absolute;
		z-index: 10;
		bottom: 0;
		padding: 0.375rem 2.5%;
		box-sizing: border-box;
		color: white;
	}

	.Bet_foot_left {
		float: left;
		background-color: #3b3d42;
	}

	.Bet_foot_right {
		float: right;
		border: 0 !important;
		background-color: #e74c08;
	}

	.Bet_foot>button {
		height: 0.7rem;
		width: 1.8125rem;
		border-radius: 0.1rem;
		border: 1px solid #9d9ea1;
		outline: none;
		color: white;
		box-sizing: border-box;
	}

	.Bet_foot_center {
		float: left;
		width: 5rem;
		height: 0.7rem;
		margin-left: 0.325rem;
		line-height: 0.7rem;
		display: flex;
		justify-content: space-around;
	}

	.Bet_foot_center_num {
		text-align: center;
		text-overflow: ellipsis;
		overflow: hidden;
		height: 0.6rem;
		line-height: 0.6rem;
		color: #edac0c;
    max-width: 1.2rem ;
	}

	.Bet_main_list_left_top {
		flex-wrap: wrap;
	}

	.Bet_price {
		flex: 1;
		height: 0.6rem;
		width: 1.5rem;
		position: absolute;
		background-color: #3b3d42;
		color: #fff;
		border: none;
		text-align: center;
	}
	/*模态框*/


	.Bet_play_title {
		width: 100%;
		height: 0.25rem;
		line-height: 0.25rem;
		text-align: center;
		justify-content: space-around;
	}

	.Bet_play_title ul li {
		display: inline-block;
		width: 2rem;
		height: 0.78rem;
		line-height: 0.78rem;
	}

	.Bet_play_first ul,
	.Bet_play_second ul,
	.Bet_play_third ul {
		overflow: hidden;
	}

	.Bet_play_first ul li p,
	.Bet_play_second ul li p,
	.Bet_play_third ul li p {
		display: block;
		text-align: center;
		text-overflow: ellipsis;
		overflow: hidden;
		line-height: 0.78rem;
		border-radius: 3px;
	}

	.Bet_play_first {
		width: 100%;
		/*height:3.6rem ;*/
		border-bottom: solid 0.03rem gainsboro;
	}

	.Bet_play_first ul li {
		float: left;
		width: 2rem;
		height: 0.78rem;
		margin: 0.2rem 0.15rem 0.3rem 0.3rem;
	}

	.Bet_play_first ul li p {
		width: 2rem;
		height: 0.78rem;
		outline: none;
		border: solid 0.03rem gainsboro;
		background: white;
		color: grey;
	}

	.Bet_play_second,
	.Bet_play_third {
		width: 100%;
		height: auto;
		margin: 0.2rem 0;
		border-bottom: solid 0.03rem gainsboro;
	}

	.Bet_play_second ul li {
		width: 2rem;
		height: 0.78rem;
		margin: 0.2rem 0.15rem 0.3rem 0.3rem;
		float: left;
		/*line-height: 1.8rem;*/
	}

	.Bet_play_second ul li p {
		width: 2rem;
		height: 0.78rem;
		outline: none;
		border: solid 0.03rem gainsboro;
		background: white;
		color: grey;
	}

	.Bet_play_third ul li {
		width: 2rem;
		height: 0.78rem;
		margin: 0.2rem 0.15rem 0.3rem 0.3rem;
		float: left;
		/*line-height: 1.8rem;*/
	}

	.Bet_play_third ul li p {
		width: 2rem;
		height: 0.78rem;
		outline: none;
		border: solid 0.03rem gainsboro;
		background: #fff;
		color: grey;
	}

	.Bet_play_end {
		width: 100%;
		height: 1.6rem;
	}

	.Bet_moblie div .active {
		background: #e74c08;
		color: #fff
	}

	.Bet_play_queren {
		width: 2rem;
		height: 0.8rem;
		background: #e74c09;
		border: 0;
		display: block;
		outline: none;
		color: white;
		margin: 0.5rem auto;
	}



	.Bet_moblie {
		position: absolute;
		background: #3b3d42;
		width: 100%;
		height: auto;

	}

	.Bet_play_title ul li.on {
		background: red;
	}

	.Bet_play_first ul li.on button,
	.Bet_play_second ul li.on button,
	.Bet_play_third ul li.on button {
		background: red;
		line-height: 1rem;
		text-align: center;
	}
	/*点击后更改的样式*/
	/*滾動開獎樣式*/

	.Bet_one,
	.Bet_two {
		position: relative;
		/*overflow: hidden;*/
		display: flex;
		align-items: center;
		justify-content: space-around;
	}

	.Bet_one {
		display: flex;
		flex-wrap: wrap;
	}

	.Bet_two {
		display: inline-block;
		width: 0.808rem;
		height: 0.808rem;
		border-radius: 50%;
		background-color: #fff;
		overflow: hidden;
		color: #fff;
		background: linear-gradient(0, #710000 0, #540404 0, #b00e11 45%, red 100%);
	}

	.Bet_result-number-list {
		animation: numberListActivessc 1.4s  linear infinite both;

	}

	.Bet_result-number-list.on {
		animation: none;
		filter: none;
	}

	ul,
	li,
	ol {
		list-style: none;
		margin: 0;
		padding: 0;
	}

	@keyframes numberListActivessc {
		from {
			transform: translateY(0)
		}
		to {
			transform: translateY(-8rem)
		}
	}



	* {
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.Bet_msg {
		width: 100%;
		height: 1.125rem;
		line-height: 1.125rem;
		text-indent: 0.2rem;
		background-color: gainsboro;
	}

	.Bet_wenxin {
		width: 100%;
		height: 1.77rem;
	}

	.Bet_wenxin ul {
		width: 100%;
		height: 1.77rem;
		display: flex;
		background-color: #fff;
		justify-content: space-around;
		align-items: center;
		color: #000;
		margin-bottom: 0.625rem;
	}

	.Bet_wenxin ul li {
		justify-content: space-around;
		align-items: center;
		float: left;
		line-height: 0.8rem;
	}
	.Bet_wenxin ul .la_c_c button {

		width: 2.2rem;
		height: 0.9rem;
		border-radius: 0.1rem;
		background: #EDAC0C;
		color: #fff;
		margin: 0.1rem;
	}

	.Bet_input_txt {
		width: 94%;
		height: 4.28125rem;
		/*position: fixed;*/
		
		border: 1px solid #000;
		display: block;
		margin: 0 auto;
	}

	.animation li {
		width: 0.808rem;
		height: 0.808rem;
		line-height: 0.808rem;
		font-size: 0.390625rem;
		font-weight: 700;
		text-align: center;
		color: #fff;
	}

	.Bet_bettingHall {
		/*position: fixed;
		top: 0;
		bottom: 0;*/
		width: 100%;
		height: 100%;
	}
</style>
