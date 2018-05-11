<template>
<div>
      <div class="page"  v-show="show">
        <div class="pagelist">
        	<span   >共10条</span>
          <span class="jump" :class="{disabled:pstart}" @click="current_page--"><</span>
          <span class="jump"  >{{current_page}}</span>
          <span :class="{disabled:pend}" class="jump" @click="current_page++">></span>
          <span class="jumppoint">跳转到：</span>
          <span class="jumpinp"><input type="text" v-model="changePage" ></span>
          <span class="jump gobtn" @click="jumpPage(changePage)">GO</span>
        </div>
      </div>
    </div>
</template>
<script>
	export default {
      data(){
      	return {
      	current_page: 1,
        pages: 10,
        changePage:'',
        nowIndex:0
      	}
      },
      computed:{
         show:function(){
             return this.pages && this.pages !=1
         },
         pstart: function() {
           return this.current_page == 1;
         },
         pend: function() {
           return this.current_page == this.pages;
         },
         efont: function() {
           if (this.pages <= 7) return false;
           return this.current_page > 5
         },
         ebehind: function() {
           if (this.pages <= 7) return false;
           var nowAy = this.indexs;
           return nowAy[nowAy.length - 1] != this.pages;
         },

       },
      methods: {
        jumpPage: function(id) {
          this.current_page = id;
        },
      }
    }
</script>

<style>
	.page {
      font-weight: 900;
      height: 50px;
      text-align: center;
      color: #888;
      /*margin: 20px auto 0;*/
      background: #f2f2f2;
    }

    .pagelist {
      font-size: 0;
      background: #fff;
      height: 50px;
      line-height: 50px;
    }

    .pagelist span {
      font-size: 14px;
    }

    .pagelist .jump {
      border: 1px solid #ccc;
      padding: 5px 8px;
       -webkit-border-radius: 4px;
       -moz-border-radius: 4px;
      border-radius: 4px;
      cursor: pointer;
      margin-left: 5px;
    }

    .pagelist .bgprimary {
      cursor: default;
      color: #fff;
      background: #337ab7;
      border-color: #337ab7;
    }

    .jumpinp input {
      width: 55px;
      height: 26px;
      font-size: 13px;
      border: 1px solid #ccc;
       -webkit-border-radius: 4px;
       -moz-border-radius: 4px;
      border-radius: 4px;
      text-align: center;
    }

    .ellipsis {
      padding: 0px 8px;
    }

    .jumppoint {
      margin-left: 30px;
    }

    .pagelist .gobtn {
      /*font-size: 12px;*/
    }

    .bgprimary {
      cursor: default;
      color: #fff;
      background: #337ab7;
      border-color: #337ab7;
    }
    .pagelist .jump.disabled{
      pointer-events: none;
      background: #ddd;
    }
</style>
