import { useStaticRendering } from 'mobx-react';
//import Store from './Store';
import AuthStore from "./AuthStore";
import MenuStore from "./MenuStore";
import DictionaryStore from "../pages/public/dictionary/models/DictionaryStore";
import CategoryStore from "../pages/public/category/models/CategoryStore";
//import RoomStore from "../pages/MedicalLive/models/RoomStore";


const isServer = typeof window === 'undefined'
useStaticRendering(isServer)

let stores = {
    //network:new Store(),
    categoryStore: new CategoryStore(),
    dictionaryStore: new DictionaryStore(),
    authStore:new AuthStore(),
    menuStore: new MenuStore(),
    //roomStore: new RoomStore(),
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


