import BaseModel from '../../../../store/BaseModel';

export default class ApplicationTypeModel extends BaseModel{
    constructor() {
        super('simple/deployment/dictionary');
    }
    queryDictionaryByCategory(name, callback){
        let params = {categoryName:name};
        return this.get("/queryByCategoryName", params,callback);
    }
    
}



