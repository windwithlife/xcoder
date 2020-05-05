import { observable, action, computed,toJS,runInAction } from "mobx";
import BaseStore from '../BaseStore.js'
import BaseModel from '../../common/components/models/modelCommon.js';
let  DataItem = {
    
    children:[],
}
let Data = {
    currentItem :DataItem,
    list:[]
}
export default class ProjectStore extends BaseStore {
    //@observable dataObject = Data;
    constructor() {
        super('/MedicalLive/MedicalLive/');
        this.dataObject = Data;
    }
   

    
}



