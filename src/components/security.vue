<template>
	<div class="security">
		<mt-header title="安全中心" style="background-image: linear-gradient(to bottom,#494c56,#1e2027 );position: fixed;top: 0;left:0 ;width: 100%;height: 1.125rem;">
    <mt-button icon="back" slot="left" @click="goback">返回</mt-button>
</mt-header>
		<div class="security_navbar">
			<div :class="changeIndex==1?'active':''" @click="changeIdx(1)" style="border-left: none;">
				<i class="icon iconfont icon-yuechi"></i>
				<span style="color:#abacad;">登陆密码</span>
			</div>
			<div :class="changeIndex==2?'active':''" @click="changeIdx(2)">
				<i class="icon iconfont icon-suo"></i>
				<span style="color:#abacad;">资金密码</span>
			</div>
			<div :class="changeIndex==3?'active':''" @click="changeIdx(3)">
				<i class="icon iconfont icon-xiaoxi"></i>
				<span style="color:#abacad;">安全问题</span>
			</div>
		</div>
		<div class="security_nav-content" v-show="changeIndex==3">
			<!--已经设置安全问题-->
			<div v-if="!flag">
				<div style="background: #f1f1f0;" class="security_title_txt">
					查看安全问题
				</div>
				<div class="security_anquan">
					<p><span>安全问题:</span><span class="SecurityQuestion">{{SecurityQuestion[index-1][0]}}</span></p>
					<p><span>安全问题答案:</span><span>*********</span></p>
					<p style="font-size: 8px;margin-top: 1.75rem;color: #c0c0c0;">温馨提示:安全问题可以帮您找回或重置密码,请牢记安全问题！</p>
				</div>
			</div>
			<!--已经设置安全问题-->
			<!--没有设置安全问题-->
			<div v-if="flag">
				<div style="background: #f1f1f0;" class="security_title_txt">
					设置安全问题
				</div>
				<form style="background: #fff; padding-top: 0.25rem;">
					<span style="font-size: 12px;margin-left: 0.43rem;" ref="idx">安全问题:</span><select class="security_select" ref="saveVlaue">
						<option value="0">请选择安全问题</option>
						<option :value="item[1]" v-for="item in SecurityQuestion">{{item[0]}}</option>
					</select><br />
					<span style="font-size: 12px;margin-left: 0.43rem;">问题答案:</span><input placeholder="请输入安全问题的答案" class="security_answer_inp" ref="answer" onKeypress="javascript:if(event.keyCode == 32)event.returnValue = false;" />
					<p style="font-size: 8px;padding:0.21rem 0;color: #c0c0c0;margin-left: 0.43rem;">温馨提示:安全问题可以帮您找回或重置密码,请牢记安全问题！</p>
				</form>
				<div  class="security_aq-btn" value="确认设置" @click="saveSafeQuestion" >确认设置</div>
			</div>
			<!--没有设置安全问题-->

		</div>
		<div class="security_nav-content" v-show="changeIndex==1">
			<div style="background: #f1f1f0;" class="security_title_txt">
				修改登陆密码
			</div>
			<form class="security_pwd-amd">
				<input type="password" placeholder="输入旧登陆密码:" ref="oldPwd" /><br />
				<p></p>
				<input type="password" placeholder="输入新登陆密码:" ref="newPwd" /><br />
				<p>{{txt1}}</p>
				<input type="password" placeholder="确认新登陆密码:" ref="confirmPwd" /><br />
				<p>{{txt2}}</p>
				<span class="security_jianyi">建议您使用大小写字母混合，最好是8位数以上</span>
				<div class="security_aq-btn" @click="updateLoginPassword">确认修改</div>
			</form>
		</div>
		<div class="security_nav-content" v-show="changeIndex==2">
			<div style="background: #f1f1f0;" class="security_title_txt">
				修改资金密码
			</div>
			<form class="security_pwd-amd">
				<input type="password" placeholder="输入旧资金密码:" ref="oldMoneyPwd" /><br />
				<p></p>
				<input type="password" placeholder="输入新资金密码:" ref="newMoneyPwd" /><br />
				<p>{{txt3}}</p>
				<input type="password" placeholder="确认新资金密码:" ref="confirmMoneyPwd" /><br />
				<p>{{txt4}}</p>
				<span class="security_jianyi">建议您使用大小写字母混合，最好是8位数以上</span>
				<div class="security_aq-btn" @click="updateTradePassword">确认修改</div>
			</form>
		</div>

	</div>
