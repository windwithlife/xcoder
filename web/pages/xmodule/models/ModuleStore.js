import { observable, action, computed,toJS,runInAction } from "mobx";
import BaseStore from '../../stores/BaseStore.js'

let  ModuleItem = {
    id:1,
    name:"oldName",
    description:"oldDescription",
    defineText:'',
    status:-1,
    tables:[],
    interfaces:[],
    pages:[],
}
let Data = {
    currentItem :ModuleItem,
    list:[]
}
export default class ModuleStore extends BaseStore {
    constructor() {
        super('xmodule');
        this.dataObject = Data;
    }

    @action.bound
    queryByProjectId(id){
        let that = this;
        this.model.query("/queryByProject",{id:id},function (response) {
            if (response && response.data) {
                //console.log(JSON.stringify(response.data));
                console.log(response.data);
                response.data.map(function(item, i) {
                    item.key = item.id
                });
                that.dataObject.list= response.data;
            }
        });
 
    }  
}



