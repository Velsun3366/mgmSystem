import store from "../store";
import { Directive, DirectiveBinding } from "vue";


// 根据用户设置权限
const directives: {
  [key: string]: Directive<any, any>;
} = {
  permission: {
    mounted(el: any, binding: DirectiveBinding<any>) {
      if (store.getters.MenusWithName.indexOf(binding.value) === -1) {
        el.remove();
      }
    },
  },
};
export default directives;
