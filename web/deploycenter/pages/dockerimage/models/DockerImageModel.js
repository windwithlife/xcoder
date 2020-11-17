import BaseModel from '../../../store/BaseModel';
import ApplicationModel from '../../application/models/ApplicationModel';

export default class DockerImageModel extends BaseModel{
    constructor() {
        super('simple/deployment/dockerimage');
        this.applcation = new ApplicationModel();
    }
    
    

    getCurrentApplicationId(){
        const appId = this.applcation.getCurrentApplicationId();
        return appId;
    }
    findImagesByApplicaionId(applicationId,callback){
        let params = {id:applicationId};
        return this.get("/findByApplicationId", params, callback);
    }
    buildImage(params,callback){
        return this.post('/buildImage', params, callback);
    }
}



