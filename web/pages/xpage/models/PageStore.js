import { observable, action, computed,toJS,runInAction } from "mobx";

import BaseStore from '../../../store/BaseStore';
//import BaseModel from '../../common/components/models/modelCommon.js';
let  TableItem = {
    id:1,
    name:"oldName",
    description:"pageDescription",
    defineText:'',
    interfaces:[],
    widgets:[],
    status:-1
}
let TableData = {
    currentItem :TableItem,
    list:[]
}
class PageStore extends BaseStore {
   
    constructor() {
        super('/xcoder/xpage');
        this.dataObject = TableData;
    }
    @action.bound
    addInterface(pageId,intId,callback){
        this.model.query("/addInterface",{id:pageId,interfaceId:intId},function (response) {
            if (response && response.data) {
                console.log(response.data);
                if(callback){
                    callback(response.data);
                }
                //that.dataObject.list= response.data;
            }
        });
    }

    @action.bound
    deleteInterface(pageId,intId,callback){
        this.model.query("/deleteInterface",{id:pageId,interfaceId:intId},function (response) {
            if (response && response.data) {
                console.log(response.data);
                if(callback){
                    callback(response.data);
                }
                //that.dataObject.list= response.data;
            }
        });
    }
    

    @action.bound
    addWidget(pageId,widgetId,callback){
        this.model.query("/addWidget",{id:pageId,widgetId:widgetId},function (response) {
            if (response && response.data) {
                console.log(response.data);
                if(callback){
                    callback(response.data);
                }
                //that.dataObject.list= response.data;
            }
        });
    }

    @action.bound
    deleteWidget(pageId,widgetId,callback){
        this.model.query("/deleteWidget",{id:pageId,widgetId:widgetId},function (response) {
            if (response && response.data) {
                console.log(response.data);
                if(callback){
                    callback(response.data);
                }
                //that.dataObject.list= response.data;
            }
        });
    }

    @action.bound
    queryByModuleId(id){
        let that = this;
        console.log('moduleid is :' + id);
        this.model.query("/queryByModule",{id:id},function (response) {
            if (response && response.data) {
                
                console.log(response.data);
              
                that.dataObject.list= response.data;
            }
        });

    }
   

    
}

export default PageStore;

