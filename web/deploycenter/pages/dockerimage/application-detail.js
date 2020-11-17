import React from 'react';
import {
    Button,
    Collapse,
    Form,  
    Card,
    Select,
} from 'antd';
const { Panel } = Collapse;
import router from 'next/router';
import BasePage from '../common/pages/BasePage';
import  ApplicationModel from '../application/models/ApplicationModel';





export default class EditPage extends BasePage {
    formRef = React.createRef();
    state = {
        dataObject:{},
    }
    constructor(props) {
        super(props);   
        this.setDefaultModel(new ApplicationModel());
    }
  
    
    componentDidMount() {
        let that = this;
        let applicationId = this.params().applicationId;
        if(!applicationId){
            applicationId = this.Store().getCurrentApplicationId();
        }
        this.applicationId = applicationId;
        console.log("Application Current Id :" + applicationId);
        this.Store().queryById(applicationId, function (values) {
            let applictionObject = values.data;
            console.log(applictionObject);
            that.setState({dataObject:applictionObject});
           
        });
    }

   
    deployTo = () => {
        
        if(this.applicationId){
            this.Store().setCurrentApplicationId(this.applicationId);
        }
        router.push({ pathname:'/applicationrelease/deployment-home', query: {applicationId: this.applicationId} });
        
    }
    

    
    render() {
        let that = this;
        let editUrl = "/application/edit?id=" + this.params().id;
        let itemData = this.state.dataObject;
        if (!itemData){itemData ={};}
        console.log('render edit page');
        return (
            < div >
                <Card size="small" title="當前應用基本信息" style={{ width: 500 }} extra={<a >信息</a>} >
                    <Form ref={this.formRef}>
                        < Form.Item  label="名称:">
                            {itemData.name}
                        </Form.Item>
                        < Form.Item  label="描述信息：">
                            {itemData.description}
                        </Form.Item>
                        < Form.Item  label="应用类型：">
                            {itemData.applicationTypeId}
                        </Form.Item>
                        < Form.Item  label="所属项目：">
                            {itemData.projectId}
                        </Form.Item>
                    
                        <Card type="inner">
                            <Form.Item>
                                
                                <Button type="primary" onClick={that.deployTo} size="large">进行发布</Button>
                            </Form.Item>
                        </Card>

                    </Form>
                </Card>


            </div>
        );
    }
}

EditPage.getInitialProps = async function (context) {
    return { query: context.query };
}
