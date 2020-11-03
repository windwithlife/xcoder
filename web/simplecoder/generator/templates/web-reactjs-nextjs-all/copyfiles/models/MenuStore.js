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
    "config":"config",
    'user' :'user',
    'info' :'info',
  },
  list:[ 
   
    {id:21,name: "资讯管理",url:"/info/home",level:1,type:'sider', parentId:0,channelName:"info"},
   
    {id:11,name: "直播间",url:"/live/liveroom_home",level:1,type:'sider', parentId:0,channelName:"live"},
    {id:12,name: "直播资讯",url:"/live/home",level:1,type:'sider', parentId:0,channelName:"live"},
  

    {id:5,name: "配置",url:"/public/config/home",level:1,type:'sider', parentId:0,channelName:"config"},

    {id:51,name: "个人基本信息",url:"/user/home",level:1,type:'sider', parentId:0,channelName:"user"},
    {id:52,name: "密码与权限",url:"/account/home",level:1,type:'sider', parentId:0,channelName:"user"},

   
    {id:103,name: "资讯管理",url:"/live/info_home",level:1,type:'header', parentId:0,channelName:"default"},
    {id:104,name: "直播管理",url:"/live/liveroom_home",level:1,type:'header', parentId:0,channelName:"default"},
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
    if (channel){channelName = channel;}
    return this.findByChannel(channelName,'header');
  }

  getChannelByPath(path){
    let channelName = "none";
    let arrayPath = path.split('/');
    console.log("path array is --------------:" + arrayPath);
    let moduleName = arrayPath[1];
    channelName = this.dataObject.channels[moduleName];
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

