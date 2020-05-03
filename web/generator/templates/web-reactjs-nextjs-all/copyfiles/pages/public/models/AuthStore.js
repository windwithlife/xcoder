import { observable, action } from "mobx";
import BaseStore from "../../common/models/BaseStore";

class AuthStore extends BaseStore{
 
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
    //this.appStore.increaseRequest();
    // const params = { username: this.username, password: this.password };
    // return this.api.login(params).then(action(data => {
    //   this.appStore.decreaseRequest();
    //   if (!data.error) {
    //     this.userId = data.userId;
    //     sessionStorage.setItem("userId", this.userId);
    //     sessionStorage.setItem("username", this.username);
    //     return Promise.resolve();
    //   } else {
    //     this.appStore.setError(data.error);
    //     return Promise.reject();
    //   }
    // }));
  }
  
}

export default AuthStore;
