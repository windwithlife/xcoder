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
@inject('templatesStore')
@observer
export default class DetailPage extends React.Component {

    state = {
        editMode: false,
    }
    constructor() {
        super();

    }
    Store = () => {
        return this.props.templatesStore;
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
                    <Form.Item name="sideType" label="其适用的端" >
                        {itemData.sideType}
                    </Form.Item>
                    < Form.Item name="language" label="编程语言选择：">
                        {itemData.language}
                    </Form.Item>
                    < Form.Item name="framework" label="技术框架：">
                        {itemData.framework}
                    </Form.Item>
                    < Form.Item name="tag" label="页面标签：">
                        {itemData.tag}
                    </Form.Item>
                    < Form.Item name="defineText" label='页面定义'>
                        {itemData.defineText}
                    </Form.Item>

                </Form>
            </Card>

        );
    }
}

DetailPage.getInitialProps = async function (context) {
    return { query: context.query };
}
