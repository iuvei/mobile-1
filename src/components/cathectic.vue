<template>
  <div>
    <div class="header">
      <div> < 返回 </div>
      <div>重庆时时彩</div>
      <div>二星前二直选</div>
      <div>？</div>
    </div>
    <div class="lottery_num">
      <div class="lottery_num_left">
        <div>46期开奖号码</div>
        <ul>
          <li>0</li>
          <li>1</li>
          <li>2</li>
          <li>3</li>
          <li>4</li>
        </ul>
      </div>
      <div class="lottery_num_right">
        <div>距47期截至</div>
        <div class="time">08:02</div>
      </div>
    </div>
    <div class="main">
      <ul>
        <li class="main_list">
          <div class="main_list_left">万位</div>
          <div class="main_list_center">
            <ul class="main_list_left_top">
              <li>0</li>
              <li>1</li>
              <li>2</li>
              <li>3</li>
              <li>4</li>
            </ul>
            <ul class="main_list_left_button">
              <li>5</li>
              <li>6</li>
              <li>7</li>
              <li>8</li>
              <li>9</li>
            </ul>
          </div>
          <div class="main_list_right">
            <ul>
              <li>大</li>
              <li>奇</li>
              <li>全</li>
            </ul>
            <ul>
              <li>小</li>
              <li>偶</li>
              <li>清</li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
    <div class="money">
      <div class="money_left">
        <div>元</div>
        <i></i>
      </div>
      <div class="money_center">
        <span>倍数：</span>
        <ul>
          <li>-</li>
          <li>1</li>
          <li>+</li>
        </ul>
      </div>
      <div class="money_peilv">
        <div>赔率：</div>
        <div class="input"></div>
      </div>
      <div class="money_right">
        <div>10</div>
      </div>
    </div>
    <div class="foot">
      <button class="foot_left">重置</button>
      <div class="foot_center">
        <div>共选择了</div>
        <div class="foot_center_num">10</div>
        <div>注，共</div>
        <div class="foot_center_num">10</div>
        <div>元</div>
      </div>
      <button class="foot_right">添加</button>
    </div>
  </div>
</template>
<script>
  export default{

  }
