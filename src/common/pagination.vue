<template>
<div>
      <div class="page"  >
        <div class="pagelist">
        	<span   >共{{countAll}}条</span>
          <span class="jump"  @click="subPage"  ref="prev"><</span>
          <span class="jump"  >{{currentPage}}</span>
          <span  class="jump" @click="addPage" ref="next">></span>
          <span class="jumppoint">跳转到：</span>
          <span class="jumpinp"><input type="number" v-model="changePage" @input="aaa" ></span>
          <span class="jump" @click="jumpPage(changePage)">GO</span>
        </div>
      </div>
    </div>
</template>
<script>
	import  {bus}  from '../bus.js'
	export default {
		   created(){
		   	bus.$on('page', () => {
                   this.currentPage = 1
              })
		   },
       props:{
          countAll:Number,
          pages:Number,
        },
      data(){
      	return {
      	currentPage:1,
        changePage:'',
      	}
      },

      methods: {
      aaa(e){
      	let reg=/^[1-9]\d*$/;
        if(!reg.test(e.target.value)){
      		this.changePage="";
      	}

      },
        jumpPage(id){
        	if(this.changePage==""){
        		return false;
        	}else{
        		if(id<this.pages){
          this.currentPage = id;
          this.$emit('index',this.currentPage*1);

         }else{
         	id=this.pages;
         	this.changePage=id;
         	this.currentPage = id;
          this.$emit('index',this.currentPage*1);
         }
        	}


        },
        addPage: function(){
        	if(this.currentPage*1>=this.pages*1){
            this.currentPage=this.pages*1;
        	}else{
        		this.currentPage++
        	}
        this.$emit('index',this.currentPage*1);
      },
      subPage: function(){
      	if(this.currentPage<=1){
      		this.currentPage=1
      	}else{
      		this.currentPage--;

      	}
        this.$emit('index',this.currentPage*1);
      },
      },
  }
</script>

<style>
	.page {
      font-weight: 900;
      width: 100%;
      height: 1rem;
      text-align: center;
      color: #888;
      margin:  auto ;
      background: #f2f2f2;
    }

    .pagelist {
      background: #fff;
      /*height: 1.6rem;*/
      line-height: 1rem;
    }
  .pagelist .jump {
      border: 1px solid #ccc;
      padding: 0.2rem 0.2rem;
      -webkit-border-radius: 0.2rem;
      -moz-border-radius: 0.2rem;
      border-radius: 0.2rem;
      cursor: pointer;
      margin-left: 0.2rem;
    }
    .jumpinp input {
      width: 1rem;
      height: 0.8rem;
      border: 1px solid #ccc;
      -webkit-border-radius:0.2rem;
      -moz-border-radius: 0.2rem;
      border-radius: 0.2rem;
      text-align: center;
    }


</style>
