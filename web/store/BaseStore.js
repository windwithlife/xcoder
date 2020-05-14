import { observable, action, computed,toJS,runInAction } from "mobx";
import BaseModel from './modelCommon.js';

class BaseStore {
    @observable dataObject;
    _modelname;
    model= BaseModel
    commonModel = BaseModel
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
                //console.log(JSON.stringify(response.data));
                console.log(response.data);
                response.data.map(function(item, i) {
                    item.key = item.id
                });
                that.dataObject.list= response.data;
                //console.log('modulename is' + that._modelname);
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
              //that.queryAll();
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
            //that.queryAll();
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
          //that.dataObject.list.splice(index,1);
          //console.log(that.dataObject.list.slice());
          if(callback){
              callback(response.data);
          }
      });

  }

    // @action
    // removeItemById(index, id) {
    //     let that = this;
    //     this.model.removeById(id, function () {
    //         console.log('successful to remove: ID:' + record.id);
    //         that.items.splice(index, 1);
    //     });
    // }
    // @action fetchByNameLike(keywork) {
    //     console.log("begin to load data from server")
    //     let that = this;
    //     this.model.queryByNameLike(keyword,function (response) {
    //         if (response && response.data) {
    //             console.log("have received data!")
    //             //console.log(JSON.stringify(response.data));
    //             console.log(response.data);
    //             that.items.length =0;
    //             response.data.map(function (item, i) {
    //                 item.key = item.id
    //                 that.items.push(item);
    //             });
    //             console.log(that.items)
    //             //that.items = response.data;
    //         } //the end of if
    //     });
    // }

    
    // @action
    // updateItem(callback){
    //     let data = {};
    //     for(let [key,value] of Object.entries(this)){
    //         if ((key != 'items')||(key!='model')||(key!='commontModel')){
    //             data[key] = value;
    //         }
    //     }
    //     console.log("mobx real data:",data);
    //     this.model.update(data, function(response) {
    //         if (response && response.data) {
    //             console.log(data);
    //             callback();

    //         }else{}
    //     })
    // }
    
}

export default BaseStore;
