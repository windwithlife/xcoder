import { useStaticRendering } from 'mobx-react';
import Store from './Store';
import AuthStore from "./AuthStore";
import TableStore from '../xtable/models/TablesStore.js';
import ColumnStore from '../xtable/models/ColumnStore.js';
import ModuleStore from '../xmodule/models/ModuleStore';
import ProjectStore from '../xproject/models/ProjectStore';
import CategoryStore from '../public/category/models/CategoryStore';
import DictionaryStore from '../public/dictionary/models/DictionaryStore';
import InterfaceStore from '../xinterface/models/InterfaceStore';
import PageStore from '../xpage/models/PageStore';
import WidgetStore from '../xwidget/models/WidgetStore';
import TempalteStore from '../pagetemplate/models/TemplateStore';
import ReleaseStore from '../projectrelease/models/ReleaseStore';
import XReleaseStore from '../xrelease/models/ReleaseStore';
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
    network:new Store(),
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
    releasesStore: new ReleaseStore(),
    xreleasesStore: new XReleaseStore(),
    
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


