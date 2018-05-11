<template>
	<div class="zhuihao_header">
		距 <span v-text="winsDragonList==null?null:awarPeriod">
		</span>期截止： <b>{{content}}</b>
	</div>
</template>

<script>
	import  {bus}  from '../bus.js'
	var timed = null
	export default {
		created(){
			
			this.timeLeft(this.kindId)
		},
		destroyed () {
              clearInterval(timed)
              },
		data(){
			return{
				content:"",
				time:60
			}
			
		},
	props:{
          winsDragonList:Object,
          kindId:String,
          awarPeriod:String
        },
        methods:{
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
						that.getTime()
						t = that.time;
                        bus.$emit("update")
					}
				}, 1000);
			},
			timeLeft() {
				let that = this;
				that.$axios.get('/inter/ticket/timeLeft/' + that.$route.query.classId).then(function(data) {
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
        }
       }
</script>

<style>

</style>