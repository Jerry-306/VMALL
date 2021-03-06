import Vue from 'vue';
import VueRouter from 'vue-router'; // 引入路由插件
import Routers from './router.js';  // 引入路由列表
import Vuex from 'vuex';            // 引入状态管理插件
import App from './app.vue';
import './style.css';

import product_data from './product';

Vue.use(VueRouter);  // 使用路由插件
Vue.use(Vuex);       // 使用状态管理插件

// 路由配置
const RouterConfig = {
    // 使用 HTML5 的 History 路由模式
    mode: 'history',
    routes: Routers
};
const router = new VueRouter(RouterConfig);

// 将页面标题改为即将导航的页面的标题
router.beforeEach((to, from, next) => {
    window.document.title = to.meta.title;
    next();
});

// 滚动条回到新页面顶部
router.afterEach((to, from, next) => {
    window.scrollTo(0, 0);
});

// 数组排重
function getFilterArray (array) {
    const res = [];
    const json = {};
    for (let i = 0; i < array.length; i++){
        const _self = array[i];
        if(!json[_self]){
            res.push(_self);
            json[_self] = 1;
        }
    }
    return res;
}

// 状态管理配置
const store = new Vuex.Store({
    state: {
        productList: [],
        cartList: []
    },
    getters: {
        // 获取商品类别
        brands: state => {
            const brands = state.productList.map(item => item.brand);
            return getFilterArray(brands);
        },
        // 获取商品颜色
        colors: state => {
            const colors = state.productList.map(item => item.color);
            return getFilterArray(colors);
        }
    },
    mutations: {
        // 添加商品列表
        setProductList (state, data) {
            state.productList = data;
        },
        // 添加到购物车
        addCart (state, id) {
            // 先判断购物车是否已有，如果有，数量+1
            const isAdded = state.cartList.find(item => item.id === id);
            if (isAdded) {
                isAdded.count ++;
            } else {
                state.cartList.push({
                    id: id,
                    count: 1
                })
            }
        },
        // 修改商品数量
        editCartCount (state, payload) {
            const product = state.cartList.find(item => item.id === payload.id);
            product.count += payload.count;
        },
        // 删除商品
        deleteCart (state, id) {
            const index = state.cartList.findIndex(item => item.id === id);
            state.cartList.splice(index, 1);
        },
        // 清空购物车
        emptyCart (state) {
            state.cartList = [];
        }
    },
    actions: {
        // 请求商品列表
        getProductList (context) {
            // 真实环境通过 ajax 获取，这里用异步模拟
            setTimeout(() => {
                context.commit('setProductList', product_data);
            }, 500);
        },
        // 购买
        buy (context) {
            // 真实环境应通过 Ajax 提交购买请求后再清空购物列表
            return new Promise(resolve=> {
                setTimeout(() => {
                    context.commit('emptyCart');
                    resolve();
                }, 500)
            });
        }
    }
});

new Vue({
    el: '#app',
    router: router,
    store: store,
    render: h => {
        return h(App)
    }
});