import Vue from 'vue';
import Router from 'vue-router';

import Container from '@/components/container.vue'
// import Irecord from '@/components/InvestmentRecord.vue'
// import BuyColourBasket from '@/components/BuyColourBasket.vue'
// import onlineCharge from '@/components/onlineCharge.vue'
// import CompanyIncome from '@/components/companyIncome.vue'


Vue.use(Router);

export default new Router({
  mode:'history',
  routes: [
    {
      //根路由
      path: '/',
      redirect: '/home'
    },
    {
      //M5主页
      path: '/home',
      name: 'container',
      component: Container,
      meta:{slide:true}
    },
    {
      //个人中心
      path: '/person',
      name: 'person',
      component: resolve => require(['@/components/person.vue'], resolve),//懒加载
      meta:{slide:true}
    },
    {
      //投注记录
      path: '/Irecord',
      name: 'Irecord',
      component: resolve => require(['@/components/InvestmentRecord.vue'], resolve),
      meta:{slide:true}
    },
    {
      //优惠活动
      path: '/activity',
      name: 'activity',
      component: resolve => require(['@/components/activity.vue'], resolve),
      meta:{slide:true,alive: true}
    },
    {//开奖记录
      path: '/award',
      name: 'award',
      component: resolve => require(['@/components/kaijiangjilu.vue'], resolve),
      meta:{slide:true,alive: true}
    },
    {
      path:'/lotteryHistory',
      name:"lotteryHistory",
      component: resolve => require(['@/components/LotteryHistory.vue'], resolve),
    },
    {//登入
      path: '/login',
      name: 'login',
      component: resolve => require(['@/components/Login.vue'], resolve),
    },
    {
      //注册页
      path: '/register',
      name: 'register',
      component: resolve => require(['@/components/Register.vue'], resolve),
    },
    {
      //注册页
      path: '/register/:id',
      name: 'register',
      component: resolve => require(['@/components/Register.vue'], resolve),
    },

    {
      //彩票报表页
      path: '/lotteryReport',
      name: 'lotteryReport',
      component: resolve => require(['@/components/LotteryReport.vue'], resolve),
      meta:{alive: true,isBack:false}
    },
    {
      //转点下级
      path: '/change',
      name: 'change',
      component: resolve => require(['@/components/Change.vue'], resolve),
    },
     {//登入记录
    	path:'/enterjilu',
    	name:'enterjilu',
    	component: resolve => require(['@/components/enterjilu.vue'], resolve),
    },
     {//安全中心
    	path:'/security',
    	name:'security',
    	component: resolve => require(['@/components/security.vue'], resolve),
    },
    {//推广链接
    	path:'/tuiguanglink',
    	name:'tuiguanglink',
    	component: resolve => require(['@/components/tuiguanglink.vue'], resolve),
    },
    {
    	//银行卡
    	path:'/bindyinhang',
    	name:'bindyinhang',
    	component: resolve => require(['@/components/bindyinhang.vue'], resolve),
    },
    {
      //
    	path:'/administration',
    	name:'administration',
    	component: resolve => require(['@/components/administration.vue'], resolve),
    },
    {
      //
      path:'/cashflowRecord',
      name:'cashflowRecord',
      component: resolve => require(['@/components/CashflowRecord.vue'], resolve),
    },
    {
      //投注大厅_选号
      path:'/bettingHall',
      name:'bettingHall',
      component: resolve => require(['@/components/BettingHall.vue'], resolve),

    },
    {
      //购彩篮
      path:'/BuyColourBasket',
      name:'BuyColourBasket',
      component: resolve => require(['@/components/BuyColourBasket.vue'], resolve),
    },
    {
      //会员代理
      path:'/proxyMember',
      name:'proxyMember',
      component: resolve => require(['@/components/ProxyMember.vue'], resolve),
      meta:{alive: true,isBack:false}
    },
    {
      //新增会员
      path:'/newMember',
      name:'newMember',
      component: resolve => require(['@/components/NewMember.vue'], resolve),
      meta:{alive: true}
    },
    {
      // 账号详情
      path:'/accountDetails',
      name:'accountDetails',
      component: resolve => require(['@/components/AccountDetails.vue'], resolve),
    },
    {
      //在线充值
      path:'/charge',
      name:'charge',
      component: resolve => require(['@/components/onlineCharge.vue'], resolve),
      children:[
         {
           path:'/',
           redirect:'/charge/companyIncome',
         },
        {//公司入款
          path:'/charge/companyIncome',
             name:'companyIncome',
          component:resolve => require(['@/components/companyIncome.vue'], resolve),
          children:[
            {
              path:'/',
              redirect:'/charge/companyIncome/bankPay',
            },
            {//银行卡转账
              path:'bankPay',
              name:'bankPay',
              component: resolve => require(['@/components/bank.vue'], resolve),
            },
            {//微信转账
              path:'wxTransfer',
              name:'wxTransfer',
              component: resolve => require(['@/components/wxTransfer.vue'], resolve),
            },
            {
              path:'alipayTransfer',
              name:'alipayTransfer',
              component: resolve => require(['@/components/alipayTransfer.vue'], resolve),
            },
            {
              path:'qqTransfer',
              name:'qqTransfer',
              component: resolve => require(['@/components/qqTransfer.vue'], resolve),
            }
          ]
        },
        {//快捷支付
          path:'shortPay',
             name:'shortPay',
          component: resolve => require(['@/components/shortPay.vue'], resolve),
          children:[
            {
              path:'/',
              redirect:'qqPay'
            },
            {
              path:'qqPay',
              name:'qqPay',
              component: resolve => require(['@/components/qqPay.vue'], resolve),
            },
            {
              path:'wxPay',
              name:'wxPay',
              component: resolve => require(['@/components/wxPay.vue'], resolve),
            },
            {
              path:'aliPay',
              name:'aliPay',
              component: resolve => require(['@/components/alipay.vue'], resolve),
        }
          ]
        },
        {//付款界面
          path:'payment',
          name:'payment',
          component: resolve => require(['@/components/payment.vue'], resolve),
        }
      ]
    },
    {
      path:'/withdraw',
      name:'withdraw',
      component: resolve => require(['@/components/withdraw.vue'], resolve),
    },
    {
      path:'/dataBind',
      name:'dataBind',
      component: resolve => require(['@/common/dataBind.vue'], resolve),
    },
    {
      //常见问题
      path:'/question',
      // name:'question',
      component: resolve => require(['@/components/questions.vue'], resolve),
      children:[
        {
          path:'/',
          redirect:'answer/0'
        },
        {
          path:'answer/:type',
          component: resolve => require(['@/components/answer.vue'], resolve),
        },
      ]
    },
    {
      //个人报表
      path:'/personalReport',
      name:'personalReport',
      component: resolve => require(['@/components/personalReport.vue'], resolve),
      meta:{keepAlive: true,isBack:false}
    },
    {
      path:'/personReportAll',
      name:'personReportAll',
      component:resolve => require(['@/components/personReportAll.vue'], resolve),
  },
    {
      path:'/accountReport',
      name:'accountReport',
      component:resolve => require(['@/components/accountReport.vue'], resolve),
    },
    {
      path:'/bank',
      name:'bank',
      component: resolve => require(['@/common/bank.vue'], resolve),
    },
    //智能追号
    {
    	path:"/LintelligentChase",
    	name:"LintelligentChase",
    	component:resolve => require(['@/components/lintelligentChase.vue'], resolve),
    },
    {
      path:"/announcement",
      name:"announcement",
      component:resolve => require(['@/common/Announcement.vue'], resolve),
    },
    {
      path:"/sport",
      name:"sport",
      component:resolve => require(['@/components/sport.vue'], resolve),
    },
    {
      path:"/sportPei",
      name:"sportPei",
      component:resolve => require(['@/components/sportPei.vue'], resolve),
    }

  ]
})
