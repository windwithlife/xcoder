import { observable, action, computed,toJS,runInAction } from "mobx";
import BaseModel from './modelCommon.js';

class BaseStore {
  @observable dataObject;
  constructor(moduleName) {
      if (moduleName){
          this.model = new BaseModel(moduleName);
          this._modelname = moduleName;
      }
  }
  initialize(intialData){
    print('initialize data in BaseStore Class');
    print(intialData);
    this.dataObject = intialData;
  }

  @action.bound
  queryAll(callback){
        let that = this;
        this.model.queryAll(function (response) {
            if (response && response.data) {
                console.log(response.data);
                that.dataObject.list= response.data;
                if(callback){
                    callback(response.data);
                }
            }
        });
    }
  
  @action.bound
  add(values,callback){
      let that = this;
      this.model.add(values, function(response) {
          if (response && response.data) {
              console.log(response.data);
              callback(response.data);
              that.dataObject.list.push(response.data);
          }
      })
  }

  @action.bound
  update(values,callback){
      let that = this;
      let data = values;
      this.model.update(data, function(response) {
        if (response && response.data) {
            console.log(data);
            callback(response.data);
        }
      });    
  }

  
  @action.bound
  queryById(id,callback){
      let that = this;
      that.model.queryById(id,function(response) {
          if (response && response.data) {
              console.log(response.data);
              that.dataObject.currentItem = response.data;
              if(callback){callback(response.data);}
          }
      })
  }

  @action.bound
  removeById(index,id,callback){
      let that = this;
      this.model.removeById(id, function(response) {
          console.log('successful to remove: ID:' + id);
          if(callback){
              callback(response.data);
          }
      });
  }
}

export default BaseStore;
