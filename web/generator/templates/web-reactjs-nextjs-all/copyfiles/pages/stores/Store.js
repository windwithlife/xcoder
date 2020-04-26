import { action, observable } from 'mobx'

import BaseStore from './BaseStore.js'



class Store extends BaseStore{
  @observable lastUpdate = 0
  @observable light = false

}

export default Store;