</script>
<style scoped>
  .header{
    height:1.28125rem ;
    width: 100%;
    background: linear-gradient(#373a42 , #272931 , #1d2026);
    position: fixed;
    top: 0;
    color: white;
    overflow: hidden;
    padding: 0.25rem;
    box-sizing: border-box;
  }
  .header>div{
    height: 0.59375rem;
    float: left;
    line-height:0.59375rem;
    text-align: center;
  }
  .header>div:nth-child(1){
    width: 1.328rem;
  }
  .header>div:nth-child(2){
    margin-left: 0.8125rem;
    width: 2.28125rem;
  }
  .header>div:nth-child(3){
    margin-left: 0.4375rem;
    width: 2.28125rem;
    font-size: 0.34375rem;
    color: #818287;
    border: 0.0125rem solid #818287;
    border-radius: 0.1rem;
  }
  .header>div:nth-child(4){
    width: 0.5rem;
    height: 0.5rem;
    border: 0.0125rem solid white;
    border-radius: 0.5rem;
    box-sizing: border-box;
    text-align: center;
    line-height: 0.5rem;
    /*margin: 0.078rem 0 0 1.5rem;*/
    float: right;
  }

  .lottery_num{
    height:1.46785rem ;
    width: 100%;
    background: white;
    position: fixed;
    top:1.28125rem ;
  }
  .lottery_num_left{
    width: 55%;
    float: left;
    text-align: center;
    overflow: hidden;
  }
  .lottery_num_right{
    width: 45%;
    float: right;
    text-align: center;
    /*overflow: hidden;*/
  }
  .lottery_num_left>ul{
    width: 100%;
    display: flex;
    justify-content: space-around;
    padding: 0 10%;
    box-sizing: border-box;
    margin-top: 0.2343rem;
  }

  .lottery_num_left>ul>li{
    float: left;
    width: 0.5625rem;
    height: 0.5625rem;
    border-radius: 0.5625rem;
    background-color: #d2112d;
    color: #ffffff;

  }
  .time{
    width:2.09375rem ;
    height:0.625rem ;
    background-color: #282a32;
    color: #51f003;
    border-radius: 0.1rem;
    margin: 0.2343rem auto 0;
  }
  .main{
    margin-top: 2.7491rem;
  }
  .main_list{
    height:2.46875rem ;
    width: 100%;
    background: #3b3d42;
    color: white;
    padding:0 2.5%;
    box-sizing: border-box;
  }
  .main_list_center {
    float: left;
    /*width: 5.15625rem;*/
    width: 55%;
  }
  .main_list_center>ul{
    width: 100%;
    margin-top:0.25rem ;
    display: flex;
    justify-content: space-around;
  }
  .main_list_center>ul>li{
    float: left;
    width: 0.86rem;
    height: 0.86rem;
    border-radius: 0.86rem;
    text-align: center;
    line-height: 0.86rem;
  }
  .main_list_left_top>li{
    background-color: #edac0c !important;
    color: white;
  }
  .main_list_left_button>li{
    background-color: white;
    color: black;
  }
  .main_list_right{
    float: left;
    /*width: 3.28125rem;*/
    width: 35%;
  }
  .main_list_right>ul{
    display: flex;
    justify-content: space-around;
  }
  .main_list_right>ul>li{
    float: left;
    width: 0.86rem;
    height: 0.86rem;
    border: 0.0125rem solid white;
    border-radius: 0.1rem;
    text-align: center;
    line-height: 0.86rem;
    margin-top:0.25rem ;
    box-sizing: border-box;
  }
  .main_list_left{
    /*width: 0.9375rem;*/
    width: 10%;
    float: left;
    margin-top: 0.25rem;
    text-align: center;
  }
  .money{
    height: 0.78125rem;
    width: 100%;
    background-color: #818287;
    position: fixed;
    bottom: 1.328rem;
    color: white;
    padding: 0.156rem  2.5%;
    font-size: 0.34375rem;
    box-sizing: border-box;
  }
  .money_left{
    float: left;
    width: 1.0625rem;
    height: 0.47rem;
    background-color: #3b3d42;
    border-radius: 0.1rem;
    font-size: 0.34375rem;
    text-align: center;
    line-height: 0.47rem;
  }
  .money_left>div{
    float: left;
    width: 0.47rem;
    height: 0.47rem;
  }
  .money_left>i{
    float: right;
    width: 0.35rem;
    height: 0.35rem;
    background: url("../../static/images/cathectic/sanjiao.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    margin: 0.08rem 0.1rem 0 0;
  }
  .money_center{
    float: left;
    width: 3.2rem;
    height: 0.47rem;
    margin-left: 0.3rem;
  }
  .money_center>span{
    float: left;
    width: 1.2rem;
    height: 0.47rem;
    line-height: 0.47rem;
    font-size:0.34375rem;
  }
  .money_center>ul{
    width: 2rem;
    float: left;
    background-color: #3b3d42;
    border-radius: 0.47rem;
  }
  .money_center>ul>li{
    float: left;
    height: 0.47rem;
    width: 0.47rem;
    background-color: #6a6d75;
    border-radius: 0.47rem;
    text-align: center;
    line-height: 0.47rem;
  }
  .money_center>ul>li:nth-child(2){
    margin: 0 0.295rem;
    background-color: #3b3d42;
  }
  .money_center>ul>li:nth-child(3){
    float: right;
  }
  .money_peilv{
    float: left;
    width: 2rem;
    height: 0.47rem;
    margin-left: 0.25rem;
  }
  .money_peilv>div{
    float: left;
    font-size:0.34375rem;
  }
  .input{
    float: left;
    width: 0.8rem;
    height: 0.47rem;
    background-color: #3b3d42;
  }
  .money_right{
    float: right;
    height:0.6rem;
    width: 0.6rem;
    background:url("../../static/images/cathectic/shopcard.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: relative;
  }
  .money_right>div{
    position: absolute;
    width: 0.4rem;
    height: 0.4rem;
    border-radius: 0.4rem;
    text-align: center;
    line-height: 0.4rem;
    font-size: 0.25rem;
    top: 0;right: 0;
    background-color: #e74c08;
  }
  .foot{
    height: 1.328rem;
    width: 100%;
    background-color: #3b3d42;
    position: fixed;
    bottom: 0;
    padding:0.375rem 2.5% ;
    box-sizing: border-box;
    color: white;
  }
  .foot_left{
    float: left;
    background-color: #3b3d42;
  }
  .foot_right{
    float: right;
    border: 0 !important;
    background-color: #e74c08 ;
  }
  .foot>button{
    height: 0.7rem;
    width: 1.8125rem;
    border-radius: 0.1rem;
    border: 0.0125rem solid #9d9ea1;
    outline: none;
    color: white;
    box-sizing: border-box;
  }

  .foot_center{
    float: left;
    width: 4.375rem;
    margin-left: 0.625rem;
    line-height: 0.7rem;
    display: flex;
    justify-content: space-around;
  }
  .foot_center{
    float: left;
  }
  .foot_center_num{
    color: #edac0c;
  }
</style>
