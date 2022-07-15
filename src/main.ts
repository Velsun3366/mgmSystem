import { createApp } from "vue";
import App from "./App.vue";
import { initRouter } from "./router";
import { initStore } from "./store";
import directives from "./directives";

let app = createApp(App);
// 初始化路由
initRouter(app);
initStore(app);
// 自定义组件
// app.directive("permission", {
//   mounted(el, binding) {
//     console.log(el);
//     console.log(binding);
//     console.log(store.getters.MenusWithName);
//     if (store.getters.MenusWithName.indexOf(binding.value) === -1) {
//       el.remove();
//     }
//   },
// });

app.mount("#app");
for (let key in directives) {
  app.directive(key, directives[key]);
}
