import { observable, action, computed,toJS,runInAction } from "mobx";
import BaseStore from '../../common/models/BaseStore';
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
        super('<%=data.requestBasePath%>');
        this.dataObject = Data;
    }
   <%if (data.domainType=="table"){%>
    @action.bound
    queryAll(callback){
        let that = this;
        this.model.queryRaw("<%=data.requestBasePath%>queryAll",{},function (response) {
            if (response && response.data) {
                console.log(response.data);
                that.dataObject.list= response.data.items;
                if (callback){
                    callback(response.data);
                }
            }
        });

    }

    @action.bound
    queryById(id, callback){
        let that = this;
        this.model.queryRaw("<%=data.requestBasePath%>query/"+id,{},function (response) {
            if (response && response.data) {
                console.log(response.data);
                that.dataObject.currentItem= response.data;
                if (callback){
                    callback(response.data);
                }
            }
        });

    }

    @action.bound
    add(values, callback){
        let that = this;
        this.model.postRaw("<%=data.requestBasePath%>save",values,function (response) {
            if (response && response.data) {
                console.log(response.data);
                that.dataObject.currentItem= response.data;
                if (callback){
                    callback(response.data);
                }
            }
        });

    }

    @action.bound
    update(values, callback){
        let that = this;
        this.model.postRaw("<%=data.requestBasePath%>update/" + values.id,values,function (response) {
            if (response && response.data) {
                console.log(response.data);
                that.dataObject.currentItem= response.data;
                if (callback){
                    callback(response.data);
                }
            }
        });

    }
    @action.bound
    removeById(id, callback){
        let that = this;
        this.model.postRaw("<%=data.requestBasePath%>romve" + id,{},function (response) {
            if (response && response.data) {
                console.log(response.data);
                that.dataObject.currentItem= response.data;
                if (callback){
                    callback(response.data);
                }
            }
        });

    }
    <%}%>

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



