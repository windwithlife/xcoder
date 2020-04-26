import { observable, action, computed,toJS,runInAction } from "mobx";
import BaseStore from '../../stores/BaseStore.js'
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
export default class WidgetStore extends BaseStore {
   
    constructor() {
        super('xwidget');
        this.dataObject = Data;
    }
    @action.bound
    queryByModuleId(id){
        let that = this;
        console.log('moduleid is :' + id);
        this.model.query("/queryByModuleId",{id:id},function (response) {
            if (response && response.data) {
                //console.log(JSON.stringify(response.data));
                console.log(response.data);
                //response.data.map(function(item, i) {
                //    item.key = item.id
                //});
                that.dataObject.list= response.data;
            }
        });

    }
   

    
}


