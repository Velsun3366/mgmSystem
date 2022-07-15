import instance from "./request";
import qs from "qs";
// 响应类型约束
interface ResponseData<T> {
  code: number;
  data: T;
  message: string;
  errno?:number;
}
// 登录响应数据
interface LoginRes {
  token: string;
  tokenHead: string;
}
// 用户信息响应数据
interface InfoRes {
  menus: {}[];
}
// 退货申请处理列表数据
interface ReturnApplyRes {
  list: {}[];
  pageNum: number;
  pageSize: number;
  total: number;
  totalPage: number;
}
// 登录请求体类型约束
interface LoginParams {
  password: string;
  username: string;
}
// 用户管理列表类型
interface adminListParams {
  keyword: string;
  pageNum: number;
  pageSize: number;
}
// 用户管理列表响应类型
interface adminListData {
  list: {}[];
  total: number;
}
// 用户角色管理列表响应类型
interface roleListData {
  name: string;
  id: number;
}
// 用户分配角色类型
interface updateRoleItf {
  adminId: number;
  roleIds: string;
}
type ResPromise<T> = Promise<ResponseData<T>>;
// 登录Api
export const LoginApi = (params: LoginParams): ResPromise<LoginRes> =>
  instance.post("/admin/login", params);
// 获取用户信息
export const getAdminInfoApi = (): ResPromise<InfoRes> =>
  instance.get("/admin/info");
// 获取退货订单列表
export const ReturnApplyList = (): ResPromise<ReturnApplyRes> =>
  instance.get("/returnApply/list");
// 获取用户管理列表
export const getAdminList = (
  params: adminListParams
): ResPromise<adminListData> => instance.get("/admin/list", { params });
// 获取所有用户角色管理列表
export const getRoleList = (): ResPromise<roleListData[]> =>
  instance.get("/role/listAll");
// 获取指定用户角色
export const getUserRole = (uid: number): ResPromise<roleListData[]> =>
  instance.get("/admin/role/" + uid);
// 指定用户分配角色
export const updateUserRole = (parmas: updateRoleItf): ResPromise<unknown> =>
  instance.post("/admin/role/update", qs.stringify(parmas));
// 修改指定用户信息
export const updateUserInfo = (params: editInfo): ResPromise<unknown> =>
  instance.post("/admin/update/" + params.id, params);
// 添加用户信息
export const registerUser = (params: editInfo): ResPromise<unknown> =>
  instance.post("/admin/register", params);
// 首页echarts图
export const getEchartsData = ():ResPromise<echartsData> =>
  instance.get("http://kumanxuan1.f3322.net:8360/admin/stat");
