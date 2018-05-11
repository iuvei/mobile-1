<template>
	<div class="bindyinhang" style="color: #000000;">
        <mt-header title="新增银行卡" style="background-image: linear-gradient(to bottom,#494c56,#1e2027 );position: fixed;top: 0;left:0 ;width: 100%;height: 1.125rem;z-index: 10000;">

    <mt-button icon="back" slot="left" @click="goback1">返回</mt-button>

        </mt-header>
		<div  class="bd_u">
			<form>
				<span><div  style="color: red;">*</div>开户人:</span><input type="text" ref="name" /><br />
				<div class="bindyh_separate"></div>
				<span><div  style="color: red;">*</div>开户银行:</span><select v-model="idx" style="padding: 0;margin: 0;">
				     <option v-for="(item,index) in companyBankAccountList" :value="index" >{{item.bankName}}</option>
				</select><br />
				<div class="bindyh_separate"></div>
				<span><div  style="color: red;">*</div>开户地址:</span><input type="text"  style="width: 2rem;margin-right: 0.32rem" ref="province" placeholder="请输入省" /><input type="text" style="width: 2rem;" ref="city" placeholder="请输入市"/><br />
				<div class="bindyh_separate"></div>
				<span><div  style="color: red;">*</div>银行卡号:</span><input type="text" ref="bankAccount"  @input="formatBankNo"/><br />
				<p class="bindyh_hint" style="font-size: 0.3rem;">已输入{{numLength}}位</p>
				<span><div  style="color: red;">*</div>确认卡号:</span><input type="text" ref="bankAccount_2" /><br />
				<div class="bindyh_separate"></div>
				<span><div  style="color: red;"></div>银行支行:</span><input type="text" ref="bankBranch" /><br />
				<div class="bindyh_separate"></div>
				<span><div  style="color: red;"></div>支行行号:</span><input type="text" ref="branchCode" /><br />
				<div class="bindyh_separate"></div>
				<span><div  style="color: red;"></div>分行名称:</span><input type="text" ref="offshootName" /><br />
				<div class="bindyh_separate"></div>
				<span><div  style="color: red;">*</div>手机号码:</span><input type="number" ref="phone" /><br />
				<div class="bindyh_separate"></div>
				<span><div  style="color: red;">*</div>资金密码:</span><input type="password" ref="tradePassword" placeholder="" /><br />
        <span class="bindyh_hint" style="font-size: 0.3rem;">密码为6-20位,至少包含数字和字母!</span>
				<div v-if="!flag">
				<span style="width: 3.6rem;"><div  style="color: red;">*</div>第一张银行卡号:</span><input type="text" ref="firstBankAccount" placeholder="" /><br />
				<div class="bindyh_separate"></div>
                </div>
			</form>
			<div class="bindyh_btn_box">
				<button class="bindyh_cancel_btn" @click="goback">取消</button>
				<button class="bindyh_bind__btn" @click="bindBankAccount">绑定</button>
			</div>

		</div>


	</div>
</template>

<script>
	import { Field, MessageBox } from 'mint-ui';
