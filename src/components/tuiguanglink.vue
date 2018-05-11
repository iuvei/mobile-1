<template>
	<div class="tglink_tuiguang">
		<mt-header title="推广链接" style="background-image: linear-gradient(to bottom,#494c56,#1e2027 );position: fixed;top: 0;left:0 ;width: 100%;height: 1.125rem;">

    <mt-button icon="back" slot="left" @click="goback">返回</mt-button>

</mt-header>
<div class="tglink_tg_form">
			<p style="font-size: 0.4rem;"><b style="color: grey">推广链接:</b></p>
			<div class="box_div">
				<div class="left_div">
					<a style="font-size:14px;display:inline-block;height:auto;text-overflow:ellipsis;width:5.56rem;overflow: hidden;color:blue;text-decoration:underline;" id="url_txt"  readonly="readonly" @click="goRegister" >{{promoteUrl}}</a>
					<p style="font-size: 0.3rem;">(可复制到新浪短地址或parcg.co获取短链接)</p>
				</div>
				<!--<mt-button type="primary" style="width: 1.93rem;height:0.90rem;background: #edac0c;font-size: 14px;border-radius: 2px;" @click="CopyUrl">复制</mt-button>-->

			</div>
			 <!--<div style="margin-top: 0.625rem;font-size: 0.4rem;">
				<span>短地址:</span>
				<mt-button type="primary" style="width: 3.828rem;height: 0.90rem;background: #edac0c;font-size: 0.4rem;border-radius: 2px" @click="OneTouch">一键生成短连接</mt-button>
			</div>-->
			<div style="margin-top: 0.625rem; font-size: 0.4rem;">
				<span>是否有代理功能:</span>
				<input type="radio" name="radio1" class="radio radio_left" :checked="hierarchy==1" value="1" />是
				<input type="radio"  name="radio1" class="radio radio_right" :checked="hierarchy==0"  value="0" />否
			</div>
			<div style="margin:0.625rem 0;">
				<span>已成功推荐人数:</span>
				<span>{{dataList.successNumber==null?0:dataList.successNumber}}人</span>
			</div>
			<div>
				<ul style="font-size: 0.4rem;">
					<li style="margin-bottom: 0.34rem;" v-for="(item,index) in dataList.childRebateList">
						<span class="tglink_datalist">
							下级{{item.lotteryClassName}}返水(%)&nbsp;:&nbsp;</span>
							<select style="color: #000000;" class="tglink_apper" :ref="nameList[index]">
								<option v-for="idx in (item.rebatePoint-item.minRebatePoint)*10+1" style="color: #000000;"
                        :selected="Math.round(parseFloat(item.rebatePoint-(idx-1)*0.1) * 10) / 10==item.childRebatePoint">
                  {{Math.round(parseFloat(item.rebatePoint-(idx-1)*0.1) * 10) / 10}}</option>
							</select>

							<!--<input  type="number" :value="item.childRebatePoint==null?0:item.childRebatePoint" :max="item.rebatePoint" @blur="onkeyup(item.minRebatePoint)" " />-->
							上限{{item.rebatePoint==null?0:item.rebatePoint }}%

					</li><br />
					<!--<li style="margin-bottom: 0.34rem;">
						<span class="tglink_datalist">下级时时彩返水(%)&nbsp;:&nbsp;</span><input class="tglink_apper" type="number" :value="dataList.sscRebetMax==null?0:dataList.sscRebetMax" :max="dataList.sscRebetMax" @blur="onkeyup" ref="sscRebet_inp" />上限{{dataList.sscRebetMax==null?0:dataList.sscRebetMax }}%

					</li>
					<li style="margin-bottom: 0.34rem;">
						<span class="tglink_datalist">下级赛车彩返水(%)&nbsp;:&nbsp;</span><input class="tglink_apper" type="number" :value="dataList.scRebetMax==null?0:dataList.scRebetMax" :max="dataList.scRebetMax" @blur="onkeyup" ref="scRebet_inp" />上限{{dataList.scRebetMax==null?0:dataList.scRebetMax }}%

					</li>
					<li style="margin-bottom: 0.34rem;">
						<span class="tglink_datalist">下级快3彩返水(%)&nbsp;:&nbsp;</span><input class="tglink_apper" type="number" :value="dataList.ksRebetMax==null?0:dataList.ksRebetMax" :max="dataList.ksRebetMax" @blur="onkeyup" ref="ksRebet_inp" />上限{{dataList.ksRebetMax==null?0:dataList.ksRebetMax }}%

					</li>
					<li style="margin-bottom: 0.34rem;">
						<span class="tglink_datalist">下级11选5彩返水(%)&nbsp;:&nbsp;</span><input class="tglink_apper" type="number" :value="dataList.sel5RebetMax==null?0:dataList.sel5RebetMax" :max="dataList.sel5RebetMax" @blur="onkeyup" ref="sel5Rebet_inp" />上限{{dataList.sel5RebetMax==null?0:dataList.sel5RebetMax }}%

					</li>-->

				</ul>
			</div>
		</div>
		<mt-button style="width: 100%;height: 1.34rem;color: #fff;background: #edac0c;" @click="commit">保存</mt-button>
	</div>
</template>

<script>
//	import Vue from 'vue';
	import { Header,  Toast} from 'mint-ui';
