import { observable, action, computed,toJS,runInAction } from "mobx";
import BaseStore from '../../stores/BaseStore.js'
import BaseModel from '../../common/components/models/modelCommon.js';
let  DataItem = {
    <% data.fields.forEach(function(field){
       if(field.fieldType =='int'){%>
        <%=field.name%>:-1,
       <%}else{%>
        <%=field.name%>:'',
        <%}%>
    <%})%>
    children:[],
}
let Data = {
    currentItem :DataItem,
    list:[]
}
export default class ProjectStore extends BaseStore {
    //@observable dataObject = Data;
    constructor() {
        super('<%=data.name%>');
        this.dataObject = Data;
    }
    
    <% data.interfaces.forEach(function(interfaceObj){%>
    @action.bound
    <%=interfaceObj.name%>(inputParams){
        let that = this;
        this.model.<%=interfaceObj.requestMethodName%>("<%=interfaceObj.requestPath%>",inputParams,function (response) {
            if (response && response.data) {
                console.log(response.data);
                that.dataObject.<%=interfaceObj.responseDataName%>= response.data;
            }
        });

    }
  <%})%>
}