//	import Vue from 'vue';
//	import {  } from 'mint-ui';
//
//  Vue.component(MessageBox.name, MessageBox);
//	Vue.component(Picker.name, Picker);
//	Vue.component(Field.name, Field);
//	Vue.component(MessageBox.name, MessageBox);
	export default {
		data() {
			return {
				flag: false,
				companyBankAccountList: [],
				idx: "0",
				numLength:0,





			}
		},
		created() {
			var code = this.$route.query.code;
//			console.log(code)
			if(code == 0) {
				this.flag = false
				var that = this
				this.$axios.get('/inter/user/memberIfBind').then(function(data) {
					that.companyBankAccountList = data.data.data.companyBankAccountList
//					console.log(that.companyBankAccountList)
				}).catch(function(error) {
					console.log(error)
				})


			} else if(code == 1) {
				this.flag = true;
				let that = this;
				this.$axios.get('/inter/user/memberIfBind').then(function(data) {

					that.companyBankAccountList = data.data.data.companyBankAccountList

//					console.log(data)
				}).catch(function(error) {
					console.log(error)
				});
				this.flag = true

			}
		},
		methods: {
			goback1(){
				sessionStorageSet('routeIndx', -1)
				this.$router.back()
			},
			goback() {
				var that = this;
				MessageBox.confirm('您确定取消绑定银行卡吗?').then(action => {
					this.$router.back()
				});
			},
			bindBankAccount() {
//				console.log(this.$route.query.code)
				var that = this
				if(!this.name()){
					that.$dialog.alert({mes:"开户人不能为空"});
					return false
				}else if(!this.provinceAndCity()){
					that.$dialog.alert({mes:"省和市不能为空"})
//					MessageBox.alert("省和市不能为空")
					return false
				}else if(!this.formatBankNo()){
					that.$dialog.alert({mes:"绑定的银行卡号位数应在16-20位之间"})
//					MessageBox.alert("绑定的银行卡号位数应在16-20位之间")
					return false
				}else if(!this.verifyCardNumber()){
					that.$dialog.alert({mes:"两次输入的银行卡号不匹配"})
//					MessageBox.alert("两次输入的银行卡号不匹配")
					return false
				}
//				else if(!this.bankBranch()){
//					that.$dialog.alert({mes:"银行支行不能为空"})
////					MessageBox.alert("银行支行不能为空")
//				}else if(!this.branchCode()){
//					that.$dialog.alert({mes:"支行行号不能为空"})
////					MessageBox.alert("支行行号不能为空")
//				}else if(!this.offshootName()){
//					that.$dialog.alert({mes:"分行名称不能为空"})
////					MessageBox.alert("分行名称不能为空")
//				}
				else if(!this.phone()){
					that.$dialog.alert({mes:"请输入正确的手机号码"})
//					MessageBox.alert("请输入正确的手机号码")
					return false
				} else if(!this.passwordInp()){
					that.$dialog.alert({mes:"资金密码不能为空"})
//					MessageBox.alert("资金密码不能为空")
					return false
				} else if(this.$route.query.code==0){
					if (!this.firstBankAccountInp()){
						that.$dialog.alert({mes:"您输入的第一张银行卡号的位数错误"})
//						MessageBox.alert("您输入的第一张银行卡号的位数错误")
						return false
					}else{
						this.$axios({
					method: 'post',
					url: '/inter/user/saveMemberOtherBank',
					data: {
						name:that.$refs.name.value,
						companyBankId:that.companyBankAccountList[that.idx * 1].id,
						bankAccount: that.$refs.bankAccount.value,
						bankName: that.companyBankAccountList[that.idx * 1].bankName,
						city: that.$refs.city.value,
						phone:that.$refs.phone.value,
						firstBankAccount:that.$refs.firstBankAccount.value,
						province: that.$refs.province.value,
						tradePassword: hex_md5(that.$refs.tradePassword.value),
						bankBranch:that.$refs.bankBranch.value,
						branchCode:that.$refs.branchCode.value,
						offshootName:that.$refs.offshootName.value,
					}

				}).then(function(data) {
					that.$dialog.alert({mes:data.data.msg});
//					MessageBox.alert(data.data.msg)
                    that.$refs.bankAccount.value="";
                    that.$refs.city.value="";
                    that.$refs.phone.value="";
                    that.$refs.firstBankAccount.value="";
                    that.$refs.bankAccount_2.value="";
                    that.$refs.province.value="";
                    that.$refs.tradePassword.value="";
                    that.$refs.bankBranch.value="";
                    that.$refs.branchCode.value="";
                    that.$refs.offshootName.value="";
                    that.$refs.name.value="";
				}).catch(function(error) {
					console.log(error)
				})
					}
				}else{
					this.$axios({
					method: 'post',
					url: '/inter/user/saveMemberBank',
					data: {
						name:that.$refs.name.value,
						companyBankId:that.companyBankAccountList[that.idx * 1].id,
						bankAccount: that.$refs.bankAccount.value,
						bankName: that.companyBankAccountList[that.idx * 1].bankName,
						city: that.$refs.city.value,
						phone:that.$refs.phone.value,
						province: that.$refs.province.value,
						tradePassword: hex_md5(that.$refs.tradePassword.value),
						bankBranch:that.$refs.bankBranch.value,
						branchCode:that.$refs.branchCode.value,
						offshootName:that.$refs.offshootName.value
					}
				}).then(function(data) {
					that.$dialog.alert({mes:data.data.msg})
//					MessageBox.alert(data.data.msg)
					that.$refs.bankAccount.value="";
                    that.$refs.city.value="";
                    that.$refs.phone.value="";
                    that.$refs.firstBankAccount.value="";
                    that.$refs.tradePassword.value="";
                    that.$refs.bankAccount_2.value="";
                    that.$refs.province.value="";
                    that.$refs.bankBranch.value="";
                    that.$refs.branchCode.value="";
                    that.$refs.offshootName.value="";
                    that.$refs.name.value="";
				}).catch(function(error) {
					console.log(error)
				})
				}


			},
			//判断银行卡号格式
		formatBankNo(e){
			let that=this
			 var pattern =/^\d{16,20}$/;
			 this.numLength=that.$refs.bankAccount.value.length
			 if(!pattern.test(that.$refs.bankAccount.value)){
			 	return false
			 } else{
			 	return true
			 }
		},
		//确认银行卡号
		verifyCardNumber(e){
			let that=this
			if(that.$refs.bankAccount_2.value==that.$refs.bankAccount.value){
				return true
			}else{
				return false
			}
		},
		//省市
		provinceAndCity(){
			let province=this.$refs.province.value;
			let city=this.$refs.city.value;
			if(province!=""&&city!=""){
				return true
			}else{
				return false
			}
		},
		//银行支行
		bankBranch(){
			let bankBranch=this.$refs.bankBranch.value;
			if(bankBranch!=""){
				return true
			}else{
				return false
			}
		},
		//支行行号
		branchCode(){
			let branchCode=this.$refs.branchCode.value;
			if(branchCode!=""){
				return true
			}else{
				return false
			}
		},
		//分行名称
		offshootName(){
			let offshootName=this.$refs.offshootName.value;
			if(offshootName!=""){
				return true
			}else{
				return false
			}
		},
		//资金密码输入验证
		passwordInp(){
			if(this.$refs.tradePassword.value!=""){
				return true
			}else{
				return false
			}
		},
		firstBankAccountInp(){
			let that=this
			 var pattern =/^\d{16,20}$/;
			 if(!pattern.test(that.$refs.firstBankAccount.value)){
			 	return false
			 } else{
			 	return true
			 }
		},
		name(){
			let name=this.$refs.name.value;
			if(name!=""){
				return true
			}else{
				return false
			}
		},
		phone(){
			let that = this;
			var pattern = /^1(3|4|5|7|8)\d{9}$/;
			if(!pattern.test(that.$refs.phone.value)){
			 	return false
			 } else{
			 	return true
			 }
		}
		}
	}
