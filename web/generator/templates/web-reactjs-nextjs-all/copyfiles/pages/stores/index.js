import { useStaticRendering } from 'mobx-react';
//import Store from './Store';
import AuthStore from "../public/models/AuthStore";
import MenuStore from "../public/models/MenuStore";
import RoomStore from "../MedicalLive/models/RoomStore";


const isServer = typeof window === 'undefined'
useStaticRendering(isServer)

let stores = {
    //network:new Store(),
    authStore:new AuthStore(),
    menuStore: new MenuStore(),
    roomStore: new RoomStore(),
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


