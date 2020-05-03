import { observable, action } from "mobx";
import BaseStore from "../../common/models/BaseStore";


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
  id:2,
  url:"/home",
  level:0,
  name:"headerMenu",
  childrenList: [
    {id:11,name: "直播间",url:"/public/config",level:1,childrenList:[
      {id:112,name: "直播列表",url:"/public/config",level:2},
      {id:113,name: "直播对话",url:"/public/config",level:2},
    ]},
    {id:12,name: "通用维护",url:"/public/config",level:1,childrenList:[
      {id:121,name: "类型维护",url:"/public/config",level:2},
      {id:122,name: "审核",url:"/public/config",level:2},
    ]},
   
  ]
}

class MenuStore extends BaseStore{

  @observable dataObject= {
    headerMenus:headerMenu.childrenList,
    sidebarMenus:sidebarMenu.childrenList,
  };

  constructor() {
    super('common/menu');
  }
 
  findPathById(menuId){
     let allMenus = this.dataObject.headerMenus.concat(this.dataObject.sidebarMenus);
     let menuObj ={};
     allMenus.forEach(function(menuItem){
        if (menuItem.id == menuId){
          menuObj = menuItem;
        }
        if (menuItem.childrenList){
          menuItem.childrenList.forEach(function(menuItemData){
            if(menuItemData.id == menuId){
              menuObj = menuItemData;
            }
          });
        }
     });

     return menuObj;
  }
  
}

export default MenuStore;
