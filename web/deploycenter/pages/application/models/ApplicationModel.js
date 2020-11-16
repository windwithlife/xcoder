import BaseModel from '../../../store/BaseModel';



export default class ApplicationModel extends BaseModel{
    constructor() {  
        super("simple/deployment/application")
        this.dataObject ={};
        
    }
    setCurrentApplicationId(id){
        if (window.localStorage){
            localStorage.setItem("__APPLICATION_ID__",id);
        }
    }
    getCurrentApplicationId(){
        if (window.localStorage){
            const applicationId = localStorage.getItem("__APPLICATION_ID__");
            return applicationId;
        }else{
            return 0;
        }
    }
    
    queryByProjectId(id,callback){
        return this.get("/getByProjectId",{id:id}, callback);

    }


}



