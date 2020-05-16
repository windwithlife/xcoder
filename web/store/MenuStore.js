import { observable, action } from "mobx";
import BaseStore from "./BaseStore";

let composeMenuData= function(parentItem, list){
  list.forEach(function(menuItem){
    if (parentItem.id == menuItem.parentId){
       if(!parentItem.childrenList){parentItem.childrenList=[];}
       parentItem.childrenList.push(menuItem);
       composeMenuData(menuItem,list);
    }
  });

};


export default class MenuStore extends BaseStore{

  @observable dataObject= {
    headerMenus:headerMenu.childrenList,
    sidebarMenus:sidebarMenu.childrenList,
    currentItem :{
      id:1,
      name:"oldName",
      description:"oldDescription",
      defineText:'',
      status:-1
  },
  list:[ 
    {id:1,name: "菜单配置",url:"/public/menu/home",level:1,type:'sider', parentId:0,channelName:"config"},
    {id:2,name: "页面模板配置",url:"/public/menu/home",level:1,type:'sider', parentId:0,channelName:"config"},
    {id:3,name: "用户权限配置",url:"/public/menu/home",level:1,type:'sider', parentId:0,channelName:"config"},
    {id:4,name: "页面布局组管理",url:"/public/menu/home",level:1,type:'sider', parentId:0,channelName:"component"},
    {id:5,name: "页面区域组件管理",url:"/public/menu/home",level:1,type:'sider', parentId:0,channelName:"component"},
    {id:101,name: "组件仓库",url:"/public/menu/home",level:1,type:'header', parentId:0,channelName:"default"},
    {id:102,name: "项目管理",url:"/xproject/list",level:1,type:'header', parentId:0,channelName:"default"},
    {id:103,name: "应用管理",url:"/projectrelease/home",level:1,type:'header', parentId:0,channelName:"default"},
    {id:104,name: "持续集成",url:"/xrelease/home",level:1,type:'header', parentId:0,channelName:"default"},
    {id:105,name: "配置",url:"/public/personal/detail",level:1,type:'header', parentId:0,channelName:"default"},
],
  };

  constructor() {
    super('common/menu');
  }
  findByChannel(channelName,type){
    let results = [];
      this.dataObject.list.forEach(function(menuItem){
        if ((channelName == menuItem.channelName)&&(type == menuItem.type)){
           results.push(menuItem);
        }
      });
      let rootMenu =  {id:0,name: "菜单配置",url:"/public/menu/home",level:1,type:'side', parentId:-1,channelName:"root", childrenList:[]};
      composeMenuData(rootMenu, results);
      return rootMenu;
  }
  findSiderMenuItems(channel){
    return this.findByChannel(channel,'sider');
  }

  findHeadrMenuItems(channel){
    let channelName = "default";
    if (!channel){channelName = channel;}
    return this.findByChannel(channel,'header');
  }
  findPagePathById(menuId){
    let menuObj = {};
    this.dataObject.list.forEach(function(menuItem){
       if (menuId == menuItem.id){
         menuObj = menuItem;
       }
    });
    return menuObj;
  }
}