</template>

<script>
//	import Vue from 'vue';
	import { Toast } from 'mint-ui';
//	 Vue.component(MessageBox.name, MessageBox);
	var SecurityQuestion = [
		[
			"您的母亲姓名是？",
			"1"
		],
		[
			"您配偶的生日是？",
			"2"
		],
		[
			"您的学号()或工号是？",
			"3"
		],
		[
			"您母亲的生日是？",
			"4"
		],
		[
			"您高中班主任的姓名是？",
			"5"
		],
		[
			"您父亲的姓名是？",
			"6"
		],
		[
			"您小学班主任的姓名是？",
			"7"
		],
		[
			"您父亲的生日是？",
			"8"
		],
		[
			"您配偶的姓名是？",
			"9"
		],
		[
			"您初中班主任的姓名是？",
			"10"
		],
		[
			"您最熟悉的童年好友姓名是？",
			"11"
		],
		[
			"您最熟悉的学校宿舍室友姓名是？",
			"12"
		],
		[
			"对您影响最大的人的姓名是？",
			"13"
		],
	]

	export default {
		data() {
			return {
				changeIndex: 1,
				flag: true,
				SecurityQuestion: SecurityQuestion,
				index: 1,
				idx: "",
				code: 0,
				txt1: "",
				txt2: "",
				txt3: "",
				txt4: "",
				flag1: false,
				flag2: false,
				flag3: false,
				flag4: false,
			}

		},

		created() {
			var that = this
			this.$axios({
				method: 'get',
				url: '/inter/user/querySafeQuestion',
			}).then(function(data) {
				that.code = data.data.code
				switch(that.code) {
					case 1:
						that.flag = false;
						let index = data.data.data
						that.index = index
						break;
					case 0:
						that.flag = true;
						break;
					default:
				}
			}).catch(function(error) {
				console.log(error)
			})
		},
		methods: {
			goback(){
				sessionStorageSet('routeIndx', -1)
				this.$router.back()
			},
			changeIdx(num) {
				this.changeIndex = num
			},
			updateLoginPassword() {
                 let that=this
				let oldPwd = this.$refs.oldPwd.value;
				let newPwd = this.$refs.newPwd.value;
				let confirmPwd = this.$refs.confirmPwd.value;
				if(oldPwd == "") {
					this.$dialog.alert({mes:"旧登陆密码为空"})
					return false
				}
				this.verifyFormat()
				if(this.flag1 && this.flag2) {
					if(oldPwd.length != 0 && newPwd.length != 0 && confirmPwd.length != 0) {

						this.$axios({
							method: 'post',
							url: '/inter/user/updateLoginPassword',
							data: {
								newPassword: hex_md5(newPwd),
								oldPassword: hex_md5(oldPwd)
							}
						}).then(function(data) {
//							console.log(data)
							switch(data.data.code) {
								case 1:
									that.$dialog.alert({
										mes:data.data.msg
									}
									)
									that.$refs.oldPwd.value="";
									that.$refs.newPwd.value="";
									that.$refs.confirmPwd.value="";
									break;
								case 0:
									that.$dialog.alert({
										mes:data.data.msg
									}
									)
									that.$refs.oldPwd.value="";
									that.$refs.newPwd.value="";
									that.$refs.confirmPwd.value="";
									break;
								default:
									that.$dialog.alert({
										mes:data.data.msg
									}
									)
									that.$refs.oldPwd.value="";
									that.$refs.newPwd.value="";
									that.$refs.confirmPwd.value="";
							}



						}).catch(function(error) {
							console.log(error)
						})

					}
				}
			},
			updateTradePassword() {
                let that=this
				let oldMoneyPwd = this.$refs.oldMoneyPwd.value;
				let newMoneyPwd = this.$refs.newMoneyPwd.value;
				let confirmMoneyPwd = this.$refs.confirmMoneyPwd.value;
				if(oldMoneyPwd == "") {
					this.$dialog.alert({mes:"旧资金密码为空"} )
					return false
				}
				this.verifyFormat1()
				if(this.flag3 && this.flag4) {
					if(oldMoneyPwd.length != 0 && newMoneyPwd.length != 0 && confirmMoneyPwd.length != 0) {

						this.$axios({
							method: 'post',
							url: '/inter/user/updateTradePassword',
							data: {
								newPassword: hex_md5(newMoneyPwd),
								oldPassword: hex_md5(oldMoneyPwd)
							}

						}).then(function(data) {

//							console.log(data)
							switch(data.data.code) {
								case 1:
									that.$dialog.alert({
										mes:data.data.msg
									}
									)
									that.$refs.oldMoneyPwd.value="";
									that.$refs.newMoneyPwd.value="";
									that.$refs.confirmMoneyPwd.value="";
									break;
								case 0:
									that.$dialog.alert({
										mes:data.data.msg
									});
									that.$refs.oldMoneyPwd.value="";
									that.$refs.newMoneyPwd.value="";
									that.$refs.confirmMoneyPwd.value="";
									break;

								default:
									that.$dialog.alert({
										mes:data.data.msg
									});
									that.$refs.oldMoneyPwd.value="";
									that.$refs.newMoneyPwd.value="";
									that.$refs.confirmMoneyPwd.value="";
							}
						}).catch(function(error) {
							console.log(error)
						})
					}
				}
			}

			,
			saveSafeQuestion() {
				let that = this;
				let value = that.$refs.saveVlaue.value
				if(value == "0") {
					that.$dialog.alert({
										mes:"请选择安全问题"
									})
//					MessageBox.alert("请选择安全问题")
				} else if(that.$refs.answer.value == "") {
					that.$dialog.alert({
										mes:"答案不能为空"
									})
//					MessageBox.alert("答案不能为空")
				} else {
					this.$axios({
						method: 'post',
						url: '/inter/user/saveSafeQuestion',
						data: {
							safeQuestion: that.$refs.saveVlaue.value + "",
							safeQuestionAnswer: that.$refs.answer.value
						},
					}).then(function(data) {
//						console.log(data.data.msg)
						if(data.data.msg == "保存成功") {
							Toast({
								message: data.data.msg,
								position: 'bottom',
								duration: 2000
							});
							that.$axios({
								method: 'get',
								url: '/inter/user/querySafeQuestion',
							}).then(function(data) {
								that.code = data.data.code
								switch(that.code) {
									case 1:
										that.flag = false;
										let index = data.data.data
										that.index = index
										break;
									case 0:
										that.flag = true;
										break;
									default:
								}
							}).catch(function(error) {
								console.log(error)
							})
						}

					}).catch(function(error) {
						console.log(error)
					})
				}

			},
			verifyFormat() {
				let reg =/(?![^a-zA-Z0-9]+$)(?![^a-zA-Z/D]+$)(?![^0-9/D]+$).{6,20}$/;
				if(!reg.test(this.$refs.newPwd.value)) {
					this.txt1 = "密码长度为6-20,且至少包含字母和数字";
					this.flag1 = false
				} else {
					this.txt1 = ""
					this.flag1 = true
				}
				if(this.$refs.newPwd.value != this.$refs.confirmPwd.value) {
					this.txt2 = "两次输入的密码不一致";
					this.flag2 = false
				} else {
					this.txt2 = "";
					this.flag2 = true
				}
			},
			verifyFormat1() {
				let reg = /(?![^a-zA-Z0-9]+$)(?![^a-zA-Z/D]+$)(?![^0-9/D]+$).{6,20}$/;

				if(!reg.test(this.$refs.newMoneyPwd.value)) {
					this.txt3 = "密码长度为6-20,且至少包含字母和数字";
					this.flag3 = false
				} else {
					this.txt3 = ""
					this.flag3 = true
				}
				if(this.$refs.newMoneyPwd.value != this.$refs.confirmMoneyPwd.value) {
					this.txt4 = "两次输入的密码不一致";
					this.flag4 = false
				} else {
					this.txt4 = "";
					this.flag4 = true
				}

			}
		}

		,
		watch: {
			changeIndex(newIdx) {
        document.querySelector("input").value="" ;
				if(newIdx == 3 && this.code == 0) {
					this.flag = true;
					this.$dialog.alert({mes:"您还没有设置安全问题,点击确认设置！",title:"提示"} );

				}
			}
		}
	}
