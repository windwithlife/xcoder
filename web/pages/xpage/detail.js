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
import EditTable from '../common/components/EditableTable';
import router from 'next/router';
import { inject, observer } from 'mobx-react';

const rowSelection = {
};
@inject('pagesStore')
@observer
export default class DetailPage extends React.Component {
    formRef = React.createRef();
    state = {
        editMode: false,
    }
    constructor() {
        super();

    }
    Store = () => {
        return this.props.pagesStore;
    }
    tableHeader() {
        var that = this;

        var fieldColumns = [];

        fieldColumns.push({
            title: "名称",
            dataIndex: 'name',
            key: 'name'
        });

        fieldColumns.push({
            title: "说明",
            dataIndex: 'description',
            key: 'description'
        });

        return fieldColumns;
    }
    changeEditMode = (event) => {
        event.stopPropagation();
        console.log('click on edit model');
        let nextMode = !this.state.editMode;
        this.setState({ editMode: nextMode });
        this.formRef.current.setFieldsValue(this.Store().dataObject.currentItem);
        
    }

    componentDidMount() {

        console.log('DidMount');
        let id = this.props.query.id;
        this.Store().queryById(id);
    }
    onFinish = values => {
        var that = this;
        //let moduleId = this.props.query.moduleId;
        //values.module = moduleId;
        this.Store().update(values, () => { console.log('finished update page'); });
    }

    handleLineDetail(type, record) {
        let path = '/' + type + '/detail';
        router.push({ pathname: path, query: { id: record.id } });
    }
    handleLineAdd(type) {
        let pageId = this.props.query.id;
        if('xinterface' == type){
            router.push({ pathname: '/xpage/add_interface', query: { id: pageId } });
        }
        if('widget' == type){
            router.push({ pathname: '/xpage/add_widget', query: { id: pageId } });
        }
        //router.push({ pathname: path, query: { moduleId: moduleId } });
        

    }

    handleDelete(type, index, record) {
        console.log(record.id);
        let that = this;
        let pageId = this.props.query.id;
        if (type == 'xinterface') {
            let interId = record.id;
            that.Store().deleteInterface(pageId, interId, function (value) {
                console.log('remove interface from page ID is:' + value);
            });
        }
        if (type=='widget'){
            let widgetId = record.id;
            that.Store().deleteWidget(pageId, widgetId, function (value) {
                console.log('remove widget from page ID is:' + value);
            });
        }

    }
    


    render() {
        let that = this;
        let itemData = this.Store().dataObject.currentItem;
        return (
            <div>
                <Card size="small" title="基本信息" style={{ width: 900 }}  extra={<SettingOutlined onClick={that.changeEditMode}></SettingOutlined>} >
                    <Form ref={this.formRef} name="control-ref" onFinish={that.onFinish.bind(that)}>
                       <Form.Item
                            name="id"
                            noStyle='true'
                        ></Form.Item>
                        < Form.Item name="name" label="名称：">
                        {this.state.editMode==true? <Input  /> :itemData.name}
                        </Form.Item>

                        < Form.Item name="description" label="描述信息：">
                        {this.state.editMode==true? <Input  /> :itemData.description}
                          
                        </Form.Item>
                        < Form.Item name="defineText" label='页面布局定义'>
                            {this.state.editMode==true? <Input.TextArea rows={10} /> :itemData.defineText}
                        </Form.Item>
                        <Form.Item hidden={!that.state.editMode}>
                            <Button type="primary" htmlType="submit" size="large">保存修改</Button>
                        </Form.Item>
                    </Form>
                </Card>
                <EditTable title="页面用到的接口" columns={that.tableHeader()} data={itemData.interfaces}
                    onAdd={that.handleLineAdd.bind(that, 'xinterface')}
                    onDelete={that.handleDelete.bind(that, 'xinterface')}
                    onDetail={that.handleLineDetail.bind(that, 'xinterface')}
                ></EditTable>
                <EditTable title="页面用到组件" columns={that.tableHeader()} data={itemData.widgets}
                    onAdd={that.handleLineAdd.bind(that, 'widget')}
                    onDelete={that.handleDelete.bind(that, 'widget')}
                    onDetail={that.handleLineDetail.bind(that, 'widget')}
                ></EditTable>
            </div>
        );
    }
}

DetailPage.getInitialProps = async function (context) {
    return { query: context.query };
}
