<template>
	<div style="width:7.34rem;height:9.2rem;z-index: 10003;color: #000;position: absolute;left: 50%;top: 50%;background: #fff;margin-top: -4.6rem;margin-left: -3.67rem;"  class="chaseAlert">
		<div class="change_zh">
    <div class="change_zh_container">
    	<div style="display: flex;justify-content: space-around;height: 1rem;font-size: 14px;align-items: center;">
    	<div>
    		<input type="radio" name="2" @click="show=false" checked="checked" style="width: 0.5rem;height: 0.5rem;"/><span>常规追号</span>
    	</div>
    	<div>
    		<input type="radio" name="2" @click="show=true" :disabled="!db" style="width: 0.5rem;height: 0.5rem;"/><span :style="!db?{'color':'#ddd'}:''">高级追号</span>
    	</div>
    	</div>
    	<!--
        	高级追号
        -->
    	<div v-if="show">
        <div class="jxzh">
        <div class="xx">连续追号</div>
        <div class="box" >
            <button id="left" @click="num--">－</button>
            <input type="text" v-model="num" class="center" @blur="verification" />
            <button id="right" @click="num++">＋</button>
        </div>
        <div class="xx">期</div>
    </div>
        <div class="jxzh">
        <div class="xx">起始倍数</div>
        <div class="box">
            <button id="left" @click="times--">－</button>
            <input type="text" v-model="times" class="center" @blur="verification1"/>
            <button id="right" @click="times++">＋</button>
        </div>

    </div>
    <div class="jxzh">
        <div class="xx">已经投入</div>
        <div class="box">
            <button id="left" @click="PrePay--">－</button>
            <input type="text" v-model="PrePay" class="center" @blur="verification2"/>
            <button id="right" @click="PrePay++">＋</button>
        </div>

    </div>
        <div class="jxzh_b" >
            <input type="radio" class="check" name="1" checked="checked" @click="chaseWinType=1"> <span>最低盈利率</span> <input type="text" v-model="chaseMinPercent" class="inp" @blur="onChaseMinPercent"  /><span>%</span>
        </div>
        <div class="jxzh_b" style="height: auto;">
            <input type="radio" class="check" name="1" @click="chaseWinType=2"> 前 <input type="text" v-model="chaseBeforePeriod" class="inp" @blur="verification3"> 期盈利率 <input type="text" v-model="chaseBeforePercent" @blur="onChaseBeforePercent" class="inp" />%
            <br /><span style="margin-left: 0.6rem;">之后盈利率</span><input type="text" v-model="chaseAfterPercent" class="inp" @blur="onChaseAfterPercent">%
        </div>
        <div class="jxzh_b">
            <input type="radio" name="1" class="check" @click="chaseWinType=3"> 最低盈利 <input type="text" v-model="chaseMinNumber" @blur="verification4" class="inp"> 元
        </div>
        <div class="jxzh_aa">中奖后停止追号 <input type="checkbox" @click="chaseStop=!chaseStop" :checked="chaseStop"></div>
    </div>

    <div v-if="!show">
        <div class="jxzh">
        <div class="xx">连续追号</div>
        <div class="box" >
            <button id="left" @click="num--">－</button>
            <input type="text" v-model="num" class="center"  @blur="verification" />
            <button id="right" @click="num++">＋</button>
        </div>
        <div class="xx">期</div>
    </div>

        <div class="jxzh">
        <div class="xx">起始倍数</div>
        <div class="box">
            <button id="left" @click="times--">－</button>
            <input type="text" v-model="times" class="center" @blur="verification1"  />
            <button id="right" @click="times++">＋</button>
        </div>

    </div>
    <div class="jxzh_aa"><span>中奖后停止追号 </span><input type="checkbox" @click="chaseStop=!chaseStop" :checked="chaseStop"></div>
    </div>

    </div>
    <div class="change_zh_footer">
        <button @click="cancel">取消</button>
        <button @click="goChase">生成方案</button>
    </div>
    </div>