</script>

<style scoped="scoped">
	.security {
		width: 100%;
        height: 100%;
		overflow: hidden;
		position: absolute;
		bottom: 0;

		background: #f1f1f0;
		color: #000;
	}

	.security_navbar {
		margin-top: 1.125rem;
		height: 1.125rem;
		background: #2b2c30;
		display: flex;
		align-items: center;
		border-top: 1px solid #fff;
	}

	.security_navbar div {
		display: flex;
		justify-content: center;
		border-left: 1px solid #fff;
		flex: 1;
		float: left;
	}

	.security_navbar div img {
		width: 1rem;
		height: 1rem;
	}

	.security_navbar div span {
		font-size: 14px;
	}

	.security_nav-content .security_title_txt {
		width: 100%;
		height: 1.031rem;
		font-size: 16px;
		color: #000;
		line-height: 1.031rem;
		padding-left: 0.43rem;
	}

	.security_anquan {
		background: #fff;
		padding-left: 0.43rem;
		padding-top: 1.75rem;
		padding-bottom: 0.312rem;
	}

	.security_anquan p {
		color: #000;
		font-size: 14px;
		text-align: center;
		line-height: 0.81rem;
	}

	.security_aq-btn {
		width: 100%;
		height: 1.25rem;
		background: #edac0c;
		color: #fff;
		font-size: 16px;
		line-height: 1.25rem;
		text-align: center;
	}

	.security_pwd-amd input {
		width: 100%;
		height: 1.1875rem;
		padding-left: 0.43rem;
		/*margin-bottom: 0.467rem;*/
	}

	.security_pwd-amd p {
		height: 0.52rem;
		text-align: left;
		line-height: 0.52rem;
		padding-left: 0.43rem;
		color: red;
	}

	.security_pwd-amd input:nth-child(5) {
		margin-bottom: 0;
	}

	.security_jianyi {
		padding-left: 0.43rem;
		color: #b5b5b5;
		line-height: 0.437rem;
		font-size: 10px;
		margin-bottom: 1.12rem;
	}

	.security_navbar span,
	.security_navbar i {
		color: #abacad;
	}

	.active span,
	.active i {
		color: #edac0c !important;
	}

	.security_navbar i {
		margin-right: 0.25rem;
	}

	.security select {
		width: 76%;
		height: 1rem;
		border: 1px solid #a3a3a3;
		border-radius: 2px;
		appearance: none;
		box-sizing: border-box;
		-moz-appearance: none;
		-webkit-appearance: none;
		background: url(../../static/images/img/icon/xiajiantou.png) no-repeat scroll right center transparent;

	}

	.security_answer_inp {
		width: 76%;
		height: 1rem;
		border: 1px solid #a3a3a3;
		border-radius: 2px;
		appearance: none;
		-moz-appearance: none;
		-webkit-appearance: none;
		box-sizing: border-box;
		margin: 0.325rem 0;
	}
</style>
