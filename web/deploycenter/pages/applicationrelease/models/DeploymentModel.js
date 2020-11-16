import BaseModel from '../../../store/BaseModel';
import ApplicationModel from '../../application/models/ApplicationModel';
export default class DeploymentModel extends BaseModel{
    constructor() {
        super('simple/deployment/applicationrelease');
        this.applcation = new ApplicationModel();
    }
    getCurrentApplicationId(){
        const appId = this.applcation.getCurrentApplicationId();
        //console.log("**********************current application id" + appId);
        return appId;
    }
    getDeploymentList(params, callback){
        return this.get("/getDeploymentList", params, callback);
    }

    deployTo(params,callback){
        return this.post("/deployTo",params,callback);
    }
}



