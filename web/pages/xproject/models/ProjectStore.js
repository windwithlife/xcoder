import { observable, action, computed,toJS,runInAction } from "mobx";
import BaseStore from '../../stores/BaseStore.js'
import BaseModel from '../../common/components/models/modelCommon.js';
let  DataItem = {
    id:1,
    name:"projectName",
    description:"project Description",
    defineText:'',
    status:-1,
    modules:[],
    releases:[],
}
let Data = {
    currentItem :DataItem,
    list:[]
}
export default class ProjectStore extends BaseStore {
    //@observable dataObject = Data;
    constructor() {
        super('project');
        this.dataObject = Data;
    }

    // @action.bound
    // add(values,callback){
        
    //     this.model.add(values, function(response) {
    //         if (response && response.data) {
    //             console.log(response.data);
    //             callback(response.data);
    //         }
    //     })
    // }
    // @action.bound
    // queryAll(){
    //     let that = this;
    //     this.model.queryAll(function (response) {
    //         if (response && response.data) {
    //             console.log(JSON.stringify(response.data));
    //             console.log(response.data);
    //             response.data.map(function(item, i) {
    //                 item.key = item.id
    //             });
    //             that.dataObject.list= response.data;
    //         }
    //     });
    // }
    // @action.bound
    // queryById(id){
    //     let that = this;
    //     that.model.queryById(id,function(response) {
    //         if (response && response.data) {
    //             console.log(response.data);
    //             that.dataObject.currentItem = response.data;
    //         }
    //     })
    // }

    // @action.bound
    // removeById(index,id){
    //     let that = this;
    //     this.model.removeById(id, function() {
    //         console.log('successful to remove: ID:' + id);
    //         //const dataSource = [...that.];
    //         //dataSource.splice(index, 1);
    //         that.dataObject.list.splice(index,1);
    //     });

    // }
   
    
}



