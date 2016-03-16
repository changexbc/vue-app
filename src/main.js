import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './views/App.vue'
import IndexView from './views/IndexView.vue'
import EditView from './views/EditView.vue'

FastClick.attach(document.body);
Vue.use(VueRouter)

const router = new VueRouter({})

router.map({
    '/': {
        name: 'index',
        component: IndexView
    },
    'edit': {
        name: 'add',
        component: EditView
    },
    'edit/:cardnum': {
        name: 'edit',
        component: EditView
    }
});
router.start(App, '#app');

// Daze.navigator.useWebNavigation && Daze.navigator.useWebNavigation({},function(){})

if (__DEV__) {
    Vue.config.debug = true // 开启调试模式
    console.log('%c开发模式～￣▽￣～','font-size:25px;color:red')
}
