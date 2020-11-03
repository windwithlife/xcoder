import { observable, action, computed,toJS,runInAction } from "mobx";
import BaseStore from '../../../store/BaseStore';
//import BaseModel from '../../common/components/models/modelCommon.js';
let  TableItem = {
    id:1,
    name:"oldName",
    description:"oldDescription",
    defineText:'',
    status:-1
}
let TableData = {
    currentItem :TableItem,
    list:[]
}
class TableStore extends BaseStore {
   
    constructor() {
        super('/xcoder/xtable');
        this.dataObject = TableData;
    }
    @action.bound
    queryByModuleId(id){
        let that = this;
        console.log('moduleid is :' + id);
        this.model.query("/queryByModule",{id:id},function (response) {
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

export default TableStore;

