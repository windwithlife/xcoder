import BaseModel from '../../../store/BaseModel';

export default class DockerImageModel extends BaseModel{
    constructor() {
        super('simple/deployment/dockerimage');
    }
    
    getDockerImageByApplicationId(applicationId,callback){
        let params = {id:applicationId};
        return this.get("/findByApplicationId", params, callback);
    }
}



