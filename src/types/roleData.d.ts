// 用户角色管理列表响应类型
interface roleListData {
    name: string;
    id: number;
    
  }
  // 编辑用户全局类型 
  interface editInfo {
    username: string;
    nickName: string;
    email: string;
    password: string;
    status: number;
    note: string;
    id:number;
  }