import { observable, action, computed, toJS, runInAction } from "mobx";
import BaseStore from '../../../store/BaseStore';
import BaseModel from '../../../store/modelCommon.js';

let ColumnData = {
    currentItem: {
    id: 1,
        name: "oldName",
            fieldType: 1,
            referModule:"project",
            mapField:"id",
                description: "oldDescription",
                    xtableId: 9999
},
list: []};

class ColumnStore extends BaseStore {
   
    constructor() {
        super('/xcoder/xtablecolumn');
        
        this.dataObject = ColumnData;
        
    }

    @action.bound
    initializeByTableId(id,callback) {
        let that = this;
        this.model.query("/queryByXtableId", { id: id }, function (response) {
            if (response && response.data) {
                console.log(response.data);
                that.dataObject.list.splice(0, that.dataObject.list.length);
                response.data.forEach(element => {
                    that.dataObject.list.push(element);
                });
                //that.dataObject.list = response.data;
                console.log(that.dataObject.list);
                callback(response.data);
            } else { console.log('failed to fetch table columns'); }
        })
    }

    

}

export default ColumnStore;

