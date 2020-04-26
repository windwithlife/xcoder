import { observable, action } from "mobx";
import BaseStore from "./BaseStore";

class TableColumnStore extends BaseStore{
 
  @observable userId = sessionStorage.getItem("userId");
  @observable username = sessionStorage.getItem("username") || "jack";
  @observable password = "123456";

  constructor() {
    super('auth');
    //this.api = api;
    //this.appStore = appStore;
  }

  @action setUsername(username) {
    this.username = username;
  }

  @action setPassword(password) {
    this.password = password;
  }

  @action login() {
  
  }
  
}

export default AuthStore;