</div>
</template>

<script>
	export default{
		data(){
			return{
				num:10,
				times:1,
				show:false,
				confirmBetType:2,
				chaseWinType:1,
				chaseMinNumber:30,
				PrePay:0,
				chaseMinPercent:30,
				chaseBeforePeriod:5,
				chaseBeforePercent:50,
				chaseAfterPercent:20,
				chaseStop:true,
				db:false
			}
		},
		created(){
			if(sessionStorageGet("list").length==1){
				this.db = true
			}
		},
		methods:{
			onChaseMinPercent(){
			  this.chaseMinPercent==""? this.chaseMinPercent=1:"";
			  this.chaseMinPercent = this.chaseMinPercent.replace(/[^\d.]/g,"");
              this.chaseMinPercent =this.chaseMinPercent.replace(/^\./g,"");
              this.chaseMinPercent = this.chaseMinPercent.replace(/\.{2,}/g,".");
              this.chaseMinPercent = this.chaseMinPercent.replace(".","$#$").replace(/\./g,"").replace("$#$",".");
			},
			onChaseBeforePercent(){
				this.chaseBeforePercent==""?this.chaseBeforePercent=1:"";
			  this.chaseBeforePercent = this.chaseBeforePercent.replace(/[^\d.]/g,"");
              this.chaseBeforePercent =this.chaseBeforePercent.replace(/^\./g,"");
              this.chaseBeforePercent = this.chaseBeforePercent.replace(/\.{2,}/g,".");
              this.chaseBeforePercent = this.chaseBeforePercent.replace(".","$#$").replace(/\./g,"").replace("$#$",".");
			},
			onChaseAfterPercent(){
			  this.chaseAfterPercent==""?this.chaseAfterPercent=1:"";
			  this.chaseAfterPercent = this.chaseAfterPercent.replace(/[^\d.]/g,"");
              this.chaseAfterPercent =this.chaseAfterPercent.replace(/^\./g,"");
              this.chaseAfterPercent = this.chaseAfterPercent.replace(/\.{2,}/g,".");
              this.chaseAfterPercent = this.chaseAfterPercent.replace(".","$#$").replace(/\./g,"").replace("$#$",".");
			},
			cancel(){
				this.$emit("cancel",false)
			},
			verification() {
				let periodNoAll = sessionStorageGet("list")[0].gameType.periodNoAll
				console.log(periodNoAll)
				let reg = /^[1-9]\d*$/
				if(!reg.test(this.num)) {
					this.num = 1
				}else if(!reg.test(this.num)) {
					this.num = 1
				}else if(this.num>periodNoAll){
					this.num =periodNoAll
				}
			},
			verification1(){
				let reg = /^[1-9]\d*$/
				if(!reg.test(this.times)) {
					this.times = 1
				}else if(this.times>10000){
					this.times=10000
				}
			},
			verification2(){
				let reg = /^[1-9]\d*$/
				if(!reg.test(this.PrePay)) {
					this.PrePay = 1
				}else if(this.PrePay>10000){
					this.PrePay=10000
				}
			},
			verification3(){
				let reg = /^[1-9]\d*$/
				if(!reg.test(this.chaseBeforePeriod)) {
					this.chaseBeforePeriod = 1
				}else if(this.chaseBeforePeriod>this.num){
					this.chaseBeforePeriod=this.num
				}
			},
			verification4(){
				let reg = /^[1-9]\d*$/
				if(!reg.test(this.chaseMinNumber)) {
					this.chaseMinNumber = 1
				}else if(this.chaseMinNumber>10000){
					this.chaseMinNumber=10000
				}
			},
			goChase(){
				if(!this.show){
				var confirmBetFields = {
					chasePeriods:this.num,
					chaseTimes:this.times,
					confirmBetType:this.confirmBetType,
					chaseStop:this.chaseStop,
				}
				}else{
				var confirmBetFields = {
					chasePeriods:this.num,
					chaseTimes:this.times,
					confirmBetType:this.confirmBetType,
					chaseMinNumber:this.chaseMinNumber,
					chasePrePay:this.PrePay,
					chaseStop:this.chaseStop,
					chaseWinType:this.chaseWinType,
					chaseAfterPercent:this.chaseAfterPercent,
					chaseBeforePercent:this.chaseBeforePercent,
					chaseBeforePeriod:this.chaseBeforePeriod,
					chaseMinPercent:this.chaseMinPercent,
				}
				}
//				console.log(confirmBetFields)
				this.$emit("goChase",confirmBetFields)
			}
		},
		watch:{
			num(newNum,oldNum){
				let periodNoAll = sessionStorageGet("list")[0].gameType.periodNoAll
				
				if(this.num>periodNoAll){
					this.num =periodNoAll
				}

			},
			times(newTimes,oldTimes){
				
			},
			PrePay(newPrePay,oldPrePay){
			},
			chaseBeforePeriod(newValue,oldValue){
//				let reg = /^[1-9]\d*$/
//				if(newValue<1){
//					this.chaseBeforePeriod=1
//				}else if(!reg.test(this.chaseBeforePeriod)) {
//					this.chaseBeforePeriod = oldValue
//				}
			},
			chaseMinNumber(newValue,oldValue){
//				let reg = /^[1-9]\d*$/
//				if(newValue<1){
//					this.chaseMinNumber=1
//				}else if(!reg.test(this.chaseMinNumber)) {
//					this.chaseMinNumber = oldValue
//				}
			},
			show(newBet){
				newBet?this.confirmBetType=3:this.confirmBetType=2;
			}
		}
	}
