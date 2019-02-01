import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'register',
      component: () => import('@/view/register')
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('@/view/home'),
      children: [
        {
          name: '',
          path: '',
          component: () => import('@/view/project')
        },
        {
          name: 'personnel',
          path: 'personnel',
          component: () => import('@/view/personnel')
        },
        {
          name: 'statistics',
          path:'statistics',
          component: () => import('@/view/statistics')
        },
        {
          name: 'user',
          path: 'user',
          component: () => import('@/view/user'),
          children: [
            {
              name: 'user_info',
              path: '',
              component: () => import('@/view/userInfo/info')
            },
            {
              name: 'user_account',
              path: 'account',
              component: () => import('@/view/userInfo/account')
            },
            {
              name: 'user_third',
              path: 'third',
              component: () => import('@/view/userInfo/third')
            },
            {
              name: 'user_payment',
              path: 'payment',
              component: () => import('@/view/userInfo/payment')
            }
          ]
        },
        {
          name: 'enterprise',
          path:'enterprise',
          component: () => import('@/view/enterprise'),
          children: [
            {
              name: 'enterprise_log',
              path: '',
              component: () => import('@/view/enterprise/log')
            },
            {
              name: 'enterprise_info',
              path: 'info',
              component: () => import('@/view/enterprise/info')
            },
            {
              name: 'enterprise_tag',
              path: 'tag',
              component: () => import('@/view/enterprise/tag')
            },
            {
              name: 'enterprise_power',
              path: 'power',
              component: () => import('@/view/enterprise/power')
            },
            {
              name: 'project_power',
              path: 'projectPower',
              component: () => import('@/view/enterprise/projectPower')
            }
          ]
        }
      ]
    }
  ]
})