//	 Vue.component(MessageBox.name, MessageBox);
//	Vue.component(Button.name, Button);
//	Vue.component(Header.name, Header);
//	Vue.component(Radio.name, Radio);

	export default {
		data() {
			return {
				options: [{
						label: '是',
						value: '1'
					},
					{
						label: '否',
						value: '0'
					}
				],
				dataList: "",
				inpValue: "",
				hierarchy:'0',
				promoteUrl:"",
				nameList:["ftcRebet_inp","sscRebet_inp","ksRebet_inp","sel5Rebet_inp","scRebet_inp"]

			}

		},
		created() {
//			console.log(this.nameList[0])
			let that = this
			this.$axios({
				method: 'get',
				url: '/inter/user/queryPromoteUrl',
			}).then(function(data) {
       	       that.promoteUrl = data.data.data.promoteUrl
       	       that.dataList = data.data.data
               that.childRebateList = that.dataList.childRebateList
               that.hierarchy = that.dataList.childHierarchy
			}).catch(function(error) {
				console.log(error)
			})
		},
		methods: {
	      insertStr(str1,n,str2){
            if(str1.length<n){
                return str1+str2;
            }else{
               let s1 = str1.substring(0,n);
               let s2 = str1.substring(n,str1.length);
                return s1+str2+s2;
            }
        },
			goback(){
				sessionStorageSet('routeIndx', -1)
				this.$router.back()
			},
			goRegister(){
				var str = "/register/"
				var str_after = this.promoteUrl.split(str)[1];
				this.$router.push({
					path: 'register/'+str_after

				})
			},
			CopyUrl(){
				var url2 = document.getElementById("url_txt");
//				console.log(url2)
				url2.select();
				try {
					if(document.execCommand('copy', false, null)) {
						document.execCommand("Copy");
						Toast({
							message: '已复制',
							position: 'bottom',
							duration: 2000
						});
					} else {
						Toast({
							message: '复制失败,请手动复制',
							position: 'bottom',
							duration: 2000
						});
					}
				} catch(err) {
					console.log(err)
					Toast({
						message: '复制失败,请手动复制',
						position: 'bottom',
						duration: 2000
					});
				}
			},
//			OneTouch() {
//				var url_txt = document.getElementById("url_txt").innerHTML;
//				console.log(url_txt)
//				let that = this
//				this.$axios({
//					type: 'get',
//					url: 'https://api.weibo.com/2/short_url/shorten.json',
//					params: {
//						'url_long': url_txt
//					}
//
//				}).then(function(data) {
//					console.log(data);
//
//				}).catch(function(error) {
//					console.log(error)
//				})
//
//			},
//			onkeyup(min) {
//				if(/^[0-9]+([.][0-9]{1}){0,1}$/.test(event.target.value)) {
//					if(event.target.value * 1 > event.target.max * 1) {
//				MessageBox.alert("您输入的数字不能超过上限")
////				event.target.value = event.target.max
//				}else if(event.target.value * 1 <min * 1) {
//				MessageBox.alert("您输入的数字不能低于返水下限"+min+"%")
////				event.target.value = min
//				}
//				}else{
//					MessageBox.alert("您输入的数字只能保留一位小数或不是正数")
////					event.target.value = min
//				}
//
//			},
			commit() {
				function checks() {
					let radios = document.getElementsByName("radio1");
					for(var i = 0; i < radios.length; i++) {
						if(radios[i].checked == true) {
							return radios[i].value;
						}
					}
				}
//				console.log(checks())
//            console.log(this.$refs.ftcRebet_inp[0].value)
				this.$axios({
					method: 'post',
					url: '/inter/user/savePromoteUrl',
					data: {
						childHierarchy: checks(),
						childRebateList:[
						{
						lotteryClassName:"福体彩",
						lotteryClassId:"1",
						childRebatePoint:this.$refs.ftcRebet_inp[0].value * 1
						},
//						{
//						lotteryClassName:"六合彩",
//						lotteryClassId:"2",
//						childRebatePoint:this.$refs.lhcRebet_inp[0].value * 1
//						},
						{
						lotteryClassName:"时时彩",
						lotteryClassId:"3",
						childRebatePoint:this.$refs.sscRebet_inp[0].value * 1
						},
						{
						lotteryClassName:"快三",
						lotteryClassId:"4",
						childRebatePoint:this.$refs.ksRebet_inp[0].value * 1
						},
						{
						lotteryClassName:"11选5",
						lotteryClassId:"5",
						childRebatePoint:this.$refs.sel5Rebet_inp[0].value  * 1
						},
						{
						lotteryClassName:"PK10",
						lotteryClassId:"6",
						childRebatePoint:this.$refs.scRebet_inp[0].value * 1
						}
						]
					}

				}).then(function(data) {
//					console.log(data)
					Toast(data.data.msg)
				}).catch(function(error) {
					console.log(error)
				})
			}

		}

	}
</script>

<style scoped="scoped">
  span{
    font-size: 0.4rem;
  }
	.tglink_datalist {

		display: inline-block;
		text-align: justify;
		/*text-justify: distribute-all-lines;*/
		/*-moz-text-justify: distribute-all-lines;*/
		text-align-last: justify;
		-moz-text-align-last: justify;
		width: 4.218rem;
		text-align: justify;
	}

	.tglink_tuiguang {
		color: #000;
		background: #fff;
	}

	.radio {
		margin-left: 1.25rem;
	}

	.tglink_tg_form {
		/*padding-top: 1.125rem;*/
		padding: 1.325rem 0.5rem;
	}

	.tglink_tg_form p {
		color: #000;
		font-size: 0.875rem;
	}

	.tglink_box_div {
		display: flex;
		justify-content: space-between;
	}

	.tglink_left_div p {
		line-height: 0.8rem;
		color: #000;
	}

	.tglink_apper {
		appearance: none;
		display: inline-block;
		width: 1.906rem;
		height: 0.875rem;
		border: 1px solid #c9c9c9;
		border-radius: 5px;
		padding-left: 0.375rem;
		line-height: 0.875rem;
		background: url(../../static/images/img/icon/xiajiantou.png) no-repeat scroll right center transparent;
	}

	.tglink_mint-button--normal {
		border-radius: 0;
	}
</style>
