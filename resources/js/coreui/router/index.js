import Vue from 'vue'
import Router from 'vue-router'

// Containers
import Full from '@/containers/Full'

// Views
import Dashboard from '@/views/sample/Dashboard'

// Views - Pages
import Page404 from '@/views/pages/Page404'
import Page500 from '@/views/pages/Page500'
import Login from '@/views/pages/Login'
import Register from '@/views/pages/Register'
import Home from '@/views/pages/Home'
import MainCustomer from '@/views/pages/MainCustomer'
import CustomerList from '@/views/pages/CustomerList'
import CustomerNew from '@/views/pages/CustomerNew'
import LandingPage from '@/views/pages/LandingPage'
import CustomerEdit from '@/views/pages/CustomerEdit'
import Payslip from '@/views/pages/Payslip'
import Payment from '@/views/pages/Payment'
import Employee from '@/views/pages/Employee'
// Sample route
import sample from './sample'

Vue.use(Router)

export default new Router({
  mode           : 'history',
  linkActiveClass: 'open active',
  scrollBehavior : () => ({ y: 0 }),
  routes         : [
    {
      path     : '/',
      component: LandingPage,
    },
    {
      path     : '/user/dashboard',
      redirect : '/dashboard',
      name     : 'Home',
      component: Full,
      children : [
        {
          path     : 'dashboard',
          name     : 'Dashboard',
          component: Dashboard,
        },
        ...sample,
      ],
    },
    {
      name : 'employee',
      path : '/employee',
      component : Employee
    },
    {
      path : '/payslip',
      component : Payslip
    },
    {
      path : '/payment',
      component : Payment
    },
    {
      path     : '/pages',
      redirect : '/pages/404',
      name     : 'Pages',
      component: { render (c) { return c('router-view') } },
      children : [
        {
          path     : '404',
          name     : 'Page404',
          component: Page404,
        },
        {
          path     : '500',
          name     : 'Page500',
          component: Page500,
        },
        {
          path     : 'login',
          name     : 'Login',
          component: Login,
        },
        {
          path     : 'register',
          name     : 'Register',
          component: Register,
        }
      ],
    },
    {
      path     : '*',
      name     : '404',
      component: Page404,
    },
  ],
})
