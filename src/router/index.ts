import Cookies from "js-cookie";
import { App } from "vue";
import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import store from "../store";
import { getAdminInfoApi } from "../request/api";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/login",
      name: "login",
      component: () => import("../views/login/Login.vue"),
    },
  ],
});
const dynamicRoute = () => {
  let getNewMenus: newMenuType = store.getters.getNewMenus;
  for (let key in getNewMenus) {
    let newRouteObj: RouteRecordRaw = {
      path: "/" + getNewMenus[key].name,
      name: getNewMenus[key].name,
      component: () => import("../views/Home/Home.vue"),
      children: [],
    };
    if (getNewMenus[key].children) {
      for (let i = 0; i < getNewMenus[key].children!.length; i++) {
        let subRoute: RouteRecordRaw = {
          path: getNewMenus[key].children![i].name,
          name: getNewMenus[key].children![i].name,
          component: () =>
            import(
              `../views/${getNewMenus[key].name}/${
                getNewMenus[key].children![i].name
              }.vue`
            ),
        };
        newRouteObj.children!.push(subRoute);
      }
    }
    // 动态添加路由规则
    router.addRoute(newRouteObj);
    console.log(newRouteObj);
  }
  router.addRoute({
    path: "/",
    name: "home",
    component: () => import("../views/Home/Home.vue"),
    redirect: "/index",
    children: [
      {
        path: "index",
        name: "index",
        component: () => import("../views/index/index.vue"),
      },
    ],
  });
};
// 前置路由守卫
router.beforeEach((to, from, next) => {
  const token = Cookies.get("token");
  if (token && store.state.userInfo.menus.length === 0) {
    getAdminInfoApi().then((res) => {
      if (res.code == 200) {
        store.commit("updateMenus", res.data);
        // 动态添加路由规则
        // 1.获取vuex中数据
        dynamicRoute();
        next(to);
      }
    });
  } else if (!token && to.path !== "/login") {
    // 无token跳转回login
    next("/login");
  } else if (token && from.path === "/login" && to.path === "/homePage") {
    // 首次登录添加动态路由
    dynamicRoute();
    next("/");
  } else if (token && to.path === "/login") {
    // 已有登录状态不能再回登录页
    next(from);
  } else {
    next();
  }
});
export const initRouter = (app: App<Element>) => {
  app.use(router);
};
