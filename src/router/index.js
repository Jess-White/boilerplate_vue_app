import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

import BiosIndex from '../views/BiosIndex.vue';
import BiosEdit from '../views/BiosEdit.vue';
import BiosNew from '../views/BiosNew.vue';
import BiosShow from '../views/BiosShow.vue';

import BoilerplatesIndex from '../views/BoilerplatesIndex.vue';
import BoilerplatesEdit from '../views/BoilerplatesEdit.vue';
import BoilerplatesNew from '../views/BoilerplatesNew.vue';
import BoilerplatesShow from '../views/BoilerplatesShow.vue';

import GrantsIndex from '../views/GrantsIndex.vue';
import GrantsEdit from '../views/GrantsEdit.vue';
import GrantsNew from '../views/GrantsNew.vue';
import GrantsShow from '../views/GrantsShow.vue';

import OrganizationsIndex from '../views/OrganizationsIndex.vue';
import OrganizationsEdit from '../views/OrganizationsEdit.vue';
import OrganizationsNew from '../views/OrganizationsNew.vue';
import OrganizationsShow from '../views/OrganizationsShow.vue';

import Login from '../views/Login.vue';
import Logout from '../views/Logout.vue';
import UsersNew from '../views/UsersNew.vue';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },

  {path: '/users/new', name: 'users-new', component: UsersNew},

  {path: '/login', name: 'login', component: Login},
  {path: '/logout', name: 'logout', component: Logout},

  {path: '/', name: 'root', component: BiosIndex},
  {path: '/bios', name: 'bios-index', component: BiosIndex},
  {path: '/bios/new', name: 'bios-new', component: BiosNew},
  {path: '/bios/:id', name: 'bios-show', component: BiosShow},
  {path: '/bios/:id/edit', name: 'bios-edit', component: BiosEdit},

  {path: '/', name: 'root', component: BoilerplatesIndex},
  {path: '/boilerplates', name: 'boilerplates-index', component: BoilerplatesIndex},
  {path: '/boilerplates/new', name: 'boilerplates-new', component: BoilerplatesNew},
  {path: '/boilerplates/:id', name: 'boilerplates-show', component: BoilerplatesShow},
  {path: '/boilerplates/:id/edit', name: 'boilerplates-edit', component: BoilerplatesEdit},

  {path: '/', name: 'root', component: GrantsIndex},
  {path: '/grants', name: 'grants-index', component: GrantsIndex},
  {path: '/grants/new', name: 'grants-new', component: GrantsNew},
  {path: '/grants/:id', name: 'grants-show', component: GrantsShow},
  {path: '/grants/:id/edit', name: 'grants-edit', component: GrantsEdit},

  {path: '/', name: 'root', component: OrganizationsIndex},
  {path: '/organizations', name: 'organizations-index', component: OrganizationsIndex},
  {path: '/organizations/new', name: 'organizations-new', component: OrganizationsNew},
  {path: '/organizations/:id', name: 'organizations-show', component: OrganizationsShow},
  {path: '/organizations/:id/edit', name: 'organizations-edit', component: OrganizationsEdit}
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
