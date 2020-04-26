import { observable, action } from "mobx";
import BaseStore from "./BaseStore";


let headerMenu =
{
  id:1,
  name:"headerMenu",
  url:"/home",
  level:0,
  childrenList: [
    {id:1,name: "直播管理",url:"/public/config",level:1},
    {id:2,name: "用户管理",url:"/public/config",level:1},
    {id:3,name: "配置",url:"/public/config",level:1},
  ]
}


let sidebarMenu =
{
  id:1,
  url:"/home",
  level:0,
  name:"headerMenu",
  childrenList: [
    {id:1,name: "直播间",url:"/public/config",level:1,childrenList:[
      {id:1,name: "直播列表",url:"/public/config",level:2},
      {id:2,name: "直播对话",url:"/public/config",level:2},
    ]},
    {id:2,name: "通用维护",url:"/public/config",level:1,childrenList:[
      {id:1,name: "类型维护",url:"/public/config",level:2},
      {id:2,name: "审核",url:"/public/config",level:2},
    ]},
   
  ]
}

class MenuStore extends BaseStore{
 
  @observable userId = sessionStorage.getItem("userId");
  @observable username = sessionStorage.getItem("username") || "jack";
  @observable password = "123456";

  constructor() {
    super('auth');
    //this.api = api;
    //this.appStore = appStore;
  }

  @action setUsername(username) {
    this.username = username;
  }

  @action setPassword(password) {
    this.password = password;
  }

  @action login() {
   
  }
  getHeaderMenuData(){
    
  }
  
}

export default MenuStore;
