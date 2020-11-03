import { observable, action, computed,toJS,runInAction } from "mobx";
import BaseStore from '../../../../store/BaseStore.js'
//import BaseModel from '../../../common/components/models/modelCommon.js';
let  DataItem = {
    id:1,
    name:"projectName",
    description:"project Description",
    defineText:'',
    status:-1
}
 let Data = {
     currentItem :DataItem,
     list:[],
 }
export default class ApplicationTypeStore extends BaseStore {
   
    constructor() {
        super('/xcoder/applicationtype');
        this.dataObject = Data;
    }

    
   
    
}