</script>

<style scoped="scoped">
		input,select{vertical-align:middle;}
	.bindyh_separate {
		width: 100%;

		height: 0.56rem;
	}
    .bindyinhang .bd_u{
    	position: absolute;
    	padding-top:0.4rem ;
    	top: 1.125rem;
    	width: 100%;
    	height: auto;
    	overflow-y: scroll;
    	bottom: 0;
    }
	.bindyinhang {
		width: 100%;
		background: #ffffff;
		color: #000000;
		/*position: absolute;*/
		top:0;
		overflow: hidden;
	}

	.bindyh_hint {
		width: 50% !important;
		text-align: left !important;
		/*line-height: 0.56rem;*/
		color: #a3a3a3;
	}

	.bindyinhang input {
		width: 5.15rem;
		height: 0.78rem;
		border: 1px solid #a3a3a3;
		border-radius: 2px;
	}
	/*.bindyinhang input{

		background: url(../../static/images/img/icon/xiajiantou.png) no-repeat right center ;
		}*/

.bindyinhang select {
		width: 5.20rem;
		height: 0.78rem;
		border: 1px solid #a3a3a3;
		border-radius: 2px;
		appearance: none;
		-moz-appearance: none;
		-webkit-appearance: none;
		background: url(../../static/images/img/icon/xiajiantou.png) no-repeat scroll right center transparent;
		padding-right: 0.218rem;
	}

	.bindyh_btn_box {
		width: 100% ;
		display: flex;
		height: 1.31rem;
	}

	.bindyh_btn_box .bindyh_bind__btn,
	.bindyh_btn_box .bindyh_cancel_btn {
		color: #fff;
		flex: 1;
	}
    .bindyh_cancel_btn{
    	background: #ccc;
    }
	.bindyh_bind__btn {
		background: #edac0c;
	}

	.bindyinhang form span {
		display: inline-block;
		text-align: right;
		width: 3.6rem;
		margin-right: 0.23rem;
	}

	.bindyh_hint {
		margin-left: 3.8rem;
		/*font-size: 8px;*/
	}

	.bindyinhang span div {
		display: inline-block;
	}
</style>
