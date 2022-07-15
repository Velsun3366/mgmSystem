const state = {
  menus: [],
  username: "",
};
const getters = {
  getNewMenus(state: userInfo) {
    let newMenus: newMenuType = {};
    for (let i = 0; i < state.menus.length; i++) {
      //   一级菜单
      if (state.menus[i].parentId === 0) {
        let key = state.menus[i].id;
        let value = state.menus[i];
        //  避免覆盖
        newMenus[key] = { ...value, children: newMenus[key]?.children || [] };
      } else {
        // 二级菜单
        let id = state.menus[i].parentId;

        //   后端返回数据可能顺序不同
        newMenus[id] = newMenus[id] || {};
        newMenus[id].children = newMenus[id].children || [];
        newMenus[id].children!.push(state.menus[i]);
      }
    }
    //   console.log(newMenus);

    return newMenus;
  },
  MenusWithName(state:userInfo) {
    return state.menus.map((item) => item.name);
  },
};
const mutations = {
  updateMenus(state: userInfo, payload: userInfo) {
    state.menus = payload.menus;
    state.username = payload.username;
    // console.log(payload.username);
  },
};
const actions = {};
export default {
  namespace: true,
  state,
  getters,
  mutations,
  actions,
};
