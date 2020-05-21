import { observable, action, computed,toJS,runInAction } from "mobx";
import BaseStore from '../../../store/BaseStore.js'
//import BaseModel from '../../common/components/models/modelCommon.js';

let Data = {
    currentItem :{
        id:1,
        name:"oldName",
        description:"oldDescription",
        defineText:'',
        status:-1
    },
    list:[]
}
export default class TemplateStore extends BaseStore {
   
    constructor() {
        super('pagetemplate');
        this.dataObject = Data;
    }
    @action.bound
    queryByApplicationTypeId(id,callback){
        let that = this;
        console.log('moduleid is :' + id);
        this.model.query("/findByApplicationTypeId/" + id,{id:id},function (response) {
            if (response && response.data) {
                //console.log(JSON.stringify(response.data));
                console.log(response.data);
                //response.data.map(function(item, i) {
                //    item.key = item.id
                //});
                that.dataObject.list= response.data;
                if (callback){
                    callback(response.data);
                }
            }
        });

    }
   

    
}


