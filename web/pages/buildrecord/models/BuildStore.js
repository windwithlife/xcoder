import { observable, action, computed,toJS,runInAction } from "mobx";
import BaseStore from '../../../store/BaseStore';

let  ModuleItem = {
    id:1,
    name:"releaseName",
    description:"new release",
    defineText:'',
    status:-1,
    pages:[],
    modules:[],
}
let Data = {
    currentItem :ModuleItem,
    list:[]
}
export default class ReleaseStore extends BaseStore {
    constructor() {
        super('/xcoder/buildrecord');
        this.dataObject = Data;
    }

    @action.bound
    queryByReleaseId(id){
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



