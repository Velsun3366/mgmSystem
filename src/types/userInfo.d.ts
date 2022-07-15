interface State {
  userInfo: userInfo;
}
interface userInfo {
  menus: MenuObjType[];
  username: string;
}
interface MenuObjType {
  parentId: number;
  id: number;
  name: string;
  children?: MenuObjType[];
}
interface newMenuType {
  [key: number]: MenuObjType;
}
