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
    currentItem :{
      id:1,
      name:"oldName",
      description:"oldDescription",
      defineText:'',
      status:-1
  },
  channels:{
    "live":"live",
    "project":"project",
    "application":"project",
    "xtable":"project",
    "xmodule":"project",
    "applicationrelease":'ci',
    "applicationpoint":'ci',
    "buildrecord":'ci',
    "pagetemplate":'component',
    "xwidget":'component',
    "config":"config",
    "public":"config",
    "dictionary":"config",
    'user' :'user',
    'info' :'info',
  },
  list:[ 
   
    {id:21,name: "持续集成管理",url:"/applicationrelease/home",level:1,type:'sider', parentId:0,channelName:"ci"},
    {id:22,name: "发布历史",url:"/buildrecord/home",level:1,type:'sider', parentId:0,channelName:"ci"},
    {id:23,name: "发布端点配置",url:"/applicationpoint/home",level:1,type:'sider', parentId:0,channelName:"ci"},

    {id:11,name: "项目管理",url:"/project/list",level:1,type:'sider', parentId:0,channelName:"project"},
    {id:12,name: "应用管理",url:"/application/home",level:1,type:'sider', parentId:0,channelName:"project"},
  
   
    {id:2,name: "应用类型管理",url:"/public/applicationtype/home",level:1,type:'sider', parentId:0,channelName:"config"},
    {id:3,name: "字典表分类配置",url:"/public/category/home",level:1,type:'sider', parentId:0,channelName:"config"},
    {id:4,name: "字典表维护",url:"/public/dictionary/home",level:1,type:'sider', parentId:0,channelName:"config"},
    {id:5,name: "用户权限配置",url:"/public/menu/home",level:1,type:'sider', parentId:0,channelName:"config"},

    {id:51,name: "页面布局组管理",url:"/pagetemplate/home",level:1,type:'sider', parentId:0,channelName:"component"},
    {id:52,name: "页面区域组件管理",url:"/xwidget/home",level:1,type:'sider', parentId:0,channelName:"component"},

    // {id:101,name: "组件仓库",url:"/xwidget/home",level:1,type:'header', parentId:0,channelName:"default"},
    // {id:102,name: "项目管理",url:"/project/list",level:1,type:'header', parentId:0,channelName:"default"},
    // {id:103,name: "应用管理",url:"/application/home",level:1,type:'header', parentId:0,channelName:"default"},
    {id:104,name: "持续集成",url:"/applicationrelease/home",level:1,type:'header', parentId:0,channelName:"default"},
    {id:105,name: "配置",url:"/public/applicationtype/home",level:1,type:'header', parentId:0,channelName:"default"},
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
    if (channel){channelName = channel;}
    return this.findByChannel(channelName,'header');
  }

  getChannelByPath(path){
    let channelName = "none";
    let arrayPath = path.split('/');
    console.log("path array is --------------:" + arrayPath);
    let moduleName = arrayPath[1];
    //console.log(moduleName);
    channelName = this.dataObject.channels[moduleName];
    //console.log(channelName);
    return channelName;
  }
  findSiderMenuItemsByPath(path){
    let channel = this.getChannelByPath(path);
    return this.findSiderMenuItems(channel);
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

