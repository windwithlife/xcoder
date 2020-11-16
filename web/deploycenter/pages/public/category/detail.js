import React from 'react';
import {
    Button,
  
    Collapse,
    Modal,
    Form,
    Input,
    Card,
    Select,
} from 'antd';
const { Panel } = Collapse;
import router from 'next/router';
import BasePage from '../common/pages/BasePage';
import ApplicationModel from './models/CategoryModel';

export default class EditPage extends BasePage {
    formRef = React.createRef();
    state = {
        dataObject: {},
    }
    constructor(props) {
        super(props);
        this.setDefaultModel(new ApplicationModel());
    }

    StoreData = () => {
        return this.state.dataObject;
    }

    componentDidMount() {
        let that = this;
        let id = this.params().id;
        this.Store().queryById(id, function (values) {
            let dataObject = values.data;
            console.log(dataObject);
            that.setState({ dataObject: dataObject });

        });
    }

    onEdit =()=>{
        const editUrl = "/category/edit";
        const categoryId= this.params().id;
        router.push({pathname:editUrl, query:{id: categoryId}});
    }
   
    
    handleLineDelete(type, index, record) {
    }

    render() {
        let that = this;
        
        let itemData = that.StoreData();
        console.log('render detail page');
        return (
            < div >
                <Card size="small" title="基本信息" style={{ width: 500 }} extra={<a onClick={that.onEdit}>修改</a>} >
                    <Form ref={this.formRef}>
                    <Form.Item name="name" label="名称">
                        {itemData.name}
                    </Form.Item>
                    <Form.Item name="idName" label="识别串">
                    {itemData.idName}
                    </Form.Item>
                    <Form.Item name="description" label="描述">
                    {itemData.description}
                    </Form.Item>

                       

                    </Form>
                </Card>
                <Card type="inner">
                        <Form.Item>
                        <Button type="primary" onClick={that.backToApplication} size="large">返回应用</Button>
                        </Form.Item>
                    </Card>

            </div>
        );
    }
}

