import React from 'react';
//import model from './models/model.js';
import Table from 'antd/lib/table';
import Icon from 'antd/lib/icon';
import Button from 'antd/lib/button';
import Popconfirm from 'antd/lib/popconfirm';
import {
    Collapse,
    Modal,
    Form,
    Input,
    Card,
    Select,
} from 'antd';
const { Panel } = Collapse;
import { SettingOutlined } from '@ant-design/icons';

import router from 'next/router';
import { inject, observer } from 'mobx-react';
//import AddColumnPage from './AddColumnDialog';

const rowSelection = {
};
@inject('interfacesStore') 
@observer
export default class DetailPage extends React.Component {
    
    state = {
        editMode: false,
    }
    constructor() {
        super();

    }
    Store=()=>{
        return this.props.interfacesStore;
    }
    changeEditMode = (event) => {
        event.stopPropagation();
        console.log('click on edit model');
        let nextMode = !this.state.editMode;
        this.setState({ editMode: nextMode });
    }
   
    componentDidMount() {
       
        console.log('DidMount');
        let id = this.props.query.id;
        this.Store().queryById(id);
    }


    handleLineDelete(index, record) {
        console.log(record.id);
        this.Store().removeById(index, record.id);
    }

   
    render() {
        let that = this;
        let itemData = this.Store().dataObject.currentItem;
        return (

            <Card size="small" title="基本信息" style={{ width: 500 }}  >
                <Form  >
                    < Form.Item name="name" label="名称：">
                        {itemData.name}
                    </Form.Item>
                    
                    < Form.Item name="description" label="描述信息：">
                        {itemData.description}
                    </Form.Item>
                    < Form.Item name="inputParams" label='请求参数定义'>
                        {itemData.inputParams}
                    </Form.Item>
                    < Form.Item name="outputParams" label='返回参数定义'>
                        {itemData.inputParams}
                    </Form.Item>
                    < Form.Item name="moduleName" label="所属模块：">
                        {itemData.moduleId}
                    </Form.Item>
                </Form>
            </Card>

        );
    }
}

DetailPage.getInitialProps = async function (context) {
    return { query: context.query };
}
