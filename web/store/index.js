import { useStaticRendering } from 'mobx-react';

import AuthStore from "./AuthStore";
import MenuStore from "./MenuStore";
import TableStore from '../pages/xtable/models/TablesStore.js';
import ColumnStore from '../pages/xtable/models/ColumnStore.js';
import ModuleStore from '../pages/xmodule/models/ModuleStore';
import ProjectStore from '../pages/project/models/ProjectStore';
import CategoryStore from '../pages/public/category/models/CategoryStore';
import DictionaryStore from '../pages/public/dictionary/models/DictionaryStore';
import InterfaceStore from '../pages/xinterface/models/InterfaceStore';
import PageStore from '../pages/xpage/models/PageStore';
import WidgetStore from '../pages/xwidget/models/WidgetStore';
import TempalteStore from '../pages/pagetemplate/models/TemplateStore';
import ApplicationStore from '../pages/application/models/ApplicationStore';
import ReleaseStore from '../pages/applicationrelease/models/ReleaseStore';
//import TestStore from '../zxtable/models/TestStore.js'
/*import AppStore from "./AppStore";

import PostsStore from "./PostsStore";
import CommentsStore from "./CommentsStore";
import UIStore from "./UIStore";
import authApi from "../api/authApi";
import postApi from "../api/postApi";
import commentApi from "../api/commentApi";*/

const isServer = typeof window === 'undefined'
useStaticRendering(isServer)

let stores = {
    menusStore: new MenuStore(),
    tablesStore:new TableStore(),
    columnsStore: new ColumnStore(),
    modulesStore: new ModuleStore(),
    projectsStore: new ProjectStore(),
    categorysStore: new CategoryStore(),
    dictionarysStore: new DictionaryStore(),
    interfacesStore: new InterfaceStore(),
    pagesStore: new PageStore(),
    widgetsStore: new WidgetStore(),
    templatesStore: new TempalteStore(),
    applicationsStore: new ReleaseStore(),
    applicationreleasesStore: new ReleaseStore(),
    
}   


function retainStore(storeName){
    return stores[storeName];
}
function composeStores(storeName,initialData){
    if (storeName && initialData){
        store = retainStore(storeName);
        if(initialData){
            store.initialize(initialData);
        }
        stores[storeName] = store;
    }    
    return stores;
}



export function initializeStore (name,initialData) {
    // Always make a new store if server, otherwise state is shared between requests
    if (isServer) {
        return composeStores();
    }else{
        if(name &&  initialData){
            return  composeStores(name, initialData)
        }else{
            return  composeStores();
        }
        
      
    }
}


