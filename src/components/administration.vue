<template>
	<div>
		<mt-header title="银行卡" style="background-image: linear-gradient(to bottom,#494c56,#1e2027 );position: fixed;top: 0;left:0 ;width: 100%;height: 1.125rem;color: #fff;">
    <mt-button icon="back" slot="left" @click="goback">返回</mt-button>
  <mt-button  slot="right" @click="addAccount">新增</mt-button>
  </mt-header>
	<div class="administration" v-if="flag">
		<div class="admin_hint_txt">
			<h2><img src="../../static/images/img/icon/tishi.png" style="vertical-align: middle;margin-right: 0.15rem;"/><b>使用提示</b></h2>
			<p>1.银行卡绑定成功后,平台任意区域都<span style="color:#ff5500 ;">不会</span>出现<br/> 您的完整银行账号,开户姓名等信息。
			</p>
			<p>2.每个游戏账户最多绑定<span>5</span>张银行卡,您已经成功绑定<span style="color: red;">{{BankAccountList.length}}</span>张。</p>
			<p>3.一个账户只能绑定同一开户人姓名的银行卡。</p>
		</div>
		<div class="admin_informationList" v-for="item in BankAccountList">
			<p><span style="color:#efb845;display: inline-block;width: 2.65rem;text-align:right ;">开&nbsp;户&nbsp;人&nbsp;:&nbsp;</span><span>{{item.bankAccountHolder}}</span></p>
			<p><span style="color:#efb845;display: inline-block;width: 2.65rem;text-align:right ">银行名称&nbsp;:&nbsp;</span><span>{{item.bankName}}</span></p>
			<p><span style="color:#efb845;display: inline-block;width: 2.65rem;text-align:right ">提现账号&nbsp;:&nbsp;</span><span>{{item.bankAccount}}</span></p>
			<p><span style="color:#efb845;display: inline-block;width: 2.65rem;text-align:right ">地<span style="color: #fff;">&nbsp;:&nbsp;&nbsp;:&nbsp;</span>址&nbsp;:&nbsp;</span><span>{{item.province+item.city}}</span></p>
		</div>

	</div>
	</div>
</template>

<script>
	
	export default {
		data() {
			return {
				BankAccountList: [],
				code: "0",
				flag: true,

			}
		},
		created() {
			let that = this
			this.$axios.get('/inter/user/memberIfBind').then(function(data) {
				that.BankAccountList = data.data.data.memberBankAccountList
				that.code = data.data.code;
//				console.log(data)
			}).catch(function(error) {
				console.log(error)
			})
		},
		methods: {
			addAccount() {
				this.$router.push({
					name: "bindyinhang",
					query:{
						code: this.code
					}
				})
			},
			goback(){
				sessionStorageSet('routeIndx', -1)
				this.$router.back()
			},

		}
	}
</script>

<style scoped="scoped">

	.administration {
		width: 100%;
		position: absolute;
		top: 1.125rem;
		overflow: auto;
		background: #f1f1f0;
		color: #000;
	}
	.administration p{
		color: #000000;
	}
  .add{
    position: fixed;
    top: 0.3rem;
    right:0.4rem;
    z-index:9999;
    background-color: #2b2d34;
    color: white;
    font-size: 0.43rem;
  }
  .im_fi{
    vertical-align: middle;
    margin-right: 0.15rem;
  }
  .span_a{
    color:#efb845;
    display: inline-block;
    width: 2.65rem;
    text-align:right ;
  }

	.administration .admin_hint_txt {
		background: #fff;
		width: 100%;
		margin-bottom: 0.1rem;
		box-sizing: content-box;
		margin-top: 0.1rem;
	}

	.administration .admin_hint_txt img {
		width: 0.54rem;
		height: 0.54rem;
	}

	.administration .admin_hint_txt h2 {
		color: #ff5500;
		/*font-size: 16px;*/
    font-size: 0.4rem;
		padding-left: 0.287rem;
		padding-top: 0.315rem;
		margin-bottom: 0.312rem;
	}

	.administration .admin_hint_txt p {
		font-size: 14px;
		padding-left: 0.98rem;
	}

	.admin_informationList {
		box-sizing: border-box;
		width: 100%;
		height: 2.968rem;
		font-size: 14px;
		background: #fff;
		margin-bottom: 0.125rem;
		padding-top: 0.513rem;
	}

	.admin_informationList p {
		line-height: 0.53rem;
	}
</style>
