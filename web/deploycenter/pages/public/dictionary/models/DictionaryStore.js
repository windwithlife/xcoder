import { observable, action, computed,toJS,runInAction } from "mobx";
import BaseStore from '../../../../store/BaseStore';
import BaseModel from '../../../../store/modelCommon.js';
let  DataItem = {
    id:1,
    name:"projectName",
    description:"project Description",
    defineText:'',
    status:-1
}
let Data = {
    currentItem :DataItem,
    list:[]
}
export default class DictionaryStore extends BaseStore {
   
    constructor() {
        super('/xcoder/dictionary');
        this.dataObject = Data;
    } 
    
}