</script>

<style>
	.jxzh_b{
		margin-bottom: 0.1rem;

	}
	     .jxzh_b .check{
	     	width: 0.5rem;
	     	height: 0.5rem;
	     }
	     .jxzh_b input{
	     	width: 1rem;
	     	height: 0.5rem;
	     	text-align: center;
	     }
        .change_zh{width: 7.34rem;height: 9.2rem;background-color: #f8f8f8;margin: auto;}
       .chaseAlert .box{
            width: 3rem;
            height: 0.6rem;
            float: left;
            margin: 0 0.2rem 0 0.2rem;
        }
        .box button{
            border: 0;
            outline: none;
        }
       .chaseAlert .left,.chaseAlert .center,.chaseAlert .right{
            float: left;
            width: 1rem;
            height: 1rem;
            line-height: 1rem;
            text-align: center;
            background: #fff;
            font-weight: bold;
        }
        .chaseAlert .inp{
        	background: #dddddd;
        }
        #center{
            width: 1rem;
            background: #fff;
            cursor: auto;
        }
        #right{
            float: right;
        }
        .change_zh_container{
            width:6.4rem ;
            height: 8rem;
            margin: auto;
        }
        .jxzh{
            width: 6.4rem;
            height: 1rem;
            margin-bottom: 0.1rem;
        }
        .xx{
            float: left;
            line-height: 1rem;
        }
        .change_zh_footer{
            width: 6.4rem;
            height: 1rem;
            margin: auto;
        }
        .change_zh_footer button{
            width: 3.2rem;
            height: 1rem;
            float: left;
            border: 0;
            background: #ccc;
            outline: none;
        }
        .change_zh_footer button:nth-child(2){
            background-color: #edac0c;
        }
        .change_zh_container h4{
            padding-top: 0.2rem;
        }
        /*.change_zh_container input{
            width: 1rem;
            height: 0.3rem;
        }*/
       .jxzh input{

       	background: #fff;
       }
        .jxzh_aa{
            width: 6.4rem;
            height: 1rem;
            text-align: center;
            line-height:100%;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .jxzh_aa input{
            height: 0.5rem;

        }

</style>
